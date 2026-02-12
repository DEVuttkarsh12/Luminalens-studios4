import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import videoSrc from '../assets/lls-logo.mp4';

function MovingStars() {
    const ref = useRef();
    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 60;
            ref.current.rotation.y -= delta / 90;
        }
    });
    return (
        <group ref={ref}>
            <Stars
                radius={100}
                depth={60}
                count={8000}
                factor={6}
                saturation={0}
                fade
                speed={0.5}
            />
        </group>
    );
}

export default function Background({ phase, onVideoEnded }) {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.error("Background video autoplay failed:", error);
                if (onVideoEnded) onVideoEnded();
            });
        }
    }, [phase]);

    const isVideoPhase = phase === 'video';
    const isSiteOrReveal = phase === 'reveal' || phase === 'site';

    const videoStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'filter 2s ease, opacity 2s ease',
        filter: isVideoPhase ? 'none' : 'blur(12px) brightness(0.6)',
        opacity: isVideoPhase ? 1 : 0,
        mixBlendMode: isVideoPhase ? 'normal' : 'screen',
        zIndex: isVideoPhase ? 5000 : 0,
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            zIndex: isVideoPhase ? 5000 : 0,
            pointerEvents: 'none',
            background: 'transparent',
            overflow: 'hidden'
        }}>
            {/* The base texture layer - moved from body to ensure it stays behind everything */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'var(--bg-color)',
                backgroundImage: 'var(--bg-image)',
                backgroundAttachment: 'fixed',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundBlendMode: 'overlay',
                zIndex: -1
            }} />

            {isVideoPhase && (
                <video
                    ref={videoRef}
                    src={videoSrc}
                    muted
                    playsInline
                    onEnded={onVideoEnded}
                    style={videoStyle}
                />
            )}

            {isSiteOrReveal && (
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
                    <Canvas camera={{ position: [0, 0, 5], fov: 75 }} style={{ background: 'transparent' }}>
                        <Suspense fallback={null}>
                            <MovingStars />
                        </Suspense>
                    </Canvas>
                </div>
            )}
        </div>
    );
}
