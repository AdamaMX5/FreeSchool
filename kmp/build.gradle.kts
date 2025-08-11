plugins {
    kotlin("multiplatform") version "1.9.20"
    id("io.ktor.plugin") version "2.3.5"
}

repositories {
    mavenCentral() // Wichtig: Definiert die Quelle für Abhängigkeiten
}

kotlin {
    jvm() // Für Android
    js(IR) {
        browser()
        binaries.executable()
        compilations.all {
            kotlinOptions {
                freeCompilerArgs += listOf("-Xir-property-lazy-initialization")
            }
        }
    }

     sourceSets {
        val commonMain by getting {
            dependencies {
                implementation("io.ktor:ktor-client-core:2.3.5")
                implementation("io.ktor:ktor-client-json:2.3.5")
                implementation("io.ktor:ktor-client-content-negotiation:2.3.5")
                implementation("io.ktor:ktor-serialization-kotlinx-json:2.3.5")
                implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.7.3")
            }
        }
    }
}