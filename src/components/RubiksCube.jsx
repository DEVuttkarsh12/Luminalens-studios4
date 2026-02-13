import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Float } from '@react-three/drei';
import * as THREE from 'three';

const GLASS_MATERIAL = {
    color: '#ffffff',
    transparent: true,
    opacity: 0.1,
    metalness: 0,
    roughness: 0.05,
    transmission: 0.5, // Better glass look
    thickness: 0.5,
};

function MiniCube({ position }) {
    return (
        <group position={position}>
            {/* Outer Glass Shell - Enhanced visibility */}
            <RoundedBox args={[0.92, 0.92, 0.92]} radius={0.08} smoothness={4}>
                <meshPhysicalMaterial
                    color="#d8c8ff" // Brighter lavender
                    transparent
                    opacity={0.1} // Increased from 0.08
                    metalness={0.2}
                    roughness={0.1}
                    transmission={0.8}
                    thickness={1}
                />
                {/* Branded edge highlight */}
                <lineSegments>
                    <edgesGeometry args={[new THREE.BoxGeometry(0.92, 0.92, 0.92)]} />
                    <lineBasicMaterial color="#c4b1f1" toneMapped={false} linewidth={1} transparent opacity={0.3} />
                </lineSegments>
            </RoundedBox>

            {/* Inner Metallic Silver Core - Luminous Finish */}
            <RoundedBox args={[0.7, 0.7, 0.7]} radius={0.12} smoothness={4}>
                <meshStandardMaterial
                    color="#ffffff" // Pure white base
                    emissive="#ffffff"
                    emissiveIntensity={0.2} // Subtle self-glow to prevent "black" look
                    metalness={0.9}
                    roughness={0.05}
                    envMapIntensity={2}
                />
            </RoundedBox>
        </group>
    );
}

export default function RubiksCube() {
    const groupRef = useRef();
    const cubeRefs = useRef([]);

    // Generate cubes with consistent glass look
    const cubes = useMemo(() => {
        const c = [];
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                for (let z = -1; z <= 1; z++) {
                    c.push({
                        pos: [x * 0.91, y * 0.91, z * 0.91],
                        initialPos: new THREE.Vector3(x * 0.91, y * 0.91, z * 0.91)
                    });
                }
            }
        }
        return c;
    }, []);

    // Animation state
    const [rotationState, setRotationState] = useState({ axis: 'y', index: 0, angle: 0 });
    const targetAngle = useRef(0);
    const currentAngle = useRef(0);
    const isRotating = useRef(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isRotating.current) {
                const axes = ['x', 'y', 'z'];
                const axis = axes[Math.floor(Math.random() * axes.length)];
                const index = Math.floor(Math.random() * 3) - 1; // -1, 0, 1

                setRotationState({ axis, index, angle: currentAngle.current });
                targetAngle.current += Math.PI / 2;
                isRotating.current = true;

                // Reset rotation after finish
                setTimeout(() => {
                    isRotating.current = false;
                }, 1500);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime();

        // Base group rotation (slow automated) + Mouse Interactivity (smooth lerp)
        if (groupRef.current) {
            // Mouse target tilt
            const targetX = state.pointer.y * 0.5;
            const targetY = state.pointer.x * 0.5;

            // Smoothly lerp towards mouse targets while maintaining time-based rotation
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.1);
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY + time * 0.1, 0.1);
            groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, state.pointer.x * 0.2, 0.1);
        }

        // Slice rotation animation
        if (isRotating.current) {
            const step = (targetAngle.current - currentAngle.current) * 0.1;
            currentAngle.current += step;
        }

        // Apply rotation to specific cubes
        cubeRefs.current.forEach((ref, i) => {
            if (!ref) return;

            const cube = cubes[i];
            const { axis, index } = rotationState;

            // Re-center cube
            ref.position.copy(cube.initialPos);
            ref.rotation.set(0, 0, 0);

            // If cube is in the active slice, rotate it
            const val = axis === 'x' ? cube.initialPos.x : axis === 'y' ? cube.initialPos.y : cube.initialPos.z;

            if (Math.abs(val - index * 0.91) < 0.1) {
                // Apply rotation based on axis
                if (axis === 'x') ref.rotation.x = currentAngle.current;
                if (axis === 'y') ref.rotation.y = currentAngle.current;
                if (axis === 'z') ref.rotation.z = currentAngle.current;

                // We need to rotate the position as well to simulate real group rotation
                ref.position.applyAxisAngle(
                    new THREE.Vector3(axis === 'x' ? 1 : 0, axis === 'y' ? 1 : 0, axis === 'z' ? 1 : 0),
                    currentAngle.current
                );
            }
        });
    });

    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <group ref={groupRef}>
                {cubes.map((cube, i) => (
                    <group key={i} ref={el => cubeRefs.current[i] = el}>
                        <MiniCube position={[0, 0, 0]} />
                    </group>
                ))}

                {/* Super Nebula Core - Layered Volumetric Blow (Brighter) */}
                <group>
                    {/* Inner intense glow */}
                    <mesh>
                        <sphereGeometry args={[1.2, 32, 32]} />
                        <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
                    </mesh>
                    {/* outer atmospheric purple glow */}
                    <mesh>
                        <sphereGeometry args={[1.8, 32, 32]} />
                        <meshBasicMaterial color="#c4b1f1" transparent opacity={0.08} />
                    </mesh>
                    {/* Soft boundary glow */}
                    <mesh>
                        <sphereGeometry args={[2.5, 32, 32]} />
                        <meshBasicMaterial color="#a855f7" transparent opacity={0.04} />
                    </mesh>
                </group>
            </group>
        </Float>
    );
}
