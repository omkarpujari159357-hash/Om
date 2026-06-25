// App.tsx — Entry point for CallGuard
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './src/screens/HomeScreen';
import ContactsScreen from './src/screens/ContactsScreen';
import RecordScreen from './src/screens/RecordScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { TRANSLATIONS, LangCode } from './src/translations';

export default function App() {
  const [screen, setScreen] = useState<'home' | 'contacts' | 'record' | 'settings'>('home');
  const [lang, setLang] = useState<LangCode>('en');
  const [isActive, setIsActive] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<string[]>(['1', '2', '3']);
  const [voiceMessage, setVoiceMessage] = useState(TRANSLATIONS.en.defaultMsg);
  const [hasRecording, setHasRecording] = useState(false);
  const [recordingPath, setRecordingPath] = useState('');

  const t = TRANSLATIONS[lang];

  const screenProps = {
    lang, setLang,
    isActive, setIsActive,
    selectedContacts, setSelectedContacts,
    voiceMessage, setVoiceMessage,
    hasRecording, setHasRecording,
    recordingPath, setRecordingPath,
    navigate: setScreen,
  };

  const renderScreen = () => {
    switch (screen) {
      case 'home': return <HomeScreen {...screenProps} />;
      case 'contacts': return <ContactsScreen {...screenProps} />;
      case 'record': return <RecordScreen {...screenProps} />;
      case 'settings': return <SettingsScreen {...screenProps} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0f" />
      <View style={styles.content}>
        {renderScreen()}
      </View>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        {[
          { id: 'home', icon: '🏠', label: t.home },
          { id: 'contacts', icon: '👥', label: t.vips },
          { id: 'record', icon: '🎤', label: t.message },
          { id: 'settings', icon: '⚙️', label: t.settings },
        ].map((nav) => (
          <TouchableOpacity
            key={nav.id}
            style={styles.navBtn}
            onPress={() => setScreen(nav.id as any)}
          >
            <Text style={styles.navIcon}>{nav.icon}</Text>
            <Text style={[styles.navLabel, screen === nav.id && styles.navLabelActive]}>
              {nav.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0f' },
  content: { flex: 1 },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#111118',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.07)',
    paddingBottom: 8,
    paddingTop: 8,
  },
  navBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  navIcon: { fontSize: 22 },
  navLabel: { fontSize: 10, fontWeight: '600', color: '#444', marginTop: 3 },
  navLabelActive: { color: '#6c63ff' },
});
