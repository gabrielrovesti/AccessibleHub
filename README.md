# AccessibleHub: A Comprehensive Mobile Accessibility Learning Platform for Developers

## 🎯 Project Overview

AccessibleHub is an innovative React Native mobile application designed to serve as an educational resource and practical guide for developers seeking to create truly accessible mobile applications. Born from a research-driven approach, this application bridges the gap between theoretical accessibility guidelines and practical implementation.

### 📘 Core Mission

The primary goal of AccessibleHub is to transform the way developers understand and implement accessibility in mobile applications. By providing interactive, hands-on learning experiences, the platform aims to:

- Demystify complex accessibility concepts
- Provide practical, implementable accessibility solutions
- Raise awareness about the importance of inclusive design
- Offer comparative insights across different mobile development frameworks

## 🌐 Application Structure and Screens

### 1. Home Screen (`index.tsx`)
- Entry point of the application
- Provides an overview of the accessibility learning journey
- Quick access to key sections
- Highlights key statistics and application purpose

### 2. Accessibility Components (`components.tsx`)
A curated collection of accessible React Native components:
- Accessible Buttons
- Form Controls
- Media Content Handling
- Modal Dialogs

Each component demonstrates:
- Proper accessibility implementation
- Code samples
- Best practice guidelines
- Interactive examples

### 3. Best Practices Screen (`practices.tsx`)
Comprehensive guide to mobile accessibility, covering:
- WCAG 2.2 Guidelines
- Semantic Structure
- Gesture Tutorials
- Screen Reader Support
- Navigation and Focus Management

### 4. Framework Comparison (`frameworks-comparison.tsx`)
An in-depth comparative analysis of mobile development frameworks:
- React Native
- Flutter
- Ionic
- Accessibility feature comparisons
- Performance metrics
- Development experience evaluation

### 5. Accessibility Tools (`tools.tsx`)
A comprehensive resource for accessibility testing and development:
- Screen Reader Tools (TalkBack, VoiceOver)
- Development Accessibility Inspectors
- Contrast Analysis Tools
- Testing Checklists

### 6. Settings (`settings.tsx`)
Customization options for accessibility:
- Dark/Light Mode
- High Contrast Mode
- Text Size Adjustment
- Motion Reduction
- Enhanced Focus Settings

## 🛠 Technical Architecture

### Framework and Technologies
- **Base Framework**: React Native
- **Development Platform**: Expo
- **Styling**: Custom Theme Context with dynamic theming
- **Accessibility**: Native Accessibility API integration
- **Navigation**: Expo Router
- **State Management**: React Hooks and Context API

### Key Technical Implementations
- Dynamic theming with light/dark mode
- Accessibility-first component design
- Comprehensive semantic markup
- Cross-platform compatibility
- Performance-optimized rendering

## 📋 Development Requirements

### Minimum System Requirements
- Node.js 18.x LTS
- npm 9.x or Yarn 1.22.x
- Expo CLI
- Git
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Recommended Development Environment
- Visual Studio Code
- React Native Developer Tools
- Expo Go App (Mobile Testing)
- Chrome DevTools
- React Native Debugger

## 🚀 Setup and Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/AccessibleHub.git
cd AccessibleHub/my-app
```

### 2. Install Dependencies
```bash
# Using npm
npm install

# Using Yarn
yarn install
```

### 3. Configure Development Environment
```bash
# Install Expo CLI globally
npm install -g expo-cli

# Login to Expo (if not already logged in)
npx expo login
```

### 4. Start Development Server
```bash
# Start development server
npx expo start

# Clear cache if needed
npx expo start -c
```

## 🔨 Build Configurations

### Android Build Options

#### Remote Build
```bash
npx expo build:android
```

#### Local Build (Recommended for Advanced Users)

##### Prerequisites
- Windows 10/11
- Basic command line knowledge
- Existing Expo/React Native project

##### Detailed Step-by-Step Local Build Guide

###### 1. Install Windows Subsystem for Linux (WSL)
```bash
# Enable WSL
wsl --install

# Update WSL
wsl --update
```

###### 2. Set Up Development Environment in WSL Ubuntu
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

###### 3. Configure Environment Variables
Add the following to `~/.bashrc`:
```bash
# Java Home
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64

# Android SDK Configuration
export ANDROID_HOME=$HOME/android
export ANDROID_SDK_ROOT=${ANDROID_HOME}
export PATH=$PATH:/opt/gradle/gradle-8.5/bin:${ANDROID_HOME}/cmdline-tools/latest/bin:${ANDROID_HOME}/platform-tools:${ANDROID_HOME}/tools:${ANDROID_HOME}/tools/bin

# Source the updated profile
source ~/.bashrc
```

###### 4. Android SDK and Build Tools Setup
```bash
# Create Android SDK directory
mkdir -p $HOME/android

# Install Android SDK command-line tools
wget https://dl.google.com/android/commandlinetools/commandlinetools-linux-10406996_latest.zip -O /tmp/cmdline-tools.zip
unzip /tmp/cmdline-tools.zip -d $HOME/android/cmdline-tools
```

###### 5. Build Setup for Expo
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

###### 6. Build Your App
```bash
# Build Android App Bundle (.aab)
eas build --platform android --local

# Build APK for testing
eas build --platform android --profile preview --local
```

###### 7. Optional: Converting AAB to Universal APK
```bash
# Create a keystore (if not already created)
keytool -genkey -v -keystore my-release-key.keystore \
  -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

# Download Bundle Tool
wget https://github.com/google/bundletool/releases/download/1.15.6/bundletool-all-1.15.6.jar \
  -O bundletool.jar

# Convert AAB to Universal APK
java -jar bundletool.jar build-apks \
  --bundle=your-app.aab \
  --output=my_app.apks \
  --mode=universal \
  --ks=my-release-key.keystore \
  --ks-pass=pass:your_password \
  --ks-key-alias=my-key-alias \
  --key-pass=pass:your_password

# Extract Universal APK
unzip my_app.apks -d apk_output
```

##### Troubleshooting Tips
- Ensure all paths are correct
- Check Java and Android SDK versions
- Verify WSL Ubuntu is up to date
- Monitor EAS CLI logs for specific errors

### iOS Build
```bash
npx expo build:ios
```

## 🧪 Testing Strategies

### Accessibility Testing
- VoiceOver (iOS)
- TalkBack (Android)
- Accessibility Scanner
- Manual screen reader testing

### Performance Testing
- React Native Performance Monitor
- Chrome DevTools Performance Tab
- Lighthouse Accessibility Audit

## 🤝 Contribution Guidelines

### How to Contribute
1. Fork the repository
2. Create a feature branch
3. Implement your feature/fix
4. Write comprehensive tests
5. Ensure accessibility compliance
6. Submit a pull request

### Contribution Criteria
- Follow WCAG 2.2 Guidelines
- Maintain clean, documented code
- Include comprehensive accessibility testing
- Provide detailed pull request descriptions

## 📚 Learning Resources

### Accessibility References
- W3C Web Accessibility Initiative
- WCAG 2.2 Guidelines
- MDN Web Docs Accessibility Guide
- React Native Accessibility Documentation

## 📄 License

MIT License - Open-source and free to use, modify, and distribute

## 🏆 Project Acknowledgments

Developed as part of a research initiative to improve mobile application accessibility, with support from [Your Institution/Organization].

---

**Empowering Developers, Enabling Accessibility 🌈👨‍💻**