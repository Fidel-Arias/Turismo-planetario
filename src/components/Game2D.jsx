import { Canvas, useLoader, useThree, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Box3, Vector3, Float32BufferAttribute, Points, PointsMaterial, BufferGeometry, BoxHelper } from "three";
import { OrbitControls } from "@react-three/drei";
import { Physics, usePlane, useBox, useSphere } from "@react-three/cannon";
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

function Planet({ modelPath, mass, size, position }) {
  const gltf = useLoader(GLTFLoader, modelPath);
  const box = new Box3().setFromObject(gltf.scene);
  const radius = box.max.distanceTo(box.min) / 2;
  const scale = size / radius;
  gltf.scene.scale.set(scale, scale, scale);
  gltf.scene.position.set(position[0], radius * scale + position[1], position[2]);
  const [ref, api] = useSphere(() => ({ mass: mass, position: position, args: [radius * scale] }));
  return <primitive object={gltf.scene} ref={ref} />;
}

function Rocket() {
  const gltf = useLoader(GLTFLoader, "/models/Rocket2.glb");
  const box = new Box3().setFromObject(gltf.scene);
  const height = box.max.y - box.min.y;
  const keyboardControls = useKeyboardControls();
  const [ref, api] = useBox(() => ({ mass: 1000, position: [0, height / 2, 0] }));
  const currentDirection = useRef(new Vector3(0, 0, -1));
  const totalRotation = useRef(0);
  useFrame((state, delta) => {
    let velocity = new Vector3(0, 0, 0);
    if (keyboardControls.forward) {
      velocity.add(currentDirection.current.clone().multiplyScalar(10));
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

function Stars() {
  const { scene } = useThree();
  const ref = useRef();

  useEffect(() => {
    const starGeometry = new BufferGeometry();
    const starMaterial = new PointsMaterial({
      color: 0xbbbbbb,
      size: 0.7,
    });

    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 1;
      const z = (Math.random() - 0.5) * 2000;
      starVertices.push(x, y, z);
    }

    starGeometry.setAttribute("position", new Float32BufferAttribute(starVertices, 3));

    const stars = new Points(starGeometry, starMaterial);
    ref.current = stars;
    scene.add(stars);

    return () => {
      scene.remove(stars);
      starGeometry.dispose();
      starMaterial.dispose();
    };
  }, [scene]);

  return null;
}

export default function Game2D() {
  return (
    <div id="canvas">
      <Canvas style={{ background: "black" }}>
        <Stars />
        <OrbitControls />
        <ambientLight intensity={1} />
        <Physics>
          <Planet modelPath="/models/tierra.glb" mass={1} size={10} position={[100, 100, 0]} />
          <Rocket />
          <InvisibleFloor />
        </Physics>
      </Canvas>
    </div>
  );
}
