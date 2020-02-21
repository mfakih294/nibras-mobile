export PATH=/home/alef/Android/Sdk/tools:/home/alef/Android/Sdk/tools/bin:/home/alef/Android/Sdk/build-tools/29.0.2:/home/alef/Android/Sdk/platform-tools:/home/alef/Documents/dev/jdk1.8.0_65/bin:/home/alef/Documents/dev/jdk1.8.0_65/jre/bin:$PATH

export JAVA_HOME=/home/alef/Documents/dev/jdk1.8.0_65/
export ANDROID_HOME=/home/alef/Android/Sdk
export ANDROID_SDK_ROOT=/home/alef/Android/Sdk

#ionic serve
#ionic cordova run android  -l -c --device
#ionic cordova  build browser --prod # --verbose 
ionic cordova build android --prod --release
#cp 	/home/alef/Documents/dev/nbrm/platforms/android/app/build/outputs/apk/debug/app-debug.apk 	/nbr/rps1/nibras.apk

rm /home/alef/Documents/dev/nbrm/platforms/android/app/build/outputs/apk/release/NibrasReader.apk

cd /home/alef/Documents/dev/nbrm/platforms/android/app/build/outputs/apk/release

jarsigner -verbose -sigalg SHA1withRSA -storepass QAZWSX -digestalg SHA1 -keystore my-release-key.keystore app-release-unsigned.apk nibras_reader

zipalign -v 4 app-release-unsigned.apk NibrasReader.apk
cp NibrasReader.apk ~/dev/dist/NibrasReader.apk

