# dolphin

:dolphin::dolphin::dolphin::dolphin:

This is a quick app to support an interactive art piece based on:
    https://codepen.io/diegoleme/details/rIokB

My original plans were way more ambitious: I was going to have a dolphin
and a couple of whales you could interact with, based on the 3D models in the
"atlantis" screensaver.  Unfortunately porting these models over to WebGL
was not something I could do in the time available, and luckily I found the
orca on codepen. It's still a marine mammal!

Requirements:
* Kinect 360, libfreenect, freenect Python libraries

## Build:
```
# Kinect libraries for backend:
brew unpack libfreenect
mkdir build
ccmake ..
cd ../wrappers/python
sudo python setup.py install

# Frontend:
yarn
```

## Run:
```
# Terminal 1:
./depth

# Terminal 2:
budo index.js --live

# To stop "depth":
killall python
```

Default Budo URL is http://172.16.49.1:9966/
