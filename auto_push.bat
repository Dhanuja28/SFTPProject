@echo off
REM ====== Auto Commit and Push Script ======
cd /d "%~dp0"

REM Step 1: Add all changes
git add .

REM Step 2: Commit with timestamp
for /f "tokens=1-3 delims=/ " %%a in ("%date%") do (
    set today=%%a-%%b-%%c
)
for /f "tokens=1-2 delims=: " %%a in ("%time%") do (
    set now=%%a-%%b
)
git commit -m "Auto commit - %today%_%now%"

REM Step 3: Check if branch has an upstream
git rev-parse --abbrev-ref --symbolic-full-name @{u} >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo No upstream branch found. Setting upstream...
    git push --set-upstream origin main
) ELSE (
    git push
)

echo ==========================================
echo ✅ Code pushed successfully to GitHub!
echo ==========================================
pause
