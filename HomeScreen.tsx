// src/screens/HomeScreen.tsx
import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  StyleSheet, Modal, Alert,
} from 'react-native';
import { TRANSLATIONS, LangCode } from '../translations';

interface Props {
  lang: LangCode;
  setLang: (l: LangCode) => void;
  isActive: boolean;
  setIsActive: (v: boolean) => void;
  selectedContacts: string[];
  voiceMessage: string;
  setVoiceMessage: (v: string) => void;
  hasRecording: boolean;
  navigate: (s: any) => void;
}

const MOCK_CALL_LOG = [
  { id: '1', deflected: true },
  { id: '2', deflected: true },
  { id: '3', deflected: false },
];

export default function HomeScreen({
  lang, setLang, isActive, setIsActive,
  selectedContacts, voiceMessage, setVoiceMessage, hasRecording, navigate,
}: Props) {
  const t = TRANSLATIONS[lang];
  const [selectedPreset, setSelectedPreset] = useState('work');
  const [showLangModal, setShowLangModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const callLog = t.callLog;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header row */}
      <View style={styles.headerRow}>
        <Text style={styles.appName}>{t.appName}</Text>
        <TouchableOpacity style={styles.langPill} onPress={() => setShowLangModal(true)}>
          <Text style={styles.langPillText}>
            {TRANSLATIONS[lang].flag} {TRANSLATIONS[lang].name} ▾
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.heading}>{isActive ? t.guardingCalls : t.readyToGuard}</Text>
      <Text style={styles.subtext}>
        {isActive ? t.vipsCanReach(selectedContacts.length) : t.activateToFilter}
      </Text>

      {/* Big toggle */}
      <TouchableOpacity
        style={[styles.bigToggle, isActive && styles.bigToggleActive]}
        onPress={() => setIsActive(!isActive)}
        activeOpacity={0.85}
      >
        <Text style={styles.bigToggleIcon}>{isActive ? '🔴' : '🛡️'}</Text>
        <Text style={[styles.bigToggleText, isActive && styles.bigToggleTextActive]}>
          {isActive ? t.deactivate : t.activate}
        </Text>
        {isActive && <Text style={styles.bigToggleSubtext}>{t.runningSince}</Text>}
      </TouchableOpacity>

      {/* Stats row */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{selectedContacts.length}</Text>
          <Text style={styles.statLabel}>{t.vipContacts}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: '#ff4d6d' }]}>
            {MOCK_CALL_LOG.filter(c => c.deflected).length}
          </Text>
          <Text style={styles.statLabel}>{t.callsDeflected}</Text>
        </View>
      </View>

      {/* Voice message card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.sectionLabel}>{t.voiceMessage}</Text>
          <View style={[styles.statusTag, hasRecording ? styles.tagGreen : styles.tagRed]}>
            <Text style={[styles.statusTagText, { color: hasRecording ? '#22c55e' : '#ff4d6d' }]}>
              {hasRecording ? t.recorded : t.notSet}
            </Text>
          </View>
        </View>
        <Text style={styles.messagePreview}>"{voiceMessage}"</Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.pill, isPlaying && styles.pillActive]}
            onPress={() => setIsPlaying(!isPlaying)}
          >
            <Text style={[styles.pillText, isPlaying && styles.pillTextActive]}>
              {isPlaying ? t.stop : t.play}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pill} onPress={() => navigate('record')}>
            <Text style={styles.pillText}>{t.reRecord}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick modes */}
      <View style={styles.card}>
        <Text style={styles.sectionLabel}>{t.quickModes}</Text>
        <View style={styles.presetsWrap}>
          {t.presets.map(p => (
            <TouchableOpacity
              key={p.id}
              style={[styles.pill, selectedPreset === p.id && styles.pillActive]}
              onPress={() => {
                setSelectedPreset(p.id);
                if (p.msg) setVoiceMessage(p.msg);
              }}
            >
              <Text style={[styles.pillText, selectedPreset === p.id && styles.pillTextActive]}>
                {p.icon} {p.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Call log */}
      <View style={[styles.card, { marginBottom: 24 }]}>
        <Text style={styles.sectionLabel}>{t.recentActivity}</Text>
        {callLog.map((c, i) => (
          <View key={c.id} style={[styles.logRow, i < callLog.length - 1 && styles.logRowBorder]}>
            <View style={[styles.dot, { backgroundColor: i < 2 ? '#ff4d6d' : '#22c55e' }]} />
            <View style={styles.logInfo}>
              <Text style={styles.logName}>{c.name}</Text>
              <Text style={styles.logTime}>{c.time}</Text>
            </View>
            <View style={[styles.logTag, { backgroundColor: i < 2 ? 'rgba(255,77,109,0.1)' : 'rgba(34,197,94,0.1)' }]}>
              <Text style={[styles.logTagText, { color: i < 2 ? '#ff4d6d' : '#22c55e' }]}>
                {i < 2 ? t.voicemailSent : t.connected}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Language modal */}
      <Modal visible={showLangModal} transparent animationType="slide">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowLangModal(false)}
        >
          <View style={styles.langSheet}>
            <Text style={styles.langSheetTitle}>
              SELECT LANGUAGE / ಭಾಷೆ / भाषा / भाषा
            </Text>
            <View style={styles.langGrid}>
              {(Object.keys(TRANSLATIONS) as LangCode[]).map(code => (
                <TouchableOpacity
                  key={code}
                  style={[styles.langOption, lang === code && styles.langOptionActive]}
                  onPress={() => { setLang(code); setShowLangModal(false); }}
                >
                  <Text style={styles.langFlag}>{TRANSLATIONS[code].flag}</Text>
                  <Text style={[styles.langName, lang === code && styles.langNameActive]}>
                    {TRANSLATIONS[code].name}
                  </Text>
                  {lang === code && <Text style={styles.langCheck}>✓</Text>}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0f', paddingHorizontal: 20 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 },
  appName: { color: '#2a2a3a', fontSize: 11, fontWeight: '700', letterSpacing: 1.5 },
  langPill: { backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', borderRadius: 100, paddingHorizontal: 12, paddingVertical: 6 },
  langPillText: { color: '#666', fontSize: 12, fontWeight: '600' },
  heading: { color: '#ffffff', fontSize: 26, fontWeight: '800', marginTop: 16, marginBottom: 4 },
  subtext: { color: '#555', fontSize: 13, marginBottom: 20 },
  bigToggle: { width: '100%', height: 110, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  bigToggleActive: { backgroundColor: '#6c63ff', shadowColor: '#6c63ff', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, shadowRadius: 20, elevation: 12 },
  bigToggleIcon: { fontSize: 30 },
  bigToggleText: { color: '#555', fontSize: 15, fontWeight: '700', letterSpacing: 0.5, marginTop: 6 },
  bigToggleTextActive: { color: '#fff' },
  bigToggleSubtext: { color: 'rgba(255,255,255,0.6)', fontSize: 11, marginTop: 4 },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 14 },
  statCard: { flex: 1, backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', borderRadius: 20, padding: 16, alignItems: 'center' },
  statNumber: { color: '#6c63ff', fontSize: 28, fontWeight: '800' },
  statLabel: { color: '#555', fontSize: 11, marginTop: 4 },
  card: { backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', borderRadius: 20, padding: 18, marginBottom: 14 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionLabel: { color: '#555', fontSize: 11, fontWeight: '700', letterSpacing: 0.8 },
  statusTag: { paddingHorizontal: 9, paddingVertical: 3, borderRadius: 8 },
  tagGreen: { backgroundColor: 'rgba(34,197,94,0.12)' },
  tagRed: { backgroundColor: 'rgba(255,77,109,0.12)' },
  statusTagText: { fontSize: 10, fontWeight: '600' },
  messagePreview: { color: '#bbb', fontSize: 13, lineHeight: 20, marginBottom: 14 },
  row: { flexDirection: 'row', gap: 8 },
  presetsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 },
  pill: { paddingHorizontal: 13, paddingVertical: 7, borderRadius: 100, backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  pillActive: { backgroundColor: 'rgba(108,99,255,0.2)', borderColor: 'rgba(108,99,255,0.4)' },
  pillText: { color: '#555', fontSize: 12, fontWeight: '600' },
  pillTextActive: { color: '#a78bfa' },
  logRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  logRowBorder: { borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.04)' },
  dot: { width: 7, height: 7, borderRadius: 4, marginRight: 10 },
  logInfo: { flex: 1 },
  logName: { color: '#ddd', fontSize: 13, fontWeight: '600' },
  logTime: { color: '#444', fontSize: 11, marginTop: 2 },
  logTag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 7 },
  logTagText: { fontSize: 10, fontWeight: '600' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(7,7,13,0.85)', justifyContent: 'flex-end' },
  langSheet: { backgroundColor: '#1a1a26', borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  langSheetTitle: { color: '#555', fontSize: 11, fontWeight: '700', letterSpacing: 0.8, marginBottom: 16, textAlign: 'center' },
  langGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  langOption: { flex: 1, minWidth: '45%', backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', borderRadius: 16, padding: 14, alignItems: 'center' },
  langOptionActive: { backgroundColor: 'rgba(108,99,255,0.15)', borderColor: 'rgba(108,99,255,0.5)' },
  langFlag: { fontSize: 28, marginBottom: 6 },
  langName: { color: '#888', fontSize: 14, fontWeight: '700' },
  langNameActive: { color: '#a78bfa' },
  langCheck: { color: '#6c63ff', fontSize: 11, marginTop: 4 },
});
