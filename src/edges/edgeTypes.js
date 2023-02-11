import {
    BezierEdge,
    StraightEdge,
    StepEdge,
    SmoothStepEdge,
} from 'reactflow';

export const edgeTypes = {
    default: StepEdge,
    bezier: BezierEdge,
    straight: StraightEdge,
    step: StepEdge,
    smoothstep: SmoothStepEdge,
};