# Snes9x Luas

These luas are used with snes9x-rr to enable either autotracking, or summary log export, or both. Below is a description of what each file does.

# AutoTracking

First, a look at the different levels of autotracking provided by each file, there are 3 files that support auto tracking, with 2 sets of features.

# AutoTrackOnly.lua
This file contains the most basic AutoTracking functionality, namely 

1. Autopopulating flags/objectives
2. Updating Key Item Locations cleared
3. Updating Current Key Items obtained
4. Updating Objectives cleared ( WARNING if cleared and reset out of, the objective will not be unmarked, or remarked if cleared again). 

# AutoTrack + Summary log (Additional autotracking features for both race legal, and not race legal versions)

These 2 files have all of the features of AutoTrackOnly.lua, but 1 extra feature as well.

1. Auto Start/Stop Timer 


a. Will start the timer when you enter baron castle, and set the time to 3.5 seconds (about how long it takes from starting the seed)
  
  
b. Will stop the timer on the flash from zeromus. 


# Summary Log

There are 4 files that support the summary log, with 2 sets of features, namely a race legal set of features, and a not race legal set of features. Note that running the combined Autotracker + Summary log, without starting the autotracking service (exe/py file from this repo), will end up functionally behaving the same as the summary log only luas. 

# Race Legal Summary Logs

These logs only monitor memory locations that have been approved by the ff4fe admin team, and thus can be used in any ff4fe discord race, unless explictily banned. The monitored details include...

1. Time spent in each area.
2. Time, party, and KI recieved for every KI location clear
3. Time for every Objective cleared
4. Time and KI recieved for every KI obtained
5. The general route taken thru the run, along with times for entering each area
6. Small extra details such as number of steps taken, tiles flow, screen transitions, etc. 

# Not Race Legal Summary Logs

These logs provide everything the race legal logs provide, but due to monitoring additional memory locations have extra information. Currently they are allowed in any discord async race unless explictly stated otherwise, as well as any pickup discord races given that all particpants in the race are ok with their use. They are not allowed for any community races, or any tournament races. The additional features include.

1. Breakdown of time spent in each area, between walking, menuing, and battle
2. The amount of time spent fighting each boss, number of attempts, party during boss fight, and location of boss. (Includes common grinds, and misc category for generic enemy encounters)
3. Amount of time spent shopping
4. Number of treasure chests looted (chests that you reset out of are not counted)
