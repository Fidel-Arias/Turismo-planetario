import { Canvas, useLoader, useThree, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Box3, DirectionalLight, Euler, AnimationMixer, Quaternion, Vector3 } from "three";
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
  const keyboardControls = useKeyboardControls();
  const [ref, api] = useBox(() => ({ mass: 1, position: [0, height / 2, 0] }));
  const currentDirection = useRef(new Vector3(0, 0, -1));
  const totalRotation = useRef(0);
  useFrame((state, delta) => {
    let velocity = new Vector3(0, 0, 0);
    if (keyboardControls.forward) {
      velocity.add(currentDirection.current.clone().multiplyScalar(100));
      if (keyboardControls.left) {
        totalRotation.current += Math.PI / 45;
        currentDirection.current.applyAxisAngle(new Vector3(0, 1, 0), Math.PI / 45);
        gltf.scene.rotation.y += Math.PI / 45;
      } else if (keyboardControls.right) {
        totalRotation.current -= Math.PI / 45;
        currentDirection.current.applyAxisAngle(new Vector3(0, 1, 0), -Math.PI / 45);
        gltf.scene.rotation.y -= Math.PI / 45;
      }
    }

    api.velocity.set(velocity.x, velocity.y, velocity.z);
    if (keyboardControls.forward) {
      api.rotation.copy(ref.current.rotation);
    }
  });

  return <primitive object={gltf.scene} ref={ref} />;
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
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <Physics>
          <Model />
          {/* <InvisibleFloor /> */}
        </Physics>
      </Canvas>
    </div>
  );
}
