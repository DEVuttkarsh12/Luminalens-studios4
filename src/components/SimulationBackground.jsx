import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  varying float vElevation;
  uniform float uTime;
  uniform vec2 uMouse;

  void main() {
    vUv = uv;
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // Dynamic wave motion
    float elevation = sin(modelPosition.x * 0.8 + uTime * 0.6) * 0.4;
    elevation += sin(modelPosition.y * 1.2 + uTime * 0.4) * 0.3;
    
    // Mouse proximity displacement
    float mouseDistance = distance(vec2(modelPosition.x, modelPosition.y), uMouse * 10.0);
    float mouseStrength = 1.0 - smoothstep(0.0, 4.0, mouseDistance);
    elevation += mouseStrength * 0.8;

    modelPosition.z += elevation;
    vElevation = elevation;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    // Colors matching the luxurious purple theme
    vec3 colorBase = vec3(0.02, 0.0, 0.08);    // Very Deep Purple
    vec3 colorGlow = vec3(0.5, 0.2, 0.9);     // Radiant Lilac
    vec3 colorHighlight = vec3(1.0, 0.8, 1.0); // Bright Highlight

    float mixStrength = (vElevation + 0.5) * 0.7;
    vec3 color = mix(colorBase, colorGlow, mixStrength);
    
    // Add highlights to peaks
    float highlightStrength = smoothstep(0.6, 1.0, vElevation);
    color = mix(color, colorHighlight, highlightStrength * 0.4);

    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function SimulationBackground() {
    const meshRef = useRef();
    const { mouse, viewport } = useThree();

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) }
    }), []);

    useFrame((state) => {
        const { clock } = state;
        if (meshRef.current) {
            meshRef.current.material.uniforms.uTime.value = clock.getElapsedTime();

            // Smoothly track mouse with slightly delayed interpolation for "fluid" feel
            const targetMouseX = (mouse.x * viewport.width) / 2;
            const targetMouseY = (mouse.y * viewport.height) / 2;
            meshRef.current.material.uniforms.uMouse.value.x += (targetMouseX - meshRef.current.material.uniforms.uMouse.value.x) * 0.05;
            meshRef.current.material.uniforms.uMouse.value.y += (targetMouseY - meshRef.current.material.uniforms.uMouse.value.y) * 0.05;
        }
    });

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[viewport.width * 2, viewport.height * 2, 128, 128]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}
