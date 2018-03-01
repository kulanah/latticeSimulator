# General Info

This is the crystal simulation portion  and the blender model viewer of the TEM imaging program.  It can be used to create simulated images of crystal specimens viewed in the TEM microscope.  You can also load in blender models, in the form of exported json files, to the viewer, and view them the second page, blendermodel.html.

### Technologies
The whole of this setup uses the base three.js library.  The blender model viewer has some extra loader libraries such as STLloader and OBJLoader.

# Setup Info

### Crystal Viewer
No setup is required.  Simply navigate to the home directory and open index.html.

### Blender Model Viewer

##### Exporting models from Blender
TODO: Update this with actual steps
https://www.jonathan-petitcolas.com/2015/07/27/importing-blender-modelized-mesh-in-threejs.html
alternatively
https://www.youtube.com/watch?v=NtRrYUAd8rs

##### Converting models from Blender
There's a command line tool that comes with the three.js source file.  Using it is simple and fairly foolproof, though you get less control over what exactly is exported.
1. Navigate to threejs root folder.
2. Dig into /utils/converters/
3. Run the command line tool with the following:  node obj2three.js model.obj

##### Setting up model viewer
This mode requires you to run the HTTP server from the home directory.  To do so:
1. Navigate to the home directory.
2. Run npm install
3. After that finishes up run http-server.
4. Navigate to the address provided by the terminal.  This is likely 127.0.0.1:8080/blendermodel.html