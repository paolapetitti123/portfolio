import { Html, useGLTF, Float, PresentationControls } from "@react-three/drei";
import { Leva } from "leva";
import { FloatType } from "three";

export const Tablet = () => {
    const tablet = useGLTF('./tablet.gltf')

    return (
        <>
       
            <PresentationControls
                polar={[-0.4, 0.2]}
                azimuth={[-.25, 0.25]}
                config={{mass:2, tension:400}}
                snap
                >
                <Float rotationIntensity={.04}>
                    <primitive object={tablet.scene} position={[0,-15,1.5]} rotation-z={.02}>
                    
                    </primitive>
                    </Float>
         </PresentationControls>

      
        </>
    )
    
}

useGLTF.preload('../public/tablet.gltf')