// src/screens/ContactsScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, FlatList,
  TextInput, StyleSheet, Alert, Platform,
} from 'react-native';
import { TRANSLATIONS, LangCode } from '../translations';

// In real app, this comes from react-native-contacts
// For now we use mock data that shows the concept
const MOCK_CONTACTS = [
  { id: '1', name: 'Mom / ಅಮ್ಮ / माँ / आई', phone: '+91 98765-01001', avatar: '👩' },
  { id: '2', name: 'Dad / ಅಪ್ಪ / पिताजी / बाबा', phone: '+91 98765-01002', avatar: '👨' },
  { id: '3', name: 'Wife', phone: '+91 98765-01003', avatar: '👩‍🦰' },
  { id: '4', name: 'Boss', phone: '+91 98765-01004', avatar: '👔' },
  { id: '5', name: 'Doctor', phone: '+91 98765-01005', avatar: '🏥' },
  { id: '6', name: 'Rahul', phone: '+91 98765-01006', avatar: '🧑' },
  { id: '7', name: 'Priya', phone: '+91 98765-01007', avatar: '👱' },
  { id: '8', name: 'Office', phone: '+91 98765-01008', avatar: '🏢' },
];

interface Props {
  lang: LangCode;
  selectedContacts: string[];
  setSelectedContacts: (v: string[]) => void;
}

export default function ContactsScreen({ lang, selectedContacts, setSelectedContacts }: Props) {
  const t = TRANSLATIONS[lang];
  const [search, setSearch] = useState('');

  const filtered = MOCK_CONTACTS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  const toggle = (id: string) => {
    setSelectedContacts(
      selectedContacts.includes(id)
        ? selectedContacts.filter(c => c !== id)
        : [...selectedContacts, id]
    );
  };

  const toggleAll = () => {
    setSelectedContacts(
      selectedContacts.length === MOCK_CONTACTS.length
        ? []
        : MOCK_CONTACTS.map(c => c.id)
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>{t.vipContactsTitle}</Text>
        <Text style={styles.subtext}>{t.vipContactsDesc}</Text>
      </View>

      {/* Search */}
      <View style={styles.searchWrap}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder={t.searchContacts}
          placeholderTextColor="#2a2a3a"
          value={search}
          onChangeText={setSearch}
          autoCorrect={false}
        />
      </View>

      {/* Count + select all */}
      <View style={styles.controlRow}>
        <Text style={styles.countText}>
          {t.selected(selectedContacts.length, MOCK_CONTACTS.length)}
        </Text>
        <TouchableOpacity style={styles.pill} onPress={toggleAll}>
          <Text style={styles.pillText}>
            {selectedContacts.length === MOCK_CONTACTS.length ? t.clearAll : t.selectAll}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => {
          const selected = selectedContacts.includes(item.id);
          return (
            <TouchableOpacity
              style={[styles.contactRow, selected && styles.contactRowSelected]}
              onPress={() => toggle(item.id)}
              activeOpacity={0.75}
            >
              <View style={styles.avatar}>
                <Text style={styles.avatarEmoji}>{item.avatar}</Text>
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.contactPhone}>{item.phone}</Text>
              </View>
              <View style={[styles.checkbox, selected && styles.checkboxSelected]}>
                {selected && <Text style={styles.checkmark}>✓</Text>}
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0f', paddingHorizontal: 20 },
  header: { paddingTop: 16 },
  heading: { color: '#fff', fontSize: 26, fontWeight: '800', marginBottom: 4 },
  subtext: { color: '#555', fontSize: 13, marginBottom: 20 },
  searchWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', borderRadius: 14, paddingHorizontal: 12, marginBottom: 14 },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, color: '#fff', fontSize: 14, paddingVertical: 12 },
  controlRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  countText: { color: '#555', fontSize: 12 },
  pill: { paddingHorizontal: 13, paddingVertical: 6, borderRadius: 100, backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  pillText: { color: '#666', fontSize: 12, fontWeight: '600' },
  contactRow: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 16, marginBottom: 8, backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  contactRowSelected: { backgroundColor: 'rgba(108,99,255,0.1)', borderColor: 'rgba(108,99,255,0.35)' },
  avatar: { width: 42, height: 42, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.06)', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  avatarEmoji: { fontSize: 20 },
  contactInfo: { flex: 1 },
  contactName: { color: '#fff', fontSize: 13, fontWeight: '600' },
  contactPhone: { color: '#444', fontSize: 11, marginTop: 2 },
  checkbox: { width: 22, height: 22, borderRadius: 7, borderWidth: 2, borderColor: '#2a2a3a', alignItems: 'center', justifyContent: 'center' },
  checkboxSelected: { backgroundColor: '#6c63ff', borderColor: '#6c63ff' },
  checkmark: { color: '#fff', fontSize: 13, fontWeight: '700' },
});
