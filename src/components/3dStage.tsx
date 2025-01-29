import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useScroll, ScrollControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

import { PointLightHelper } from "three";
import { DialogBackdrop, DialogBody, DialogContent, DialogHeader, DialogRoot, } from "./ui/dialog";
 
export default function GuitarScene() {
    const [showOverlay, setShowOverlay] = useState(false);
    const [showHelper, setShowHelper] = useState(false);

    function DynamicLighting() {
        const groupRef = useRef<THREE.Group>(null);
        const scroll = useScroll();
        useFrame(() => {
            setShowHelper(false);
            if (groupRef.current) {

            const intensity = THREE.MathUtils.lerp(0.9652034261241967, 5, scroll.offset * 1.01); 

            // Update the intensity of each light progressively
            groupRef.current.children.forEach((light, index) => {
            if (light instanceof THREE.PointLight) {
            const threshold = index / (groupRef.current?.children.length || 1);
            const targetIntensity = scroll.offset * 1.01 >= threshold ? intensity : (index < 6 ? 0.9652034261241967 : 0);
            light.intensity = THREE.MathUtils.lerp(light.intensity, targetIntensity, 0.1);
            }
            });
            }
        });
        return (
            <group ref={groupRef}>
                {Array.from({ length: 6 }).map((_, index) => {
                    const light = new THREE.PointLight(0xff0000, 0.9652034261241967, 5, 2);
                    light.rotation.x = Math.PI / 2; 
                    return (
                        <React.Fragment key={index}>
                            <primitive
                                object={light}
                                position={[index * 1.8 - 4.5, 1, 1]} 
                                castShadow
                            />
                            {showHelper && <primitive object={new PointLightHelper(light, 0.5)} />}
                        </React.Fragment>
                    );
                })}
                {Array.from({ length: 6 }).map((_, index) => {
                    const light = new THREE.PointLight(0xff0000, 0, 5, 2);
                    light.rotation.x = Math.PI / 2; 
                    return (
                        <React.Fragment key={index}>
                            <primitive
                                object={light}
                                position={[index * 1.8 - 4.5, 1, -2]} 
                                castShadow
                            />
                            {showHelper && <primitive object={new PointLightHelper(light, 0.5)} />}
                        </React.Fragment>
                    );
                })}
                {Array.from({ length: 6 }).map((_, index) => {
                    const light = new THREE.PointLight(0xffffff, 0, 5, 2);
                    light.rotation.x = Math.PI / 2; 
                    return (
                        <React.Fragment key={index}>
                            <primitive
                                object={light}
                                position={[index * 1.8 - 4.5, 2, 4]} 
                                castShadow
                            />
                            {showHelper && <primitive object={new PointLightHelper(light, 0.5)} />}
                        </React.Fragment>
                    );
                })}
                {Array.from({ length: 4 }).map((_, index) => {
                    const light = new THREE.PointLight(0xffffff, 0, 5, 2);
                    light.rotation.x = Math.PI / 2; 
                    return (
                        <React.Fragment key={index}>
                            <primitive
                                object={light}
                                position={[index * 3 - 4.5, -2, -2]} 
                                castShadow
                            />
                            {showHelper && <primitive object={new PointLightHelper(light, 0.5)} />}
                        </React.Fragment>
                    );
                })}
                {Array.from({ length: 6 }).map((_, index) => {
                    const light = new THREE.PointLight(0xff0000, 0, 5, 2);
                    light.rotation.x = Math.PI / 2;
                    return (
                        <React.Fragment key={index}>
                            <primitive
                                object={light}
                                position={[index * 1.8 - 4.5, -2, 4]} 
                                castShadow
                            />
                            {showHelper && <primitive object={new PointLightHelper(light, 0.5)} />}
                        </React.Fragment>
                    );
                })}
                {Array.from({ length: 4 }).map((_, index) => {
                    const light = new THREE.PointLight(0xffffff, 0, 5, 2);
                    light.rotation.x = Math.PI / 2; 
                    return (
                        <React.Fragment key={index}>
                            <primitive
                                object={light}
                                position={[index * 3 - 4.5, -3, 0]} 
                                castShadow
                            />
                            {showHelper && <primitive object={new PointLightHelper(light, 0.5)} />}
                        </React.Fragment>
                    );
                })}
            </group>
        );
    }
    function GLTFStage() {
        const { scene } = useGLTF(`${import.meta.env.BASE_URL}/models/stage2.glb`);
        scene.scale.set(1,1,1); // Scale down by 10x
        scene.position.y = -3.2;
        scene.position.x = -0.03;
        scene.position.z = -1;


        const ref = useRef<THREE.Mesh>(null);
        const scroll = useScroll();

        useFrame(() => {
            if (ref.current) {
                if (Array.isArray(ref.current.material)) {
                    ref.current.material.forEach(material => {
                        material.opacity = THREE.MathUtils.lerp(0, 1, Math.min((scroll.offset - 0.3) / 0.1, 1));
                    });
                } else {
                    ref.current.material.opacity = THREE.MathUtils.lerp(0, 1, Math.min((scroll.offset - 0.3) / 0.1, 1));
                
                }
            }
        });

        return (
            <group>
                <primitive object={scene} />

            </group>
        );
    }

    
    return (
        <div style={{ backgroundColor: 'black', overflowX: 'hidden' }}>
            <div style={{ width: "100vw", height: "100vh" }}>
            {showOverlay && (
            <DialogRoot open={showOverlay} onOpenChange={() => setShowOverlay(false)} >
            <DialogBackdrop
            bg="rgba(0, 0, 0, 0.6)"
            style={{ width: "100vw", height: "100vh"}}
            />
            <DialogContent
            maxW="90vw"
            maxH="90vh"
            height="90vh"
            width="90vw"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "60px", // Ensure no offset
                padding: 0, // Remove any unwanted padding
            }}
            >
            <DialogHeader style={{ backgroundColor: "#333", color: "#fff", padding: "10px", textAlign: "center", fontSize: "1.5rem" }}>
                Menu
            </DialogHeader>
            <DialogBody style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "20px" }}>
                <div style={{ width: "50%", display: "flex", justifyContent: "center", alignItems: "center", padding: "10px" }}>
                <img src={`${import.meta.env.BASE_URL}/images/Apple.png`} alt="Guitar" style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }} />
                </div>
                <div style={{ width: "50%", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <h2 style={{ textAlign: "center", marginBottom: "20px", fontSize: "1.5rem", color: "#333" }}>Songs List</h2>
                <ul style={{ listStyleType: "none", padding: 0, fontSize: "1.2rem", color: "#555" }}>
                    {["Song 1", "Song 2", "Song 3", "Song 4", "Song 5"].map((song, index) => (
                    <li key={index} style={{ marginBottom: "10px", display: "flex", alignItems: "center", border: "1px solid #ddd", borderRadius: "5px", padding: "10px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
                        <span style={{ flex: 1 }}>{song}</span>
                        <button style={{ backgroundColor: "#007BFF", color: "#fff", border: "none", borderRadius: "5px", padding: "5px 10px", cursor: "pointer" }}>
                        Play
                        </button>
                    </li>
                    ))}
                </ul>
                </div>
            </DialogBody>
            </DialogContent>
            </DialogRoot>
            )}

            <Canvas style={{ width: '100vw', height: '100vh', background:"black", msOverflowStyle: "none", scrollbarWidth: "none", overflow: "hidden" }} dpr={1}> 
            <ScrollControls pages={7} style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}>
                <DynamicLighting />
                <GLTFStage />
                <mesh position={[0, 0, -10]} rotation={[Math.PI, Math.PI , Math.PI]} receiveShadow>
                <planeGeometry args={[50, 30]} />
                <meshStandardMaterial color="#000000" side={THREE.DoubleSide} />
                </mesh>
                {/* <SpinningCylinder /> */}
            </ScrollControls>
            {/* <ambientLight intensity={1} />
            <OrbitControls/> */}
            </Canvas>
            </div>
            </div>
    );

}

useGLTF.preload(`${import.meta.env.BASE_URL}/models/stage2.glb`);
