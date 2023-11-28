import { useFrame } from '@react-three/fiber';
import { useRef } from 'react'
import { useGLTF } from "@react-three/drei";

export const PlanetTwo = () => {
    const planet1 = useGLTF('./planet-3.gltf')
    
    const planetRotation = useRef();

    useFrame((state, delta) => {
        planetRotation.current.rotation.y += delta * 0.4
        planetRotation.current.rotation.z += delta * 0.0004
    })

    const eventHandler = () => {
        console.log("planet Two clicked");
    }


    return (<>

      <group ref={planetRotation} position={[-3,-15,-4]} rotation-x={.2} onClick={eventHandler}>
            <primitive object={planet1.scene}  />
      
    </group>
            
            
    </>
    )
}
useGLTF.preload('../public/planet-3.gltf')