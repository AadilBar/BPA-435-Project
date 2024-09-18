import { OrbitControls } from "@react-three/drei";


function Experience() {
    return (
        <>
            <OrbitControls/>
            <mesh>
                <boxGeometry attach="geometry" args={[1, 1, 1]} />
            </mesh>
        
        
        </>
    )
}

export default Experience;