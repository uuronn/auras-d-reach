import { useEffect } from "react";
import * as THREE from "three";
import Earth from "../../assets/king.png";

function Square() {
  useEffect(()=>{
    //scene
    const scene:THREE.Scene = new THREE.Scene()

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

    //文字をテクスチャにする
    let canvas = document.createElement('canvas');
    let ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
    if(ctx){
      ctx.font = "80px serif";
      ctx.fillStyle = "#FFFF00";
      ctx.fillText("hoge",80,100);
    } 

    const texture = new THREE.CanvasTexture(canvas);
    
    //boxsize
    const geometry = new THREE.BoxGeometry(2,2,2);
    // const texture = new THREE.TextureLoader().load(Earth);
    const material = new THREE.MeshBasicMaterial({ map:texture });
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

export default Square