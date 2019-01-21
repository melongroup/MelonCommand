
@echo off

xcopy dest\*.js \\192.168.1.4\webgl\melon\node_modules\melon\ /s /e /h /r /k /y /d > tmp.txt

for /f "delims=" %%i in (tmp.txt) do (
    set txt=%%i
)

REM set /P temp=<tmp.txt
set /a result=%txt:~4,1%
set /a count=0


if %result% EQU %count% goto end

    ECHO %date:~0,4%%date:~5,2%%date:~8,2%%time:~0,2%%time:~3,2%%time:~6,2% > dest\version.txt
    xcopy dest\version.txt \\192.168.1.4\webgl\melon\node_modules\melon\ /s /e /h /r /k /y /d > nul

:end
del tmp.txt

xcopy dest\melon* \\192.168.1.4\webgl\melon\ /s /y /r /h /k /d > nul