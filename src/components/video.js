import React from "react"
import "normalize.css"
import styled from "styled-components"
import logo from "../images/logo-overlay.svg"
import logocircle from "../images/MonicaLoddo-logo-circle.svg"

const VimeoWrapper = styled.div`
    position: fixed;
    top: 100px;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none;
    overflow: hidden;
    background-image: url(${logocircle});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    iframe {
        width: 100vw;
        height: 56.25vw; /* Given a 16:9 aspect ratio, 9/16*100 = 56.25 */
        min-height: 100vh;
        min-width: 177.77vh; /* Given a 16:9 aspect ratio, 16/9*100 = 177.77 */
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
     }
`;

const Overlay = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    img {
        @media (max-width: 768px) {
            height: 153px;
          }
    }
`;

const Video = () => (
    <VimeoWrapper>
        <Overlay>
            <img src={logo} alt="Monica Loddo Logo" />
        </Overlay>
        <iframe
            title="intro" src="https://player.vimeo.com/video/41350501?background=1&autoplay=1&loop=1&byline=0&title=0"
            frameBorder="0"
        ></iframe>
    </VimeoWrapper>



    )
export default Video