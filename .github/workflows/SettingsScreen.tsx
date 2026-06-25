// src/screens/SettingsScreen.tsx
import React from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  StyleSheet, Linking, Alert,
} from 'react-native';
import { TRANSLATIONS, LangCode } from '../translations';

interface Props {
  lang: LangCode;
  setLang: (l: LangCode) => void;
}

const PERMISSIONS = [
  { icon: '📞', title: 'Call Screening', desc: 'Intercept & filter incoming calls', ok: true },
  { icon: '📖', title: 'Read Contacts', desc: 'Access your phonebook', ok: true },
  { icon: '🎤', title: 'Microphone', desc: 'Record voice messages', ok: true },
  { icon: '🔔', title: 'Notifications', desc: 'Show deflected call alerts', ok: true },
  { icon: '♿', title: 'Accessibility', desc: 'Auto-answer & play message', ok: false },
];

export default function SettingsScreen({ lang, setLang }: Props) {
  const t = TRANSLATIONS[lang];

  const openAccessibility = () => {
    Alert.alert(
      'Accessibility Permission',
      'Go to Settings → Accessibility → Installed Services → Enable CallGuard',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Settings', onPress: () => Linking.openSettings() },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.heading}>{t.settings}</Text>
      <Text style={styles.subtext}>{t.settingsDesc}</Text>

      {/* Language */}
      <View style={styles.card}>
        <Text style={styles.sectionLabel}>{t.language}</Text>
        <View style={styles.langGrid}>
          {(Object.keys(TRANSLATIONS) as LangCode[]).map(code => (
            <TouchableOpacity
              key={code}
              style={[styles.langBtn, lang === code && styles.langBtnActive]}
              onPress={() => setLang(code)}
            >
              <Text style={styles.langFlag}>{TRANSLATIONS[code].flag}</Text>
              <Text style={[styles.langName, lang === code && styles.langNameActive]}>
                {TRANSLATIONS[code].name}
              </Text>
              {lang === code && <Text style={styles.langCheck}>✓ Active</Text>}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Permissions */}
      <Text style={[styles.sectionLabel, { marginHorizontal: 0, marginBottom: 10 }]}>
        ANDROID PERMISSIONS
      </Text>
      {PERMISSIONS.map((item, i) => (
        <TouchableOpacity
          key={i}
          style={styles.permCard}
          onPress={!item.ok ? openAccessibility : undefined}
          activeOpacity={item.ok ? 1 : 0.7}
        >
          <Text style={styles.permIcon}>{item.icon}</Text>
          <View style={styles.permInfo}>
            <Text style={styles.permTitle}>{item.title}</Text>
            <Text style={styles.permDesc}>{item.desc}</Text>
          </View>
          <View style={[styles.permTag, item.ok ? styles.tagGreen : styles.tagOrange]}>
            <Text style={[styles.permTagText, { color: item.ok ? '#22c55e' : '#f59e0b' }]}>
              {item.ok ? t.granted : t.required}
            </Text>
          </View>
        </TouchableOpacity>
      ))}

      {/* How it works */}
      <View style={[styles.card, { marginTop: 14 }]}>
        <Text style={styles.sectionLabel}>{t.howItWorks}</Text>
        {t.howItWorksSteps.map((step, i) => (
          <View key={i} style={styles.stepRow}>
            <Text style={styles.stepNum}>{i + 1}.</Text>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </View>

      {/* Default phone app notice */}
      <View style={[styles.card, { marginBottom: 24, backgroundColor: 'rgba(108,99,255,0.08)', borderColor: 'rgba(108,99,255,0.25)' }]}>
        <Text style={styles.sectionLabel}>⚠️ IMPORTANT SETUP STEP</Text>
        <Text style={styles.noticeText}>
          For call screening to work, you must set CallGuard as your default Phone app:
          {'\n\n'}Settings → Apps → Default Apps → Phone App → select CallGuard
        </Text>
        <TouchableOpacity style={styles.openBtn} onPress={() => Linking.openSettings()}>
          <Text style={styles.openBtnText}>Open Phone Settings</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0f', paddingHorizontal: 20 },
  heading: { color: '#fff', fontSize: 26, fontWeight: '800', marginTop: 16, marginBottom: 4 },
  subtext: { color: '#555', fontSize: 13, marginBottom: 20 },
  card: { backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', borderRadius: 20, padding: 18, marginBottom: 14 },
  sectionLabel: { color: '#555', fontSize: 11, fontWeight: '700', letterSpacing: 0.8, marginBottom: 12 },
  langGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  langBtn: { flex: 1, minWidth: '44%', backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', borderRadius: 14, padding: 14, alignItems: 'center', gap: 4 },
  langBtnActive: { backgroundColor: 'rgba(108,99,255,0.15)', borderColor: 'rgba(108,99,255,0.5)' },
  langFlag: { fontSize: 26 },
  langName: { color: '#777', fontSize: 13, fontWeight: '700' },
  langNameActive: { color: '#a78bfa' },
  langCheck: { color: '#6c63ff', fontSize: 10, fontWeight: '600' },
  permCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', borderRadius: 16, padding: 16, marginBottom: 10, gap: 12 },
  permIcon: { fontSize: 22 },
  permInfo: { flex: 1 },
  permTitle: { color: '#fff', fontSize: 14, fontWeight: '600' },
  permDesc: { color: '#555', fontSize: 11, marginTop: 2 },
  permTag: { paddingHorizontal: 9, paddingVertical: 4, borderRadius: 8 },
  tagGreen: { backgroundColor: 'rgba(34,197,94,0.1)' },
  tagOrange: { backgroundColor: 'rgba(245,158,11,0.1)' },
  permTagText: { fontSize: 10, fontWeight: '700' },
  stepRow: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  stepNum: { color: '#6c63ff', fontWeight: '700', fontSize: 12, minWidth: 16 },
  stepText: { flex: 1, color: '#888', fontSize: 12, lineHeight: 18 },
  noticeText: { color: '#999', fontSize: 13, lineHeight: 20, marginBottom: 14 },
  openBtn: { backgroundColor: 'rgba(108,99,255,0.2)', borderRadius: 12, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(108,99,255,0.4)' },
  openBtnText: { color: '#a78bfa', fontSize: 13, fontWeight: '700' },
});
