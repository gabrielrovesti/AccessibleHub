# AccessibleHub: A Comprehensive Mobile Accessibility Learning Platform

AccessibleHub is an **innovative React Native** mobile application designed to help developers **learn and implement** accessibility best practices. Built with **Expo** and guided by **WCAG 2.2** standards, the app provides **interactive demos**, **comparisons**, and **practical examples** of how to create inclusive mobile experiences.

---

## 📂 Project Structure

Below is the main directory layout inside the `my-app` folder (the core Expo project):

```
my-app/
├─ .expo/
├─ app/
│  ├─ index.tsx                 # Home screen
│  ├─ components.tsx            # Main screen listing accessible components
│  ├─ practices.tsx             # Main screen listing best practices
│  ├─ tools.tsx                 # Mobile Accessibility Tools screen
│  ├─ frameworks-comparison.tsx # Framework comparison screen
│  ├─ accessibility-instruction.tsx # Instruction & Community screen
│  ├─ settings.tsx              # Settings & accessibility toggles
│  └─ _layout.tsx               # Global Drawer/Navigation layout
│
├─ accessible-components/
│  ├─ _layout.tsx
│  ├─ accessible-button.tsx     # Buttons & Touchables demo
│  ├─ accessible-dialog.tsx     # Modal dialogs demo
│  ├─ accessible-form.tsx       # Accessible forms demo
│  ├─ accessible-media.tsx      # Images/media content demo
│  └─ accessible-advanced.tsx   # Combined advanced components (Tabs, Progress, Alerts, Sliders)
│
├─ practices-screens/
│  ├─ _layout.tsx
│  ├─ guidelines.tsx            # WCAG 2.2 guidelines
│  ├─ gestures.tsx              # Gesture tutorial
│  ├─ navigation.tsx            # Logical focus order / navigation focus
│  ├─ screen-reader.tsx         # Screen reader support
│  ├─ semantics.tsx             # Semantic structure
│  └─ accessibility-instruction.tsx  # (If further instruction sub-screens needed)
│
├─ context/
│  └─ ThemeContext.tsx          # Custom theming & accessibility settings
│
├─ assets/
│  ├─ images/
│  │  ├─ placeholder1.png
│  │  ├─ placeholder2.png
│  │  └─ placeholder3.png
│  └─ fonts/ (if custom fonts used)
│
├─ scripts/                     # (Optional scripts, e.g., for builds or linting)
├─ package.json
├─ tsconfig.json
├─ babel.config.js
└─ README.md                    # This file
```

---

## 🎯 Overview & Goals

**AccessibleHub** aims to:

- **Educate** developers on **mobile accessibility** techniques  
- **Demonstrate** WCAG principles in **React Native** context  
- **Compare** frameworks (React Native, Flutter, Ionic) from an accessibility standpoint  
- **Provide** ready-to-use code examples with best practices  

---

## 🚀 Key Screens & Features

1. **Home Screen (`index.tsx`)**  
   - Introductory page with quick stats and navigation to core sections  
   - Announces the app’s purpose and highlights the main features  

2. **Accessibility Components (`components.tsx`)**  
   - Overview of multiple sub-demos in `accessible-components/` folder:
     - **Buttons & Touchables** (`accessible-button.tsx`)
     - **Form Controls** (`accessible-form.tsx`)
     - **Media Content** (`accessible-media.tsx`)
     - **Modal Dialogs** (`accessible-dialog.tsx`)
     - **Advanced** (`accessible-advanced.tsx`): Tabs, Progress, Alerts, Sliders

3. **Best Practices (`practices.tsx`)**  
   - Index of best practice demos in `practices-screens/` folder:
     - **WCAG Guidelines** (`guidelines.tsx`)
     - **Gestures** (`gestures.tsx`)
     - **Screen Reader Support** (`screen-reader.tsx`)
     - **Semantic Structure** (`semantics.tsx`)
     - **Focus/Navigation** (`navigation.tsx`)

4. **Mobile Accessibility Tools (`tools.tsx`)**  
   - Summaries of TalkBack, VoiceOver, Inspector, Contrast Analyzer, etc.  
   - Link out to external docs or tool usage

5. **Framework Comparison (`frameworks-comparison.tsx`)**  
   - Evaluates popular frameworks (React Native, Flutter, Ionic)  
   - Compares accessibility support, performance, dev experience

6. **Instruction & Community (`accessibility-instruction.tsx`)**  
   - Replaces older “achievements” approach  
   - Focuses on broader accessibility instruction, community links, success stories

7. **Settings (`settings.tsx`)**  
   - Toggles for **Dark Mode**, **High Contrast**, **Large Text**, etc.  
   - Stores user preferences in local storage  
   - Provides immediate accessibility feedback

---

## 🛠 Technical Architecture

- **React Native** + **Expo**  
- **Expo Router** for navigation  
- **ThemeContext** for dynamic theming (light/dark, large text, high contrast)  
- **Accessibility** integrated via `AccessibilityInfo`, `accessibilityRole`, `accessibilityLabel`, etc.  
- **Context API** for global state (settings, theming)  
- **TypeScript** for robust type definitions  

---

## 🧰 Installation & Setup

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/your-username/AccessibleHub.git
   cd AccessibleHub/my-app
   ```

2. **Install Dependencies**  
   ```bash
   # npm
   npm install

   # or yarn
   yarn install
   ```

3. **Configure Expo**  
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

---

## 🔨 Build Instructions

1. **Android Build**  
   ```bash
   npx expo build:android
   # or using EAS
   eas build --platform android
   # or using Expo locally (note: you need WSL or a Linux terminal to build!)
   eas build --platform android --profile preview --local
   ```

2. **iOS Build**  
   ```bash
   npx expo build:ios
   # or using EAS
   eas build --platform ios
   ```

3. **Local Builds (Advanced)**  
   - Requires **Android SDK**, **Xcode** (on macOS), or WSL on Windows  
   - Use `eas build --local` with properly configured environment  

### Windows Local Build (Recommended for Advanced Users)

#### Prerequisites
- Windows 10/11
- Basic command line knowledge
- Existing Expo/React Native project

#### Detailed Step-by-Step Local Build Guide

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

---

## 🧪 Testing & Accessibility

- **TalkBack** (Android) & **VoiceOver** (iOS)  
- **Accessibility Scanner** (Android)  
- **Manual checks**: ensuring correct roles, labels, states  
- **Performance**: React DevTools, profiling, etc.  

---

## 🤝 Contributing

1. **Fork** & create a feature branch  
2. **Implement** changes with thorough accessibility considerations  
3. **Open a Pull Request** describing your feature/fix  
4. Ensure **WCAG compliance** and **relevant tests**  

---

## 📚 Additional Resources

- **W3C WCAG 2.2**  
- **React Native Accessibility Docs**  
- **Expo Documentation**  
- **MDN Accessibility Guides**  

---

## ⚖ License

Distributed under the **MIT License**. See `LICENSE` for more details.

---

**Empowering Developers, Enabling Accessibility.**  
Your feedback and contributions are welcome!