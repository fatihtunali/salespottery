@echo off
REM Restart Production Server Script (Windows)
REM This script kills any process on port 3005 and starts the production server
REM Usage: scripts\restart-server.bat

echo.
echo ================================================
echo   Restarting Production Server on Port 3005
echo ================================================
echo.

echo Checking for processes on port 3005...

REM Find process using port 3005
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3005 ^| findstr LISTENING') do (
    set PID=%%a
    goto :found
)

echo No process found on port 3005
goto :build

:found
echo Killing process %PID% on port 3005...
taskkill /F /PID %PID% >nul 2>&1
timeout /t 2 /nobreak >nul

:build
echo.
echo Building production...
call npm run build

if %errorlevel% neq 0 (
    echo.
    echo Build failed!
    exit /b 1
)

echo.
echo Build successful!
echo Starting production server...
echo.
call npm run start
