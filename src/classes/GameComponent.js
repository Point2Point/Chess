import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader.js'
const loader = new FBXLoader();
export default class GameComponent {

  /**
   * @author Alexei Putsykovich
   * */
  mesh;
  name;

  constructor(name = 'name', path = '') {
    this.name = name;
    loader.load(path, (object) => {
      this.mesh = object;
      this.mesh.traverse( (child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    });
  }
  render() {

  }
}
