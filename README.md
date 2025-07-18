# AccessibleHub

<div align="center">

<img src="my-app/assets/images/icon.png" alt="AccessibleHub Logo" width="120"/>

**A comprehensive toolkit for implementing accessibility in React Native**

[![React Native](https://img.shields.io/badge/React%20Native-v0.73-blue.svg)](https://reactnative.dev/)
[![WCAG 2.2](https://img.shields.io/badge/WCAG-2.2-green.svg)](https://www.w3.org/TR/WCAG22/)
[![Expo](https://img.shields.io/badge/Expo-SDK-lightgrey.svg)](https://expo.dev/)

</div>

---

## 📱 Application Screenshots

### Main Application Interface

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="Application%20Screens/home1.png" alt="Home Screen" width="200"/>
        <br/>
        <strong>Home Screen</strong>
        <br/>
        <em>Main navigation and overview</em>
      </td>
      <td align="center">
        <img src="Application%20Screens/methodology.jpg" alt="Formal Methodology" width="200"/>
        <br/>
        <strong>Formal Methodology</strong>
        <br/>
        <em>The research behind AccessibleHub</em>
      </td>
      <td align="center">
        <img src="Application%20Screens/screen-reader-details.jpg" alt="Community Resources" width="200"/>
        <br/>
        <strong>Screen Reader Testing</strong>
        <br/>
        <em>Screen reader testing documented inside of thesis</em>
      </td>
    </tr>
  </table>
</div>

### Accessible Components Showcase

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="Application%20Screens/components.png" alt="Accessible Components Overview" width="200"/>
        <br/>
        <strong>Components Overview</strong>
        <br/>
        <em>List of accessible UI components</em>
      </td>
      <td align="center">
        <img src="Application%20Screens/media1.png" alt="Component Example Implementation" width="200"/>
        <br/>
        <strong>Component Examples</strong>
        <br/>
        <em>Interactive component demonstrations</em>
      </td>
    </tr>
  </table>
</div>

### Best Practices Implementation

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="Application%20Screens/best-practices.jpg" alt="Best Practices Guide" width="200"/>
        <br/>
        <strong>Best Practices Guide</strong>
        <br/>
        <em>WCAG 2.2 implementation patterns</em>
      </td>
      <td align="center">
        <img src="Application%20Screens/tools.jpg" alt="Practice Example Screen" width="200"/>
        <br/>
        <strong>Examples of accessible tools</strong>
        <br/>
        <em>Demonstrations of tools that enhance accessibility</em>
      </td>
    </tr>
  </table>
</div>

### Framework Comparison & Instructions

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="Application%20Screens/frameworks-comparison.jpg" alt="Framework Comparison" width="200"/>
        <br/>
        <strong>Framework Comparison</strong>
        <br/>
        <em>React Native vs Flutter accessibility</em>
      </td>
    </tr>
  </table>
</div>

---

## 📋 Overview

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

On this part, I will explain how to build the app for Android using Windows. I even made a video on the topic, which you can find on my personal YouTube channel [here](https://www.youtube.com/watch?v=1Q2l4QdDU9k&t=412s).

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

## 📱 Building for iOS (macOS) 

This was made adapting from what I saw from Salvatore Gatto, Mirko Franco and prof. Ombretta Gaggi. Thanks to them it was installed, otherwise it would not have been possible to test the app on iOS devices.

### Prerequisites
- macOS with Xcode 14+ installed
- Apple Developer Account (paid membership required for device testing)
- Node.js (LTS version)
- Expo CLI and EAS CLI installed

### 1. Initial Setup

```bash
# Install required tools
npm install -g @expo/cli eas-cli

# Navigate to your project
cd my-app

# Ensure dependencies are up to date
npm update
npm install

# Install development client for device testing
npx expo install expo-dev-client
```

### 2. Development Build for iOS Devices

#### A. Device Registration
First, register your iOS device(s) for development:

```bash
# Register device via web interface
eas device:create

# Or register multiple devices using the generated URL
# Share the registration link with team members
```

#### B. Build Configuration
Ensure your `eas.json` includes development profile:

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "autoIncrement": true
    }
  }
}
```

#### C. Create Development Build

```bash
# Build for device testing
eas build --platform ios --profile development

# Alternative: Build locally (requires Xcode setup)
npx expo run:ios --device
```

### 3. Certificate Management & Team Organization Issues

#### Apple Developer Account Setup
When running EAS build for the first time, you'll be prompted to:
1. **Log in to Apple Developer Account**: Use your Apple ID credentials
2. **Select Team**: Choose your development team (individual or organization)
3. **Generate Certificates**: Allow EAS to handle distribution certificates and provisioning profiles

#### The MobileLab/UniPD Solution - Team Member Workflow

**Understanding the Problem:**
The issue encountered was related to being added as a team member to an organizational Apple Developer account (MobileLab) rather than having a personal paid account. This creates specific certificate limitations and workflow requirements.

**Key Technical Details:**
- **Personal Apple ID + Organization Team**: When you're added to an organization team, you use your personal Apple ID but inherit the team's certificate authority
- **7-Day Certificate Limitation**: This is NOT a limitation of the paid Apple Developer Program, but occurs when using "Personal Team" in Xcode without proper team membership
- **VPN Group Access**: The solution involved adding the developer to the proper VPN group for institutional network access

**The Working Solution (Salvatore Gatto's Method):**

1. **Team Member Addition**: 
   - Account holder (MobileLab) added developer to organization team
   - Developer received email invitation to join team
   - Used personal Apple ID to accept invitation

2. **Certificate Generation**:
   ```bash
   # Once added to team, create new 1-week development certificate
   # This was NOT a limitation but a choice for security
   # Normal certificates last 1 year, but shorter ones can be generated
   ```

3. **VPN Configuration**:
   - Connected to institutional VPN
   - Added to proper development group permissions
   - This resolved network authentication issues

4. **Workflow Implementation**:
   ```bash
   # Both command line and Xcode worked seamlessly
   npm update
   npm install
   npx expo run:ios --device  # Command line method
   # AND/OR open in Xcode for GUI development
   ```

#### Common Certificate Problems & Solutions

**Problem 1: "You are not allowed to perform this operation" (Team Permission Issue)**
```bash
# Solution: Contact team admin to verify your role
# Ensure you have "Developer" role with certificate access
# Check in Apple Developer Portal > People & Access
```

**Problem 2: "Certificate for this server is invalid" or Certificate Mismatch**
```bash
# Clear existing credentials and regenerate
eas credentials -p ios
# Select "Delete all credentials" and rebuild
```

**Problem 3: "Maximum number of certificates reached"**
- Go to [Apple Developer Portal](https://developer.apple.com/account/resources/certificates/)
- Delete expired or unused certificates
- Regenerate with `eas build --platform ios --clear-cache`

**Problem 4: University/Organization Account Issues**
For institutional accounts (like UniPD):

```bash
# The working solution involved:
# 1. Being properly added to the organization team
# 2. Using VPN for institutional network access
# 3. Certificate generation through team account (not personal)
# 4. Both CLI and Xcode methods work identically
```

**Problem 5: 7-Day Certificate Expiration (Personal Team vs Organization Team)**
- **Personal Team (Free)**: Limited to 7-day certificates, 3 devices, 10 App IDs
- **Organization Team Member**: Full 1-year certificates, unlimited devices
- **Solution**: Ensure proper team membership, not using "Personal Team" in Xcode

### 4. Local Development Workflow

```bash
# Start development server
npx expo start

# For device testing with installed development build
npx expo start --dev-client

# Install on connected device
npx expo run:ios --device
```

### 5. Testing on Physical Devices

#### Method 1: EAS Build + QR Code Installation
1. Build with `eas build --platform ios --profile development`
2. Scan QR code from build completion page
3. Install via iOS Settings → VPN & Device Management → Trust Developer

#### Method 2: Direct USB Installation
```bash
# Connect device via USB
npx expo run:ios --device

# Select your device from the list
# App will install and launch automatically
```

### 6. Troubleshooting

#### Build Failures
```bash
# Clear all caches and rebuild
rm -rf node_modules package-lock.json ios/
npm install
eas build --platform ios --clear-cache
```

#### Xcode Integration Issues
```bash
# Ensure Xcode command line tools are installed
xcode-select --install

# Accept Xcode license
sudo xcodebuild -license accept

# Open iOS project in Xcode for debugging
npx expo run:ios --no-bundler
open ios/YourApp.xcworkspace
```

#### Device Installation Problems
- **Enable Developer Mode**: iOS Settings → Privacy & Security → Developer Mode
- **Trust Certificate**: Settings → General → VPN & Device Management → Trust App
- **Clear App Cache**: Delete app and reinstall

### 7. Production Build

```bash
# Build for App Store submission
eas build --platform ios --profile production

# Submit to App Store
eas submit --platform ios
```

### 8. Testing Environment Setup

#### Test Devices Used (MobileLab Configuration)
- **iPhone XR** (iOS 16+) - mobilelabunipd@gmail.com
- **iPhone 14** (iOS 17+) - mobilelabunipd@gmail.com  
- **iPhone X** (iOS 15+) - MobileLab lending library

#### Institutional Testing Notes (UniPD/MobileLab Experience)
**Successful Configuration Details:**
- **Team Organization**: Developers added to MobileLab organization team
- **Certificate Management**: 1-week development certificates (security policy, not limitation)
- **VPN Integration**: Institutional VPN access with development group permissions
- **Testing Method**: Both `npx expo run:ios --device` and Xcode GUI methods work seamlessly
- **iOS Version Compatibility**: No specific iOS version restrictions encountered
- **Account Setup**: Used mobilelabunipd@gmail.com for device registration and testing

**Key Success Factors:**
1. **Proper Team Membership**: Added to organization team, not using personal certificates
2. **VPN Group Access**: Developer was added to appropriate VPN development group
3. **Certificate Workflow**: Organization-managed certificates (1-week validity by choice)
4. **Universal Compatibility**: Method works across different iOS versions and devices

### 9. Emergency Troubleshooting

```bash
# Complete project reset
rm -rf node_modules ios/ .expo/
npm install
npx expo prebuild --clean
eas build --platform ios --clear-cache
```

### 10. Useful Commands Reference

```bash
# Device management
eas device:create              # Register new device
eas device:list               # List registered devices
eas device:delete             # Remove device

# Certificate management
eas credentials -p ios        # Manage iOS credentials
eas credentials:sync          # Sync certificates

# Build commands
eas build -p ios              # Build for iOS
eas build -p ios --local      # Build locally
eas build -p ios --profile development  # Development build
```

---

### Additional Resources

- [Apple Developer Portal](https://developer.apple.com/account/)
- [EAS Build Documentation](https://docs.expo.dev/build/setup/)
- [iOS Device Testing Guide](https://docs.expo.dev/tutorial/eas/ios-development-build-for-devices/)
- [Certificate Troubleshooting](https://docs.expo.dev/app-signing/app-credentials/)

---

## 🎥 Video Demonstrations

### Accessibility Testing Videos

As part of our comprehensive accessibility evaluation, we have created demonstration videos showing real-world usage of screen readers with the AccessibleHub application.

#### 📱 TalkBack (Android) Demonstration
- **File**: `assets/videos/talkback-demo.mp4`
- **Duration**: ~3-5 minutes
- **Device**: Pixel 7 (Android 14/15)
- **Content Demonstrated**:
  - Navigation through main app sections
  - Form interaction and validation feedback
  - Gesture recognition and touch exploration
  - Component label and hint announcements
  - Focus management between UI elements

**Key Features Showcased**:
- Single tap: Element selection and reading
- Double tap: Element activation
- Swipe navigation: Moving between components
- Two-finger scrolling: Content navigation
- Reading controls and verbosity settings

#### 🍎 VoiceOver (iOS) Demonstration  
- **File**: `assets/videos/voiceover-demo.mp4`
- **Duration**: ~3-5 minutes
- **Device**: iPhone 13 (iOS 16.5)
- **Content Demonstrated**:
  - Comprehensive app navigation workflow
  - Semantic structure and heading navigation
  - Custom accessibility actions
  - Dynamic content announcements
  - Focus order and logical reading sequence

**Key Features Showcased**:
- Single finger exploration and selection
- Double tap activation
- Three-finger swipe scrolling
- Rotor control usage for navigation
- Live region announcements

### Testing Methodology Videos

#### 📊 Empirical Testing Protocol
Both videos follow our structured testing protocol based on:
- **15 defined test scenarios** covering common user interactions
- **WCAG 2.2 success criteria validation**
- **Real-world usage patterns** for accessibility evaluation
- **Navigation success rate measurement** (87% achieved)
- **Form interaction success rate measurement** (82% achieved)

#### 🔍 Comparative Analysis
The videos demonstrate the differences in:
- **Screen reader behavior** between Android and iOS platforms  
- **Gesture patterns** and interaction models
- **Announcement strategies** for different UI components
- **Focus management** approaches across platforms

### Video Access and Usage

#### For Developers
These videos serve as:
- **Reference implementations** for accessibility best practices
- **Testing benchmarks** for similar React Native applications
- **Training materials** for understanding screen reader behavior
- **Quality assurance examples** for accessibility validation

#### Technical Specifications
- **Format**: MP4 (H.264 encoding)
- **Resolution**: 1080p for clear UI element visibility
- **Audio**: High-quality screen reader voice capture
- **Subtitles**: Available for hearing-impaired developers

### Integration with Academic Research

These demonstrations support the findings presented in:
- **Perinello & Gaggi (2024)**: "Accessibility of Mobile User Interfaces using Flutter and React Native"
- **WCAG 2.2 Conformance**: Level AAA compliance verification
- **Cross-platform comparison**: React Native accessibility implementation analysis

### Contributing Video Content

If you'd like to contribute additional demonstration videos:

1. **Follow our testing protocol**: Use the structured scenarios outlined in `/app/index.tsx`
2. **Maintain quality standards**: Ensure clear screen reader audio and smooth navigation
3. **Document thoroughly**: Include device specifications and testing conditions
4. **Validate accessibility**: Verify compliance with demonstrated patterns

---

**Note**: These videos complement the static code examples and interactive demonstrations within the app, providing a complete picture of how accessibility features function in real-world usage scenarios.

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