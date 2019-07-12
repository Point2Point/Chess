import * as THREE from 'three';

export default {
  data: {
    scene: null,
    camera: null,
    renderer: null,
    cube: null
  },
  created: function () {
    this.init();
    this.render();
  },
  methods: {
    init: function () {
      this.scene = new THREE.Scene();

      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
      this.camera.position.x = 15;
      this.camera.position.y = 16;
      this.camera.position.z = 13;
      this.camera.lookAt(this.scene.position);

      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setClearColor(0x111111, 1.0);
      this.renderer.setSize(window.innerWidth, window.innerHeight);

      this.cube = new THREE.Mesh(
          new THREE.BoxGeometry(10 * Math.random(), 10 * Math.random(), 10 * Math.random()),
          new THREE.MeshNormalMaterial()
      );

      this.cube.name = 'cube';
      this.scene.add(this.cube);

      document.body.appendChild(this.renderer.domElement);

      this.render();
    },
    render: function () {
      this.renderer.render(this.scene, this.camera);

      this.scene.getObjectByName('cube').rotation.x += 0.05;
      this.scene.getObjectByName('cube').rotation.y += 0.05;

      requestAnimationFrame(this.render);
    }
  }
}




