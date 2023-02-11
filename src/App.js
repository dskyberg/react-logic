import React, { useCallback } from 'react';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactFlowProvider } from 'reactflow';
import Flow from './Flow';

import AppBar from './components/Appbar';
import Drawer from './components/Drawer';
import useAppStore from './util/useAppStore';

function App() {
  const { drawerOpen } = useAppStore();

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
