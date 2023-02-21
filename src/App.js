import React from 'react';

import { ReactFlowProvider } from 'reactflow';
import Flow from './Flow';
import useAppStore from './util/useAppStore';

import AppBar from './components/Appbar';
import Drawer from './components/Drawer';
import AboutDialog from './components/AboutDialog';

function App() {
  const { aboutOpen } = useAppStore();
  return (
    <>
      <ReactFlowProvider>
        <AppBar />
        <Drawer />
        <Flow />
        <AboutDialog open={aboutOpen} />
      </ReactFlowProvider>
    </>
  );
}



export default App;
