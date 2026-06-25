// src/hooks/useCallGuard.ts
//
// This hook connects your React Native UI to the native Android code.
// Use this in any screen to control call guard behavior.

import { useEffect, useState, useCallback } from 'react';
import { NativeModules, Platform, Alert, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { CallGuard } = NativeModules;

// Fallback for when running in dev without native module
const CallGuardNative = CallGuard || {
  setGuardActive: async () => true,
  isGuardActive: async () => false,
  setVipNumbers: async () => true,
  setVoiceMessageText: async () => true,
  setRecordingPath: async () => true,
  isDefaultDialer: async () => false,
  requestDefaultDialer: async () => true,
  getCallLog: async () => '[]',
};

export interface CallLogItem {
  id: string;
  number: string;
  name: string;
  time: number;
  deflected: boolean;
}

export function useCallGuard() {
  const [isActive, setIsActiveState] = useState(false);
  const [isDefaultDialer, setIsDefaultDialer] = useState(false);
  const [callLog, setCallLog] = useState<CallLogItem[]>([]);

  // Load initial state
  useEffect(() => {
    (async () => {
      try {
        const active = await CallGuardNative.isGuardActive();
        setIsActiveState(active);
        const defaultDialer = await CallGuardNative.isDefaultDialer();
        setIsDefaultDialer(defaultDialer);
        const logJson = await CallGuardNative.getCallLog();
        setCallLog(JSON.parse(logJson));
      } catch (e) {
        console.log('CallGuard native module not available (dev mode)');
      }
    })();
  }, []);

  // Toggle guard on/off
  const setGuardActive = useCallback(async (active: boolean) => {
    if (active && !isDefaultDialer) {
      Alert.alert(
        'Setup Required',
        'CallGuard needs to be set as your default Phone app for call screening to work.',
        [
          { text: 'Later', style: 'cancel' },
          {
            text: 'Set Now',
            onPress: async () => {
              await CallGuardNative.requestDefaultDialer();
            },
          },
        ]
      );
      return;
    }
    try {
      await CallGuardNative.setGuardActive(active);
      setIsActiveState(active);
      // Persist to AsyncStorage as backup
      await AsyncStorage.setItem('guard_active', active ? '1' : '0');
    } catch (e) {
      console.error('Failed to set guard active:', e);
    }
  }, [isDefaultDialer]);

  // Update VIP contacts (pass array of phone numbers)
  const updateVipNumbers = useCallback(async (numbers: string[]) => {
    try {
      await CallGuardNative.setVipNumbers(numbers);
      await AsyncStorage.setItem('vip_numbers', JSON.stringify(numbers));
    } catch (e) {
      console.error('Failed to set VIP numbers:', e);
    }
  }, []);

  // Update the text voice message
  const updateVoiceMessage = useCallback(async (message: string) => {
    try {
      await CallGuardNative.setVoiceMessageText(message);
      await AsyncStorage.setItem('voice_message', message);
    } catch (e) {
      console.error('Failed to set voice message:', e);
    }
  }, []);

  // Update the recorded audio file path
  const updateRecordingPath = useCallback(async (path: string) => {
    try {
      await CallGuardNative.setRecordingPath(path);
      await AsyncStorage.setItem('recording_path', path);
    } catch (e) {
      console.error('Failed to set recording path:', e);
    }
  }, []);

  // Reload call log from native
  const refreshCallLog = useCallback(async () => {
    try {
      const logJson = await CallGuardNative.getCallLog();
      setCallLog(JSON.parse(logJson));
    } catch (e) {
      console.error('Failed to get call log:', e);
    }
  }, []);

  return {
    isActive,
    isDefaultDialer,
    callLog,
    setGuardActive,
    updateVipNumbers,
    updateVoiceMessage,
    updateRecordingPath,
    refreshCallLog,
  };
}
