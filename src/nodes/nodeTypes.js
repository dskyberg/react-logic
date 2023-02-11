import SwitchNode from './SwitchNode';
import AndNode from './AndNode';
import OrNode from './OrNode';
import XorNode from './XorNode';
import NandNode from './NandNode';
import NorNode from './NorNode';

export default {
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
            }
        }
        default: return {
            type: nodeType,
            data: {
                sources: { a: 'off', b: 'off' },
                status: 'off',
            }
        }
    }
}