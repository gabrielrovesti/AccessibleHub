# AccessibleHub

<div align="center">

<img src="my-app/assets/images/icon.png" alt="AccessibleHub Logo" width="120"/>

**A comprehensive toolkit for implementing accessibility in React Native**

[![React Native](https://img.shields.io/badge/React%20Native-v0.73-blue.svg)](https://reactnative.dev/)
[![WCAG 2.2](https://img.shields.io/badge/WCAG-2.2-green.svg)](https://www.w3.org/TR/WCAG22/)
[![Expo](https://img.shields.io/badge/Expo-SDK-lightgrey.svg)](https://expo.dev/)

</div>

---

## 📱 Overview

**AccessibleHub** is a React Native application designed to **teach**, **demonstrate**, and **implement** best practices in mobile accessibility. It complies with **WCAG 2.2** and provides practical tools and examples for developers of all levels.

### 🎯 Goals

- **Educate** developers on mobile accessibility
- **Demonstrate** WCAG principles in a React Native context
- **Compare** frameworks (React Native vs Flutter) in terms of accessibility
- **Provide** reusable and accessible component examples

---

## 📋 Features

### ✅ Accessible Components
- **Buttons & Touchables**: Size, semantics, haptics
- **Modals**: Focus management and screen reader support
- **Forms**: Labels, roles, validation, date/time inputs
- **Media**: Alt text, descriptions for assistive tech
- **Advanced UI**: Tabs, sliders, alerts, progress indicators

### 🧩 Best Practices
- **WCAG 2.2 compliance**: Practical mobile examples
- **Gesture support**: For screen reader users
- **Reader optimization**: VoiceOver and TalkBack
- **Semantic hierarchy**: Headings, regions, landmarks
- **Focus & Navigation**: Logical flow for all inputs

---

## 🛠️ Stack

- `React Native` + `Expo Router`
- `TypeScript` for type safety
- `Context API` for global state
- Accessibility via `AccessibilityInfo`, `accessibilityRole`, etc.

---

## 🚀 Getting Started

### ✅ Requirements
- Node.js (LTS)
- Expo CLI
- Android/iOS environment (for builds)

### ⚙️ Setup

```bash
# Clone
git clone https://github.com/your-username/AccessibleHub.git
cd AccessibleHub/my-app

# Install dependencies
npm install # or yarn install

# Log into Expo
npm install -g expo-cli
npx expo login
```

### ▶️ Run the App

```bash
cd my-app
npx expo start
```

- Recommended for Android: run on an **Android Virtual Device** or **Pixel 7**
- Verified with **TalkBack** on **Android 14** and **15**

---

## 🔨 Building (Android Only)

Expo requires **local builds** on Windows via WSL. Use:

```bash
eas build --platform android --local
```

> ⚠️ This is **mandatory** when building from WSL.

### 🧪 Build Variants

```bash
# AAB (for Play Store)
eas build --platform android --local

# APK (for testing)
eas build --platform android --profile preview --local
```

You must configure `eas.json` to include the `preview` profile.

---

## 🧪 Accessibility Testing

### Screen Reader Activation
- **TalkBack** (Android): Settings → Accessibility → TalkBack
- **VoiceOver** (iOS): Settings → Accessibility → VoiceOver
- Shortcuts: triple-click Home (iOS), or assign shortcut (Android)

### Terminal Commands for TalkBack
```bash
# Disable
adb shell settings put secure enabled_accessibility_services com.android.talkback/com.google.android.marvin.talkback.TalkBackService

# Enable
adb shell settings put secure enabled_accessibility_services com.google.android.marvin.talkback/com.google.android.marvin.talkback.TalkBackService
```

### Manual Accessibility Checks
- Labels, roles, hints
- Contrast & visibility
- Focus flow
- Screen reader support
- Performance profiling with React DevTools

---

## 🤝 Contributing

1. Fork and create a feature branch
2. Implement with accessibility in mind
3. Open a Pull Request
4. Ensure WCAG compliance and include related tests

---

## 📚 Resources

- [WCAG 2.2 – W3C](https://www.w3.org/TR/WCAG22/)
- [React Native Accessibility](https://reactnative.dev/docs/accessibility)
- [Expo Documentation](https://docs.expo.dev/)
- [MDN Web Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for details.

---

<div align="center">
<b>AccessibleHub: Empower Development, Enable Accessibility.</b>
</div>

---