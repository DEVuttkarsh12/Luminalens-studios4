import React, { useRef, useEffect, useState, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, useGLTF } from '@react-three/drei'; // Revert to useGLTF for better relative path handling
import * as THREE from 'three';

const MODEL_PATH = '/robot/scene.gltf';

// Simple ErrorBoundary component for the model
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ModelBackground Error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return null;
        }
        return this.props.children;
    }
}

function Robot() {
    // using useGLTF instead of useLoader(GLTFLoader)
    const gltf = useGLTF(MODEL_PATH);
    const groupRef = useRef();

    useEffect(() => {
        if (!gltf || !gltf.scene) return;

        try {
            // Traverse to fix materials
            gltf.scene.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    if (child.material) {
                        child.material.side = THREE.DoubleSide;
                        child.material.roughness = 0.6;
                        child.material.metalness = 0.4;
                    }
                }
            });

            // Auto-center and normalize scale
            const box = new THREE.Box3().setFromObject(gltf.scene);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());

            // Scale normalization
            const maxDim = Math.max(size.x, size.y, size.z);
            const scaleFactor = 3 / maxDim; // Make it roughly 3 units tall

            gltf.scene.scale.setScalar(scaleFactor);
            gltf.scene.position.sub(center.multiplyScalar(scaleFactor));

        } catch (err) {
            console.error("Error processing robot model:", err);
        }

    }, [gltf]);

    useFrame((state) => {
        if (groupRef.current && state.mouse) {
            // Mouse X is -1 to 1.
            // Robot should face front (Z+) by default.
            // If the model is facing say X+ by default, we need an offset.
            // Let's assume it faces Z+ correctly after our centering.

            // Target rotations for looking at mouse
            const targetRotationY = (state.mouse.x || 0) * 0.5; // Look left/right
            const targetRotationX = -(state.mouse.y || 0) * 0.3; // Look up/down

            // Smooth interpolation
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.1);
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.1);

            // Idle floating
            if (state.clock) {
                const t = state.clock.elapsedTime;
                groupRef.current.position.y = Math.sin(t * 1.5) * 0.1 - 0.5;
                // Add a tiny bit of idle rotation noise
                groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.02;
            }
        }
    });

    return (
        // Initial rotation might be needed if the model faces sideways by default. 
        // Let's try rotating it 180 degrees if it's facing away, or 90 if sideways.
        // Based on user feedback "not facing straight", let's assume it needs a -Math.PI / 2 offset or something if it was sideways.
        // But first let's just ensure the container is zeroed out.
        <group ref={groupRef} position={[3.5, -0.5, 0]}>
            {/* If the model itself is rotated, correct it here in the primitive or parent group */}
            <primitive object={gltf.scene} rotation={[0, -Math.PI / 2, 0]} />
        </group>
    );
}

export default function ModelBackground() {
    return (
        <Suspense fallback={null}>
            {/* Galaxy Background */}
            <Stars
                radius={100}
                depth={60}
                count={5000}
                factor={4}
                saturation={0}
                fade
                speed={0.5}
            />

            {/* Lights */}
            <ambientLight intensity={2.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={5} color="#4bd5ee" />
            <pointLight position={[-10, -10, -10]} intensity={2} color="#ff00d3" />

            <ErrorBoundary>
                <Robot />
            </ErrorBoundary>
        </Suspense>
    );
}

useGLTF.preload(MODEL_PATH);
