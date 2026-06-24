package com.samsweet.priceadmin.data

import android.content.Context
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

class LocalDraftStore(context: Context, private val json: Json) {
    private val prefs = context.getSharedPreferences("samsweet_price_admin_local", Context.MODE_PRIVATE)

    fun saveConfig(config: AdminConfig) {
        prefs.edit().putString("config", json.encodeToString(config)).apply()
    }

    fun readConfig(): AdminConfig {
        val raw = prefs.getString("config", null) ?: return AdminConfig()
        return runCatching { json.decodeFromString<AdminConfig>(raw) }.getOrDefault(AdminConfig())
    }

    fun saveDraft(draft: StoredDraft) {
        prefs.edit().putString("draft", json.encodeToString(draft)).apply()
    }

    fun readDraft(): StoredDraft? {
        val raw = prefs.getString("draft", null) ?: return null
        return runCatching { json.decodeFromString<StoredDraft>(raw) }.getOrNull()
    }

    fun clearDraft() {
        prefs.edit().remove("draft").apply()
    }

    fun saveLastUpload(commitSha: String, commitUrl: String) {
        prefs.edit()
            .putString("last_commit_sha", commitSha)
            .putString("last_commit_url", commitUrl)
            .apply()
    }

    fun readLastCommitSha(): String = prefs.getString("last_commit_sha", "") ?: ""
    fun readLastCommitUrl(): String = prefs.getString("last_commit_url", "") ?: ""
}
