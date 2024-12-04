# AccessibleHub

AccessibleHub is a React Native application built using the Expo framework, focused on providing accessible components and best practices for mobile app development.

## Prerequisites

- Node.js (LTS version recommended)
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development on macOS)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/AccessibleHub.git
   cd AccessibleHub
   ```

2. Install dependencies:

   ```bash
   cd my-app
   npx expo install
   ```

WARNING: DO NOT UPDATE Expo SDK; most recent version is (12/2024) the 52.0.14, while this was built SPECIFICALLY with 52.0.11 version (can be seen inside of `package.json` file).

To check the specific version of the Expo SDK, run the following command:

```bash
npm show expo version
```

In case, repair the installation using:
```bash
npm remove expo
npm install expo@52.0.11 --save
npm install
npx expo start -c
```

3. Start the Expo development server:

   ```bash
   npx expo start
   ```

   This will open the Expo Developer Tools in your default web browser.

4. Run the app on your preferred platform:

   - For Android:
     - Press `a` in the terminal to run the app on an Android emulator or connected device.
   - For iOS (macOS only):
     - Press `i` in the terminal to run the app on an iOS simulator.
   - For web:
     - Press `w` in the terminal to open the app in your web browser.

## Build and Deployment

### Android

#### Remote build

1. Configure your Expo account:

   ```bash
   npx expo login
   ```

2. Build the Android app:

   ```bash
   npx expo build:android
   ```

   This will generate an Android App Bundle (AAB) that can be uploaded to the Google Play Store.

3. (Optional) Generate an APK:

   If you need to generate an APK file instead of an AAB, you can use the following command:

   ```bash
   npx expo build:android -t apk
   ```

   Note that APKs are not recommended for publishing on the Google Play Store and should only be used for testing or sideloading.

#### Local build

This was made using Windows; this requires a Linux System and it's the ONLY WORKING WAY to have an .aab or .apk file. Refer to this one.

##### Prerequisites
- Windows 10/11
- Basic command line knowledge
- Existing Expo/React Native project

##### Step-by-Step Guide

###### 1. Install WSL
```bash
wsl --install
```

###### 2. Set Up Development Environment in WSL Ubuntu

- Install essential tools: Gradle, NodeJS
```bash
sudo apt install curl
sudo apt install openjdk-17-jdk-headless
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install --lts
wget https://services.gradle.org/distributions/gradle-8.5-bin.zip -P /tmp
sudo mkdir /opt/gradle
sudo unzip -d /opt/gradle /tmp/gradle-8.5-bin.zip
```

###### 3. Configure Environment Variables
- Add to `~/.bashrc`:
```bash
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
export ANDROID_HOME=$HOME/android
export ANDROID_SDK_ROOT=${ANDROID_HOME}
export PATH=$PATH:/opt/gradle/gradle-8.5/bin:${ANDROID_HOME}/cmdline-tools/latest/bin:${ANDROID_HOME}/platform-tools:${ANDROID_HOME}/tools:${ANDROID_HOME}/tools/bin
source ~/.bashrc
```

###### 4. Build Setup
Install EAS CLI and configure build navigating to your project:

```bash
npm install -g eas-cli
cd /mnt/c/YourProjectPath
eas init
eas build:configure
```

###### 5. Build Your App

The first command is to get the .aab file; the second one is to get the .apk file.
```bash
eas build --platform android --local

eas build --platform android --profile preview --local
```

###### 6. Converting AAB to APK (if needed)

Create a keystore, download bundle tool and then convert the AAB to APK:
```bash
keytool -genkey -v -keystore my-release-key.keystore \
  -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

wget https://github.com/google/bundletool/releases/download/1.15.6/bundletool-all-1.15.6.jar \
  -O bundletool.jar

java -jar bundletool.jar build-apks --bundle=your-app.aab --output=my_app.apks \
  --mode=universal --ks=my-release-key.keystore --ks-pass=pass:your_password \
  --ks-key-alias=my-key-alias --key-pass=pass:your_password

unzip my_app.apks -d apk_output
```

### iOS

#### Remote build

1. Configure your Expo account:

   ```bash
   npx expo login
   ```

2. Build the iOS app:

   ```bash
   npx expo build:ios
   ```

   This will generate an IPA file that can be uploaded to the App Store.

## Troubleshooting

- If you encounter any issues with missing dependencies or incompatible versions, try clearing the cache and reinstalling the packages:

  ```bash
  npx expo start -c
  ```

- If you face any build errors or issues related to Expo, refer to the Expo documentation or reach out to the Expo community for assistance.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
