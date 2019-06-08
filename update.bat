@echo off
REM xcopy \\192.168.1.4\webgl\engine\trunk\nodejs\* dest\lib\ /s /e /h /r /k /y /d
REM xcopy \\192.168.1.4\webgl\engine\trunk\types\* lib\ /s /e /h /r /k /y /d
for /f "tokens=*" %%i in ('node npmpath.js') do set npmpath=%%i
echo %npmpath%