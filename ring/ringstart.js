import * as THREE from '../three.js-master/build/three.module.js';
import { OrbitControls } from "../three.js-master/examples/jsm/controls/OrbitControls.js"
import { GLTFLoader } from "../three.js-master/examples/jsm/loaders/GLTFLoader.js"

class App {
    constructor() {
        const divContainer = document.querySelector("#webgl-container");
        this._divContainer = divContainer;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        divContainer.appendChild(renderer.domElement);

        this._renderer = renderer;

        const scene = new THREE.Scene();
        this._scene = scene;

        this._setupCamera();
        this._setupLight();
        this._setupModel();
       
        window.onresize = this.resize.bind(this);
        this.resize();

        requestAnimationFrame(this.render.bind(this));
    }

    _setupModel() {
        const gltfLoader = new GLTFLoader();
        const url = '../ring.glb';
        gltfLoader.load(
            url, 
            (gltf) => {
                const root = gltf.scene;
                this._scene.add(root);

                this._zoomFit(root, this._camera);
            }
        );
    }

    

    _setupCamera() {
        const camera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            100
        );

        camera.position.z = 2;
		camera.position.x = 1;
		camera.position.y = -0.5;
        this._camera = camera;

        this._scene.add(this._camera);
    }

    _setupLight() {
        const color = 0xffffff;
        const intensity = 1.3;
		//const light = new THREE.AmbientLight(color, intensity);
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        this._scene.add(light);
        //this._camera.add(light);
    }

    update(time) {
        time *= 0.001; // second unit
    }

    render(time) {
        this._renderer.render(this._scene, this._camera);   
        this.update(time);

        requestAnimationFrame(this.render.bind(this));
    }

    resize() {
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();
        
        this._renderer.setSize(width, height);
    }
}

window.onload = function () {
    new App();
}