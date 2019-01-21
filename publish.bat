
@echo off

xcopy dest\*.js \\192.168.1.4\webgl\melon\ /s /e /h /r /k /y /d > tmp.txt
set /P temp=<tmp.txt
set /a result=%temp:~4,1%
set /a count=0

if %result% EQU %count% goto end

    ECHO %date:~0,4%%date:~5,2%%date:~8,2%%time:~0,2%%time:~3,2%%time:~6,2% > dest\version.txt
    xcopy dest\version.txt \\192.168.1.4\webgl\melon\ /s /e /h /r /k /y /d

:end
del tmp.txt