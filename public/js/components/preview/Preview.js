import { setup as setupControls, update as updateControls } from './controls.js';
import { init as initColormapping } from './colormapping.js';
import drawMapblock from './render.js';

const height = 640;
const width = 800;

export default {
  view: function(vnode){
    console.log("oviewninit", vnode);
    return m("div");
  },
  oncreate: function(vnode) {
    console.log("oncreate", vnode);

		const schema = vnode.attrs.schema;
    const camera = new THREE.PerspectiveCamera( 45, height / width, 2, 2000 );
    camera.position.z = -150;
    camera.position.x = -150;
    camera.position.y = 100;

    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      precision: "lowp"
    });

    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    setupControls(camera, renderer, render);

		initColormapping().then(() => {
			drawMapblock(scene, schema, 0, 0, 0);
		});

    function render(){
    	renderer.render( scene, camera );
    }

    function animate() {
    	requestAnimationFrame( animate );
    	updateControls();
    }
  },
  onbeforeupdate: function() {
    return false;
  },
  onremove: function(vnode) {
    console.log("onremove", vnode);
  }
};
