#!/bin/bash
appName="fredrichApp"
buildNr="0.0.2"
rootDir="/Users/johannes/GoogleDrive/Projects/FredrichSpezialtiefbau/Verwaltungssoftware/FredrichApp/fredrichApp"
buildDir="$rootDir/build/$buildNr"
apkPath="$buildDir/$appName-$buildNr.apk"

echo $buildDir
echo $apkPath

mkdir $buildDir

ionic cordova build --release android &&
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ./keys/my-release-key.keystore ./platforms/android/build/outputs/apk/android-release-unsigned.apk alias_name &&
rm -f $apkPath &&
~/Library/Android/sdk/build-tools/28.0.3/zipalign -v 4 ./platforms/android/build/outputs/apk/android-release-unsigned.apk $apkPath && 
rm -f "$rootDir/build/$appName.apk" && 
ln -s $apkPath "$rootDir/build/$appName.apk"
