import React from 'react';

import IntroSection from './IntroSection';
import PortfolioSection from './PortfolioSection';

export default class Home extends React.Component {
    componentDidMount() {
        document.title = "Jonnelin Marzielli Leonardo | Aspiring Google Software Engineer";

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
                I am a <span class='pink'>curious</span> one, generally interested in many different things. <br /><br />

                I like to <span class='green'>dabble</span> in many different technologies; as such, although I currently am not definite on the exact role I'd like to be in, I am interested in pursuing a <span class='purple'>Full-Stack Development</span> role. Though, I do sometimes dabble in <span class='blue'>Game Development</span> and <span class='orange'>Android Development</span> in my spare time.<br /><br />

                As for my background, I am currently a <span class='yellow'>Unit Computing Specialist</span> at <span class='red'>Rutgers University</span>; the generic title encapsulates what I do day to day, in that I do not specialize but work with different technologies as well. Recently, I've mostly delved in or completed <span class='orange'>DevOps</span> and <span class='blue'>Front-End</span> duties. I am also currently a <span class='purple'>visiting part-time student</span> at <span class='yellow'>RVCC</span> for <span class='pink'>personal enrichment</span> purposes; and before that, I received a <span class='green'>BS in Computer Science</span> in 2021.<br /><br />

                As for "outside of work", my curious nature doesn't only apply within the tech field. I do dabble in things like <span class='purple'>watercolor</span>/<span class='pink'>anime art</span> (which then translates to me enjoying <span class='blue'>UI design</span>). Other things I like to do are <span class='pink'>cuddling with my cat</span> and <span class='orange'>playing video games</span> :).
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