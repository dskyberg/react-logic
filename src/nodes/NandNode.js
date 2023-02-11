import React, { useEffect } from 'react';
import ReactDOMServer from "react-dom/server";
import useRfStore from '../util/useRfStore';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useTheme } from '@mui/material/styles';

import { Handle, Position } from 'reactflow';

import TargetHandle from './TargetHandle';
import { Typography } from '@mui/material';

const Svg = ({ bg }) => {
    return (
        <svg width="100%" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path fill={bg} stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="4"
                d="M 2 2 L 35 2 A 30 30 1 1 1 35 98 L 2 98 Z"
            />
            <circle fill={bg} stroke="black" strokeWidth="4"
                cx="92" cy="50" r="6" />

        </svg>)
}


export default function NandNode({ id, data }) {

    const theme = useTheme();
    const { status } = data;
    const { setNodeStatus } = useRfStore();

    useEffect(() => {
        const { sources } = data;
        const status = (sources.a.status === 'on' && sources.b.status === 'on') ? 'off' : 'on';
        if (status !== data.status) {
            setNodeStatus(id, status);
        }
    }, [id, data, setNodeStatus]);
    // Create the SVG as a React component, with props, then
    // render it as a string.  This allows us to dynamically style
    // the SVG, and still use it as a background image.
    let bg = status === 'on' ? theme.palette.secondary.light : 'none';

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
            <div css={css`position: relative; display: flex; flex-direction: column;`}>
                <TargetHandle handleId="a" style={{ left: -8, top: 0 }} />

                <div css={css`
                    display: flex;
                    height: 30px;
                    width: 50px;
                    align-items: center;
                    justify-content: center;`
                } >
                    <Typography css={css`padding-right:8px; `} style={{ fontSize: '.6rem' }}>Nand</Typography>
                </div>

                <TargetHandle handleId="b" style={{ left: -8, top: 10 }} />
            </ div>
            <Handle type="source" position={Position.Right} id="c" style={{ right: -8 }} />

        </div >
    )
}

