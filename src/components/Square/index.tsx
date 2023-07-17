import { useEffect } from "react";
import * as THREE from "three";

function Square({ topPlayerName }: any) {
  useEffect(() => {
    //scene
    const scene: THREE.Scene = new THREE.Scene();

    //camera
    const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
      25,
      window.innerWidth / window.innerHeight
    );
    //renderer
    const renderer: THREE.WebGL1Renderer = new THREE.WebGL1Renderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 1);
    document.body.appendChild(renderer.domElement);

    //文字をテクスチャにする
    const canvas = document.createElement("canvas");
    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
    if (ctx) {
      ctx.font = "80px Times New Roman";
      ctx.fillStyle = "#FFFF00";
      ctx.fillText(topPlayerName, 80, 100);
    }

    const texture = new THREE.CanvasTexture(canvas);

    //boxsize
    const geometry = new THREE.BoxGeometry(200, 200, 200);
    // const texture = new THREE.TextureLoader().load(Earth);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    // const material = new THREE.MeshBasicMaterial( { map:texture } );
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const length = 800;
    const plane_scale = 6;
    const plane: any = [];

    for (let i = 0; i < length; i++) {
      const geometry = new THREE.PlaneGeometry(plane_scale, plane_scale);
      const color = "0x" + Math.floor(Math.random() * 16777215).toString(16);
      const material = new THREE.MeshBasicMaterial({
        color: Number(color),
        opacity: 0.8, // お好みで
        transparent: true, // "opacity"を付けるときは必須
        side: THREE.DoubleSide
      });
      // let material = new THREE.MeshBasicMaterial({
      //   color: "0xffffff",
      //   side: THREE.DoubleSide
      // });
      plane[i] = new THREE.Mesh(geometry, material);

      plane[i].position.x = window.innerWidth * 1.3 * (Math.random() - 0.5);
      plane[i].position.y = window.innerHeight * 1.3 * (Math.random() - 0.5);
      plane[i].position.z = window.innerWidth * 1.3 * (Math.random() - 0.5);
      scene.add(plane[i]);
    }

    //3dmodel
    // const gltfLoader = new GLTFLoader();
    // gltfLoader.load("./textures/scene.gltf",(gltf) => {
    //     let model:THREE.Group = gltf.scene;
    //     scene.add(model);
    // });

    camera.position.z = 5;

    let rot = 0;
    //animation
    function animate() {
      requestAnimationFrame(animate);
      rot += 0.2; // 毎フレーム角度を0.2度ずつ足していく
      // ラジアンに変換する
      const radian = (rot * Math.PI) / 180;
      // 角度に応じてカメラの位置を設定
      camera.position.x = 1000 * Math.sin(radian);
      camera.position.y = 1000 * Math.sin(radian);
      camera.position.z = 1000 * Math.cos(radian);

      camera.lookAt(new THREE.Vector3(0, 0, -200));
      for (let i = 0; i < length; i++) {
        plane[i].rotation.y += Math.random() * 0.1;
        plane[i].rotation.x += Math.random() * 0.1;
        plane[i].rotation.z += Math.random() * 0.1;
      }

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.02;
      renderer.render(scene, camera);
    }

    //windowSizeKeep
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener("resize", onWindowResize);
    window.addEventListener("scroll", onWindowResize);

    animate();
  }, []);
  return <div></div>;
}

export default Square;
