import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.coroutines.*
import kotlinx.serialization.Serializable
import kotlin.js.Promise

@JsExport
@JsName("ApiClient")
class ApiClient(private val baseUrl: String = "http://localhost:8000") {
    private val client = HttpClient {
        install(ContentNegotiation) {
            json()
        }
    }

    @JsName("getLearningHubs")
    fun getLearningHubs(): Promise<List<Category>> = GlobalScope.promise {
        client.get("$baseUrl/asLearningHubs/").body()
    }
}

@Serializable
data class Category(
    val id: Int,
    val name: String,
    val backgroundLink: String,
    val children: List<Category> = emptyList()
)