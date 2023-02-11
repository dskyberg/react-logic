import { Handle, Position } from 'reactflow';
import useRfStore from '../util/useRfStore';

const SourceHandle = (props) => {
    const { validateConnection } = useRfStore();

    return (
        <Handle type="source" position={Position.Right} isValidConnection={validateConnection} {...props} />
    )
}
export default SourceHandle;