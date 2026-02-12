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
        <RoundedBox args={[0.92, 0.92, 0.92]} radius={0.08} smoothness={4} position={position}>
            <meshPhysicalMaterial
                color="#ffffff"
                transparent
                opacity={0.08}
                metalness={0.1}
                roughness={0.1}
                transmission={0.6}
                thickness={1}
            />
            {/* Restore neon purple edge */}
            <lineSegments>
                <edgesGeometry args={[new THREE.BoxGeometry(0.92, 0.92, 0.92)]} />
                <lineBasicMaterial color="#a855f7" toneMapped={false} linewidth={1} transparent opacity={0.4} />
            </lineSegments>
        </RoundedBox>
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
                        pos: [x * 1.02, y * 1.02, z * 1.02],
                        initialPos: new THREE.Vector3(x * 1.02, y * 1.02, z * 1.02)
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

        // Base group group rotation (slow)
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.1;
            groupRef.current.rotation.z += delta * 0.05;
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

            if (Math.abs(val - index * 1.02) < 0.1) {
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

                {/* Core Glow - Restored to Purple */}
                <mesh>
                    <sphereGeometry args={[1.5, 32, 32]} />
                    <meshBasicMaterial color="#a855f7" transparent opacity={0.03} />
                </mesh>
            </group>
        </Float>
    );
}
