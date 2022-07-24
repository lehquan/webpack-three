import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class App {
  constructor() {}
  
  init = () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    
    // camera
    this.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    this.camera.position.set(0, 0, 5);
    
    // renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    this.renderer.setClearColor(0xaaaaaa, 0); // Alpha color setting.
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(this.renderer.domElement);
    
    // scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000)
    
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    cube.rotation.y = Math.PI/180 * 30
    cube.add(new THREE.AxesHelper(2))
    this.scene.add( cube );
    
    this.#render()
  
    // controls
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.addEventListener("change", this.#render);
    controls.minDistance = 0.02;
    controls.maxDistance = 10;
    controls.target.set(0, 0, -0.2);
    controls.update();
    
    //
    window.addEventListener("resize", this.#onWindowResize);
  };
  
  #onWindowResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    
    this.#render();
  };
  
  #render = () => {
    this.renderer.render(this.scene, this.camera);
  };
  
}

export { App }
