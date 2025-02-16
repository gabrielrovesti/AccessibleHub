## Prerequisites
- Windows 10/11
- Basic command line knowledge
- Existing Expo/React Native project

## Step-by-Step Guide

### 1. Install WSL
```bash
# Open PowerShell as Administrator and run:
wsl --install
# After restart, install Ubuntu from Microsoft Store
```

### 2. Set Up Development Environment in WSL Ubuntu
```bash
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

### 3. Configure Environment Variables
Add to `~/.bashrc`:
```bash
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
export ANDROID_HOME=$HOME/android
export ANDROID_SDK_ROOT=${ANDROID_HOME}
export PATH=$PATH:/opt/gradle/gradle-8.5/bin:${ANDROID_HOME}/cmdline-tools/latest/bin:${ANDROID_HOME}/platform-tools:${ANDROID_HOME}/tools:${ANDROID_HOME}/tools/bin

source ~/.bashrc
```

### 4. Build Setup
```bash
# Install EAS CLI
npm install -g eas-cli

# Navigate to your project (replace with your path)
cd /mnt/c/YourProjectPath

# Initialize EAS
eas init

# Configure build
eas build:configure
```

### 5. Build Your App
```bash
# For AAB (Android App Bundle)
eas build --platform android --local

# For direct APK, first modify eas.json:
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    }
  }
}

# Then build APK
eas build --platform android --profile preview --local
```

### 6. Converting AAB to APK (if needed)
```bash
# Create keystore
keytool -genkey -v -keystore my-release-key.keystore \
  -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

# Download bundletool
wget https://github.com/google/bundletool/releases/download/1.15.6/bundletool-all-1.15.6.jar \
  -O bundletool.jar

# Convert AAB to APK (single command)
java -jar bundletool.jar build-apks --bundle=your-app.aab --output=my_app.apks \
  --mode=universal --ks=my-release-key.keystore --ks-pass=pass:your_password \
  --ks-key-alias=my-key-alias --key-pass=pass:your_password

# Extract APK
unzip my_app.apks -d apk_output
```

## Troubleshooting

### Common Issues
- Lost environment variables: Re-source `~/.bashrc`
- WSL errors: Run `wsl --shutdown` and restart
- SDK not found: Verify ANDROID_HOME path
- Build fails: Check disk space and Java version
- Expo issues: look not only at app red screens but also to log and keep an eye to compatibile mpdules

### Important Notes
- First build takes ~30 minutes

## Fuckup commands

```bash
Remove-Item -Recurse -Force node_modules 
Remove-Item package-lock.json 
npm install --legacy-peer-deps
```