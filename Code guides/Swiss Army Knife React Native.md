## Create from scratch an example

```
> npx react-native init <projectName>

```

## Run a minimal example

```
> npx create-expo-app ProjectName
> cd ProjectName

```

## Swiss knife of React Native

- To start your project:

```

> npx expo start

```

- To run on Android specifically:

```

> npx expo start --android
(in this case, open Android Studio and switch on a device, so to have the app immediately deployed)
    
```

To run on iOS (if you're on a Mac):

```

> npx expo start --ios

```

- To run the web version:

```

> npx expo start --web

```

## Run on device (Android)

- On virtual device

```

> npm run android

```

- On physical device

```

> npx react-native run-android

```

- To choose between multiple running emulators:

```

> adb devices
> npx react-native run-android --deviceId=DEVICE_ID

```

If project does not have an Android folder, we do:

```

> npx react-native eject
> npx expo prebuild 

OR

> npx expo prebuild --clean
(deletes android folders and ios folders)

```

> npx react-native run-android

```

- Create APK directly or create Android folder:
    
```

> npx expo build:android

```

or 

```

npx react-native build-android --mode=release

```

Common errors:
- https://stackoverflow.com/questions/42393545/how-to-fix-missing-gradle-project-configuration-file-issue-in-buildship
- https://stackoverflow.com/questions/32634352/react-native-android-build-failed-sdk-location-not-found
