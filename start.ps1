# =========================================
# Technavya 2.0 Leaderboard - PowerShell Start Script
# =========================================

$ErrorActionPreference = "Stop"
$ScriptPath = $PSScriptRoot

Write-Host "Technavya 2.0 Leaderboard Startup" -ForegroundColor Cyan

if (-not (Test-Path "$ScriptPath\backend\node_modules")) {
    Write-Host "[Setup] Installing Backend dependencies..." -ForegroundColor Yellow
    Push-Location "$ScriptPath\backend"
    npm install
    Pop-Location
}
if (-not (Test-Path "$ScriptPath\frontend\node_modules")) {
    Write-Host "[Setup] Installing Frontend dependencies..." -ForegroundColor Yellow
    Push-Location "$ScriptPath\frontend"
    npm install
    Pop-Location
}

Write-Host "Starting services..." -ForegroundColor Green

# Start Backend
Write-Host "[1/2] Starting Backend API..." -ForegroundColor Green
Start-Process -FilePath "powershell.exe" -ArgumentList "-NoExit", "-Command", "cd '$ScriptPath\backend'; npm run dev" -WindowStyle Normal
Start-Sleep -Seconds 3

# Start Frontend
Write-Host "[2/2] Starting Frontend..." -ForegroundColor Green
Start-Process -FilePath "powershell.exe" -ArgumentList "-NoExit", "-Command", "cd '$ScriptPath\frontend'; npm run dev" -WindowStyle Normal
Start-Sleep -Seconds 3

Write-Host "Setup Complete! App is running." -ForegroundColor Green
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Cyan
Read-Host "Press Enter to exit this launcher"