import { Canvas, useFrame, useThree } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { Scroll, ScrollControls, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Interface } from './Interface.jsx'
import React, { useEffect, useState, useRef } from 'react'
import { ScrollManager } from './ScrollManager.jsx'
import { MenuNav } from './MenuNav.jsx'
import { MotionConfig, animate, useMotionValue  } from 'framer-motion'
import { framerMotionConfig } from './motionConfig.js'
import * as THREE from 'three'

const App = () => {
    const [section, setSection] = useState(0);
    const [menuOpened, setMenuOpened] = useState(false);
    const [activePlanet, setActivePlanet] = useState(null);
    const [zoomEnabled, setZoomEnabled] = useState(false);
    const cameraRef = useRef();
    const scrollRef = useRef();

    const cameraPositionX = useMotionValue();
    const cameraPositionY = useMotionValue();
    const cameraPositionZ = useMotionValue();
    const cameraLookAtX = useMotionValue();
    const cameraLookAtY = useMotionValue();
    const cameraLookAtZ = useMotionValue();



    useEffect(() => {
        setMenuOpened(false);
    }, [section])



    return (
        <>
        <MotionConfig transition={{
            ...framerMotionConfig
        }}>
            <Canvas className='r3F'> 
            <PerspectiveCamera ref={cameraRef} makeDefault position={[0,0,5]} fov={75} />
            <ScrollControls 
             pages={4} damping={0.2} horizontal={false}>
                <ScrollManager section={section} onSectionChange={setSection} />
                    <Scroll>
                    <Experience menuOpened={menuOpened} />
                    </Scroll>
                    <Scroll html>
                        <Interface />
                    </Scroll>

                </ScrollControls>
            
            </Canvas>
            <MenuNav 
            onSectionChange={setSection} 
            menuOpened={menuOpened} 
            setMenuOpened={setMenuOpened}
        />
        </MotionConfig>
        {/* <Leva hidden /> */}
        </>
    )
}

export default App;