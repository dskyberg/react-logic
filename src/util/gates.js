
export const or_gate = (sources) => {
    console.log('or_gate:', sources);
    if (sources.a.edges === 0 || sources.b.edges === 0) {
        return 'off';
    }
    return sources.a.status === 'on' || sources.b.status === 'on' ? 'on' : 'off';
}

export const and_gate = (sources) => {
    console.log('and_gate:', sources);
    if (sources.a.edges === 0 || sources.b.edges === 0) {
        return 'off';
    }
    return sources.a.status === 'on' && sources.b.status === 'on' ? 'on' : 'off';

}