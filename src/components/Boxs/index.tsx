import { useEffect } from "react";
import * as THREE from "three";
function Box() {
    useEffect(()=>{
        //scene
        const scene:THREE.Scene = new THREE.Scene()
        let material;

        //camera
        const camera:THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth/window.innerHeight,
            0.1,
            1000);
        //renderer
        const renderer:THREE.WebGL1Renderer = new THREE.WebGL1Renderer();
        renderer.setSize(window.innerWidth,window.innerHeight);
        document.body.appendChild(renderer.domElement);

        //boxsize
        const geometry = new THREE.BoxGeometry(2,2,2);
        material = new THREE.MeshBasicMaterial( { color:0x00ff00 } );
        // const material = new THREE.MeshBasicMaterial( { map:texture } );
        const cube = new THREE.Mesh(geometry,material);
        scene.add(cube);

        //3dmodel
        // const gltfLoader = new GLTFLoader();
        // gltfLoader.load("./textures/scene.gltf",(gltf) => {
        //     let model:THREE.Group = gltf.scene;
        //     scene.add(model);
        // });

        camera.position.z = 5;

        //animation
        function animate(){
            requestAnimationFrame(animate);

            cube.rotation.x += 0.01;
            cube.rotation.y += 0.008;
            renderer.render(scene,camera);
        }

        //windowSizeKeep
        function onWindowResize(){
            camera.aspect = window.innerWidth/window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth,window.innerHeight);
        }

        window.addEventListener("resize",onWindowResize);

        animate();

    },[])
  return (
    <div></div>
  )
}

export default Box