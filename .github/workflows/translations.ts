// src/translations.ts
// All 4 language translations for CallGuard

export type LangCode = 'en' | 'kn' | 'hi' | 'mr';

export interface Preset {
  id: string;
  label: string;
  icon: string;
  msg: string;
}

export interface CallLogEntry {
  id: string;
  name: string;
  time: string;
}

export interface Translation {
  name: string;
  flag: string;
  appName: string;
  guardingCalls: string;
  readyToGuard: string;
  vipsCanReach: (n: number) => string;
  activateToFilter: string;
  activate: string;
  deactivate: string;
  runningSince: string;
  vipContacts: string;
  callsDeflected: string;
  voiceMessage: string;
  recorded: string;
  notSet: string;
  play: string;
  stop: string;
  reRecord: string;
  quickModes: string;
  recentActivity: string;
  voicemailSent: string;
  connected: string;
  vipContactsTitle: string;
  vipContactsDesc: string;
  searchContacts: string;
  selected: (n: number, t: number) => string;
  clearAll: string;
  selectAll: string;
  voiceMessageTitle: string;
  voiceMessageDesc: string;
  usePreset: string;
  customText: string;
  typeMessage: string;
  textToSpeech: string;
  recordVoice: string;
  recStatus: (t: number) => string;
  recordingSaved: string;
  tapToRecord: string;
  preview: string;
  delete: string;
  saveGoBack: string;
  settings: string;
  settingsDesc: string;
  howItWorks: string;
  howItWorksSteps: string[];
  granted: string;
  required: string;
  language: string;
  home: string;
  vips: string;
  message: string;
  presets: Preset[];
  defaultMsg: string;
  callLog: CallLogEntry[];
}

export const TRANSLATIONS: Record<LangCode, Translation> = {
  en: {
    name: 'English',
    flag: '🇬🇧',
    appName: 'CALL GUARD',
    guardingCalls: '🛡️ Guarding calls',
    readyToGuard: 'Ready to guard',
    vipsCanReach: (n) => `${n} VIPs can reach you`,
    activateToFilter: 'Activate to filter incoming calls',
    activate: 'ACTIVATE GUARD MODE',
    deactivate: 'TAP TO DEACTIVATE',
    runningSince: 'Running since just now',
    vipContacts: 'VIP contacts',
    callsDeflected: 'Calls deflected',
    voiceMessage: 'VOICE MESSAGE',
    recorded: '● Recorded',
    notSet: 'Not set',
    play: '▶ Play',
    stop: '⏹ Stop',
    reRecord: '🎤 Re-record',
    quickModes: 'QUICK MODES',
    recentActivity: 'RECENT ACTIVITY',
    voicemailSent: '🔊 Voicemail sent',
    connected: '📞 Connected',
    vipContactsTitle: 'VIP Contacts',
    vipContactsDesc: 'These people can always reach you',
    searchContacts: 'Search contacts…',
    selected: (n, t) => `${n} of ${t} selected`,
    clearAll: 'Clear all',
    selectAll: 'Select all',
    voiceMessageTitle: 'Voice Message',
    voiceMessageDesc: 'Non-VIP callers will hear this message',
    usePreset: 'USE A PRESET',
    customText: 'CUSTOM TEXT MESSAGE',
    typeMessage: 'Type your message…',
    textToSpeech: 'This text will be converted to speech and played to callers.',
    recordVoice: 'OR RECORD YOUR VOICE',
    recStatus: (t) => `● REC  ${t}s / 30s`,
    recordingSaved: '✓ Recording saved',
    tapToRecord: 'Tap to record',
    preview: '▶ Preview',
    delete: '🗑 Delete',
    saveGoBack: 'Save & Go Back',
    settings: 'Settings',
    settingsDesc: 'Permissions & advanced options',
    howItWorks: 'HOW IT WORKS',
    howItWorksSteps: [
      'CallGuard detects incoming calls using Android\'s CallScreeningService.',
      'VIP contacts ring your phone normally.',
      'All other callers automatically hear your recorded voice message.',
      'Deflected calls are logged with caller info.',
      'No internet needed — runs fully on-device.',
    ],
    granted: 'Granted',
    required: 'Required',
    language: 'LANGUAGE',
    home: 'Home',
    vips: 'VIPs',
    message: 'Message',
    presets: [
      { id: 'work', label: 'Work Mode', icon: '💼', msg: "I'm in a work call, will call back soon." },
      { id: 'sleep', label: 'Sleep Mode', icon: '🌙', msg: "I'm sleeping. Please leave a message." },
      { id: 'drive', label: 'Driving', icon: '🚗', msg: "I'm driving, can't pick up. Call you back!" },
      { id: 'custom', label: 'Custom', icon: '✏️', msg: '' },
    ],
    defaultMsg: 'Father is busy, please call back later.',
    callLog: [
      { id: '1', name: 'Unknown', time: '2 min ago' },
      { id: '2', name: 'Rahul', time: '15 min ago' },
      { id: '3', name: 'Mom', time: '1 hr ago' },
    ],
  },

  kn: {
    name: 'ಕನ್ನಡ',
    flag: '🇮🇳',
    appName: 'ಕಾಲ್ ಗಾರ್ಡ್',
    guardingCalls: '🛡️ ಕರೆಗಳನ್ನು ರಕ್ಷಿಸಲಾಗುತ್ತಿದೆ',
    readyToGuard: 'ರಕ್ಷಿಸಲು ಸಿದ್ಧ',
    vipsCanReach: (n) => `${n} VIP ಜನರು ನಿಮ್ಮನ್ನು ತಲುಪಬಹುದು`,
    activateToFilter: 'ಒಳಬರುವ ಕರೆಗಳನ್ನು ಫಿಲ್ಟರ್ ಮಾಡಲು ಸಕ್ರಿಯಗೊಳಿಸಿ',
    activate: 'ಗಾರ್ಡ್ ಮೋಡ್ ಸಕ್ರಿಯಗೊಳಿಸಿ',
    deactivate: 'ನಿಷ್ಕ್ರಿಯಗೊಳಿಸಲು ಒತ್ತಿ',
    runningSince: 'ಈಗ ಚಾಲನೆಯಲ್ಲಿದೆ',
    vipContacts: 'VIP ಸಂಪರ್ಕಗಳು',
    callsDeflected: 'ತಿರಸ್ಕರಿಸಿದ ಕರೆಗಳು',
    voiceMessage: 'ಧ್ವನಿ ಸಂದೇಶ',
    recorded: '● ರೆಕಾರ್ಡ್ ಆಗಿದೆ',
    notSet: 'ಹೊಂದಿಸಲಾಗಿಲ್ಲ',
    play: '▶ ಪ್ಲೇ',
    stop: '⏹ ನಿಲ್ಲಿಸಿ',
    reRecord: '🎤 ಮತ್ತೆ ರೆಕಾರ್ಡ್',
    quickModes: 'ತ್ವರಿತ ಮೋಡ್‌ಗಳು',
    recentActivity: 'ಇತ್ತೀಚಿನ ಚಟುವಟಿಕೆ',
    voicemailSent: '🔊 ವಾಯ್ಸ್‌ಮೇಲ್ ಕಳುಹಿಸಲಾಗಿದೆ',
    connected: '📞 ಸಂಪರ್ಕವಾಯಿತು',
    vipContactsTitle: 'VIP ಸಂಪರ್ಕಗಳು',
    vipContactsDesc: 'ಈ ಜನರು ಯಾವಾಗಲೂ ನಿಮ್ಮನ್ನು ತಲುಪಬಹುದು',
    searchContacts: 'ಸಂಪರ್ಕಗಳನ್ನು ಹುಡುಕಿ…',
    selected: (n, t) => `${t} ರಲ್ಲಿ ${n} ಆಯ್ಕೆ`,
    clearAll: 'ಎಲ್ಲ ತೆಗೆ',
    selectAll: 'ಎಲ್ಲ ಆಯ್ಕೆ',
    voiceMessageTitle: 'ಧ್ವನಿ ಸಂದೇಶ',
    voiceMessageDesc: 'VIP ಅಲ್ಲದ ಕರೆ ಮಾಡುವವರು ಈ ಸಂದೇಶ ಕೇಳುತ್ತಾರೆ',
    usePreset: 'ಮೊದಲೇ ನಿರ್ಧರಿಸಿದ ಸಂದೇಶ ಬಳಸಿ',
    customText: 'ಕಸ್ಟಮ್ ಪಠ್ಯ ಸಂದೇಶ',
    typeMessage: 'ನಿಮ್ಮ ಸಂದೇಶ ಟೈಪ್ ಮಾಡಿ…',
    textToSpeech: 'ಈ ಪಠ್ಯವನ್ನು ಧ್ವನಿಯಾಗಿ ಪರಿವರ್ತಿಸಿ ಕರೆ ಮಾಡುವವರಿಗೆ ಪ್ಲೇ ಮಾಡಲಾಗುತ್ತದೆ.',
    recordVoice: 'ಅಥವಾ ನಿಮ್ಮ ಧ್ವನಿ ರೆಕಾರ್ಡ್ ಮಾಡಿ',
    recStatus: (t) => `● ರೆಕ್  ${t}ಸೆ / 30ಸೆ`,
    recordingSaved: '✓ ರೆಕಾರ್ಡಿಂಗ್ ಉಳಿಸಲಾಗಿದೆ',
    tapToRecord: 'ರೆಕಾರ್ಡ್ ಮಾಡಲು ಒತ್ತಿ',
    preview: '▶ ಪೂರ್ವ ವೀಕ್ಷಣೆ',
    delete: '🗑 ಅಳಿಸಿ',
    saveGoBack: 'ಉಳಿಸಿ ಮತ್ತು ಹಿಂದೆ ಹೋಗಿ',
    settings: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    settingsDesc: 'ಅನುಮತಿಗಳು ಮತ್ತು ಸುಧಾರಿತ ಆಯ್ಕೆಗಳು',
    howItWorks: 'ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ',
    howItWorksSteps: [
      'CallGuard Android ನ CallScreeningService ಬಳಸಿ ಒಳಬರುವ ಕರೆಗಳನ್ನು ಪತ್ತೆಹಚ್ಚುತ್ತದೆ.',
      'VIP ಸಂಪರ್ಕಗಳ ಕರೆ ಸಾಮಾನ್ಯವಾಗಿ ರಿಂಗ್ ಆಗುತ್ತದೆ.',
      'ಉಳಿದ ಎಲ್ಲರಿಗೂ ನಿಮ್ಮ ರೆಕಾರ್ಡ್ ಮಾಡಿದ ಧ್ವನಿ ಸಂದೇಶ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಪ್ಲೇ ಆಗುತ್ತದೆ.',
      'ತಿರಸ್ಕರಿಸಿದ ಕರೆಗಳನ್ನು ಲಾಗ್ ಮಾಡಲಾಗುತ್ತದೆ.',
      'ಇಂಟರ್ನೆಟ್ ಅಗತ್ಯವಿಲ್ಲ — ಸಾಧನದಲ್ಲೇ ಚಾಲನೆ.',
    ],
    granted: 'ಮಂಜೂರು',
    required: 'ಅಗತ್ಯ',
    language: 'ಭಾಷೆ',
    home: 'ಮುಖ್ಯ',
    vips: 'VIPs',
    message: 'ಸಂದೇಶ',
    presets: [
      { id: 'work', label: 'ಕೆಲಸ ಮೋಡ್', icon: '💼', msg: 'ನಾನು ಕೆಲಸದ ಕರೆಯಲ್ಲಿದ್ದೇನೆ, ಸ್ವಲ್ಪ ಸಮಯದ ನಂತರ ಕರೆ ಮಾಡುತ್ತೇನೆ.' },
      { id: 'sleep', label: 'ನಿದ್ರೆ ಮೋಡ್', icon: '🌙', msg: 'ನಾನು ನಿದ್ರಿಸುತ್ತಿದ್ದೇನೆ. ದಯವಿಟ್ಟು ಸಂದೇಶ ಬಿಡಿ.' },
      { id: 'drive', label: 'ಡ್ರೈವಿಂಗ್', icon: '🚗', msg: 'ನಾನು ಗಾಡಿ ಓಡಿಸುತ್ತಿದ್ದೇನೆ, ನಂತರ ಕರೆ ಮಾಡುತ್ತೇನೆ!' },
      { id: 'custom', label: 'ಕಸ್ಟಮ್', icon: '✏️', msg: '' },
    ],
    defaultMsg: 'ಅಪ್ಪ ಕೆಲಸದಲ್ಲಿ ಬ್ಯುಸಿ ಇದ್ದಾರೆ, ನಂತರ ಕರೆ ಮಾಡಿ.',
    callLog: [
      { id: '1', name: 'ಅಪರಿಚಿತ', time: '2 ನಿ ಹಿಂದೆ' },
      { id: '2', name: 'ರಾಹುಲ್', time: '15 ನಿ ಹಿಂದೆ' },
      { id: '3', name: 'ಅಮ್ಮ', time: '1 ಗಂ ಹಿಂದೆ' },
    ],
  },

  hi: {
    name: 'हिंदी',
    flag: '🇮🇳',
    appName: 'कॉल गार्ड',
    guardingCalls: '🛡️ कॉल्स की सुरक्षा हो रही है',
    readyToGuard: 'सुरक्षा के लिए तैयार',
    vipsCanReach: (n) => `${n} VIP लोग आपसे संपर्क कर सकते हैं`,
    activateToFilter: 'आने वाली कॉल्स फ़िल्टर करने के लिए चालू करें',
    activate: 'गार्ड मोड चालू करें',
    deactivate: 'बंद करने के लिए दबाएं',
    runningSince: 'अभी से चल रहा है',
    vipContacts: 'VIP संपर्क',
    callsDeflected: 'रोकी गई कॉल्स',
    voiceMessage: 'वॉइस संदेश',
    recorded: '● रिकॉर्ड हो गया',
    notSet: 'सेट नहीं है',
    play: '▶ चलाएं',
    stop: '⏹ रोकें',
    reRecord: '🎤 फिर रिकॉर्ड करें',
    quickModes: 'त्वरित मोड',
    recentActivity: 'हाल की गतिविधि',
    voicemailSent: '🔊 वॉइसमेल भेजा गया',
    connected: '📞 जुड़ गया',
    vipContactsTitle: 'VIP संपर्क',
    vipContactsDesc: 'ये लोग हमेशा आपसे संपर्क कर सकते हैं',
    searchContacts: 'संपर्क खोजें…',
    selected: (n, t) => `${t} में से ${n} चुने गए`,
    clearAll: 'सब हटाएं',
    selectAll: 'सब चुनें',
    voiceMessageTitle: 'वॉइस संदेश',
    voiceMessageDesc: 'VIP नहीं होने वाले कॉलर्स यह संदेश सुनेंगे',
    usePreset: 'तैयार संदेश इस्तेमाल करें',
    customText: 'कस्टम टेक्स्ट संदेश',
    typeMessage: 'अपना संदेश टाइप करें…',
    textToSpeech: 'यह टेक्स्ट स्पीच में बदलकर कॉलर को सुनाया जाएगा।',
    recordVoice: 'या अपनी आवाज़ रिकॉर्ड करें',
    recStatus: (t) => `● रेक  ${t}से / 30से`,
    recordingSaved: '✓ रिकॉर्डिंग सहेजी गई',
    tapToRecord: 'रिकॉर्ड करने के लिए दबाएं',
    preview: '▶ सुनें',
    delete: '🗑 हटाएं',
    saveGoBack: 'सहेजें और वापस जाएं',
    settings: 'सेटिंग्स',
    settingsDesc: 'अनुमतियां और उन्नत विकल्प',
    howItWorks: 'यह कैसे काम करता है',
    howItWorksSteps: [
      'CallGuard Android के CallScreeningService से आने वाली कॉल्स पकड़ता है।',
      'VIP संपर्कों की कॉल सामान्य रूप से बजती है।',
      'बाकी सभी को आपका रिकॉर्ड किया संदेश अपने आप सुनाया जाता है।',
      'रोकी गई कॉल्स का लॉग रखा जाता है।',
      'इंटरनेट की जरूरत नहीं — पूरी तरह डिवाइस पर चलता है।',
    ],
    granted: 'मंजूर',
    required: 'जरूरी',
    language: 'भाषा',
    home: 'होम',
    vips: 'VIPs',
    message: 'संदेश',
    presets: [
      { id: 'work', label: 'काम मोड', icon: '💼', msg: 'मैं काम की कॉल पर हूँ, जल्द वापस कॉल करूंगा।' },
      { id: 'sleep', label: 'नींद मोड', icon: '🌙', msg: 'मैं सो रहा हूँ। कृपया संदेश छोड़ें।' },
      { id: 'drive', label: 'गाड़ी चला रहा हूँ', icon: '🚗', msg: 'मैं गाड़ी चला रहा हूँ, बाद में कॉल करूंगा!' },
      { id: 'custom', label: 'कस्टम', icon: '✏️', msg: '' },
    ],
    defaultMsg: 'पिताजी काम में व्यस्त हैं, बाद में कॉल करें।',
    callLog: [
      { id: '1', name: 'अज्ञात', time: '2 मिनट पहले' },
      { id: '2', name: 'राहुल', time: '15 मिनट पहले' },
      { id: '3', name: 'माँ', time: '1 घंटा पहले' },
    ],
  },

  mr: {
    name: 'मराठी',
    flag: '🇮🇳',
    appName: 'कॉल गार्ड',
    guardingCalls: '🛡️ कॉल्स संरक्षित होत आहेत',
    readyToGuard: 'संरक्षणासाठी तयार',
    vipsCanReach: (n) => `${n} VIP लोक तुमच्याशी संपर्क करू शकतात`,
    activateToFilter: 'येणाऱ्या कॉल्स फिल्टर करण्यासाठी चालू करा',
    activate: 'गार्ड मोड चालू करा',
    deactivate: 'बंद करण्यासाठी दाबा',
    runningSince: 'आत्ता सुरू झाले',
    vipContacts: 'VIP संपर्क',
    callsDeflected: 'थांबवलेले कॉल्स',
    voiceMessage: 'ध्वनी संदेश',
    recorded: '● रेकॉर्ड झाले',
    notSet: 'सेट केलेले नाही',
    play: '▶ वाजवा',
    stop: '⏹ थांबवा',
    reRecord: '🎤 पुन्हा रेकॉर्ड करा',
    quickModes: 'जलद मोड',
    recentActivity: 'अलीकडील क्रियाकलाप',
    voicemailSent: '🔊 व्हॉइसमेल पाठवले',
    connected: '📞 जोडले गेले',
    vipContactsTitle: 'VIP संपर्क',
    vipContactsDesc: 'हे लोक नेहमी तुमच्याशी संपर्क करू शकतात',
    searchContacts: 'संपर्क शोधा…',
    selected: (n, t) => `${t} पैकी ${n} निवडलेले`,
    clearAll: 'सर्व काढा',
    selectAll: 'सर्व निवडा',
    voiceMessageTitle: 'ध्वनी संदेश',
    voiceMessageDesc: 'VIP नसलेल्या कॉलर्सना हा संदेश ऐकू येईल',
    usePreset: 'तयार संदेश वापरा',
    customText: 'सानुकूल मजकूर संदेश',
    typeMessage: 'तुमचा संदेश टाइप करा…',
    textToSpeech: 'हा मजकूर बोलीभाषेत बदलून कॉलर्सना ऐकवला जाईल.',
    recordVoice: 'किंवा तुमचा आवाज रेकॉर्ड करा',
    recStatus: (t) => `● रेक  ${t}से / 30से`,
    recordingSaved: '✓ रेकॉर्डिंग जतन केली',
    tapToRecord: 'रेकॉर्ड करण्यासाठी दाबा',
    preview: '▶ ऐका',
    delete: '🗑 हटवा',
    saveGoBack: 'जतन करा आणि मागे जा',
    settings: 'सेटिंग्ज',
    settingsDesc: 'परवानग्या आणि प्रगत पर्याय',
    howItWorks: 'हे कसे काम करते',
    howItWorksSteps: [
      'CallGuard Android च्या CallScreeningService वापरून येणारे कॉल्स शोधतो.',
      'VIP संपर्कांचे कॉल्स सामान्यपणे वाजतात.',
      'इतर सर्वांना तुमचा रेकॉर्ड केलेला संदेश आपोआप ऐकवला जातो.',
      'थांबवलेल्या कॉल्सची नोंद ठेवली जाते.',
      'इंटरनेट लागत नाही — पूर्णपणे डिव्हाइसवर चालते.',
    ],
    granted: 'मंजूर',
    required: 'आवश्यक',
    language: 'भाषा',
    home: 'मुख्यपृष्ठ',
    vips: 'VIPs',
    message: 'संदेश',
    presets: [
      { id: 'work', label: 'काम मोड', icon: '💼', msg: 'मी कामाच्या कॉलवर आहे, लवकरच परत कॉल करतो.' },
      { id: 'sleep', label: 'झोप मोड', icon: '🌙', msg: 'मी झोपत आहे. कृपया संदेश सोडा.' },
      { id: 'drive', label: 'गाडी चालवत आहे', icon: '🚗', msg: 'मी गाडी चालवत आहे, नंतर कॉल करतो!' },
      { id: 'custom', label: 'सानुकूल', icon: '✏️', msg: '' },
    ],
    defaultMsg: 'बाबा कामात व्यस्त आहेत, नंतर फोन करा.',
    callLog: [
      { id: '1', name: 'अज्ञात', time: '२ मिनिटांपूर्वी' },
      { id: '2', name: 'राहुल', time: '१५ मिनिटांपूर्वी' },
      { id: '3', name: 'आई', time: '१ तासापूर्वी' },
    ],
  },
};
