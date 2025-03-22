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

**AccessibleHub** is a comprehensive educational tool designed to teach, demonstrate, and implement accessibility best practices in React Native applications. Built according to WCAG 2.2 guidelines, it offers practical examples and tools to help developers create more inclusive mobile experiences.

### 🎯 Goals

- **Educate** developers on mobile accessibility concepts and standards
- **Demonstrate** WCAG 2.2 principles in a React Native context
- **Compare** accessibility implementations across frameworks (React Native vs Flutter)
- **Provide** reusable, accessible component patterns

---

## 📋 Features

### ✅ Accessible Components
- **Buttons & Touchables**: Proper sizing, semantic roles, haptic feedback
- **Form Controls**: Labels, validation, error states, date/time pickers
- **Media Content**: Alternative text and proper descriptions
- **Dialog Windows**: Focus management and accessible modals
- **Advanced UI**: Tabs, sliders, progress indicators, alerts

### 🧩 Best Practices
- **Semantic Structure**: Proper heading hierarchy and content organization
- **Screen Reader Optimization**: VoiceOver and TalkBack support
- **Gesture Support**: Comprehensive gesture tutorial and examples
- **Navigation & Focus**: Logical focus order and keyboard navigation
- **WCAG 2.2 Guidelines**: Implementation examples for mobile contexts

### 🔍 Developer Tools
- **Framework Comparison**: React Native vs Flutter accessibility features
- **Mobile Testing Tools**: Resources for validating accessibility
- **Community Resources**: Links to accessibility projects and documentation

---

## 🛠️ TalkBack Gestures Reference

### Basic Navigation
- **Single tap**: Select an item
- **Double tap**: Activate selected item
- **Swipe right**: Move to next item
- **Swipe left**: Move to previous item
- **Swipe up then down**: Open reading controls 
- **Swipe down then right**: Open TalkBack menu

### Reading Controls
- **Two-finger tap**: Pause/resume reading
- **Two-finger triple tap**: Start reading from next item
- **Two-finger swipe up/down/left/right**: Scroll content

### System Navigation
- **Swipe up, then left**: Go to home screen
- **Swipe down, then left**: Go back
- **Swipe left, then up**: Open recent apps
- **Swipe right, then down**: Open notifications

### Advanced Controls
- **Three-finger tap** (on supported devices): Open TalkBack menu
- **Three-finger swipe left/right** (on supported devices): Cycle through reading controls
- **Swipe right then up, speak command**: Voice commands (TalkBack 9.1+)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (LTS version)
- Expo CLI
- For building: Windows with WSL or macOS

### Installation

```bash
# Clone the repository
git clone https://github.com/gabrielrovesti/AccessibleHub.git
cd AccessibleHub/my-app

# Install dependencies
npm install

# Start the development server
npx expo start
```

---

## 📦 Building for Android (Windows/WSL)

### 1. Set Up WSL Environment

```bash
# Install WSL (in PowerShell as Administrator)
wsl --install

# After restart, install Ubuntu from Microsoft Store
# Then set up development environment in WSL:

# Install essential tools
sudo apt install curl
sudo apt install openjdk-17-jdk-headless

# Install Node.js via NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install --lts

# Install Gradle
wget https://services.gradle.org/distributions/gradle-8.5-bin.zip -P /tmp
sudo mkdir /opt/gradle
sudo unzip -d /opt/gradle /tmp/gradle-8.5-bin.zip
```

### 2. Configure Environment Variables

Add to your `~/.bashrc`:

```bash
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
export ANDROID_HOME=$HOME/android
export ANDROID_SDK_ROOT=${ANDROID_HOME}
export PATH=$PATH:/opt/gradle/gradle-8.5/bin:${ANDROID_HOME}/cmdline-tools/latest/bin:${ANDROID_HOME}/platform-tools:${ANDROID_HOME}/tools:${ANDROID_HOME}/tools/bin
source ~/.bashrc
```

### 3. Building the App

```bash
# Install EAS CLI
npm install -g eas-cli

# Navigate to your project
cd /mnt/c/YourProjectPath

# Initialize EAS
eas init

# Configure build
eas build:configure

# Create eas.json or modify to include:
# {
#   "build": {
#     "preview": {
#       "android": {
#         "buildType": "apk"
#       }
#     }
#   }
# }

# Build APK locally
eas build --platform android --profile preview --local
```

---

## 🧪 Accessibility Testing

### Screen Reader Activation
- **TalkBack** (Android): Settings → Accessibility → TalkBack
- **VoiceOver** (iOS): Settings → Accessibility → VoiceOver

### Terminal Commands for TalkBack
```bash
# Enable TalkBack
adb shell settings put secure enabled_accessibility_services com.google.android.marvin.talkback/com.google.android.marvin.talkback.TalkBackService

# Disable TalkBack
adb shell settings put secure enabled_accessibility_services com.android.talkback/com.google.android.marvin.talkback.TalkBackService
```

### Testing Checklist
- Labels, roles, and hints
- Focus order and navigation
- Color contrast
- Text sizing
- Touch target size
- Screen reader announcement clarity

---

## 🔧 Troubleshooting

### Common Issues

1. **Missing Gradle configuration**:
    - Check Android SDK path in environment variables

2. **Build fails in WSL**:
    - Run `wsl --shutdown` and restart
    - Ensure environment variables are set correctly

3. **EAS Build Issues**:
    - Ensure you're logged in with `eas login`
    - Verify eas.json configuration is correct

### Emergency Reset
```bash
# Delete node_modules and reinstall
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install --legacy-peer-deps
```

---

## 📚 Resources

- [WCAG 2.2 – W3C](https://www.w3.org/TR/WCAG22/)
- [React Native Accessibility](https://reactnative.dev/docs/accessibility)
- [Expo Documentation](https://docs.expo.dev/)
- [TalkBack Gestures Documentation](https://dequeuniversity.com/screenreaders/talkback-shortcuts)

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for details.

---

<div align="center">
<b>AccessibleHub: Empower Development, Enable Accessibility.</b>
</div>
