
const as_bool = (value) => value === 'on' ? true : false;
const as_value = (b) => b === true ? 'on' : 'off';

export const or = (x, y) => x || y;
export const xor = (x, y) => x !== y;
export const nor = (x, y) => !(x || y);
export const and = (x, y) => x && y;
export const nand = (x, y) => !(x && y);

export function or_gate(targets) {
    if (targets.a.edges === 0 || targets.b.edges === 0) {
        return 'off';
    }
    return as_value(or(as_bool(targets.a.status), as_bool(targets.b.status)))
}

export function xor_gate(targets) {
    if (targets.a.edges === 0 || targets.b.edges === 0) {
        return 'off';
    }
    return as_value(xor(as_bool(targets.a.status), as_bool(targets.b.status)))
}

export const nor_gate = (targets) => {
    if (targets.a.edges === 0 || targets.b.edges === 0) {
        return 'off';
    }
    return as_value(nor(as_bool(targets.a.status), as_bool(targets.b.status)))
}

export const and_gate = (targets) => {
    if (targets.a.edges === 0 || targets.b.edges === 0) {
        return 'off';
    }
    return as_value(and(as_bool(targets.a.status), as_bool(targets.b.status)))
}

export const nand_gate = (targets) => {
    if (targets.a.edges === 0 || targets.b.edges === 0) {
        return 'off';
    }
    return as_value(nand(as_bool(targets.a.status), as_bool(targets.b.status)))
}

