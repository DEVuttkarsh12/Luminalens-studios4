import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function HeroGeom() {
    const groupRef = useRef();

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.05; // Slower, majestic rotation
        }
    });

    return (
        <group ref={groupRef}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>

                {/* 1. The Structure - Clean Icosahedron Wireframe */}
                <mesh scale={1.8}>
                    <icosahedronGeometry args={[1, 1]} /> {/* detail=1 for distinct geometric shape */}
                    <meshBasicMaterial
                        color="#a855f7" // Purple-500
                        wireframe
                        transparent
                        opacity={0.3} // Distinct but see-through
                    />
                </mesh>

                {/* 2. The Nodes - Glowing Points at Vertices */}
                <Points scale={1.8}>
                    <icosahedronGeometry args={[1, 1]} />
                    <PointMaterial
                        transparent
                        color="#f0abfc" // Fuchsia-400 (Pinkish)
                        size={0.06} // Larger, distinct points
                        sizeAttenuation={true}
                        depthWrite={false}
                        opacity={1}
                        emissive="#f0abfc"
                        emissiveIntensity={2}
                    />
                </Points>

                {/* 3. Inner Core - Solid subtle sphere to block background slightly */}
                <mesh scale={1.75}>
                    <icosahedronGeometry args={[1, 0]} />
                    <meshBasicMaterial color="#581c87" transparent opacity={0.1} />
                </mesh>

            </Float>
        </group>
    );
}
