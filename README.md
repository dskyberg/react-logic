# react-logic
Play with logic gates

This app is built with React, Material-ui, and ReactFlow.  Just drag gates from
the Drawer onto the board, and connect them.  Switches provide a toggle to turn
them on and off.

You can save the graph to a json file, and open saved graphs.

## Help!! Making the background `none` in `onDragStart`
I am using `@mui/material`.  The [Drawer](src/components/Drawer.js) functional component is a set of `@mui/material/List` items. The image that is used for
dragging is captured while the list item is selected.  So, the resulting image contains the grey highlight.  I can't figure out an elegant way to fix that.

<img src="doc/images/screen.png" alt="Screen" title="Screen shot">

## Truth Tables
You can view the truth tables that this app uses by clicking the button in the drawer.

<img src="doc/images/truth_tables.png" alt="Truth Tables" title="Truth Tables">

## ReactFlow Attribution
I have turned off the attribution link on the ReactFlow Background, because I'm giving
attribution in this doc.  If you want to use this app for anything other than personal
use, then please respect the [ReactFlow Attribution request](https://reactflow.dev/docs/guides/remove-attribution/)

