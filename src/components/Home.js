import React from 'react';

import IntroSection from './IntroSection';
import PortfolioSection from './PortfolioSection';

export default class Home extends React.Component {
    componentDidMount() {
        document.title = "Jonnelin Marzielli Leonardo | Aspiring Software Engineer";

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
        const fullName = "Jonnelin Marzielli Leonardo"
        const selfDescription = `I love dabbling in different technologies, and some that I'm currently interested in are Full Stack Development, Game Development, and Android Development. I also wear multiple hats in my current role at Rutgers University, mostly in DevOps and Front-End.\n\nPrevious to my current role, I earned a Computer Science degree in Rutgers University. Now, I am a visiting student at RVCC for personal enrichment purposes.\n\nI like being creative; some of the hobbies I've done are watercolor art and anime art. My art-side does somewhat translate into coding as well. I do enjoy designing user interfaces, and have found myself getting a lot better over time. I also just love creating things out of nowhere; but I love the fact that I can create something useful even more.\n\nOutside of coding, I like to cuddle with my cat and play video games :).`;
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
                <div class="content-wrapper">
                    <IntroSection fullName={fullName} description={selfDescription} />
                    <PortfolioSection />
                </div>
            </div>
        );
    }
}