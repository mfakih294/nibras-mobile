export PATH=/nbr/dev/Android/Sdk/tools:/nbr/dev/Android/Sdk/tools/bin:/nbr/dev/Android/Sdk/build-tools/29.0.2:/nbr/dev/Android/Sdk/platform-tools:/nbr/dev/jdk1.8.0_65/bin:/nbr/dev/jdk1.8.0_65/jre/bin:$PATH

export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64/
#export ANDROID_HOME=/nbr/dev/Android/Sdk
export ANDROID_SDK_ROOT=/nbr/dev/Android/Sdk

#ionic serve
#ionic cordova run android  -l -c --device
#ionic cordova  build browser --prod # --verbose 
ionic cordova build android --prod #--release
#cp 	/home/alef/Documents/dev/nbrm/platforms/android/app/build/outputs/apk/debug/app-debug.apk 	/nbr/rps1/nibras.apk

#rm /home/alef/Documents/dev/nbrm/platforms/android/app/build/outputs/apk/release/NibrasReader.apk

#cd /nbr/dev/mbl/platforms/android/app/build/outputs/apk/release


#jarsigner -verbose -sigalg SHA1withRSA -storepass QAZWSX -digestalg SHA1 -keystore my-release-key.keystore app-release-unsigned.apk nibras_reader

#zipalign -v 4 app-release-unsigned.apk NibrasReader.apk
#cp NibrasReader.apk /nbr/dev/mbl/NibrasReader-final.apk

