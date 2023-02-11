
import React, { useEffect, memo } from 'react';
import ReactDOMServer from "react-dom/server";
import useRfStore from '../util/useRfStore';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { Handle, Position, useReactFlow, useStoreApi } from 'reactflow';
import TargetHandle from './TargetHandle';

const Svg = ({ bg, size }) => {
    return (
        <svg width="100%" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path fill={bg} stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="4"
                d="M 0,2 C 45,0 45,100  0,98
        C  80,98 60,98 85,50
        C  60,2 80,2 0,2"
            />
            <circle fill={bg} stroke="black" strokeWidth="4"
                cx="92" cy="50" r="6" />

        </svg>

    )
}

export default function NorNode({ id, data }) {
    const theme = useTheme();

    const { sources, status } = data;
    const { setNodeStatus } = useRfStore();

    useEffect(() => {
        const status = (sources.a === 'off' || sources.b === 'off') ? 'on' : 'off';
        if (status !== data.status) {
            setNodeStatus(id, status);
        }
    }, [sources]);

    // Create the SVG as a React component, with props, then
    // render it as a string.  This allows us to dynamically style
    // the SVG, and still use it as a background image.
    const bg = status === 'on' ?
        theme.palette.secondary.light : 'white';

    const svgString = encodeURIComponent(
        ReactDOMServer.renderToStaticMarkup(<Svg bg={bg} size={50} />)
    );

    return (
        <div css={css`
            height: 50px;
            width: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-image: url("data:image/svg+xml,${svgString}");
        `}>
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
                <TargetHandle handleId="a" style={{ left: -8, top: 0 }} />
                <div css={css`
                    display: flex;
                    height: 30px;
                    width: 50px;
                    align-items: center;
                    justify-content: center;`
                } >
                    <Typography css={css`padding-left:8px; `} style={{ fontSize: '.6rem' }}>Nor</Typography>
                </div>
                <TargetHandle handleId="b" style={{ left: -8, top: 10 }} />
            </ div>
            <Handle type="source" position={Position.Right} style={{ right: -8 }} id="c" />

        </div >
    )
}