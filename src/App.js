import React from 'react';

import { ReactFlowProvider } from 'reactflow';
import Flow from './Flow';

import AppBar from './components/Appbar';
import Drawer from './components/Drawer';

function App() {

  return (
    <>
      <ReactFlowProvider>
        <AppBar />
        <Drawer />
        <Flow />
      </ReactFlowProvider>
    </>
  );
}



export default App;
