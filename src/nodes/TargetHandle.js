/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Handle, Position } from 'reactflow';

export default function TargetHandle({ handleId, ...rest }) {
    return (
        <div css={css`display: flex; position: relative; height: 10px; width: 50px;`}>
            <Handle type="target" position={Position.Left} id={handleId} {...rest} />
        </div>
    )
}
