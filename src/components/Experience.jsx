import { CameraControls, Environment, MeshPortalMaterial, OrbitControls, RoundedBox, Text, useCursor, useTexture } from "@react-three/drei";
import * as THREE from "three"
import { easing } from "maath";
import {Witch} from "./Witch"
import {Knight} from "./Knight"
import {Ninja} from "./Ninja"
import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";

export const Experience = () => {
  const [active,setActive] = useState(null);
  const [hover,setHover] = useState(null);
  useCursor(hover);
  const controlsRef = useRef()
  const scene = useThree((state) => state.scene);

  useEffect(() =>{
    if (active) {
      const targetPosition = new THREE.Vector3();
      scene.getObjectByName(active).getWorldPosition(targetPosition);
      controlsRef.current.setLookAt(
        0,
        0,
        5,
        targetPosition.x,
        targetPosition.y,
        targetPosition.z,
        true,
      )
    } else{
      controlsRef.current.setLookAt(
        0,
        0,
        10,
        0,
        0,
        0,
        true,
      )
    }
  }, [active]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset="sunset"/>
      <CameraControls ref={controlsRef}/>
      <Character 
        texture={"textures/anime_art_style_a_water_based_pokemon_like_environ.jpg"} 
        name="Witch" 
        color="#332d4a"
        active = {active}
        setActive = {setActive}
        hover = {hover}
        setHover = {setHover}
      >
        <Witch scale={0.5} position-y={-1} hover={hover === "Witch"}/>
      </Character>

      <Character 
        texture={"textures/anime_art_style_a_water_based_pokemon_like_environ.jpg"} 
        position-x={-2.5} 
        rotation-y={Math.PI / 8} 
        name="Knight" 
        color="#b59750"
        active = {active}
        setActive = {setActive}
        hover = {hover}
        setHover = {setHover}
      >
        <Knight scale={0.5} position-y={-1} hover={hover === "Knight"}/>
      </Character>

      <Character 
        texture={"textures/anime_art_style_a_water_based_pokemon_like_environ.jpg"}
        position-x={2.5}
        rotation-y={-Math.PI / 8} 
        name="Ninja" 
        color="#978467"
        active = {active}
        setActive = {setActive}
        hover = {hover}
        setHover = {setHover}
        >
        <Ninja scale={0.5} position-y={-1} hover={hover === "Ninja"}/>
      </Character>
      
    </>
  );
};

  const Character = ({children, texture , name, color, active, setActive, hover, setHover, ...props}) => {
    const pic = useTexture(texture)
    const portalMaterial = useRef();

    useFrame((_state,delta) => {
      const worldOpen = active === name;
      easing.damp(portalMaterial.current, "blend", worldOpen ? 1 : 0, 0.2, delta)
    })

    return <group {...props}>
      <Text font="fonts/PressStart2P-Regular.ttf" fontSize={0.3} position={[0,-1.3,0.051]} anchorY={"bottom"}>
        {name}
        <meshBasicMaterial color={color} toneMapped={false} />
      </Text>
      <RoundedBox 
        args={[2,3,0.1]} 
        onDoubleClick={() => {setActive(active===name ? null : name)}}
        name = {name}
        onPointerEnter={() => setHover(name)}
        onPointerLeave={() => setHover(null)}
        >
          <MeshPortalMaterial 
            ref = {portalMaterial}
            blend={active === name ? 1 : 0}>
          <ambientLight intensity={1} />
          <Environment preset="sunset"/>
          {children}
          <mesh>
            <sphereGeometry args={[5,64,64]}/>
            <meshStandardMaterial map={pic} side={THREE.BackSide}/>
          </mesh>
        </MeshPortalMaterial>
      </RoundedBox>
    </group>;
  }
  
