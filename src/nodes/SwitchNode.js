import React, { memo, useState } from 'react';
import ReactDOMServer from "react-dom/server";
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { styled, useTheme } from '@mui/material/styles';

import { Handle, Position, useReactFlow, useStoreApi } from 'reactflow';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import ToggleOn from '@mui/icons-material/ToggleOn';
import ToggleOff from '@mui/icons-material/ToggleOff';

import useRfStore from '../util/useRfStore';

const Svg = ({ bg, size }) => {
    return (
        <svg height={size} viewBox="-2 -2 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <circle fill={bg} stroke="black" strokeWidth="4" cx="50%" cy="50%" r="47%" />
        </svg>)
}
const handleStyle = { left: 10 };

export default ({ id, data }) => {
    const theme = useTheme();
    const [handleStatus, setHandleStatus] = useState({ a: false, b: false });
    const { setNodeStatus } = useRfStore();
    const { status } = data;

    const handleClick = () => {
        setNodeStatus(id, status == 'on' ? 'off' : 'on');
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