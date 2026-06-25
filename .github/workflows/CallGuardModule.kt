// android/app/src/main/java/com/callguard/CallGuardModule.kt
//
// This is the BRIDGE between React Native (JavaScript) and Android (Kotlin).
// When JS calls NativeModules.CallGuard.setGuardActive(true), this runs.

package com.callguard

import android.content.SharedPreferences
import android.telecom.TelecomManager
import com.facebook.react.bridge.*
import org.json.JSONArray

class CallGuardModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "CallGuard"

    private val prefs: SharedPreferences
        get() = reactApplicationContext.getSharedPreferences("CallGuardPrefs", 0)

    // Called when user taps the big toggle button
    @ReactMethod
    fun setGuardActive(active: Boolean, promise: Promise) {
        prefs.edit().putBoolean("guard_active", active).apply()
        promise.resolve(true)
    }

    @ReactMethod
    fun isGuardActive(promise: Promise) {
        promise.resolve(prefs.getBoolean("guard_active", false))
    }

    // Save the list of VIP phone numbers
    // Called when user selects/deselects contacts
    @ReactMethod
    fun setVipNumbers(numbers: ReadableArray, promise: Promise) {
        val json = JSONArray()
        for (i in 0 until numbers.size()) {
            json.put(numbers.getString(i))
        }
        prefs.edit().putString("vip_numbers", json.toString()).apply()
        promise.resolve(true)
    }

    // Save the text voice message
    @ReactMethod
    fun setVoiceMessageText(message: String, promise: Promise) {
        prefs.edit().putString("voice_message_text", message).apply()
        promise.resolve(true)
    }

    // Save the path to a recorded audio file
    @ReactMethod
    fun setRecordingPath(path: String, promise: Promise) {
        prefs.edit().putString("recording_path", path).apply()
        promise.resolve(true)
    }

    // Check if this app is set as default phone app
    @ReactMethod
    fun isDefaultDialer(promise: Promise) {
        val telecomManager = reactApplicationContext
            .getSystemService(android.content.Context.TELECOM_SERVICE) as TelecomManager
        val isDefault = telecomManager.defaultDialerPackage == reactApplicationContext.packageName
        promise.resolve(isDefault)
    }

    // Request to become default phone app — opens system dialog
    @ReactMethod
    fun requestDefaultDialer(promise: Promise) {
        val intent = android.content.Intent(TelecomManager.ACTION_CHANGE_DEFAULT_DIALER)
        intent.putExtra(
            TelecomManager.EXTRA_CHANGE_DEFAULT_DIALER_PACKAGE_NAME,
            reactApplicationContext.packageName
        )
        intent.addFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK)
        reactApplicationContext.startActivity(intent)
        promise.resolve(true)
    }

    // Get call log (deflected calls stored locally)
    @ReactMethod
    fun getCallLog(promise: Promise) {
        val logJson = prefs.getString("call_log", "[]") ?: "[]"
        promise.resolve(logJson)
    }
}
