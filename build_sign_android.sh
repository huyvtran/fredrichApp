#!/bin/bash
appName="fredrichApp"
buildNr="0.0.7"
rootDir="/Users/johannes/GoogleDrive/Projects/FredrichSpezialtiefbau/Verwaltungssoftware/FredrichApp/fredrichApp"
buildDir="$rootDir/build/$buildNr"
unsignedApkPath="./platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk"
apkPath="$buildDir/$appName-$buildNr.apk"

echo $buildDir
echo $apkPath

mkdir $buildDir

ionic cordova build --release android &&
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ./keys/my-release-key.keystore $unsignedApkPath alias_name &&
rm -f $apkPath &&
~/Library/Android/sdk/build-tools/28.0.3/zipalign -v 4 $unsignedApkPath $apkPath && 
rm -f "$rootDir/build/$appName.apk" && 
ln -s $apkPath "$rootDir/build/$appName.apk"
