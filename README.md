# react-logic
Play with logic gates

This app is built with React, Material-ui, and ReactFlow.  Just drag gates from
the Drawer onto the board, and connect them.  Switches provide a toggle to turn
them on and off.

<img src="doc/images/screen.png" alt="Screen" title="Screen shot">

## Truth Tables
You can view the truth tables that this app uses by clicking the button in the drawer.

<img src="doc/images/truth_tables.png" alt="Truth Tables" title="Truth Tables">

## ReactFlow Attribution
I have turned off the attribution link on the ReactFlow Background, because I'm giving
attribution in this doc.  If you want to use this app for anything other than personal
use, then please respect the [ReactFlow Attribution request](https://reactflow.dev/docs/guides/remove-attribution/)

## Coming Soon
### Edge Validation
Currently, target handles (on the left side of nodes) are tracked to ensure only one edge per handle is allowed.  However, source handles (on the right side) are not yet tracked.  It is possible to have multiple edges from a single source handle.  However, this will be fixed in a future upgrade.
