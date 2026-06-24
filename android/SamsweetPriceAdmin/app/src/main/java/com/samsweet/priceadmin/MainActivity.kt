package com.samsweet.priceadmin

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.viewModels
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.ui.graphics.Color
import com.samsweet.priceadmin.ui.PriceAdminApp

class MainActivity : ComponentActivity() {
    private val viewModel: PriceAdminViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MaterialTheme(
                colorScheme = darkColorScheme(
                    primary = Color(0xFF47F0FF),
                    secondary = Color(0xFF8A7CFF),
                    tertiary = Color(0xFF41D88B),
                    background = Color(0xFF05070D),
                    surface = Color(0xFF0B111D),
                    surfaceVariant = Color(0xFF111A2A),
                    onPrimary = Color(0xFF03121C),
                    onBackground = Color(0xFFF7FBFF),
                    onSurface = Color(0xFFF7FBFF)
                )
            ) {
                PriceAdminApp(viewModel = viewModel)
            }
        }
    }
}
