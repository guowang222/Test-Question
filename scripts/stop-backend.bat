@echo off
REM ============================================================
REM  Stop whatever is listening on the quiz port (default 8000).
REM  Uses netstat + taskkill by ABSOLUTE system path:
REM  wmic.exe is blocked by policy on this box, and PATH has
REM  been unreliable -- so never rely on bare command names.
REM
REM  Usage:  scripts\stop-backend.bat          (port 8000)
REM          scripts\stop-backend.bat 9000     (custom port)
REM ============================================================
setlocal enabledelayedexpansion
set "SYS=%SystemRoot%\System32"
set "PORT=%~1"
if "%PORT%"=="" set "PORT=8000"
set "FOUND="

%SYS%\chcp.com 65001 >nul 2>nul

for /f "tokens=5" %%p in ('%SYS%\netstat.exe -ano -p TCP ^| %SYS%\findstr.exe /r /c:":%PORT% .*LISTENING"') do (
    echo Killing PID %%p on port %PORT%
    %SYS%\taskkill.exe /PID %%p /F
    set "FOUND=1"
)

if not defined FOUND (
    echo No listener found on port %PORT%.
    exit /b 0
)

timeout /t 1 /nobreak >nul 2>nul
%SYS%\netstat.exe -ano -p TCP | %SYS%\findstr.exe /r /c:":%PORT% .*LISTENING" >nul 2>nul
if errorlevel 1 (
    echo Port %PORT% released.
) else (
    echo [WARN] port %PORT% still listening.
)
