# react-logic
Play with logic gates

This app is built with React, Material-ui, and ReactFlow.  Just drag gates from
the Drawer onto the board, and connect them.  Switches provide a toggle to turn
them on and off.

<img src="doc/images/screen.png" alt="Screen" title="Screen shot">

## Truth Tables
You can view the truth tables that this app uses by clicking the button in the drawer.

<img src="doc/images/truth_tables.png" alt="Truth Tables" title="Truth Tables">

## Coming Soon
### Edge Validation
Currently, there is no edge validation.  There is rudimentary, buggy tracking for
whether or not a node has edges.  But adding multiple edges to a handle is not (yet) restricted.  So for now, respect the limit of no more than 1 edge per node handle (where the edges connect).