**# AccessibleHub**

<div align="center">

![AccessibleHub Logo](my-app/app/assets/images/icon.png)

**A comprehensive toolkit for implementing accessibility in React Native**

[![React Native](https://img.shields.io/badge/React%20Native-v0.73-blue.svg)](https://reactnative.dev/)
[![WCAG 2.2](https://img.shields.io/badge/WCAG-2.2-green.svg)](https://www.w3.org/TR/WCAG22/)
[![Expo](https://img.shields.io/badge/Expo-SDK-lightgrey.svg)](https://expo.dev/)

</div>

## 📱 Overview

**AccessibleHub** is a React Native application designed to **teach**, **demonstrate**, and **implement** best practices in mobile accessibility. Built to comply with **WCAG 2.2** standards, this app serves as a comprehensive resource for both beginners and experienced developers.

### 🎯 Main Goals

- **Educate** developers on mobile accessibility techniques
- **Demonstrate** WCAG principles in a React Native context
- **Compare** frameworks (React Native, Flutter) from an accessibility standpoint
- **Provide** ready-to-use code examples and best practices

## 📋 Key Features

### 📚 Accessible Components
- **Buttons & Touchables**: Minimum target size, feedback, and semantics
- **Modal Dialogs**: Focus management, announcements, and keyboard support
- **Form Controls**: Validated forms with labels, roles, and date/time elements
- **Media Content**: Alternative text and descriptions for screen readers
- **Advanced Components**: Tabs, Progress Indicators, Alerts, Sliders

### 🧰 Best Practices
- **WCAG 2.2 Guidelines**: Detailed implementation for mobile
- **Gestures Tutorial**: Gesture support for screen reader users
- **Screen Reader Support**: Optimization guidelines for VoiceOver and TalkBack
- **Semantic Structure**: Building meaningful content hierarchies
- **Navigation & Focus**: Full navigation support and logical focus management

### 🔍 Tools and Resources
- **Mobile Accessibility Tools**: Guides for TalkBack and VoiceOver
- **Framework Comparison**: Analysis of accessibility features
- **Community & Resources**: Links to learning materials

## 🛠️ Tech Stack

- **React Native** + **Expo Router**
- **Context API** for global state and theming
- **TypeScript** for robustness and type safety
- **Accessibility** integrated via `AccessibilityInfo`, `accessibilityRole`, etc.

## 🚀 Installation

### Prerequisites
- Node.js (LTS recommended)
- NPM or Yarn
- Expo CLI
- For builds: properly configured Android/iOS development environment

### Quick Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/AccessibleHub.git
   cd AccessibleHub/my-app
   ```

2. **Install Dependencies**
   ```bash
   # Using npm
   npm install

   # Or using yarn
   yarn install
   ```

3. **Set Up Expo**
   ```bash
   npm install -g expo-cli
   npx expo login
   ```

4. **Start Development**
   ```bash
   npx expo start
   # or
   yarn start
   ```

## 🔨 Build Instructions

### Android Build (Expo EAS)
```bash
# EAS setup (first time)
npm install -g eas-cli
eas build:configure

# Production build
eas build --platform android

# Generate a test APK
eas build --platform android --profile preview
```

### iOS Build (Expo EAS)
```bash
# Requires an Apple Developer account
eas build --platform ios
```

### Local Build on Windows (WSL)

<details>
<summary>Detailed WSL Guide (click to expand)</summary>

#### Prerequisites
- Windows 10/11
- Basic command line knowledge
- Existing Expo/React Native project

#### 1. Install Windows Subsystem for Linux (WSL)
```bash
# Enable WSL
wsl --install

# Update WSL
wsl --update
```

#### 2. Set up the development environment in WSL Ubuntu
```bash
# Install essential tools
sudo apt update
sudo apt upgrade -y
sudo apt install -y curl git unzip

# Install Java Development Kit
sudo apt install -y openjdk-17-jdk-headless

# Install Node.js via NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
source ~/.bashrc
nvm install --lts
npm install -g yarn

# Install Gradle
wget https://services.gradle.org/distributions/gradle-8.5-bin.zip -P /tmp
sudo mkdir -p /opt/gradle
sudo unzip -d /opt/gradle /tmp/gradle-8.5-bin.zip
```

#### 3. Set environment variables
Add the following to your `~/.bashrc`:
```bash
# Java Home
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64

# Android SDK configuration
export ANDROID_HOME=$HOME/android
export ANDROID_SDK_ROOT=${ANDROID_HOME}
export PATH=$PATH:/opt/gradle/gradle-8.5/bin:${ANDROID_HOME}/cmdline-tools/latest/bin:${ANDROID_HOME}/platform-tools:${ANDROID_HOME}/tools:${ANDROID_HOME}/tools/bin

# Reload the updated profile
source ~/.bashrc
```

#### 4. Set up Android SDK and Build Tools
```bash
# Create Android SDK directory
mkdir -p $HOME/android

# Install Android SDK command-line tools
wget https://dl.google.com/android/commandlinetools/commandlinetools-linux-10406996_latest.zip -O /tmp/cmdline-tools.zip
unzip /tmp/cmdline-tools.zip -d $HOME/android/cmdline-tools
mkdir -p $HOME/android/cmdline-tools/latest
mv $HOME/android/cmdline-tools/cmdline-tools/* $HOME/android/cmdline-tools/latest/

# Accept licenses and install required components
yes | sdkmanager --licenses
sdkmanager "platform-tools" "platforms;android-33" "build-tools;33.0.0"
```

#### 5. Expo build setup
```bash
# Install EAS CLI
npm install -g eas-cli

# Navigate to your project in WSL
cd /mnt/c/YourProjectPath

# Initialize EAS for your project
eas init

# Configure build
eas build:configure
```

#### 6. Build the app
```bash
# Build Android App Bundle (.aab)
eas build --platform android --local

# Build an APK for testing
eas build --platform android --profile preview --local
```

</details>

## 🧪 Testing and Accessibility

### Screen Reader Testing
- **TalkBack (Android)**: Enable from Settings > Accessibility > TalkBack
- **VoiceOver (iOS)**: Enable from Settings > Accessibility > VoiceOver
- **Quick Shortcuts**: Triple-click the Home button on iOS, or set a custom shortcut on Android

### TalkBack Terminal Commands
```bash
# Disable
adb shell settings put secure enabled_accessibility_services com.android.talkback/com.google.android.marvin.talkback.TalkBackService

# Enable
adb shell settings put secure enabled_accessibility_services com.google.android.marvin.talkback/com.google.android.marvin.talkback.TalkBackService
```

### Accessibility Checks
- **WCAG 2.2 Criteria**: Perceivable, Operable, Understandable, Robust
- **Manual Verifications**: Correct roles, labels, and states
- **Performance**: React DevTools, profiling

## 🤝 Contributing

1. **Fork** the repository and create a new branch for your feature
2. **Implement** your changes with careful attention to accessibility
3. **Open a Pull Request** describing your feature/fix
4. Ensure **WCAG compliance** and include relevant tests

## 📚 Additional Resources

- [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [React Native Accessibility Documentation](https://reactnative.dev/docs/accessibility)
- [Expo Documentation](https://docs.expo.dev/)
- [MDN Accessibility Guides](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more details.

---

<div align="center">
<b>AccessibleHub: Empower Development, Enable Accessibility.</b>
</div>