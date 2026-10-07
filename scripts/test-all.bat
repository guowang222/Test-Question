@echo off
REM ============================================================
REM  One-command regression test for the quiz project.
REM
REM  Runs, in order:
REM    1) backend self-check   scripts\selfcheck.py
REM       (API smoke + payload contract + question-bank integrity
REM        + search/grading consistency + performance thresholds)
REM    2) frontend static check scripts\check_frontend.py
REM       (every identifier used in the Vue template must be exposed
REM        by setup(); catches silent "undefined -> NaN" bugs)
REM    3) frontend logic tests  scripts\test_frontend_logic.js
REM       (session reset, progressive rendering, submit re-entrancy,
REM        error normalization)
REM
REM  The backend must already be running for the HTTP cases:
REM      scripts\start-backend.bat
REM
REM  Usage:  scripts\test-all.bat
REM
REM  NOTE: absolute system paths on purpose -- this box has had a
REM        broken PATH, which breaks bare "python"/"node".
REM ============================================================
setlocal
set "ROOT=%~dp0.."
set "VENV=%ROOT%\.venv"
set "SYS=%SystemRoot%\System32"

%SYS%\chcp.com 65001 >nul 2>nul

if not exist "%VENV%\Scripts\python.exe" (
    echo [ERROR] venv not found: %VENV%
    echo         Run scripts\setup-env.bat first.
    exit /b 1
)

cd /d "%ROOT%"
"%VENV%\Scripts\python.exe" scripts\test_all.py
set "RC=%ERRORLEVEL%"

echo.
if "%RC%"=="0" (echo [OK] all regression suites passed) else (echo [FAIL] see output above)
exit /b %RC%
