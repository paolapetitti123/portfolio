import { Suspense, useEffect,  memo, useRef, forwardRef, useState } from "react";
import Astronaut from "./Astronaut";
import Galaxy from "./Galaxy"
import { Bloom, DepthOfField, EffectComposer } from "@react-three/postprocessing";
import { motion } from "framer-motion-3d";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { framerMotionConfig } from "./motionConfig";
import { useScroll, Float, Bounds, useBounds, useGLTF, CameraControls } from "@react-three/drei";
import { PlanetFour  } from "./PlanetFour";
import { useControls, button } from 'leva';
import { Perf } from 'r3f-perf';
import * as THREE from 'three'
import { PlanetOne } from "./PlanetOne";
import { PlanetTwo } from "./PlanetTwo";
import { PlanetThree } from "./PlanetThree";
import { Tablet } from './Tablet'
import { Projects } from "./Projects";


export default function Experience(props)
{
    const { menuOpened, onPlanetClick} = props;
    const {viewport} = useThree();
    
    const data = useScroll();
    const [section, setSection] = useState(0);


    const cameraPositionX = useMotionValue();
    const cameraLookAtX = useMotionValue();



    useEffect(() => {
        animate(cameraPositionX, menuOpened ? -4 : 0, {
            ...framerMotionConfig
        });
        animate(cameraLookAtX, menuOpened ? 4 : 0, {
            ...framerMotionConfig
        });
    },[menuOpened]);

    const [characterAnimation, setCharacterAnimation ] = useState(1);

    useEffect(() => {
        setCharacterAnimation(0);
        setTimeout(() => {
            setCharacterAnimation(section === 0 ? 1 : 2);
        },700);
    }, [section])

    useFrame((state) => {
        state.camera.position.x =cameraPositionX.get();
        state.camera.lookAt(cameraLookAtX.get(), 0,0);

        let currSection = Math.floor(data.scroll.current * data.pages);
        if(currSection > 3){
            currSection = 3;
            setCharacterAnimation(4);
        }

        if(currSection == 2 ){
            setCharacterAnimation(1);
        }

        if (currSection !== section){
            setSection(currSection);
        }

    });

    const { perfVisible } = useControls('debug', {
        perfVisible: false
    })


    return <>
      { perfVisible && <Perf position="top-left" /> }
      
        <ambientLight intensity={3} />
        <group>
            <PlanetOne position={[4,0,0]} />
            <PlanetTwo position={[-2,-6,-2]} />
            <PlanetThree position={[6,-15,-2]} />
            <Tablet />
        </group>

        <motion.group position={[0,1,1]} scale={[1,1,1]} rotation-y={-Math.PI / 4} animate={{ y: section === 0 ? 0 : 1 }}>
            <Galaxy />
        </motion.group>
        <EffectComposer disableNormalPass multisampling={8}>
            <Bloom luminanceThreshold={1.1} mipmapBlur />
            <DepthOfField 
            focusDistance={0.030}
            focusLength={0.030}
             />
        </EffectComposer>

        <Suspense>
            <motion.group
                    position={[0,-2,1]}
                    rotation={[0.01,-0.5,0]}
                    animate={"" + section}
                    transition={{
                        duration: 1
                    }}
                    variants={{
                        0: {
                        scaleX: 0.9,
                        scaleY: 0.9,
                        scaleZ: 0.9,
                        x: 1,
                        y: -1.5,
                        rotateY: -0.2 
                        },
                        1: {
                            x: 2,
                            y: -viewport.height - 2,
                            z: 1,
                            rotateX: 0,
                            rotateY: -0.4,
                            rotateZ: 0
                        },
                        2: {
                            x: -5,
                            y: -viewport.height * 2 - .5,
                            z: 0,
                            rotateX: 0,
                            rotateY: 1,
                            rotateZ: 0
                        },
                        3: {
                            x: 1,
                            y: -viewport.height *3 - 2,
                            z: 1,
                            rotateX: 0,
                            rotateY: -0.2,
                            rotateZ: 0
                        }
                    }}
            >
                    <Astronaut animationIndex={characterAnimation} section={section} />
            </motion.group>
            {/* <Float rotationIntensity={.4}> */}
            <PlanetFour />
        </Suspense>
        <Projects />
    </>
}
