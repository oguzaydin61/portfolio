import { Suspense, useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Preload, useFBX, useGLTF } from "@react-three/drei"
import CanvasLoader from '../Loader'


const Computers = ({isMobile}) => {
  const car = useGLTF('./space_gif/scene.gltf')
  return (
    <mesh>
    <hemisphereLight intensity={.8} groundColor='black' />
    <spotLight
      position={[-20, 50, 10]}
      angle={1}
      penumbra={1}
      intensity={1}
      castShadow
      shadow-mapSize={1024}
    />
    <pointLight intensity={1} />
    <primitive
      object={car.scene}
      scale={isMobile ? 0.30 : 0.45}
      //position ile dairesel dönüş ayarlanıyor muhtemelen x ile
      position={isMobile ? [0, -0.4, -0] : [0, -0.7, -0]}
      autoRotate={false}
      rotation={[-0.01, 0, -0.0]}
    />
  </mesh>
  )
}

const ComputersCanvas = () => {
 const [isMobile, setIsMobile] = useState(false);
 useEffect(() => {
   const mediaQuery = window.matchMedia('(max-width:500px)');
   setIsMobile(mediaQuery.matches);

   const handleMediaQueryChange = (event) => {
    setIsMobile(event.matches);
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return() => {
      mediaQuery.removeEventListener('change',handleMediaQueryChange);
    }
   }
 
   
 }, [])
 


  //camera ile ayarla
  return (
    <Canvas
      frameloop="demand" shadows camera={{ position: [0, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false}
         maxPolarAngle={Math.PI / 2}
         minPolarAngle={Math.PI / 2}

          autoRotate={true}
          autoRotateSpeed={1}
          
          
          

        />
        <Computers isMobile={isMobile}/>
      </Suspense>
      <Preload all />
    </Canvas>
  );

}

export default ComputersCanvas