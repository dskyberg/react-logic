
const as_bool = (value) => value === 'on' ? true : false;
const as_value = (b) => b === true ? 'on' : 'off';

export const or = (x, y) => x || y;
export const xor = (x, y) => x !== y;
export const nor = (x, y) => !(x || y);
export const and = (x, y) => x && y;
export const nand = (x, y) => !(x && y);

export function or_gate(sources) {
    console.log('or_gate:', sources, as_bool(sources.a.status), as_bool(sources.b.status));
    if (sources.a.edges === 0 || sources.b.edges === 0) {
        return 'off';
    }
    return as_value(or(as_bool(sources.a.status), as_bool(sources.b.status)))
}

export function xor_gate(sources) {
    console.log('or_gate:', sources, as_bool(sources.a.status), as_bool(sources.b.status));
    if (sources.a.edges === 0 || sources.b.edges === 0) {
        return 'off';
    }
    return as_value(xor(as_bool(sources.a.status), as_bool(sources.b.status)))
}

export const nor_gate = (sources) => {
    console.log('nor_gate:', sources);
    if (sources.a.edges === 0 || sources.b.edges === 0) {
        return 'off';
    }
    return as_value(nor(as_bool(sources.a.status), as_bool(sources.b.status)))
}

export const and_gate = (sources) => {
    console.log('and_gate:', sources);
    if (sources.a.edges === 0 || sources.b.edges === 0) {
        return 'off';
    }
    return as_value(and(as_bool(sources.a.status), as_bool(sources.b.status)))
}

export const nand_gate = (sources) => {
    console.log('nand_gate:', sources);
    if (sources.a.edges === 0 || sources.b.edges === 0) {
        return 'off';
    }
    return as_value(nand(as_bool(sources.a.status), as_bool(sources.b.status)))
}

