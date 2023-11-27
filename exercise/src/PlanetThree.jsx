import { useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react'
import { useGLTF } from "@react-three/drei";

export const PlanetThree = () => {
    const planet1 = useGLTF('./planetOne.gltf')
    
    const planetRotation = useRef();

    useFrame((state, delta) => {
        planetRotation.current.rotation.y += delta * 0.4
        planetRotation.current.rotation.z += delta * 0.0004
    })

    const eventHandler = () => {
        console.log("planet clicked");
    }


    return (<>

      <group ref={planetRotation} position={[6,-16,-2]} rotation-x={.2} onClick={eventHandler}>
            <primitive object={planet1.scene} />
      
    </group>
            
            
    </>
    )
}
useGLTF.preload('../public/planetOne.gltf')