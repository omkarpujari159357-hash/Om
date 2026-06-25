// src/screens/RecordScreen.tsx
import React, { useState, useRef } from 'react';
import {
  View, Text, TouchableOpacity, TextInput,
  ScrollView, StyleSheet, Alert, Platform,
} from 'react-native';
import { TRANSLATIONS, LangCode } from '../translations';

// In the real app, swap this with react-native-audio-recorder-player
// import AudioRecorderPlayer from 'react-native-audio-recorder-player';

interface Props {
  lang: LangCode;
  voiceMessage: string;
  setVoiceMessage: (v: string) => void;
  hasRecording: boolean;
  setHasRecording: (v: boolean) => void;
  recordingPath: string;
  setRecordingPath: (v: string) => void;
  navigate: (s: any) => void;
}

export default function RecordScreen({
  lang, voiceMessage, setVoiceMessage,
  hasRecording, setHasRecording, recordingPath, setRecordingPath, navigate,
}: Props) {
  const t = TRANSLATIONS[lang];
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const timerRef = useRef<any>(null);

  const startRecording = async () => {
    /* REAL IMPLEMENTATION:
    const audioRecorderPlayer = new AudioRecorderPlayer();
    const path = Platform.select({
      android: `${RNFS.ExternalDirectoryPath}/callguard_message.mp3`,
    });
    await audioRecorderPlayer.startRecorder(path);
    audioRecorderPlayer.addRecordBackListener((e) => {
      setRecordingTime(Math.floor(e.currentPosition / 1000));
    });
    setRecordingPath(path);
    */
    setIsRecording(true);
    setRecordingTime(0);
    timerRef.current = setInterval(() => {
      setRecordingTime(prev => {
        if (prev >= 30) { stopRecording(); return prev; }
        return prev + 1;
      });
    }, 1000);
  };

  const stopRecording = async () => {
    /* REAL IMPLEMENTATION:
    await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    */
    clearInterval(timerRef.current);
    setIsRecording(false);
    setHasRecording(true);
  };

  const playRecording = async () => {
    /* REAL IMPLEMENTATION:
    const audioRecorderPlayer = new AudioRecorderPlayer();
    await audioRecorderPlayer.startPlayer(recordingPath);
    audioRecorderPlayer.addPlayBackListener((e) => {
      if (e.currentPosition === e.duration) {
        setIsPlaying(false);
        audioRecorderPlayer.stopPlayer();
      }
    });
    */
    setIsPlaying(!isPlaying);
  };

  const deleteRecording = () => {
    Alert.alert('Delete recording?', 'This will remove your recorded message.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => { setHasRecording(false); setRecordingTime(0); } },
    ]);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.heading}>{t.voiceMessageTitle}</Text>
      <Text style={styles.subtext}>{t.voiceMessageDesc}</Text>

      {/* Presets */}
      <View style={styles.card}>
        <Text style={styles.sectionLabel}>{t.usePreset}</Text>
        {t.presets.filter(p => p.msg).map(p => (
          <TouchableOpacity
            key={p.id}
            style={[styles.presetRow, voiceMessage === p.msg && styles.presetRowActive]}
            onPress={() => setVoiceMessage(p.msg)}
          >
            <Text style={styles.presetIcon}>{p.icon}</Text>
            <Text style={[styles.presetMsg, voiceMessage === p.msg && styles.presetMsgActive]}>
              {p.msg}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Custom text */}
      <View style={styles.card}>
        <Text style={styles.sectionLabel}>{t.customText}</Text>
        <TextInput
          style={styles.textInput}
          multiline
          numberOfLines={3}
          value={voiceMessage}
          onChangeText={setVoiceMessage}
          placeholder={t.typeMessage}
          placeholderTextColor="#2a2a3a"
          autoCorrect={false}
        />
        <Text style={styles.hint}>{t.textToSpeech}</Text>
      </View>

      {/* Record */}
      <View style={styles.card}>
        <Text style={styles.sectionLabel}>{t.recordVoice}</Text>
        <View style={styles.recordCenter}>
          <Text style={[styles.recStatus, isRecording && styles.recStatusActive]}>
            {isRecording
              ? t.recStatus(recordingTime)
              : hasRecording
              ? t.recordingSaved
              : t.tapToRecord}
          </Text>
          <TouchableOpacity
            style={[styles.recordBtn, isRecording && styles.recordBtnActive]}
            onPress={isRecording ? stopRecording : startRecording}
            activeOpacity={0.8}
          >
            <Text style={styles.recordBtnIcon}>{isRecording ? '⏹' : '🎤'}</Text>
          </TouchableOpacity>

          {hasRecording && !isRecording && (
            <View style={styles.playRow}>
              <TouchableOpacity
                style={[styles.pill, isPlaying && styles.pillActive]}
                onPress={playRecording}
              >
                <Text style={[styles.pillText, isPlaying && styles.pillTextActive]}>
                  {isPlaying ? t.stop : t.preview}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.pillDanger} onPress={deleteRecording}>
                <Text style={styles.pillDangerText}>{t.delete}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      <TouchableOpacity
        style={styles.saveBtn}
        onPress={() => navigate('home')}
        activeOpacity={0.85}
      >
        <Text style={styles.saveBtnText}>{t.saveGoBack}</Text>
      </TouchableOpacity>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0f', paddingHorizontal: 20 },
  heading: { color: '#fff', fontSize: 26, fontWeight: '800', marginTop: 16, marginBottom: 4 },
  subtext: { color: '#555', fontSize: 13, marginBottom: 20 },
  card: { backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', borderRadius: 20, padding: 18, marginBottom: 14 },
  sectionLabel: { color: '#555', fontSize: 11, fontWeight: '700', letterSpacing: 0.8, marginBottom: 12 },
  presetRow: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, marginBottom: 8, backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  presetRowActive: { backgroundColor: 'rgba(108,99,255,0.12)', borderColor: 'rgba(108,99,255,0.35)' },
  presetIcon: { fontSize: 18, marginRight: 10 },
  presetMsg: { flex: 1, color: '#888', fontSize: 13, lineHeight: 18 },
  presetMsgActive: { color: '#ccc' },
  textInput: { backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.09)', borderRadius: 14, padding: 14, color: '#fff', fontSize: 14, textAlignVertical: 'top', minHeight: 80 },
  hint: { color: '#333', fontSize: 11, marginTop: 8 },
  recordCenter: { alignItems: 'center', gap: 16, paddingVertical: 8 },
  recStatus: { color: '#444', fontSize: 12, fontFamily: Platform.OS === 'android' ? 'monospace' : 'Courier', letterSpacing: 1 },
  recStatusActive: { color: '#ff4d6d' },
  recordBtn: { width: 76, height: 76, borderRadius: 38, backgroundColor: '#6c63ff', alignItems: 'center', justifyContent: 'center', shadowColor: '#6c63ff', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, shadowRadius: 16, elevation: 10 },
  recordBtnActive: { backgroundColor: '#ff4d6d', shadowColor: '#ff4d6d' },
  recordBtnIcon: { fontSize: 26 },
  playRow: { flexDirection: 'row', gap: 10 },
  pill: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 100, backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  pillActive: { backgroundColor: 'rgba(108,99,255,0.2)', borderColor: 'rgba(108,99,255,0.4)' },
  pillText: { color: '#666', fontSize: 13, fontWeight: '600' },
  pillTextActive: { color: '#a78bfa' },
  pillDanger: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 100, borderWidth: 1, borderColor: 'rgba(255,77,109,0.3)' },
  pillDangerText: { color: '#ff4d6d', fontSize: 13, fontWeight: '600' },
  saveBtn: { width: '100%', padding: 16, borderRadius: 16, backgroundColor: '#6c63ff', alignItems: 'center', shadowColor: '#6c63ff', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.35, shadowRadius: 16, elevation: 10 },
  saveBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
