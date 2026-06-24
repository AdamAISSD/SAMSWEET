package com.samsweet.priceadmin.network

import android.util.Base64
import com.samsweet.priceadmin.data.RepositoryFile
import com.samsweet.priceadmin.data.UploadResult
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import java.net.URLEncoder

class GitHubContentsClient(
    private val httpClient: OkHttpClient = OkHttpClient(),
    private val json: Json = Json { ignoreUnknownKeys = true }
) {
    suspend fun getFile(
        owner: String,
        repo: String,
        path: String,
        branch: String,
        token: String
    ): RepositoryFile = kotlinx.coroutines.withContext(kotlinx.coroutines.Dispatchers.IO) {
        val url = "https://api.github.com/repos/${owner}/${repo}/contents/${encodePath(path)}?ref=${encode(branch)}"
        val request = baseRequest(url, token).get().build()
        httpClient.newCall(request).execute().use { response ->
            val body = response.body?.string().orEmpty()
            if (!response.isSuccessful) throw mapError(response.code, body)
            val file = json.decodeFromString<ContentResponse>(body)
            RepositoryFile(
                path = file.path,
                sha = file.sha,
                decodedContent = String(Base64.decode(file.content.replace("\\s".toRegex(), ""), Base64.DEFAULT), Charsets.UTF_8)
            )
        }
    }

    suspend fun putFile(
        owner: String,
        repo: String,
        path: String,
        branch: String,
        token: String,
        previousSha: String,
        message: String,
        content: String
    ): UploadResult = kotlinx.coroutines.withContext(kotlinx.coroutines.Dispatchers.IO) {
        val url = "https://api.github.com/repos/${owner}/${repo}/contents/${encodePath(path)}"
        val payload = PutContentRequest(
            message = message,
            content = Base64.encodeToString(content.toByteArray(Charsets.UTF_8), Base64.NO_WRAP),
            sha = previousSha,
            branch = branch
        )
        val request = baseRequest(url, token)
            .put(json.encodeToString(payload).toRequestBody("application/json".toMediaType()))
            .build()

        httpClient.newCall(request).execute().use { response ->
            val body = response.body?.string().orEmpty()
            if (!response.isSuccessful) throw mapError(response.code, body)
            val result = json.decodeFromString<PutContentResponse>(body)
            UploadResult(commitSha = result.commit.sha, commitUrl = result.commit.htmlUrl)
        }
    }

    private fun baseRequest(url: String, token: String): Request.Builder {
        val builder = Request.Builder()
            .url(url)
            .header("Accept", "application/vnd.github+json")
            .header("X-GitHub-Api-Version", "2022-11-28")

        if (token.isNotBlank()) {
            builder.header("Authorization", "Bearer" + " " + token)
        }

        return builder
    }

    private fun encodePath(path: String): String =
        path.split("/").joinToString("/") { encode(it) }

    private fun encode(value: String): String =
        URLEncoder.encode(value, "UTF-8").replace("+", "%20")

    private fun mapError(code: Int, body: String): Throwable =
        when (code) {
            401, 403 -> PermissionException("Token does not have Contents read/write permission for this repository.")
            409 -> ConflictException("The price file changed on GitHub. Sync again, review the diff, then upload.")
            else -> GitHubApiException("GitHub API request failed with HTTP ${code}: ${body.take(240)}")
        }
}

class PermissionException(message: String) : Exception(message)
class ConflictException(message: String) : Exception(message)
class GitHubApiException(message: String) : Exception(message)

@Serializable
private data class ContentResponse(
    val path: String,
    val sha: String,
    val content: String
)

@Serializable
private data class PutContentRequest(
    val message: String,
    val content: String,
    val sha: String,
    val branch: String
)

@Serializable
private data class PutContentResponse(
    val commit: CommitResponse
)

@Serializable
private data class CommitResponse(
    val sha: String,
    @SerialName("html_url")
    val htmlUrl: String
)
