import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

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

        setNodeStatus: (id, status) => {
            let prev_status = status;
            let nodes = get().nodes.map((node) => {
                if (node.id === id) {
                    prev_status = node.data.status;
                    node.data.status = status
                }
                return node;
            });

            set({ nodes })
            // If the status actually changed, then update the connected nodes
            if (prev_status !== status) {
                get().updateEdgeStatus(id, status);
            }
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
                    if (node.id === e.target) {
                        node.data = {
                            ...node.data,
                            targets: {
                                ...node.data.targets,
                                [e.targetHandle]: {
                                    edges: node.data.targets[e.targetHandle].edges - 1,
                                    status: 'off',
                                }
                            }
                        }
                    }
                }
                console.log('onEdgesDelete:', node);
                return node;
            });

            set({ nodes })
        },

        onConnect: (connection) => {
            set({
                edges: addEdge(connection, get().edges),
            });
            get()._updateStatusOnConnect(connection);
        },

        updateEdgeStatus: (id, status) => {
            // Get the set of nodes connect to this node (id)

            let egs = get().edges.filter((edge) => edge.source === id);
            let nodes = get().nodes.map((node) => {
                for (let e of egs) {
                    if (e.source === id && e.target === node.id) {
                        // Found a connected node.
                        node.data = {
                            ...node.data,
                            targets: {
                                ...node.data.targets,
                                [e.targetHandle]: {
                                    edges: node.data.targets[e.targetHandle].edges,
                                    status,
                                }
                            }
                        }
                    }
                }
                return node;
            });

            set({ nodes })
        },

        _updateStatusOnConnect: (connection) => {
            const { source, targetHandle } = connection;
            let [sourceNode] = get().nodes.filter((node) => node.id === source);
            let { status } = sourceNode.data;

            let egs = get().edges.filter((edge) => edge.source === source);
            let nodes = get().nodes.map((node) => {
                for (let e of egs) {
                    if (e.target === node.id) {
                        node.data = {
                            ...node.data,
                            targets: {
                                ...node.data.targets,
                                [targetHandle]: {
                                    edges: node.data.targets[targetHandle].edges + 1,
                                    status,
                                }
                            }
                        }
                    }
                }
                return node;
            });

            set({
                nodes: nodes,
            })
        },

        validateConnection: (connection) => {
            //const s_node = get().nodes.filter((node) => node.id === connection.source)[0];
            const t_node = get().nodes.filter((node) => node.id === connection.target)[0];
            return t_node.data.targets[connection.targetHandle].edges === 0;
        },

        reset: () => {
            set(initialState);
        }
    }),
        {
            name: 'logic-storage', // unique name
            storage: createJSONStorage(() => localStorage), // (optional) by default the 'localStorage' is used
        }
    ));

export default useStore;
