@echo off
echo Starting CinemaSphere Movie App...
echo.
echo Installing dependencies...
call npm install
cd client
call npm install
cd ..
echo.
echo Starting servers...
start "Backend Server" cmd /k "npm start"
timeout /t 3 /nobreak > nul
start "Frontend Server" cmd /k "cd client && npm start"
echo.
echo Servers are starting...
echo Backend: http://localhost:4000
echo Frontend: http://localhost:3000
echo.
pause