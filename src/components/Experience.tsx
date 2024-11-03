import { OrbitControls,
     useHelper, Text,
     useGLTF} from "@react-three/drei";
// import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { DirectionalLight, DirectionalLightHelper } from "three";


function Model(){
    const gltf = useGLTF(import.meta.env.BASE_URL + '/models/stage.glb');
    gltf.scene.rotation.set(0, -Math.PI / 2, 0);
    return <primitive object={gltf.scene} />;
}


function Experience() {

    return (
        <>
            <OrbitControls />
            <Model/>
            <Text
                scale={[60,60,60]}
                color="White"
                anchorX={"center"}
                anchorY={"middle"}
                position={[0,45,-10]}
                >
                    test 
            </Text>
            <mesh position={[40,10,30]}>
                <boxGeometry args={[10,10,10]}/>
            </mesh>
            <directionalLight position={[68,68,0]} intensity={1} />
            <directionalLight position={[68,68,30]} intensity={1}/>
        </>
    )
}

export default Experience;