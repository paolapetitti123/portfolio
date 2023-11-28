import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { Scroll, ScrollControls } from '@react-three/drei'
import { Interface } from './Interface.jsx'
import { useEffect, useState } from 'react'
import { ScrollManager } from './ScrollManager.jsx'
import { MenuNav } from './MenuNav.jsx'
import { MotionConfig } from 'framer-motion'
import { framerMotionConfig } from './motionConfig.js'


function App(){
    const [section, setSection] = useState(0);
    const [menuOpened, setMenuOpened] = useState(false);
    
    useEffect(() => {
        setMenuOpened(false);
    }, [section])

    return (
        <>
        <MotionConfig transition={{
            ...framerMotionConfig
        }}>
            <Canvas className='r3F' shadows camera={{fov: 75}}> 
            <ScrollControls pages={4} damping={0.2}>
                <ScrollManager section={section} onSectionChange={setSection} />
                <Scroll>
                    <Experience menuOpened={menuOpened}/>
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