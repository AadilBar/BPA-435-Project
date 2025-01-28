import  { useRef  } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useScroll, ScrollControls, useGLTF, useTexture, } from "@react-three/drei";
import * as THREE from "three";

 
export default function GuitarScene() {

    function DynamicLighting() {
        const groupRef = useRef<THREE.Group>(null);
        const scroll = useScroll();
        useFrame(() => {
            if (groupRef.current) {
            groupRef.current.children.forEach((light, index) => {
                const intensity = (index < 6) ? THREE.MathUtils.lerp(0.9652034261241967, 2, scroll.offset * 1.01) : THREE.MathUtils.lerp(0, 2, scroll.offset * 1.01);
                if (light instanceof THREE.PointLight) {
                light.intensity = intensity;
                }
            });
            }
        });
        return (
            <group ref={groupRef}>

                <pointLight position={[-4.5, 1, 1]} intensity={0.9652034261241967} color={0xff0000} />
                <pointLight position={[-2.7, 1, 1]} intensity={0.9652034261241967} color={0xff0000} />
                <pointLight position={[-0.9, 1, 1]} intensity={0.9652034261241967} color={0xff0000} />
                <pointLight position={[0.9, 1, 1]} intensity={0.9652034261241967} color={0xff0000} />
                <pointLight position={[2.7, 1, 1]} intensity={0.9652034261241967} color={0xff0000} />
                <pointLight position={[4.5, 1, 1]} intensity={0.9652034261241967} color={0xff0000} />

                <pointLight position={[-4.5, 1, -2]} intensity={0.9652034261241967} color={0xff0000} />
                <pointLight position={[-2.7, 1, -2]} intensity={0.9652034261241967} color={0xff0000} />
                <pointLight position={[-0.9, 1, -2]} intensity={0.9652034261241967} color={0xff0000} />
                <pointLight position={[0.9, 1, -2]} intensity={0.9652034261241967} color={0xff0000} />
                <pointLight position={[2.7, 1, -2]} intensity={0.9652034261241967} color={0xff0000} />
                <pointLight position={[4.5, 1, -2]} intensity={0.9652034261241967} color={0xff0000} />

                <ambientLight intensity={0.01} />

                <pointLight position={[-4.5, -3, 0]} intensity={0} color={0xffffff} />
                <pointLight position={[-1.5, -3, 0]} intensity={0} color={0xffffff} />
                <pointLight position={[1.5, -3, 0]} intensity={0} color={0xffffff} />
                <pointLight position={[4.5, -3, 0]} intensity={0} color={0xffffff} />


            </group>
        );
    }
    function GLTFStage() {
        const { scene } = useGLTF(`${import.meta.env.BASE_URL}/models/stage2.glb`);
        scene.scale.set(1,1,1); // Scale down by 10x
        scene.position.y = -3.2;
        scene.position.x = -0.03;
        scene.position.z = -1;

        // useFrame(() => {
        //     model1.scene.visible = scroll.offset > 0.01;
        //     model2.scene.visible = scroll.offset > 0.01;
        //     model3.scene.visible = scroll.offset > 0.01;
        //     model4.scene.visible = scroll.offset > 0.01;
        // });

        const ref = useRef<THREE.Mesh>(null);
        const scroll = useScroll();

        useFrame(() => {
            if (ref.current) {
                if (Array.isArray(ref.current.material)) {
                    ref.current.material.forEach(material => {
                        material.opacity = THREE.MathUtils.lerp(0, 1, Math.min((scroll.offset), 1));
                    });
                } else {
                    ref.current.material.opacity = THREE.MathUtils.lerp(0, 1, Math.min((scroll.offset), 1));
                
                }
            }
        });

        return (
            <group>
                <primitive object={scene} />
                <mesh position={[0, 0, -2.8]} ref={ref}>
                    <planeGeometry args={[8, 4]} />
                    <meshStandardMaterial transparent opacity={1}>
                        <primitive attach="map" object={useTexture(`${import.meta.env.BASE_URL}/images/Full Logo.png`)} />
                    </meshStandardMaterial>
                </mesh>
            </group>
        );
    }

    // const SpinningCylinder = () => {
    //     const cylinderRef = useRef<THREE.Mesh>(null);
      
    //     // Rotation animation for the cylinder
    //     useFrame(() => {
    //       if (cylinderRef.current) {
    //         cylinderRef.current.rotation.y += 0.01; // Adjust rotation speed
    //       }
    //     });
      
    //     const cylinderHeight = 1; // Height of the flat cylinder
    //     const cylinderRadius = 2; // Radius of the cylinder
      
    //     // Create texture with text
    //     const canvas = document.createElement("canvas");
    //     const context = canvas.getContext("2d");
    //     if (context) {
    //       canvas.width = 1024;
    //       canvas.height = 256;
    //       context.fillStyle = "white";
    //       context.fillRect(0, 0, canvas.width, canvas.height);
    //       context.fillStyle = "black";
    //       context.font = "48px Arial";
    //       context.textAlign = "center";
    //       context.textBaseline = "middle";
    //       context.fillText("Spinning Banner", canvas.width / 2, canvas.height / 2);
    //     }
      
    //     const texture = new THREE.CanvasTexture(canvas);
      
    //     return (
    //       <mesh ref={cylinderRef}>
    //         <cylinderGeometry args={[cylinderRadius, cylinderRadius, cylinderHeight, 100, 1, true]} />
    //         <meshStandardMaterial map={texture} side={THREE.DoubleSide} />
    //       </mesh>
    //     );
    //   };
    
    return (
        <div style={{ backgroundColor: 'black', overflowX: 'hidden' }}>
            <div style={{ width: "100vw", height: "100vh" }}>
            <div style={{ position: 'absolute', top: '20vh', width: '100%', textAlign: 'center', zIndex: 1, color: 'white', fontSize: '1.5rem', fontWeight: 'bold'}}>
            Scroll down
            <div style={{ animation: 'bounce 2s infinite', marginTop: '10px' }}>
                ↓
            </div>
            </div>
            <style>
            {`
                @keyframes bounce {
                0%, 100% {
                    transform: translateY(0);
                }
                50% {
                    transform: translateY(-10px);
                }
                }
                .scrollbar-hidden::-webkit-scrollbar {
                display: none;
                }
                .scrollbar-hidden {
                -ms-overflow-style: none;  /* IE and Edge */
                scrollbar-width: none;  /* Firefox */
                }
            `}
            </style>

            <Canvas style={{ width: '100vw', height: '100vh', background:"black", msOverflowStyle: "none", scrollbarWidth: "none", overflow: "hidden" }} dpr={1}> 
            <ScrollControls pages={3} style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}>
                <DynamicLighting />
                    <GLTFStage />
                <mesh position={[0, 0, -10]} rotation={[Math.PI, Math.PI , Math.PI]} receiveShadow>
                <planeGeometry args={[50, 30]} />
                <meshStandardMaterial color="#000000" side={THREE.DoubleSide} />
                </mesh>
                {/* <SpinningCylinder /> */}
            </ScrollControls>
            {/* <OrbitControls/> */}
            </Canvas>
            </div>
            </div>
    );

}
useGLTF.preload(`${import.meta.env.BASE_URL}/models/stage2.glb`);

