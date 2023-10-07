import { Canvas, useLoader, useThree, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Box3, AnimationMixer, TextureLoader, MeshBasicMaterial, SphereGeometry, DirectionalLight } from "three";
import { OrbitControls, Stars } from "@react-three/drei";
import { Physics, usePlane, useBox } from "@react-three/cannon";
import { useRef, useEffect, useState } from "react";
import "../styles/Game2D.css";

function useKeyboardControls() {
  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "KeyW") {
        setMovement((movement) => ({ ...movement, forward: true }));
      } else if (event.code === "KeyS") {
        setMovement((movement) => ({ ...movement, backward: true }));
      } else if (event.code === "KeyA") {
        setMovement((movement) => ({ ...movement, left: true }));
      } else if (event.code === "KeyD") {
        setMovement((movement) => ({ ...movement, right: true }));
      }
    };

    const handleKeyUp = (event) => {
      if (event.code === "KeyW") {
        setMovement((movement) => ({ ...movement, forward: false }));
      } else if (event.code === "KeyS") {
        setMovement((movement) => ({ ...movement, backward: false }));
      } else if (event.code === "KeyA") {
        setMovement((movement) => ({ ...movement, left: false }));
      } else if (event.code === "KeyD") {
        setMovement((movement) => ({ ...movement, right: false }));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return movement;
}

function Model() {
  const gltf = useLoader(GLTFLoader, "/models/Rocket2.glb");
  const box = new Box3().setFromObject(gltf.scene);
  const height = box.max.y - box.min.y;
  gltf.scene.position.y = height / 2;
  const { forward, backward } = useKeyboardControls();
  const [ref] = useBox(() => ({ mass: 0, position: [0, height / 2, 0] }));
  const mixer = useRef(new AnimationMixer(gltf.scene));
  // const clip = gltf.animations.find((clip) => clip.name === "_bee_idle");
  // if (clip) {
  //   const action = mixer.current.clipAction(clip);
  //   action.play();
  // }

  useFrame((state, delta) => {
    mixer.current.update(delta);
    if (forward) {
      ref.current.velocity.z -= delta * 10;
    }
    if (backward) {
      ref.current.velocity.z += delta * 10;
    }
  });

  return <primitive object={gltf.scene} ref={ref} />;
}

function MyDirectionalLight(props) {
  const light = useRef();
  const { scene } = useThree();

  useEffect(() => {
    scene.add(light.current);
    return () => scene.remove(light.current);
  }, [light, scene]);

  return <primitive ref={light} object={new DirectionalLight()} {...props} />;
}

function InvisibleFloor() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
  }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry attach="geometry" args={[100, 100]} />
      <meshPhongMaterial attach="material" transparent opacity={0} />
    </mesh>
  );
}

export default function Game2D() {
  return (
    <div id="canvas">
      <Canvas style={{ background: "black" }}>
        <Stars radius={150} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <MyDirectionalLight position={[0, 10, 5]} />
        <OrbitControls />
        <Physics>
          <Model />
          <InvisibleFloor />
        </Physics>
      </Canvas>
    </div>
  );
}
