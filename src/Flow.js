import { useState } from 'react';
import { useWindowSize } from '@react-hook/window-size';
import ReactFlow, {
    MiniMap,
    Background,
} from 'reactflow';

import useRfStore from './util/useRfStore';

import 'reactflow/dist/style.css';
import './overview.css';

import { nodeTypes, defaultNode } from './nodes/nodeTypes';
import { edgeTypes } from './edges/edgeTypes';


const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
};

export default function Flow() {
    const [reactFlowInstance, setReactFlowInstance] = useState();
    const nodes = useRfStore((state) => state.nodes);
    const edges = useRfStore((state) => state.edges);
    const {
        getId,
        addNode,
        onNodesChange,
        onEdgesChange,
        onEdgeUpdate,
        onEdgesDelete,
        onConnect } = useRfStore();

    // ReactFlow must be in a container with a set width and height
    const [width, height] = useWindowSize();

    const onInit = (rfi) => setReactFlowInstance(rfi)

    const onDrop = (event) => {
        event.preventDefault();
        if (reactFlowInstance) {

            const type = event.dataTransfer.getData('application/reactflow');
            const position = reactFlowInstance.project({
                x: event.clientX,
                y: event.clientY - 40,
            });
            const newNode = {
                id: getId(),
                position,
                ...defaultNode(type),
            }

            addNode(newNode);
        }
    };


    return (
        <div style={{ height: height - 64, width }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onEdgeUpdate={onEdgeUpdate}
                onEdgesDelete={onEdgesDelete}
                onConnect={onConnect}
                onInit={onInit}
                fitView
                elementsSelectable
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                onDragOver={onDragOver}
                onDrop={onDrop}
                nodeOrigin={[0.5, 0.5]}
                proOptions={{ hideAttribution: true }}
            >
                <MiniMap style={{ height: 120 }} zoomable pannable />
                <Background color="#aaa" gap={16} />
            </ReactFlow>
        </div >
    );
};
