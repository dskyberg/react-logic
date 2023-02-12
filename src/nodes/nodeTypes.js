import SwitchNode from './SwitchNode';
import AndNode from './AndNode';
import OrNode from './OrNode';
import XorNode from './XorNode';
import NandNode from './NandNode';
import NorNode from './NorNode';

export const nodeTypes = {
    switch: SwitchNode,
    and: AndNode,
    or: OrNode,
    xor: XorNode,
    nand: NandNode,
    nor: NorNode,
};

export function defaultNode(nodeType) {

    switch (nodeType) {
        case 'switch': return {
            type: nodeType,
            data: {
                status: 'off',
                sources: {
                    c: {
                        edges: 0,
                    }
                }
            }
        }
        default: return {
            type: nodeType,
            data: {
                status: 'off',
                sources: {
                    c: {
                        edges: 0,
                    }
                },
                targets: {
                    a: {
                        edges: 0,
                        status: 'off'
                    },
                    b: {
                        edges: 0,
                        status: 'off'
                    }
                }
            }
        }
    }
}