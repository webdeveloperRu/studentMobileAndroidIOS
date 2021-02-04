## Mobile Chat Application 1.0


Ok. Use this guide to install development tools and Chat application on your Mac:

### A. Install Dependencies

First, you need to install React Native and all dependencies, required to build application for Android and for iOS.

### To find guide how to do this:

Open this page https://facebook.github.io/react-native/docs/getting-started

Move to `Building Projects with Native Code` to install `Node`, `Watchman`, `react-native-cli`, `Java Development Kit`, `XCode`, `Android Studio`, `Android SDK tools` and `emulators`. You can skip, if something already installed. Do everything in guide except "Creating a new application", because application already created and needed to clone it from Git.



## B. Install Chat application


Create folder on disk and clone application from GitLab repository to this folder:

git clone https://github.com/krakiun/jobdone.app


Install dependencies for application (described in package.json):

```bash
cd jobdone.app
npm install
react-native link

```


Connect your device to USB port or run emulator for appropriate platform (iOS or Android) and run application:

```react-native run-ios```

##  BUILD Android .Apk 

#### You need to open subfolder "android" and run command 
```bash
./gradlew assembleRelease
```

Then, if all finished fine, `.apk` file can be found in folder `android/app/build/outputs/apk/app-release.apk`



## Run dev mode

```bash

react-native run-android

```

You still see old data when run application on your device ?
Please, completely delete application from your device, then download latest build from here and install again.



## Build iOS .ipa

First way is from command line, by running `react-native run-ios`.
Second way, is to use XCode.

React-native App contains XCode project, inside ios/ChatMobileApp.xcodeproj .
You can open this file using Finder, and it should open XCode with application
