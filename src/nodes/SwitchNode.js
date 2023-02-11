import ReactDOMServer from "react-dom/server";
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { useTheme } from '@mui/material/styles';

import { Handle, Position } from 'reactflow';
import Switch from '@mui/material/Switch';

import useRfStore from '../util/useRfStore';

const Svg = ({ bg, size }) => {
    return (
        <svg height={size} viewBox="-2 -2 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <circle fill={bg} stroke="black" strokeWidth="4" cx="50%" cy="50%" r="47%" />
        </svg>)
}

export default function SwitchNode({ id, data }) {
    const theme = useTheme();
    const { setNodeStatus } = useRfStore();
    const { status } = data;

    const handleClick = () => {
        setNodeStatus(id, status === 'on' ? 'off' : 'on');
    }

    const bgColor = status === "off" ? 'none' : theme.palette.secondary.light;
    const svgString = encodeURIComponent(
        ReactDOMServer.renderToStaticMarkup(<Svg bg={bgColor} size={50} />)
    );

    return (
        <div css={css`
            height: 50px;
            width: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-image: url("data:image/svg+xml,${svgString}");
            '&:focus': {                 <----doesn't work
            backgroundColor: 'blue',
            color: 'blue',
            padding: '5rem',
            borderRadius: '7px',
          },

        `}>
            <Switch size="small" checked={status === 'on'} onChange={handleClick} />
            <Handle type="source" position={Position.Right} id="a" style={{ right: -8 }} />
        </div>
    )
}