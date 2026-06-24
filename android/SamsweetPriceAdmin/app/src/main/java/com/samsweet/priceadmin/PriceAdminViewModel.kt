package com.samsweet.priceadmin

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.samsweet.priceadmin.data.AdminConfig
import com.samsweet.priceadmin.data.LatestPricesDocument
import com.samsweet.priceadmin.data.LocalDraftStore
import com.samsweet.priceadmin.data.PriceDiff
import com.samsweet.priceadmin.data.PriceItem
import com.samsweet.priceadmin.data.Product
import com.samsweet.priceadmin.data.ProductCatalog
import com.samsweet.priceadmin.data.RepositoryFile
import com.samsweet.priceadmin.data.SecureTokenStore
import com.samsweet.priceadmin.data.StoredDraft
import com.samsweet.priceadmin.network.ConflictException
import com.samsweet.priceadmin.network.GitHubContentsClient
import kotlinx.coroutines.launch
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.encodeToString
import kotlinx.serialization.ExperimentalSerializationApi
import kotlinx.serialization.json.Json
import java.time.Instant

enum class AdminScreen {
    Config,
    Dashboard,
    Edit,
    Preview,
    Settings
}

data class AdminUiState(
    val screen: AdminScreen = AdminScreen.Config,
    val config: AdminConfig = AdminConfig(),
    val tokenInput: String = "",
    val rememberToken: Boolean = false,
    val hasSavedToken: Boolean = false,
    val products: List<Product> = emptyList(),
    val remotePrices: LatestPricesDocument? = null,
    val remoteSha: String = "",
    val draftItems: Map<String, PriceItem> = emptyMap(),
    val selectedCategory: String = "All",
    val selectedCapacity: String = "All",
    val search: String = "",
    val isLoading: Boolean = false,
    val statusMessage: String = "Configure GitHub access to sync prices.",
    val errorMessage: String = "",
    val lastCommitSha: String = "",
    val lastCommitUrl: String = ""
) {
    val unsyncedCount: Int get() = draftItems.size
    val categories: List<String> get() = listOf("All") + products.map { it.category }.distinct().sorted()
    val capacities: List<String> get() = listOf("All") + products.map { it.capacity }.filter { it.isNotBlank() }.distinct().sortedWith(capacityComparator)
}

private val capacityComparator = compareBy<String> {
    when {
        it.endsWith("TB", ignoreCase = true) -> it.removeSuffix("TB").toDoubleOrNull()?.times(1024) ?: Double.MAX_VALUE
        it.endsWith("GB", ignoreCase = true) -> it.removeSuffix("GB").toDoubleOrNull() ?: Double.MAX_VALUE
        else -> Double.MAX_VALUE
    }
}

@OptIn(ExperimentalSerializationApi::class)
class PriceAdminViewModel(application: Application) : AndroidViewModel(application) {
    private val json = Json {
        ignoreUnknownKeys = true
        prettyPrint = true
        encodeDefaults = true
        explicitNulls = true
    }
    private val tokenStore = SecureTokenStore(application)
    private val draftStore = LocalDraftStore(application, json)
    private val github = GitHubContentsClient(json = json)

    var uiState = androidx.compose.runtime.mutableStateOf(AdminUiState())
        private set

    init {
        val savedToken = tokenStore.readToken()
        val savedDraft = draftStore.readDraft()
        uiState.value = uiState.value.copy(
            screen = if (savedToken.isNullOrBlank()) AdminScreen.Config else AdminScreen.Dashboard,
            config = draftStore.readConfig(),
            tokenInput = savedToken.orEmpty(),
            rememberToken = !savedToken.isNullOrBlank(),
            hasSavedToken = !savedToken.isNullOrBlank(),
            draftItems = savedDraft?.items.orEmpty(),
            statusMessage = if (savedDraft != null) "Local draft restored." else "Ready to sync from GitHub.",
            lastCommitSha = draftStore.readLastCommitSha(),
            lastCommitUrl = draftStore.readLastCommitUrl()
        )
    }

    fun updateConfig(config: AdminConfig) {
        uiState.value = uiState.value.copy(config = config)
    }

    fun updateToken(token: String) {
        uiState.value = uiState.value.copy(tokenInput = token)
    }

    fun setRememberToken(remember: Boolean) {
        uiState.value = uiState.value.copy(rememberToken = remember)
    }

    fun saveConfiguration() {
        val state = uiState.value
        draftStore.saveConfig(state.config)
        if (state.rememberToken && state.tokenInput.isNotBlank()) {
            tokenStore.saveToken(state.tokenInput)
        } else {
            tokenStore.clear()
        }
        uiState.value = state.copy(
            screen = AdminScreen.Dashboard,
            hasSavedToken = state.rememberToken && state.tokenInput.isNotBlank(),
            statusMessage = "Configuration saved locally.",
            errorMessage = ""
        )
    }

    fun clearSavedToken() {
        tokenStore.clear()
        uiState.value = uiState.value.copy(
            tokenInput = "",
            rememberToken = false,
            hasSavedToken = false,
            statusMessage = "Saved token cleared."
        )
    }

    fun navigate(screen: AdminScreen) {
        uiState.value = uiState.value.copy(screen = screen, errorMessage = "")
    }

    fun updateSearch(search: String) {
        uiState.value = uiState.value.copy(search = search)
    }

    fun updateCategory(category: String) {
        uiState.value = uiState.value.copy(selectedCategory = category)
    }

    fun updateCapacity(capacity: String) {
        uiState.value = uiState.value.copy(selectedCapacity = capacity)
    }

    fun syncFromGitHub() {
        val state = uiState.value
        val validation = validateConfig(state.config, requireToken = false)
        if (validation != null) {
            uiState.value = state.copy(errorMessage = validation)
            return
        }

        viewModelScope.launch {
            setLoading("Syncing products and latest prices from GitHub...")
            runCatching {
                val token = uiState.value.tokenInput
                val config = uiState.value.config
                val productsFile = github.getFile(config.owner, config.repository, config.productFilePath, config.branch, token)
                val priceFile = github.getFile(config.owner, config.repository, config.priceFilePath, config.branch, token)
                val catalog = json.decodeFromString<ProductCatalog>(productsFile.decodedContent)
                val prices = json.decodeFromString<LatestPricesDocument>(priceFile.decodedContent)
                requireValidPriceDocument(prices, catalog.items)
                Triple(catalog, prices, priceFile)
            }.onSuccess { (catalog, prices, priceFile) ->
                uiState.value = uiState.value.copy(
                    products = catalog.items,
                    remotePrices = prices,
                    remoteSha = priceFile.sha,
                    isLoading = false,
                    statusMessage = "Synced ${catalog.items.size} products. Latest price file updated at ${prices.updatedAt}.",
                    errorMessage = ""
                )
            }.onFailure { error ->
                uiState.value = uiState.value.copy(
                    isLoading = false,
                    errorMessage = sanitizeError(error),
                    statusMessage = "Sync failed. Local draft was kept."
                )
            }
        }
    }

    fun editItem(productId: String, item: PriceItem) {
        val next = uiState.value.draftItems.toMutableMap()
        next[productId] = item
        persistDraft(next)
        uiState.value = uiState.value.copy(draftItems = next, statusMessage = "Draft saved locally.")
    }

    fun batchMarkAvailable(available: Boolean) {
        val next = uiState.value.draftItems.toMutableMap()
        uiState.value.products.forEach { product ->
            val current = currentItem(product.id)
            next[product.id] = current.copy(available = available)
        }
        persistDraft(next)
        uiState.value = uiState.value.copy(draftItems = next, statusMessage = "Batch availability updated.")
    }

    fun batchCurrencyRmb() {
        val next = uiState.value.draftItems.toMutableMap()
        uiState.value.products.forEach { product ->
            val current = currentItem(product.id)
            val text = current.price?.let { "RMB ${formatPriceNumber(it)}" } ?: "Contact for current quote"
            next[product.id] = current.copy(priceText = text)
        }
        persistDraft(next)
        uiState.value = uiState.value.copy(draftItems = next, statusMessage = "Price text set to RMB where price exists.")
    }

    fun batchClearNotes() {
        val next = uiState.value.draftItems.toMutableMap()
        uiState.value.products.forEach { product ->
            next[product.id] = currentItem(product.id).copy(note = "")
        }
        persistDraft(next)
        uiState.value = uiState.value.copy(draftItems = next, statusMessage = "Notes cleared in local draft.")
    }

    fun batchContactForQuote() {
        val next = uiState.value.draftItems.toMutableMap()
        uiState.value.products.forEach { product ->
            next[product.id] = currentItem(product.id).copy(price = null, priceText = "Contact for current quote")
        }
        persistDraft(next)
        uiState.value = uiState.value.copy(draftItems = next, statusMessage = "All visible products marked Contact for current quote.")
    }

    fun importPrices(rawJson: String) {
        runCatching {
            val imported = json.decodeFromString<LatestPricesDocument>(rawJson)
            requireValidPriceDocument(imported, uiState.value.products)
            imported.items
        }.onSuccess { items ->
            persistDraft(items)
            uiState.value = uiState.value.copy(draftItems = items, statusMessage = "Imported ${items.size} price rows.", errorMessage = "")
        }.onFailure { error ->
            uiState.value = uiState.value.copy(errorMessage = sanitizeError(error))
        }
    }

    fun exportCurrentJson(): String {
        return json.encodeToString(buildUploadDocument())
    }

    fun diffs(): List<PriceDiff> {
        val state = uiState.value
        val productById = state.products.associateBy { it.id }
        return state.draftItems.mapNotNull { (id, after) ->
            val product = productById[id] ?: return@mapNotNull null
            val before = state.remotePrices?.items?.get(id)
            PriceDiff(product, before, after)
        }.filter { it.hasPriceChange || it.hasAvailabilityChange || it.hasNoteChange }
    }

    fun uploadToGitHub() {
        val state = uiState.value
        val validation = validateBeforeUpload(state)
        if (validation != null) {
            uiState.value = state.copy(errorMessage = validation)
            return
        }

        viewModelScope.launch {
            setLoading("Uploading latest-prices.json to GitHub...")
            runCatching {
                val config = uiState.value.config
                val token = uiState.value.tokenInput
                val latest = github.getFile(config.owner, config.repository, config.priceFilePath, config.branch, token)
                val uploadDoc = buildUploadDocument()
                requireValidPriceDocument(uploadDoc, uiState.value.products)
                val result = github.putFile(
                    owner = config.owner,
                    repo = config.repository,
                    path = config.priceFilePath,
                    branch = config.branch,
                    token = token,
                    previousSha = latest.sha,
                    message = commitMessage(uploadDoc.updatedAt),
                    content = json.encodeToString(uploadDoc)
                )
                Pair(uploadDoc, result)
            }.onSuccess { (uploadDoc, result) ->
                draftStore.clearDraft()
                draftStore.saveLastUpload(result.commitSha, result.commitUrl)
                uiState.value = uiState.value.copy(
                    remotePrices = uploadDoc,
                    draftItems = emptyMap(),
                    isLoading = false,
                    statusMessage = "Upload complete. GitHub Pages may take a few minutes to refresh.",
                    errorMessage = "",
                    lastCommitSha = result.commitSha,
                    lastCommitUrl = result.commitUrl,
                    screen = AdminScreen.Dashboard
                )
            }.onFailure { error ->
                if (error is ConflictException) {
                    syncFromGitHub()
                    uiState.value = uiState.value.copy(
                        screen = AdminScreen.Preview,
                        statusMessage = "GitHub changed during upload. Review the refreshed diff, then confirm upload again."
                    )
                } else {
                    uiState.value = uiState.value.copy(
                        isLoading = false,
                        errorMessage = sanitizeError(error),
                        statusMessage = "Upload failed. Local draft was kept."
                    )
                }
            }
        }
    }

    fun currentItem(productId: String): PriceItem {
        val state = uiState.value
        return state.draftItems[productId]
            ?: state.remotePrices?.items?.get(productId)
            ?: PriceItem()
    }

    fun filteredProducts(): List<Product> {
        val state = uiState.value
        val query = state.search.trim().lowercase()
        return state.products.filter { product ->
            val haystack = listOf(
                product.name,
                product.id,
                product.category,
                product.capacity,
                product.interfaceName,
                product.protocol,
                product.qualityGrade
            ).joinToString(" ").lowercase()
            (query.isBlank() || query.split(Regex("\\s+")).all { haystack.contains(it) }) &&
                (state.selectedCategory == "All" || product.category == state.selectedCategory) &&
                (state.selectedCapacity == "All" || product.capacity == state.selectedCapacity)
        }
    }

    private fun setLoading(message: String) {
        uiState.value = uiState.value.copy(isLoading = true, statusMessage = message, errorMessage = "")
    }

    private fun persistDraft(items: Map<String, PriceItem>) {
        draftStore.saveDraft(StoredDraft(updatedAt = Instant.now().toString(), items = items))
    }

    private fun buildUploadDocument(): LatestPricesDocument {
        val state = uiState.value
        val merged = (state.remotePrices?.items ?: emptyMap()) + state.draftItems
        return LatestPricesDocument(
            schemaVersion = 1,
            updatedAt = Instant.now().toString(),
            updatedBy = "SAMSWEET Price Admin",
            currency = "RMB",
            displayCurrency = "RMB",
            source = "android-price-admin",
            items = merged
        )
    }

    private fun validateBeforeUpload(state: AdminUiState): String? {
        validateConfig(state.config, requireToken = true)?.let { return it }
        if (state.tokenInput.isBlank()) return "GitHub token is required before upload."
        if (state.products.isEmpty()) return "Sync products before uploading."
        if (state.draftItems.isEmpty()) return "No local changes to upload."
        if (state.draftItems.keys.any { id -> state.products.none { it.id == id } }) {
            return "Draft contains product IDs that do not exist in products.json."
        }
        return validatePriceDocument(buildUploadDocument(), state.products)
    }

    private fun validateConfig(config: AdminConfig, requireToken: Boolean): String? {
        if (config.owner.isBlank() || config.repository.isBlank() || config.branch.isBlank()) {
            return "Owner, repository, and branch are required."
        }
        if (config.priceFilePath.isBlank() || config.productFilePath.isBlank()) {
            return "Price file path and product file path are required."
        }
        if (requireToken && uiState.value.tokenInput.isBlank()) {
            return "GitHub token is required before upload."
        }
        return null
    }

    private fun validatePriceDocument(document: LatestPricesDocument, products: List<Product>): String? {
        if (document.schemaVersion < 1) return "Invalid schemaVersion."
        if (document.updatedAt.isBlank()) return "updatedAt is required."
        if (document.currency.isBlank()) return "currency is required."
        if (document.items.isEmpty()) return "items cannot be empty."
        val ids = products.map { it.id }.toSet()
        val unknownIds = document.items.keys.filter { it !in ids }
        if (unknownIds.isNotEmpty()) return "Unknown product IDs: ${unknownIds.joinToString(", ")}"
        document.items.forEach { (id, item) ->
            if (item.price != null && item.price < 0.0) return "Price cannot be negative for $id."
            if (item.priceText.isBlank()) return "priceText is required for $id."
        }
        return null
    }

    private fun requireValidPriceDocument(document: LatestPricesDocument, products: List<Product>) {
        validatePriceDocument(document, products)?.let { throw IllegalArgumentException(it) }
    }

    private fun commitMessage(updatedAt: String): String =
        "Update SAMSWEET latest prices (${updatedAt.take(19)})"

    private fun sanitizeError(error: Throwable): String =
        (error.message ?: error::class.java.simpleName)
            .let { message ->
                val token = uiState.value.tokenInput
                if (token.isBlank()) message else message.replace(token, "[token hidden]")
            }
            .take(600)

    private fun formatPriceNumber(value: Double): String =
        if (value % 1.0 == 0.0) value.toInt().toString() else value.toString()
}
