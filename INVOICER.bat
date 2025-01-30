@echo off
REM Navigate to the Backend directory and run the command
cd /d "X:\Assignments\companyX-full-stack\api"
start cmd /k "npx nodemon app.js"

REM Navigate to the Frontend directory and run the command
cd /d "X:\Assignments\companyX-full-stack\app"
start cmd /k "npm run dev"
