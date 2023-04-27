// Original code from:
// https://github.com/mrdoob/three.js/blob/master/examples/webgl_points_waves.html
// Most of the code are from there but I added and changed some stuff

import * as THREE from './three.module.js';

const SEPARATION = 100, AMOUNTX = 150, AMOUNTY = 100;

let canvas;
let camera, scene, renderer;

let particles, count = 0;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

let horizontalLines = [], verticalLines = [];

// let orange = 0xFFB04D;
// let orangeFadedMaterial = new THREE.LineBasicMaterial({color: orange, linewidth: 1, transparent: true, opacity: 0.15});
let white = 0xFFFFFF;
let black = 0x414141;
let whiteFadedMaterial = new THREE.LineBasicMaterial({ color: white, linewidth: 1, transparent: true, opacity: 0.1 });
let blackFadedMaterial = new THREE.LineBasicMaterial({ color: black, linewidth: 1, transparent: true, opacity: 0.2 });

init();
animate();

function init() {

    canvas = document.querySelector('#particlewave-canvas');

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;
    camera.position.y = 500;

    scene = new THREE.Scene();

    const numParticles = AMOUNTX * AMOUNTY;

    const positions = new Float32Array(numParticles * 3);
    const scales = new Float32Array(numParticles);

    let i = 0, j = 0;

    for (let ix = 0; ix < AMOUNTX; ix++) {

        for (let iy = 0; iy < AMOUNTY; iy++) {

            positions[i] = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2); // x
            positions[i + 1] = 0; // y
            positions[i + 2] = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2); // z

            scales[j] = 30;

            i += 3;
            j++;

        }

    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    const material = new THREE.ShaderMaterial({
        uniforms: {
            color: { value: new THREE.Color(black) },
        },
        vertexShader: document.getElementById('vertexshader').textContent,
        fragmentShader: document.getElementById('fragmentshader').textContent,
        transparent: true
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    initHorizontalLines();
    initVerticalLines();

    renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    canvas.style.touchAction = 'none';

    window.addEventListener('resize', onWindowResize, false);

}

function initHorizontalLines() {
    let positions = particles.geometry.attributes.position.array;

    let distance = 3 * AMOUNTY;
    for (let iy = 0; iy < AMOUNTY; iy++) {
        let points = [];

        let i = iy * 3;
        for (let ix = 0; ix < AMOUNTX; ix++) {
            let xv = positions[i];
            let yv = positions[i + 1];
            let zv = positions[i + 2];

            points.push(new THREE.Vector3(xv, yv, zv));

            i += distance;
        }

        let lineGeo = new THREE.BufferGeometry().setFromPoints(points);
        let line = new THREE.Line(lineGeo, blackFadedMaterial);

        horizontalLines.push(line);
    }

    for (let l = 0; l < horizontalLines.length; l++) {
        scene.add(horizontalLines[l]);
    }
}

function initVerticalLines() {
    let positions = particles.geometry.attributes.position.array;

    let i = 0;
    for (let ix = 0; ix < AMOUNTX; ix++) {
        let points = [];

        for (let iy = 0; iy < AMOUNTY; iy++) {
            let xv = positions[i];
            let yv = positions[i + 1];
            let zv = positions[i + 2];

            points.push(new THREE.Vector3(xv, yv, zv));

            i += 3;
        }

        let lineGeo = new THREE.BufferGeometry().setFromPoints(points);
        let line = new THREE.Line(lineGeo, blackFadedMaterial);

        verticalLines.push(line);
    }

    for (let l = 0; l < verticalLines.length; l++) {
        scene.add(verticalLines[l]);
    }
}

function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {

    requestAnimationFrame(animate);

    render();

}

function render() {
    camera.lookAt(scene.position);

    const positions = particles.geometry.attributes.position.array;

    let i = 0, j = 0;

    for (let ix = 0; ix < AMOUNTX; ix++) {

        for (let iy = 0; iy < AMOUNTY; iy++) {

            // ix and iy represent a single particle
            // count controls the speed of the waves
            // the decimal num in the sine function controls "sharpness or cycling of the waves"
            // the higher the number, the more the waves "cycle" in a shorter length
            // the large integer outside the sine function controls the "height of the waves"
            // the higher the number, the taller the waves
            positions[i + 1] = (Math.sin((ix + count) * 0.37) * 150) +
                (Math.sin((iy + count) * 0.3) * 150);

            i += 3;
            j++;

        }

    }

    particles.geometry.attributes.position.needsUpdate = true;
    particles.geometry.attributes.scale.needsUpdate = true;

    updateHorizontalLines();
    updateVerticalLines();

    renderer.render(scene, camera);

    count += 0.01;

}


function updateHorizontalLines() {
    let positions = particles.geometry.attributes.position.array;

    let distance = 3 * AMOUNTY;
    for (let iy = 0; iy < horizontalLines.length; iy++) {
        let line = horizontalLines[iy];
        let linePos = line.geometry.attributes.position.array;

        let i = iy * 3;
        let lx = 0;
        for (let ix = 0; ix < AMOUNTX; ix++) {
            let xv = positions[i];
            let yv = positions[i + 1];
            let zv = positions[i + 2];

            linePos[lx] = xv;
            linePos[lx + 1] = yv;
            linePos[lx + 2] = zv;

            i += distance;
            lx += 3;
        }

        line.geometry.attributes.position.needsUpdate = true;
    }
}

function updateVerticalLines() {
    let positions = particles.geometry.attributes.position.array;

    let i = 0;
    for (let ix = 0; ix < verticalLines.length; ix++) {
        let line = verticalLines[ix];
        let linePos = line.geometry.attributes.position.array;

        let l = 0;
        for (let iy = 0; iy < AMOUNTY; iy++) {
            linePos[l] = positions[i];
            linePos[l + 1] = positions[i + 1];
            linePos[l + 2] = positions[i + 2];

            i += 3;
            l += 3;
        }

        line.geometry.attributes.position.needsUpdate = true;
    }
}
