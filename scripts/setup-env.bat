@echo off
REM ============================================================
REM  (Re)build the project-local venv  ->  <k8s-quiz>\.venv
REM  Base interpreter: system Python 3.14, via the "py" launcher.
REM  Run this if .venv is missing, broken, or the project moved.
REM
REM  Verified combo (2026-09-30):
REM    Python 3.14.4 + Django 6.1.1 + pypdf 6.19.0
REM ============================================================
setlocal
set "ROOT=%~dp0.."
set "VENV=%ROOT%\.venv"
set "SYS=%SystemRoot%\System32"
set "PYLAUNCH=%SystemRoot%\py.exe"
set "MIRROR=https://mirrors.aliyun.com/pypi/simple/"

%SYS%\chcp.com 65001 >nul 2>nul

if not exist "%PYLAUNCH%" (
    echo [ERROR] Python launcher not found: %PYLAUNCH%
    echo         Install Python 3.14, then re-run this script.
    exit /b 1
)

echo [1/4] Removing old venv (if any)
if exist "%VENV%" rmdir /s /q "%VENV%"

echo [2/4] Creating venv with Python 3.14
"%PYLAUNCH%" -3.14 -m venv "%VENV%"
if not exist "%VENV%\Scripts\python.exe" (
    echo [ERROR] venv creation failed. Is Python 3.14 installed?
    echo         Check with:  py -0p
    exit /b 1
)

echo [3/4] Upgrading pip
"%VENV%\Scripts\python.exe" -m pip install -i %MIRROR% --upgrade pip -q

echo [4/4] Installing dependencies from backend\requirements.txt
"%VENV%\Scripts\python.exe" -m pip install -i %MIRROR% -r "%ROOT%\backend\requirements.txt" -q
if errorlevel 1 (
    echo [ERROR] dependency install failed.
    exit /b 1
)

echo.
echo ==== environment ready ====
"%VENV%\Scripts\python.exe" -c "import sys,django,pypdf;print('python',sys.version.split()[0]);print('venv  ',sys.prefix);print('django',django.get_version());print('pypdf ',pypdf.__version__)"
echo.
echo Next: scripts\start-backend.bat
