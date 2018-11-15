@echo off
::made by github.com/mhef

title NoBugs Node.JS command prompt

echo                .:oddmMMMMMMmdho/.
echo             .  yMMMMMMMMMMMMMMMMMmy/
echo          .yMMy. .yMMMMMMMMMMMMMMMMMMMy.
echo        .yMMMMMMy. .yhyooooyhmMMMMMMMMMMy.
echo       /MMMMMMMMMMy.          ./ymMMMMMMMM/
echo      oMMMMMMMMMMMMMy.            /mMMMMMMMo
echo     oMMMMMMMMMMMMMMMMy.            yMMMMMMMo
echo    :MMMMMMMo/mMMMMMMMMMy.           oMMMMMMM.
echo    yMMMMMMy   /mMMMMMMMMm/           yMMMMMMy
echo    MMMMMMM.     /mMMMMMMMMm/          MMMMMMM
echo    MMMMMMM        /mMMMMMMMMm/        MMMMMMM
echo    MMMMMMM.         /MMMMMMMMMm/     .MMMMMMM
echo    oMMMMMMy          .yMMMMMMMMMm/   yMMMMMMy
echo    .MMMMMMMo           .yMMMMMMMMMm/oMMMMMMM.
echo     /MMMMMMMy            .yMMMMMMMMMMMMMMMMo
echo      oMMMMMMMm/            .yMMMMMMMMMMMMMo
echo       /mMMMMMMMMy/.          .yMMMMMMMMMm/
echo        .yMMMMMMMMMMmdyooooydy. .yMMMMMMy.
echo          .ymMMMMMMMMMMMMMMMMMMy. .yMmy.
echo             /ymMMMMMMMMMMMMMMMMMy  .
echo                .-oyhmMMMMMMhhyo-.
echo.
echo         _  _  ___    ___ _   _  ___ ___
echo        ^| \^| ^|/ _ \  ^| _ ) ^| ^| ^|/ __/ __^|
echo        ^| .` ^| (_) ^| ^| _ \ ^|_^| ^| (_ \__ \
echo        ^|_^|\_^|\___/  ^|___/\___/ \___^|___/
echo            NODE DEV COMMAND PROMPT

where /F node > tmpFile
set /p nodepath= < tmpFile
del tmpFile
set nodepath=%nodepath:~0,-10%

if exist %nodepath%\nodevars.bat" (
    cmd /k %nodepath%\nodevars.bat"
) else (
    echo ERROR: nodevars.bat not found
)
echo.
pause
