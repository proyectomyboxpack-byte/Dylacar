"use client";

import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function SedanModel() {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/sedan.glb");

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const original = child.material as THREE.MeshStandardMaterial;

        // La textura del modelo ya trae la carroceria en amarillo de marca
        // (colormap.png fue editado para eso). Solo mejoramos el acabado
        // para que se vea como pintura automotriz real, sin perder los
        // detalles de ventanas/luces que ya vienen correctos en la textura.
        child.material = new THREE.MeshPhysicalMaterial({
          map: original.map,
          metalness: 0.45,
          roughness: 0.35,
          clearcoat: 0.5,
          clearcoatRoughness: 0.25,
          envMapIntensity: 1,
        });

        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.4;
    }
  });

  return (
    <group ref={group}>
      <primitive object={scene} scale={1.6} position={[0, -0.3, 0]} />
    </group>
  );
}

export default function Car3D() {
  return (
    <div className="h-full w-full">
      <Canvas
        shadows
        camera={{ position: [4, 2, 5], fov: 42 }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.55} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-5, 3, -4]} intensity={0.5} color="#ffffff" />

        <Suspense fallback={null}>
          <SedanModel />
          <ContactShadows
            position={[0, -0.62, 0]}
            opacity={0.5}
            scale={8}
            blur={2.2}
            far={2}
          />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/sedan.glb");
