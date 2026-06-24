package com.samsweet.priceadmin.data

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class AdminConfig(
    val owner: String = "AdamAISSD",
    val repository: String = "SAMSWEET",
    val branch: String = "main",
    val priceFilePath: String = "public/data/latest-prices.json",
    val productFilePath: String = "public/data/products.json",
    val pagesUrl: String = "https://adamaissd.github.io/SAMSWEET/"
)

@Serializable
data class ProductCatalog(
    val schemaVersion: Int = 1,
    val updatedAt: String = "",
    val source: String = "",
    val priceListDate: String = "",
    val categories: List<String> = emptyList(),
    val capacities: List<String> = emptyList(),
    val items: List<Product> = emptyList()
)

@Serializable
data class Product(
    val id: String,
    val name: String,
    val brand: String = "SAMSWEET",
    val category: String,
    val qualityGrade: String = "",
    val capacity: String = "",
    @SerialName("interface")
    val interfaceName: String = "",
    val protocol: String = "",
    val formFactor: String = "",
    val image: String = "",
    val placeholder: Boolean = false
)

@Serializable
data class PriceItem(
    val price: Double? = null,
    val priceText: String = "Contact for current quote",
    val available: Boolean = true,
    val note: String = "Final price confirmed by quotation"
)

@Serializable
data class LatestPricesDocument(
    val schemaVersion: Int = 1,
    val updatedAt: String,
    val updatedBy: String = "SAMSWEET Price Admin",
    val currency: String = "RMB",
    val displayCurrency: String = "RMB",
    val source: String = "android-price-admin",
    val items: Map<String, PriceItem>
)

@Serializable
data class StoredDraft(
    val updatedAt: String,
    val items: Map<String, PriceItem>
)

data class PriceDiff(
    val product: Product,
    val before: PriceItem?,
    val after: PriceItem
) {
    val hasPriceChange: Boolean = before?.price != after.price || before?.priceText != after.priceText
    val hasAvailabilityChange: Boolean = before?.available != after.available
    val hasNoteChange: Boolean = before?.note != after.note
}

data class RepositoryFile(
    val path: String,
    val sha: String,
    val decodedContent: String
)

data class UploadResult(
    val commitSha: String,
    val commitUrl: String
)
