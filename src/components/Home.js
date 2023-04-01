import React from 'react';

import IntroSection from './IntroSection';
import PortfolioSection from './PortfolioSection';

export default class Home extends React.Component {
    componentDidMount() {
        document.title = "Jonnelin Marzielli Leonardo | Aspiring Software Engineer";

        const googleTagManagerScript = document.createElement("script");
        googleTagManagerScript.async = "true";
        googleTagManagerScript.src = "https://www.googletagmanager.com/gtag/js?id=G-0K16VJL268";
        document.head.appendChild(googleTagManagerScript);

        const googleAnalyticsScript = document.createElement("script");
        googleAnalyticsScript.innerHTML = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-0K16VJL268');
        `;
        document.head.appendChild(googleAnalyticsScript);

        const vertexShaderScript = document.createElement("script");
        vertexShaderScript.type = "x-shader/x-vertex";
        vertexShaderScript.id = "vertexshader";
        vertexShaderScript.innerHTML = `
            attribute float scale;

            void main() {

                vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

                gl_PointSize = scale * ( 300.0 / - mvPosition.z );

                gl_Position = projectionMatrix * mvPosition;

            }
        `;
        document.head.appendChild(vertexShaderScript);

        const fragmentShaderScript = document.createElement("script");
        fragmentShaderScript.type = "x-shader/x-fragment";
        fragmentShaderScript.id = "fragmentshader";
        fragmentShaderScript.innerHTML = `
            uniform vec3 color;

            void main() {

                if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;

                gl_FragColor = vec4( color, 1.0 );

            }
        `;
        document.head.appendChild(fragmentShaderScript);

        const particlewaveScript = document.createElement("script");
        particlewaveScript.src = "/assets/projects-js/particlewave.js";
        particlewaveScript.type = "module";
        document.head.appendChild(particlewaveScript);

        const particlesScript = document.createElement("script");
        particlesScript.src = "/assets/projects-js/particles.js";
        particlesScript.type = "module";
        document.head.appendChild(particlesScript);

        const matrixScript = document.createElement("script");
        matrixScript.src = "/assets/projects-js/matrix.js";
        matrixScript.type = "module";
        document.head.appendChild(matrixScript);
    }
    render() {
        const fullName = () => 
            <div class='full-name open-sans capitalized'>
                <span class='purple'>Jonnelin</span> <span class='blue'>Marzielli</span> <span class='green'>Leonardo</span>
            </div>;
        const selfDescription = () => 
            <div class='description'>
                Hey there 👋<br /><br />

                I'm <span class='green'>Jonnelin</span>, a <span class='blue'>Software Engineer</span> at <span class='blue'>G</span><span class='red'>o</span><span class='yellow'>o</span><span class='blue'>g</span><span class='green'>l</span><span class='red'>e</span>.<br /><br />

                I guess to describe myself, I am a <span class='purple'>naturally curious</span> person, interested in a wide variety of topics.<br />
                I guess examples would be that its pretty normal for me to think about <span class='pink'>video game</span> <span class='blue'>design</span> and <span class='green'>development</span> someday, thinking about how awesome intricate games like <span class='red'>Project Zomboid</span> are or how to <span class='orange'>procedurally generate</span> <span class='green'>poly terrain</span> and <span class='blue'>water</span> (which is really cool by the way).<br />
                Another day I could be <span class='blue'>reading productivity books</span>, like <span class='yellow'>notetaking</span>. Another, I could be <span class='purple'>watching a course on digital art</span> (I think you get the gist now).<br /><br />

                But to describe my current role, I mostly work on <span class='green'>Android development</span>. In past roles I dabbled in <span class='blue'>front-end</span> and <span class='yellow'>devops</span> development a bit. I guess it's pretty fitting for me to work on different things.<br />
            </div>;
        return (
            <div id="home">
                <canvas id="particlewave-canvas">
                </canvas>
                <div class="top-bar">
                    <div class="menu">
                        <a href="#intro" class="item about">About</a>
                        <a href="#portfolio" class="item portfolio">Portfolio</a>
                    </div>
                </div>
                <div class="content-wrapper" id="intro">
                    <IntroSection fullName={fullName()} description={selfDescription()} />
                    <PortfolioSection />
                </div>
            </div>
        );
    }
}