import { useRef, useState } from "react";
import { Canvas, Euler, ExtendedColors, Layers, Matrix4, NodeProps, NonFunctionKeys, Overwrite, Quaternion, useFrame, Vector3 } from "@react-three/fiber";
import { Image } from "@react-three/drei";
import { easing } from "maath";
import * as THREE from "three";
import { EventHandlers } from "@react-three/fiber/dist/declarations/src/core/events";
import { JSX } from "react/jsx-runtime";


function Rig(
    props: JSX.IntrinsicAttributes & 
    Omit<ExtendedColors<Overwrite<Partial<THREE.Group<THREE.Object3DEventMap>>, NodeProps<THREE.Group<THREE.Object3DEventMap>, typeof THREE.Group>>>, 
    NonFunctionKeys<{ position?: Vector3; up?: Vector3; scale?: Vector3; rotation?: Euler; matrix?: Matrix4; quaternion?: Quaternion; layers?: Layers; dispose?: (() => void) | null; }>> & 
    { position?: Vector3; up?: Vector3; scale?: Vector3; rotation?: Euler; matrix?: Matrix4; quaternion?: Quaternion; layers?: Layers; dispose?: (() => void) | null; } & 
    EventHandlers
) {
    const ref = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (ref.current) {
          ref.current.rotation.y += 0.0001;

    
        }
        if (state.events && typeof state.events.update === 'function') {
            state.events.update(); // Raycasts every frame rather than on pointer-move // Move camera
        }
        state.camera.lookAt(0, 0, 0); // Look at center
    });
    return <group ref={ref} {...props} />;
}

  function Carousel({ radius = 1.4, count = 8 }) {
    return Array.from({ length: count }, (_, i) => (
      <Card
        key={i}
        url={`${import.meta.env.BASE_URL}/img${Math.floor(i % 10) + 1}_.jpg`}
        position={[Math.sin((i / count) * Math.PI * 2) * radius, 0, Math.cos((i / count) * Math.PI * 2) * radius]}
        rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}
      />
    ))
  }

  function Card({ url, ...props }: { url: string; [key: string]: any }) {
    const ref = useRef<THREE.Mesh>(null)
    const [hovered, hover] = useState(false)
    const pointerOver = (e: { stopPropagation: () => any; }) => (e.stopPropagation(), hover(true))
    const pointerOut = () => hover(false)
    useFrame((state, delta) => {
      state.clock.getDelta();
      if (ref.current) {
        easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta)
        easing.damp(ref.current.material, 'radius', hovered ? 0.25 : 0.1, 0.2, delta)
        easing.damp(ref.current.material, 'zoom', hovered ? 1 : 1.5, 0.2, delta)
      }
    })
    return (
    <Image ref={ref} url={url} transparent side={THREE.DoubleSide} onPointerOver={pointerOver} onPointerOut={pointerOut} {...props}>

      <planeGeometry args={[1, 1]} />

    </Image>
    )
  }
  
  

const Scene = () => {
return (
    <Canvas camera={{ position: [0, 0, 10], fov: 10 }} style={{ overflow: 'hidden' }}>
      <fog attach="fog" args={['#a79', 8.5, 12]} />
        <Rig rotation={[0, 0, 0]}>
          <Carousel />
        </Rig>
      <color attach="background" args={["#000000"]} />

    </Canvas>
);
};

export default Scene;

