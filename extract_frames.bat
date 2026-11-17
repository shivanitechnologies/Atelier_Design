@echo off
echo ========================================================
echo ATELIER / FORMA - Interior Video Frame Extractor
echo ========================================================
echo.

if not exist "interior.mp4" (
    echo [ERROR] "interior.mp4" not found in this directory!
    echo Please copy your video file here and rename it to "interior.mp4".
    echo.
    pause
    exit /b 1
)

if not exist "frames" (
    mkdir frames
)

echo Extracting 600 frames from interior.mp4...
ffmpeg -i interior.mp4 -vf "fps=600/10,scale=1920:-1" -frames:v 600 frames/frame_%%04d.jpg

if %ERRORLEVEL% EQU 0 (
    echo.
    echo [SUCCESS] 600 frames extracted into "frames/"!
    echo Open http://localhost:8080/forma.html to view your 3D scroll experience.
) else (
    echo.
    echo [ERROR] FFmpeg failed with error code %ERRORLEVEL%.
)

echo.
pause
