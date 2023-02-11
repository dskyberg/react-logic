
import React, { useEffect } from 'react';
import ReactDOMServer from "react-dom/server";
import useRfStore from '../util/useRfStore';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import TargetHandle from './TargetHandle';
import SourceHandle from './SourceHandle';

import { or_gate } from '../util/gates';

const Svg = ({ bg }) => {
    return (
        <svg width="100%" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path fill={bg} stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="4"
                d="M 0,2 C 45,0 45,100  0,98 C 70,98 80,98 98,50 C  80,2 70,2 0,2"
            />
        </svg>
    )
}

export default function OrNode({ id, data }) {
    const theme = useTheme();
    const { setNodeStatus } = useRfStore();
    const { status } = data;

    useEffect(() => {
        console.log('OrNode', id, data);
        const { sources } = data;

        const status = or_gate(sources);
        if (status !== data.status) {
            setNodeStatus(id, status);
        }
    }, [id, data, setNodeStatus]);

    // Create the SVG as a React component, with props, then
    // render it as a string.  This allows us to dynamically style
    // the SVG, and still use it as a background image.
    const bg = status === 'on' ?
        theme.palette.secondary.light : 'none';

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
                    <Typography css={css`padding-left:10px;`} style={{ fontSize: '.6rem' }}>Or</Typography>
                </div>
                <TargetHandle handleId="b" style={{ left: -8, top: 10 }} />
            </ div>
            <SourceHandle id="c" style={{ right: -8 }} />

        </div >
    )
}