cd kmp
.\gradlew.bat clean jsBrowserProductionWebpack --info && copy build\dist\js\productionExecutable\kmp.{js,js.map} ..\frontend\src\lib\kmp\
echo "Build and copy completed!"