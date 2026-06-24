@file:OptIn(androidx.compose.foundation.layout.ExperimentalLayoutApi::class)

package com.samsweet.priceadmin.ui

import android.content.Intent
import android.net.Uri
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.RowScope
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.AssistChip
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Checkbox
import androidx.compose.material3.ElevatedButton
import androidx.compose.material3.FilterChip
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Switch
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.contentColorFor
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalClipboardManager
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.samsweet.priceadmin.AdminScreen
import com.samsweet.priceadmin.AdminUiState
import com.samsweet.priceadmin.PriceAdminViewModel
import com.samsweet.priceadmin.data.AdminConfig
import com.samsweet.priceadmin.data.PriceDiff
import com.samsweet.priceadmin.data.PriceItem
import com.samsweet.priceadmin.data.Product

@Composable
fun PriceAdminApp(viewModel: PriceAdminViewModel) {
    val state by viewModel.uiState
    val context = LocalContext.current
    val clipboard = LocalClipboardManager.current
    var pendingExport by remember { mutableStateOf("") }

    val importLauncher = rememberLauncherForActivityResult(ActivityResultContracts.GetContent()) { uri ->
        uri ?: return@rememberLauncherForActivityResult
        runCatching {
            context.contentResolver.openInputStream(uri)?.bufferedReader()?.use { it.readText() }.orEmpty()
        }.onSuccess { viewModel.importPrices(it) }
    }
    val exportLauncher = rememberLauncherForActivityResult(ActivityResultContracts.CreateDocument("application/json")) { uri ->
        uri ?: return@rememberLauncherForActivityResult
        context.contentResolver.openOutputStream(uri)?.use { output ->
            output.write(pendingExport.toByteArray(Charsets.UTF_8))
        }
    }

    Scaffold(
        containerColor = Color(0xFF05070D),
        bottomBar = {
            BottomNav(state = state, onNavigate = viewModel::navigate)
        }
    ) { padding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(
                    Brush.verticalGradient(
                        listOf(Color(0xFF05070D), Color(0xFF080B12), Color(0xFF0B111D))
                    )
                )
                .padding(padding)
        ) {
            when (state.screen) {
                AdminScreen.Config -> ConfigScreen(
                    state = state,
                    onConfigChange = viewModel::updateConfig,
                    onTokenChange = viewModel::updateToken,
                    onRememberChange = viewModel::setRememberToken,
                    onSave = viewModel::saveConfiguration,
                    onSync = viewModel::syncFromGitHub
                )
                AdminScreen.Dashboard -> DashboardScreen(
                    state = state,
                    onSync = viewModel::syncFromGitHub,
                    onEdit = { viewModel.navigate(AdminScreen.Edit) },
                    onPreview = { viewModel.navigate(AdminScreen.Preview) },
                    onUpload = { viewModel.navigate(AdminScreen.Preview) },
                    onOpenPages = {
                        context.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(state.config.pagesUrl)))
                    },
                    onCopyError = { clipboard.setText(AnnotatedString(state.errorMessage)) }
                )
                AdminScreen.Edit -> EditPricesScreen(
                    state = state,
                    products = viewModel.filteredProducts(),
                    currentItem = viewModel::currentItem,
                    onSearch = viewModel::updateSearch,
                    onCategory = viewModel::updateCategory,
                    onCapacity = viewModel::updateCapacity,
                    onEdit = viewModel::editItem,
                    onBatchRmb = viewModel::batchCurrencyRmb,
                    onBatchClearNotes = viewModel::batchClearNotes,
                    onBatchAvailable = { viewModel.batchMarkAvailable(true) },
                    onBatchUnavailable = viewModel::batchContactForQuote,
                    onImportClipboard = {
                        clipboard.getText()?.text?.let { viewModel.importPrices(it) }
                    },
                    onImportFile = { importLauncher.launch("application/json") },
                    onCopyJson = { clipboard.setText(AnnotatedString(viewModel.exportCurrentJson())) },
                    onSaveFile = {
                        pendingExport = viewModel.exportCurrentJson()
                        exportLauncher.launch("latest-prices.json")
                    },
                    onPreview = { viewModel.navigate(AdminScreen.Preview) }
                )
                AdminScreen.Preview -> PreviewScreen(
                    state = state,
                    diffs = viewModel.diffs(),
                    exportJson = viewModel.exportCurrentJson(),
                    onUpload = viewModel::uploadToGitHub,
                    onBack = { viewModel.navigate(AdminScreen.Edit) },
                    onCopyJson = { clipboard.setText(AnnotatedString(viewModel.exportCurrentJson())) }
                )
                AdminScreen.Settings -> SettingsScreen(
                    state = state,
                    onConfigChange = viewModel::updateConfig,
                    onTokenChange = viewModel::updateToken,
                    onRememberChange = viewModel::setRememberToken,
                    onSave = viewModel::saveConfiguration,
                    onClearToken = viewModel::clearSavedToken,
                    onTest = viewModel::syncFromGitHub
                )
            }

            if (state.isLoading) {
                LinearProgressIndicator(modifier = Modifier.fillMaxWidth().align(Alignment.TopCenter))
            }
        }
    }
}

@Composable
private fun ConfigScreen(
    state: AdminUiState,
    onConfigChange: (AdminConfig) -> Unit,
    onTokenChange: (String) -> Unit,
    onRememberChange: (Boolean) -> Unit,
    onSave: () -> Unit,
    onSync: () -> Unit
) {
    ScreenColumn {
        HeaderBlock(
            title = "SAMSWEET Price Admin",
            subtitle = "Update GitHub Pages prices without a server"
        )
        StatusCard(state)
        SettingsFields(
            state = state,
            onConfigChange = onConfigChange,
            onTokenChange = onTokenChange,
            onRememberChange = onRememberChange
        )
        ActionRow {
            Button(onClick = onSave) { Text("Save Configuration") }
            OutlinedButton(onClick = onSync, enabled = !state.isLoading) { Text("Test Sync") }
        }
        GuidanceCard()
    }
}

@Composable
private fun DashboardScreen(
    state: AdminUiState,
    onSync: () -> Unit,
    onEdit: () -> Unit,
    onPreview: () -> Unit,
    onUpload: () -> Unit,
    onOpenPages: () -> Unit,
    onCopyError: () -> Unit
) {
    ScreenColumn {
        HeaderBlock("SAMSWEET Price Admin", "Update product prices, then publish to GitHub Pages.")
        StatusCard(state, onCopyError)
        FlowRow(horizontalArrangement = Arrangement.spacedBy(12.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
            MetricCard("Repository", "${state.config.owner}/${state.config.repository}")
            MetricCard("Branch", state.config.branch)
            MetricCard("Products", state.products.size.toString())
            MetricCard("Unsynced changes", state.unsyncedCount.toString())
            MetricCard("Price updated", state.remotePrices?.updatedAt ?: "Not synced")
            MetricCard("Last commit", shortSha(state.lastCommitSha).ifBlank { "None yet" })
        }
        ActionRow {
            Button(onClick = onSync, enabled = !state.isLoading) { Text("Sync") }
            ElevatedButton(onClick = onEdit) { Text("Edit Prices") }
            OutlinedButton(onClick = onPreview, enabled = state.unsyncedCount > 0) { Text("Preview Changes") }
            Button(onClick = onUpload, enabled = state.unsyncedCount > 0) { Text("Upload") }
            OutlinedButton(onClick = onOpenPages) { Text("Open GitHub Pages") }
        }
    }
}

@Composable
private fun EditPricesScreen(
    state: AdminUiState,
    products: List<Product>,
    currentItem: (String) -> PriceItem,
    onSearch: (String) -> Unit,
    onCategory: (String) -> Unit,
    onCapacity: (String) -> Unit,
    onEdit: (String, PriceItem) -> Unit,
    onBatchRmb: () -> Unit,
    onBatchClearNotes: () -> Unit,
    onBatchAvailable: () -> Unit,
    onBatchUnavailable: () -> Unit,
    onImportClipboard: () -> Unit,
    onImportFile: () -> Unit,
    onCopyJson: () -> Unit,
    onSaveFile: () -> Unit,
    onPreview: () -> Unit
) {
    Column(modifier = Modifier.fillMaxSize()) {
        Column(modifier = Modifier.padding(18.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
            HeaderBlock("Edit Prices", "Search, filter, edit, then review before upload.")
            StatusCard(state)
            OutlinedTextField(
                value = state.search,
                onValueChange = onSearch,
                modifier = Modifier.fillMaxWidth(),
                label = { Text("Search product, capacity, ID, interface") },
                singleLine = true
            )
            ChipRow(items = state.categories, selected = state.selectedCategory, onSelect = onCategory)
            ChipRow(items = state.capacities, selected = state.selectedCapacity, onSelect = onCapacity)
            ActionRow {
                OutlinedButton(onClick = onBatchRmb) { Text("Set RMB text") }
                OutlinedButton(onClick = onBatchClearNotes) { Text("Clear notes") }
                OutlinedButton(onClick = onBatchAvailable) { Text("Mark available") }
                OutlinedButton(onClick = onBatchUnavailable) { Text("Contact for quote") }
            }
            ActionRow {
                OutlinedButton(onClick = onImportClipboard) { Text("Import clipboard JSON") }
                OutlinedButton(onClick = onImportFile) { Text("Import local JSON") }
                OutlinedButton(onClick = onCopyJson) { Text("Copy JSON") }
                OutlinedButton(onClick = onSaveFile) { Text("Save JSON file") }
                Button(onClick = onPreview, enabled = state.unsyncedCount > 0) { Text("Preview Changes") }
            }
        }
        LazyColumn(
            modifier = Modifier.fillMaxSize(),
            contentPadding = PaddingValues(start = 18.dp, end = 18.dp, bottom = 96.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            items(products, key = { it.id }) { product ->
                ProductEditorCard(
                    product = product,
                    item = currentItem(product.id),
                    modified = state.draftItems.containsKey(product.id),
                    onEdit = { onEdit(product.id, it) }
                )
            }
        }
    }
}

@Composable
private fun ProductEditorCard(product: Product, item: PriceItem, modified: Boolean, onEdit: (PriceItem) -> Unit) {
    val hasError = (item.price ?: 0.0) < 0.0 || item.priceText.isBlank()
    GlassCard {
        Row(horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.Top, modifier = Modifier.fillMaxWidth()) {
            Column(modifier = Modifier.weight(1f)) {
                Text(product.name, fontWeight = FontWeight.Bold, fontSize = 18.sp, maxLines = 2, overflow = TextOverflow.Ellipsis)
                Text("${product.id} • ${product.category} • ${product.capacity} • ${product.interfaceName}", color = Color(0xFFA9B4C7), fontSize = 12.sp)
            }
            if (modified) AssistChip(onClick = {}, label = { Text("Modified") })
        }
        Spacer(Modifier.height(12.dp))
        OutlinedTextField(
            value = item.price?.let { if (it % 1.0 == 0.0) it.toInt().toString() else it.toString() } ?: "",
            onValueChange = { value ->
                val price = value.trim().takeIf { it.isNotBlank() }?.toDoubleOrNull()
                val priceText = price?.let { "RMB ${if (it % 1.0 == 0.0) it.toInt() else it}" } ?: item.priceText
                onEdit(item.copy(price = price, priceText = priceText))
            },
            label = { Text("Price") },
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Decimal),
            isError = hasError,
            singleLine = true,
            modifier = Modifier.fillMaxWidth()
        )
        Spacer(Modifier.height(8.dp))
        OutlinedTextField(
            value = item.priceText,
            onValueChange = { onEdit(item.copy(priceText = it)) },
            label = { Text("Price text") },
            isError = item.priceText.isBlank(),
            singleLine = true,
            modifier = Modifier.fillMaxWidth()
        )
        Spacer(Modifier.height(8.dp))
        Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.SpaceBetween, modifier = Modifier.fillMaxWidth()) {
            Text("Available", fontWeight = FontWeight.SemiBold)
            Switch(checked = item.available, onCheckedChange = { onEdit(item.copy(available = it)) })
        }
        OutlinedTextField(
            value = item.note,
            onValueChange = { onEdit(item.copy(note = it)) },
            label = { Text("Note") },
            modifier = Modifier.fillMaxWidth(),
            minLines = 2
        )
        if (hasError) Text("Price must be numeric or blank, and priceText must not be empty.", color = Color(0xFFFF7D8C), fontSize = 12.sp)
    }
}

@Composable
private fun PreviewScreen(
    state: AdminUiState,
    diffs: List<PriceDiff>,
    exportJson: String,
    onUpload: () -> Unit,
    onBack: () -> Unit,
    onCopyJson: () -> Unit
) {
    ScreenColumn {
        HeaderBlock("Preview Changes", "Confirm the diff before writing latest-prices.json.")
        StatusCard(state)
        if (diffs.isEmpty()) {
            GlassCard { Text("No price changes are currently pending.") }
        } else {
            diffs.forEach { diff -> DiffCard(diff) }
        }
        GlassCard {
            Text("Commit message preview", fontWeight = FontWeight.Bold)
            Text("Update SAMSWEET latest prices (${exportJson.take(32)}...)", color = Color(0xFFA9B4C7), fontSize = 12.sp)
        }
        ActionRow {
            OutlinedButton(onClick = onBack) { Text("Back to Edit") }
            OutlinedButton(onClick = onCopyJson) { Text("Copy JSON") }
            Button(onClick = onUpload, enabled = diffs.isNotEmpty() && !state.isLoading) { Text("Confirm and Upload") }
        }
    }
}

@Composable
private fun DiffCard(diff: PriceDiff) {
    GlassCard {
        Text(diff.product.name, fontWeight = FontWeight.Bold)
        Text(diff.product.id, color = Color(0xFFA9B4C7), fontSize = 12.sp)
        HorizontalDivider(modifier = Modifier.padding(vertical = 10.dp), color = Color(0x2235B8FF))
        Row(horizontalArrangement = Arrangement.spacedBy(10.dp), modifier = Modifier.fillMaxWidth()) {
            DiffColumn("Before", diff.before)
            DiffColumn("After", diff.after)
        }
    }
}

@Composable
private fun RowScope.DiffColumn(title: String, item: PriceItem?) {
    Column(modifier = Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(4.dp)) {
        Text(title, color = Color(0xFF47F0FF), fontWeight = FontWeight.Bold)
        Text(item?.priceText ?: "No row")
        Text(if (item?.available == false) "Confirm stock" else "Available", color = Color(0xFFA9B4C7), fontSize = 12.sp)
        Text(item?.note.orEmpty(), color = Color(0xFFA9B4C7), fontSize = 12.sp, maxLines = 3, overflow = TextOverflow.Ellipsis)
    }
}

@Composable
private fun SettingsScreen(
    state: AdminUiState,
    onConfigChange: (AdminConfig) -> Unit,
    onTokenChange: (String) -> Unit,
    onRememberChange: (Boolean) -> Unit,
    onSave: () -> Unit,
    onClearToken: () -> Unit,
    onTest: () -> Unit
) {
    ScreenColumn {
        HeaderBlock("Settings", "Repository, branch, paths, token storage.")
        StatusCard(state)
        SettingsFields(state, onConfigChange, onTokenChange, onRememberChange)
        ActionRow {
            Button(onClick = onSave) { Text("Save Settings") }
            OutlinedButton(onClick = onTest) { Text("Test Connection") }
            OutlinedButton(onClick = onClearToken) { Text("Clear Token") }
        }
        GuidanceCard()
    }
}

@Composable
private fun SettingsFields(
    state: AdminUiState,
    onConfigChange: (AdminConfig) -> Unit,
    onTokenChange: (String) -> Unit,
    onRememberChange: (Boolean) -> Unit
) {
    GlassCard {
        Field("GitHub Owner", state.config.owner) { onConfigChange(state.config.copy(owner = it)) }
        Field("Repository", state.config.repository) { onConfigChange(state.config.copy(repository = it)) }
        Field("Branch", state.config.branch) { onConfigChange(state.config.copy(branch = it)) }
        Field("Price file path", state.config.priceFilePath) { onConfigChange(state.config.copy(priceFilePath = it)) }
        Field("Product file path", state.config.productFilePath) { onConfigChange(state.config.copy(productFilePath = it)) }
        Field("GitHub Pages URL", state.config.pagesUrl) { onConfigChange(state.config.copy(pagesUrl = it)) }
        OutlinedTextField(
            value = state.tokenInput,
            onValueChange = onTokenChange,
            modifier = Modifier.fillMaxWidth(),
            label = { Text("GitHub Token") },
            visualTransformation = PasswordVisualTransformation(),
            singleLine = true,
            supportingText = {
                Text(if (state.tokenInput.isBlank()) "Token is never hardcoded or logged." else "Token preview: ${maskToken(state.tokenInput)}")
            }
        )
        Row(verticalAlignment = Alignment.CenterVertically) {
            Checkbox(checked = state.rememberToken, onCheckedChange = onRememberChange)
            Text("Remember token in Android Keystore encrypted storage")
        }
    }
}

@Composable
private fun Field(label: String, value: String, onChange: (String) -> Unit) {
    OutlinedTextField(
        value = value,
        onValueChange = onChange,
        modifier = Modifier.fillMaxWidth(),
        label = { Text(label) },
        singleLine = true
    )
    Spacer(Modifier.height(8.dp))
}

@Composable
private fun GuidanceCard() {
    GlassCard {
        Text("Token guidance", fontWeight = FontWeight.Bold)
        Text("Use a fine-grained personal access token limited to AdamAISSD/SAMSWEET. Grant Contents read/write; add Actions read only if you want to inspect workflow status. Set an expiration date and clear the token when finished.", color = Color(0xFFA9B4C7))
    }
}

@Composable
private fun StatusCard(state: AdminUiState, onCopyError: (() -> Unit)? = null) {
    GlassCard {
        Text(state.statusMessage, fontWeight = FontWeight.SemiBold)
        if (state.errorMessage.isNotBlank()) {
            Spacer(Modifier.height(8.dp))
            Text(state.errorMessage, color = Color(0xFFFF7D8C))
            if (onCopyError != null) TextButton(onClick = onCopyError) { Text("Copy Error") }
        }
    }
}

@Composable
private fun BottomNav(state: AdminUiState, onNavigate: (AdminScreen) -> Unit) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .background(Color(0xEE070B14))
            .padding(10.dp),
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        AdminScreen.entries.forEach { screen ->
            val enabled = screen != AdminScreen.Edit || state.products.isNotEmpty()
            FilterChip(
                selected = state.screen == screen,
                enabled = enabled,
                onClick = { onNavigate(screen) },
                label = { Text(screen.name) }
            )
        }
    }
}

@Composable
private fun HeaderBlock(title: String, subtitle: String) {
    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
        Text(title, fontSize = 32.sp, lineHeight = 34.sp, fontWeight = FontWeight.ExtraBold)
        Text(subtitle, color = Color(0xFFA9B4C7), fontSize = 15.sp)
    }
}

@Composable
private fun ScreenColumn(content: @Composable ColumnScope.() -> Unit) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(18.dp)
            .padding(bottom = 84.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp),
        content = content
    )
}

@Composable
private fun GlassCard(content: @Composable ColumnScope.() -> Unit) {
    Card(
        colors = CardDefaults.cardColors(containerColor = Color(0xCC0B111D), contentColor = contentColorFor(Color(0xFF0B111D))),
        shape = RoundedCornerShape(22.dp),
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp), content = content)
    }
}

@Composable
private fun MetricCard(label: String, value: String) {
    Card(
        colors = CardDefaults.cardColors(containerColor = Color(0xAA111A2A)),
        shape = RoundedCornerShape(20.dp),
        modifier = Modifier.width(168.dp)
    ) {
        Column(modifier = Modifier.padding(14.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Text(label, color = Color(0xFFA9B4C7), fontSize = 12.sp)
            Text(value, fontWeight = FontWeight.Bold, maxLines = 2, overflow = TextOverflow.Ellipsis)
        }
    }
}

@Composable
private fun ActionRow(content: @Composable () -> Unit) {
    FlowRow(horizontalArrangement = Arrangement.spacedBy(10.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
        content()
    }
}

@Composable
private fun ChipRow(items: List<String>, selected: String, onSelect: (String) -> Unit) {
    FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
        items.forEach { item ->
            FilterChip(selected = selected == item, onClick = { onSelect(item) }, label = { Text(item) })
        }
    }
}

private fun maskToken(token: String): String =
    if (token.length <= 8) "••••" else "${token.take(4)}••••${token.takeLast(4)}"

private fun shortSha(sha: String): String = sha.take(7)
