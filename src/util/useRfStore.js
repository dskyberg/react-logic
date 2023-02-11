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


const calcStatusByType = (type, data) => {
    switch (type) {
        case 'and':
            if (data.sources.a === 'on' && data.sources.b === 'on') {
                return 'on'
            }
            return 'off';
        case 'or':
            if (data.sources.a === 'on' || data.sources.b === 'on') {
                return 'on';
            }
            return 'off';
        default:
            return data.status;
    }
}

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
            let oldstatus = status;
            set({
                nodes: Array.from(get().nodes.values()).map((node) => {
                    if (node.id === id) {
                        oldstatus = node.data.status;
                        node.data.status = status
                    }
                    return node;
                }),
            })
            // If the status actually changed, then update the connected nodes
            if (oldstatus !== status) {
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
            set({
                nodes: Array.from(get().nodes.values()).map((node) => {
                    for (let e of changes) {
                        if (node.id === e.target) {
                            node.data = {
                                ...node.data,
                                sources: {
                                    ...node.data.sources,
                                    [e.targetHandle]: 'off',
                                }
                            }
                        }
                    }

                    return node;
                }),
            })
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

            set({
                nodes: Array.from(get().nodes.values()).map((node) => {
                    for (let e of egs) {
                        if (e.source === id && e.target === node.id) {
                            // Found a connected node.
                            node.data = {
                                ...node.data,
                                sources: {
                                    ...node.data.sources,
                                    [e.targetHandle]: status,
                                }
                            }
                        }
                    }
                    return node;
                }),
            })
        },

        _updateStatusOnConnect: (connection) => {
            const { source, sourceHande, target, targetHandle } = connection;
            let [sourceNode] = get().nodes.filter((node) => node.id === source);
            let { status } = sourceNode.data;

            let egs = get().edges.filter((edge) => edge.source === source);
            set({
                nodes: Array.from(get().nodes.values()).map((node) => {
                    for (let e of egs) {
                        if (e.target === node.id) {
                            node.data = {
                                ...node.data,
                                sources: {
                                    ...node.data.sources,
                                    [`${targetHandle}`]: status,
                                }
                            }
                        }
                    }
                    return node;
                }),
            })
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
