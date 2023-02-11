import ReactFlow, {
    BezierEdge,
    StraightEdge,
    StepEdge,
    SmoothStepEdge,
} from 'reactflow';

export default {
    default: StepEdge,
    bezier: BezierEdge,
    straight: StraightEdge,
    step: StepEdge,
    smoothstep: SmoothStepEdge,
};