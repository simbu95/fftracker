# Repo for AutoTracking and/or Summary log features from Simbu
A collection of files I have created, or found useful for autotracking, or creating summary logs from 

## Relevant links: 
Website for Summary Log submission: https://chrono.abigtoe.org/

Snes9x 1.6-rr repo: https://github.com/gocha/snes9x-rr/releases

Website for Auto-Tracking (Launch AutoTrack.exe, and start lua script in emulator first): https://simbu95.github.io/fftracker/

Use https://simbu95.github.io/fftracker/?p=8080 for working with Qusb2snes (supports luabridge for emulators, or usb2snes for hardware devices such as the FXPAK PRO)

# Setup Guide (Snes9x focused, see Video link below for a video walkthru)

## Steps needed for running any lua scripts.

To run a lua script, you need an emulator that supports it. The most popular snes emulators that support lua scripts are bizhawk, and snes9x-rr. I have linked above to the snes9x-rr repo, since it can be more difficult to find the correct version for it. 

I highly recommend when downloading any new emulator first load a rom, make sure the display is correct (the snes9x repo I have listed above in particular has frame count displayed from the very beginning, which most people will not want), find the hotkeys to disable/enable anything you want, followed by going thru every menu and disabling any hotkeys even potentially might not want. 

I also suggest looking at settings such as "pause when inactive", "Enable background input", and your joypad configuartion (another note for the snes9x-rr, joypad 2 is enabled by default, which you probably want to disable, otherwise it might do stuff if you try typing in a race)

For a demonstration of these, see the setup video below, where I reconfigure snes9x, along with the rest of the setup.

## After getting the emulator

If you have an emulator with lua capabilities ready, then to use my summary log only scripts, you just need to get the race legal, or not race legal version for your emulator, and load it into your emulator. 

For snes9x, this is usually done with File->Lua Scripting->New Lua Script Window. 

For Bizhawk, usually its Tools->Lua Console

Load the script up at the start of a seed, and it should display "paused" at the top, which will go away after you start the seed. 

## Additional setup for AutoTracking

To enable autotracking, you will need either Autotrack.exe, or if you are comfortable running python, Autotrack.py. This will create an endpoint to talk between the lua scripts, and your web-browser. 

Additional, if you are using snes9x, you will need a socket.dll. I have included both a x32 and x64 version in this repo. Simply download the version for the snes9x-rr your downloaded, and place it in the same directory as the snes9x.exe. 

If you download the x64 version, make sure to rename it to socket.dll

## Autotracking

With those steps out of the way, All you have to do is launch Autotrack.exe (or run the python file), and then load a lua script that supports autotracking into your emulator. When the lua script launches, it will send all the metadata from the rom to the Autotracking service, and then when the game starts, it will begin sending periodic updates as you play. 

To view the output in a friendly way, go to https://simbu95.github.io/fftracker/ which is an implementation of Dunka's tracker, along with Galeswift's additions. The website will automatically connect to the Autotracking service if it is running, and display the data. 

# Setup Guide Video
https://www.twitch.tv/videos/1292653482

Notes: 

At 3:15 I was showing joypad configuration for snes9x, but forgot to mention to disable joypad #2. 

For Bizhawk, You will probably not need socket.dll. If the lua console complains about it, then find the file you need. 
