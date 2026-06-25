// android/app/src/main/java/com/callguard/CallGuardScreeningService.kt
//
// THIS IS THE CORE NATIVE FILE that makes call screening work.
// It intercepts every incoming call and decides: ring or deflect.

package com.callguard

import android.media.AudioManager
import android.media.MediaPlayer
import android.telecom.Call
import android.telecom.CallScreeningService
import android.util.Log
import org.json.JSONArray
import android.content.SharedPreferences

class CallGuardScreeningService : CallScreeningService() {

    private val TAG = "CallGuardService"
    private var mediaPlayer: MediaPlayer? = null

    override fun onScreenCall(callDetails: Call.Details) {
        val incomingNumber = callDetails.handle?.schemeSpecificPart ?: ""
        Log.d(TAG, "Incoming call from: $incomingNumber")

        val prefs: SharedPreferences = getSharedPreferences("CallGuardPrefs", MODE_PRIVATE)
        val isGuardActive = prefs.getBoolean("guard_active", false)

        if (!isGuardActive) {
            // Guard mode is off — let all calls through
            allowCall(callDetails)
            return
        }

        val vipNumbersJson = prefs.getString("vip_numbers", "[]") ?: "[]"
        val vipNumbers = parseVipNumbers(vipNumbersJson)

        val normalizedIncoming = normalizeNumber(incomingNumber)
        val isVip = vipNumbers.any { normalizeNumber(it) == normalizedIncoming }

        if (isVip) {
            Log.d(TAG, "VIP caller — allowing through")
            allowCall(callDetails)
        } else {
            Log.d(TAG, "Non-VIP caller — deflecting with voice message")
            deflectWithVoiceMessage(callDetails, prefs)
        }
    }

    private fun allowCall(callDetails: Call.Details) {
        val response = CallResponse.Builder()
            .setDisallowCall(false)
            .setRejectCall(false)
            .setSilenceCall(false)
            .setSkipCallLog(false)
            .setSkipNotification(false)
            .build()
        respondToCall(callDetails, response)
    }

    private fun deflectWithVoiceMessage(callDetails: Call.Details, prefs: SharedPreferences) {
        // Answer silently, play the voice message, then hang up
        val response = CallResponse.Builder()
            .setDisallowCall(false)   // don't block outright
            .setRejectCall(false)
            .setSilenceCall(true)     // silent ring for owner
            .setSkipCallLog(false)    // still log it
            .setSkipNotification(false)
            .build()
        respondToCall(callDetails, response)

        // Play voice message after 1 second delay (let call connect)
        val recordingPath = prefs.getString("recording_path", "") ?: ""
        val textMessage = prefs.getString("voice_message_text", "I am busy, please call back later.") ?: ""

        android.os.Handler(mainLooper).postDelayed({
            if (recordingPath.isNotEmpty()) {
                playRecordedMessage(recordingPath)
            } else {
                playTextToSpeech(textMessage)
            }
        }, 1500)
    }

    private fun playRecordedMessage(path: String) {
        try {
            mediaPlayer?.release()
            mediaPlayer = MediaPlayer().apply {
                setAudioStreamType(AudioManager.STREAM_VOICE_CALL)
                setDataSource(path)
                prepare()
                start()
                setOnCompletionListener {
                    release()
                    mediaPlayer = null
                }
            }
        } catch (e: Exception) {
            Log.e(TAG, "Error playing recording: ${e.message}")
        }
    }

    private fun playTextToSpeech(message: String) {
        // Uses Android built-in TTS
        val tts = android.speech.tts.TextToSpeech(this) { status ->
            if (status == android.speech.tts.TextToSpeech.SUCCESS) {
                // TTS initialized — speak the message
            }
        }

        android.os.Handler(mainLooper).postDelayed({
            tts.speak(message, android.speech.tts.TextToSpeech.QUEUE_FLUSH, null, "callguard_msg")
        }, 500)
    }

    private fun parseVipNumbers(json: String): List<String> {
        return try {
            val arr = JSONArray(json)
            (0 until arr.length()).map { arr.getString(it) }
        } catch (e: Exception) {
            emptyList()
        }
    }

    private fun normalizeNumber(number: String): String {
        // Strip spaces, dashes, parentheses, and leading country code
        return number.replace(Regex("[\\s\\-\\(\\)\\+]"), "")
            .let { if (it.startsWith("91") && it.length > 10) it.substring(2) else it }
            .let { if (it.startsWith("1") && it.length > 10) it.substring(1) else it }
            .takeLast(10) // keep last 10 digits for comparison
    }

    override fun onDestroy() {
        mediaPlayer?.release()
        mediaPlayer = null
        super.onDestroy()
    }
}
