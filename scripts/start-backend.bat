@echo off
REM ============================================================
REM  Start the quiz backend with the PROJECT-LOCAL venv.
REM  Serves both the JSON API and the frontend on one port.
REM
REM  Usage:  scripts\start-backend.bat            (port 8000)
REM          scripts\start-backend.bat 9000       (custom port)
REM
REM  NOTE: uses absolute system paths on purpose -- this box has
REM        had a broken PATH, which breaks bare "netstat"/"chcp".
REM ============================================================
setlocal
set "ROOT=%~dp0.."
set "VENV=%ROOT%\.venv"
set "SYS=%SystemRoot%\System32"
set "PORT=%~1"
if "%PORT%"=="" set "PORT=8000"

%SYS%\chcp.com 65001 >nul 2>nul

if not exist "%VENV%\Scripts\python.exe" (
    echo [ERROR] venv not found: %VENV%
    echo         Run scripts\setup-env.bat first.
    exit /b 1
)

%SYS%\netstat.exe -ano -p TCP | %SYS%\findstr.exe /r /c:":%PORT% .*LISTENING" >nul 2>nul
if not errorlevel 1 (
    echo [WARN] port %PORT% is already in use. Run scripts\stop-backend.bat %PORT% first,
    echo        or pick another port: scripts\start-backend.bat 9000
    exit /b 1
)

cd /d "%ROOT%\backend"
echo Starting quiz server on http://127.0.0.1:%PORT%
echo   python : %VENV%\Scripts\python.exe
echo   press Ctrl+C to stop
"%VENV%\Scripts\python.exe" manage.py runserver 127.0.0.1:%PORT% --noreload
