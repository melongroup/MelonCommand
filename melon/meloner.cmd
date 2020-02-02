REM @IF EXIST "%~dp0\node.exe" (
REM   "%~dp0\node.exe"  "%~dp0\node_modules\melon\Command.js" %*
REM ) ELSE (
REM   @SETLOCAL
REM   @SET PATHEXT=%PATHEXT:;.JS;=;%
REM   node  "%~dp0\node_modules\melon\Command.js" %*
REM )


for /f "tokens=*" %%i in ('npm config get prefix') do set npmpath=%%i
cd %npmpath%\node_modules\melon\
cnpm i
