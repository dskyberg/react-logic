import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import theme from '../theme';

import {
    addEdge,
    updateEdge,
    applyNodeChanges,
    applyEdgeChanges,
} from 'reactflow';

const initialNodes = [
    {
        id: '1',
        type: 'switch',
        position: { x: 10, y: 200 },
        data: {
            status: "off",
            sources: {
                c: {
                    edges: 0
                }
            }
        }
    },
];

const initialEdges = [
];

const initialState = {
    nodes: initialNodes,
    edges: initialEdges,
    id: initialNodes.length + 1,
};


// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create(
    persist((set, get) => ({
        ...initialState,

        getId: () => {
            let id = get().id;
            set({ id: id + 1 });
            return `${id}`
        },

        setNodes: (nds) => {
            set({ nodes: nds })
        },

        addNode: (newNode) => {
            set({ nodes: get().nodes.concat(newNode) })
        },

        onNodesChange: (changes) => {
            set({
                nodes: applyNodeChanges(changes, get().nodes),
            });
        },


        onEdgesChange: (changes) => {
            set({
                edges: applyEdgeChanges(changes, get().edges),
            });
        },

        onEdgeUpdate: (oldEdge, newConnection) => {
            set({
                edges: updateEdge(oldEdge, newConnection, get().edges),
            })
        },

        onEdgesDelete: (changes) => {
            let nodes = get().nodes.map((node) => {
                for (let e of changes) {
                    if (node.id === e.source) {
                        let data = { ...node.data };
                        data.sources[e.sourceHandle].edges -= 1;
                        node.data = data
                    }
                    if (node.id === e.target) {
                        let data = { ...node.data };
                        data.targets[e.targetHandle].edges -= 1;
                        node.data = data;
                    }
                }
                return node;
            });

            set({ nodes })
        },

        /**
         *  onConnect performs 2 activities:
         *  - Adds a new edge, as defined by `connection`
         *  - Updates the source and target node data to reflect the connection
         */
        onConnect: (connection) => {
            // Add the edge now, or else it won't show up in the following searches.
            set({
                edges: addEdge(connection, get().edges)
            })

            // Update the source and target node data to reflect the connection
            let [sourceNode] = get().nodes.filter((node) => node.id === connection.source);

            // Update the source and edge node data, to show the connections.
            let connected_edges = get().edges.filter((edge) => edge.source === connection.source);
            let nodes = get().nodes.map((node) => {
                for (let edge of connected_edges) {
                    if (edge.source === node.id) {
                        // This is the soure node.  Update the sources in
                        // the node data
                        let data = { ...node.data };
                        data.sources[connection.sourceHandle].edges += 1;
                        node.data = data;
                    }
                    if (edge.target === node.id) {
                        // This is the target node.  Update the targets in
                        // the node data
                        let data = { ...node.data };
                        data.targets[connection.targetHandle].edges += 1;
                        node.data = data;
                    }
                }
                return node;
            });

            set({
                nodes,
            })

            // Update the status of the connected nodes
            get()._cascadeEdgeStatus(sourceNode.id, sourceNode.data.status);
            get()._cascadeNodeStatus(sourceNode.id, sourceNode.data.status);
        },

        /**
         * setNodeStatus is used by the custom nodes (AndNode, OrNode, etc)
         * to update the  data.status flag.  This method calls the following
         * `updateEdgeStatus` to cascade the status change to any connected
         * node. That node, may then call `setNodeStatus`, to continue the
         * chain of updates.
         */
        setNodeStatus: (id, status) => {
            let nodes = get().nodes.map((node) => {
                if (node.id === id) {
                    node.data.status = status
                }
                return node;
            });

            set({ nodes })
            // Update the connected nodes
            get()._cascadeEdgeStatus(id, status);
            get()._cascadeNodeStatus(id, status);
        },

        _cascadeEdgeStatus: (id, status) => {
            let edgeStyle = { stroke: status === 'on' ? theme.palette.secondary.light : 'black' };
            let edges = get().edges.map((edge) => {
                if (edge.source === id) {
                    edge = {
                        ...edge,
                        style: edgeStyle
                    };
                }
                return edge;
            })
            set({ edges });
        },

        /**
         * When a node status changes, cascade the changes down to
         * other connected nodes.
         */
        _cascadeNodeStatus: (id, status) => {
            // Get the set of nodes connected to this node (id)
            let egs = get().edges.filter((edge) => edge.source === id);
            let nodes = get().nodes.map((node) => {
                for (let e of egs) {
                    if (e.source === id && e.target === node.id) {
                        // Found a connected node.
                        // In order to trigger React render, we need to change
                        // the data reference.
                        let data = { ...node.data }
                        data.targets[e.targetHandle].status = status;
                        node.data = data;
                    }
                }
                return node;
            });

            set({ nodes })
        },

        /**
         * Called when a connection is attempted.
         * Ensures that neither the source handle nor the target handle
         * already have a connected edge.
         */
        validateConnection: (connection) => {
            const s_node = get().nodes.filter((node) => node.id === connection.source)[0];
            const t_node = get().nodes.filter((node) => node.id === connection.target)[0];
            return t_node.data.targets[connection.targetHandle].edges === 0
                && s_node.data.sources[connection.sourceHandle].edges === 0;
        },

        reset: () => {
            set(initialState);
        },

        /**
         * Save state from a json string
         *
         */
        fromJson: (json) => {
            let blob;
            try {
                blob = JSON.parse(json);
            } catch (error) {
                console.log('Failed to parse json');
                return;
            }
            set({ nodes: blob.nodes, edges: blob.edges });
        },

        /**
         * Save current state to json
         */
        toJson: () => {
            const blob = {
                nodes: get().nodes,
                edges: get().edges
            }
            const json = JSON.stringify(blob, null, 4);
            return json;
        }
    }),
        {
            name: 'logic-storage', // unique name
            storage: createJSONStorage(() => localStorage), // (optional) by default the 'localStorage' is used
        }
    ));

export default useStore;
