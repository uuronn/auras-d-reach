import { useEffect } from "react";
import * as THREE from "three";
import Earth from "../../assets/earth2.jpg";
function Box() {
  useEffect(() => {
    //scene
    const scene: THREE.Scene = new THREE.Scene();

    //camera
    const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight
    );

    //renderer
    const renderer: THREE.WebGL1Renderer = new THREE.WebGL1Renderer({
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //boxsize
    const geometry = new THREE.SphereGeometry(300, 30, 390);
    const material = new THREE.MeshStandardMaterial({
      map: new THREE.TextureLoader().load(Earth)
    });
    const earth = new THREE.Mesh(geometry, material);
    scene.add(earth);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 2, 1000);
    scene.add(pointLight);
    const pointLightHelper = new THREE.PointLightHelper(pointLight, 30);
    scene.add(pointLightHelper);
    // const geometry = new THREE.BoxGeometry(2, 2, 2);
    // const texture = new THREE.TextureLoader().load(Earth);
    // const material = new THREE.MeshBasicMaterial({ map:texture });
    // // const material = new THREE.MeshBasicMaterial( { map:texture } );
    // const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);

    //3dmodel
    // const gltfLoader = new GLTFLoader();
    // gltfLoader.load("./textures/scene.gltf",(gltf) => {
    //     let model:THREE.Group = gltf.scene;
    //     scene.add(model);
    // });

    // camera.position.z = 5;

    // //animation
    // function animate() {
    //   requestAnimationFrame(animate);

    // //   cube.rotation.x += 0.01;
    // //   cube.rotation.y += 0.008;
    //   renderer.render(scene, camera);

    function createStarField() {
      const vertices = [];
      for (let i = 0; i < 500; i++) {
        const x = 3000 * (Math.random() - 0.5);
        const y = 3000 * (Math.random() - 0.5);
        const z = 3000 * (Math.random() - 0.5);
        vertices.push(x, y, z);
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3)
      );

      const material = new THREE.PointsMaterial({ size: 8, color: 0xffffff });

      const stars = new THREE.Points(geometry,material);
      scene.add(stars);
    }

    createStarField();

    let rot = 0;
    function tick() {
      rot += 0.5;
      const radian = (rot * Math.PI) / 180;
      camera.position.x = 1000 * Math.sin(radian);
      camera.position.y = 1000 * Math.sin(radian);
      camera.lookAt(new THREE.Vector3(0, 0, -400));
      pointLight.position.set(
        500 * Math.sin(Date.now() / 500),
        500 * Math.sin(Date.now() / 1000),
        500 * Math.cos(Date.now() / 500)
      );
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    }

    //windowSizeKeep
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener("resize", onWindowResize);

    // animate();
    tick();
  }, []);
  return <div></div>;
}

export default Box;
