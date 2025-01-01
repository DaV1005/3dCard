/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 public/models/Witch.gltf -o src/components/Witch.jsx -r public 
*/

import React, { useEffect } from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'

export function Witch({hover, ...props}) {
  const group = React.useRef()
  const { scene, animations } = useGLTF('/models/Witch.gltf')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  const { actions } = useAnimations(animations, group)

  

  useEffect(() =>  {
    const animate = hover ? "Victory" : "Walk";
    actions[animate].reset().fadeIn(0.5).play();
    return () => actions[animate].fadeOut(0.5);
  }, [hover]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Bone} />
          <group name="Body_1">
            <skinnedMesh name="Cube004" geometry={nodes.Cube004.geometry} material={materials.Skin} skeleton={nodes.Cube004.skeleton} />
            <skinnedMesh name="Cube004_1" geometry={nodes.Cube004_1.geometry} material={materials.Clothes} skeleton={nodes.Cube004_1.skeleton} />
            <skinnedMesh name="Cube004_2" geometry={nodes.Cube004_2.geometry} material={materials.Belt} skeleton={nodes.Cube004_2.skeleton} />
            <skinnedMesh name="Cube004_3" geometry={nodes.Cube004_3.geometry} material={materials.Gold} skeleton={nodes.Cube004_3.skeleton} />
            <skinnedMesh name="Cube004_4" geometry={nodes.Cube004_4.geometry} material={materials.Hat} skeleton={nodes.Cube004_4.skeleton} />
            <skinnedMesh name="Cube004_5" geometry={nodes.Cube004_5.geometry} material={materials.Hair} skeleton={nodes.Cube004_5.skeleton} />
            <skinnedMesh name="Cube004_6" geometry={nodes.Cube004_6.geometry} material={materials.Face} skeleton={nodes.Cube004_6.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/Witch.gltf')
