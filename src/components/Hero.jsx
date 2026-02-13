import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Environment } from '@react-three/drei';
import RubiksCube from './RubiksCube';

export default function Hero() {
    return (
        <section id="home" className="section" style={{ height: '100vh', display: 'flex', alignItems: 'center', position: 'relative', background: 'transparent' }}>

            <div className="container hero-container" style={{
                position: 'relative',
                zIndex: 1, // Let the global navbar be visible
                width: '100%',
                maxWidth: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                background: 'transparent'
            }}>
                {/* Atmospheric Glows behind the glass card */}
                <div style={{
                    position: 'absolute',
                    top: '10%',
                    left: '5%',
                    width: '60%',
                    height: '60%',
                    background: 'radial-gradient(circle, rgba(127, 58, 161, 0.1) 0%, transparent 70%)',
                    filter: 'blur(100px)',
                    zIndex: 0,
                    pointerEvents: 'none'
                }}></div>
                <div style={{
                    position: 'absolute',
                    bottom: '10%',
                    right: '5%',
                    width: '60%',
                    height: '60%',
                    background: 'radial-gradient(circle, rgba(93, 34, 209, 0.1) 0%, transparent 70%)',
                    filter: 'blur(100px)',
                    zIndex: 0,
                    pointerEvents: 'none'
                }}></div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="glass-hero-card"
                    style={{
                        width: '91%',
                        maxWidth: '1400px',
                        height: '78vh',
                        marginTop: '80px', // Create gap from fixed Navbar
                        display: 'flex',
                        flexDirection: 'row', // Side-by-side layout
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: 'clamp(25px, 4vw, 60px)',
                        zIndex: 10,
                        transform: 'translateZ(0)',
                        WebkitBackfaceVisibility: 'hidden'
                    }}
                >
                    {/* Left: Content */}
                    <div style={{
                        textAlign: 'left',
                        maxWidth: '600px',
                        zIndex: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start'
                    }}>
                        <span style={{
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            letterSpacing: '0.5em',
                            color: 'rgba(255,255,255,0.9)', // Changed from 0.3 to pop against tint
                            textTransform: 'uppercase',
                            marginBottom: '1.2rem',
                            fontFamily: '"Inter", sans-serif'
                        }}>
                            Capabilities / Creative Studio
                        </span>

                        <h1 className="text-premium" style={{
                            fontSize: 'clamp(2rem, 5vw, 4.2rem)',
                            lineHeight: 1,
                            fontWeight: 900,
                            color: '#fff',
                            textTransform: 'uppercase',
                            letterSpacing: '-0.02em',
                            fontFamily: '"Outfit", sans-serif',
                            marginBottom: '1.5rem'
                        }}>
                            Your <span className="text-gradient-purple">Dream</span><br />
                            Our <span className="text-gradient-purple">Canvas</span>
                        </h1>

                        <p style={{
                            fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)',
                            lineHeight: 1.7,
                            color: 'rgba(255,255,255,0.85)', // Changed from 0.45 to pop against tint
                            fontWeight: 400,
                            maxWidth: '420px',
                            marginBottom: '2.5rem',
                            fontFamily: '"Inter", sans-serif'
                        }}>
                            We build high-end digital experiences using 3D, motion, and visual storytelling. Everything we create is designed to be premium, consistent, and memorable.
                        </p>

                        <button className="glow-btn" style={{ padding: '14px 35px', fontSize: '0.75rem' }}>
                            Start a Project
                        </button>
                    </div>

                    {/* Right: 3D Cube Scene */}
                    <div className="hero-3d-scene" style={{
                        flex: 1,
                        height: '100%',
                        position: 'relative',
                        zIndex: 5
                    }}>
                        <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
                            <ambientLight intensity={0.6} />
                            <pointLight position={[10, 10, 10]} intensity={2.5} />
                            <pointLight position={[-10, -10, -10]} intensity={1} color="#c4b1f1" />
                            <spotLight position={[0, 5, 10]} angle={0.15} penumbra={1} intensity={3} />
                            <Environment preset="city" />
                            <Suspense fallback={null}>
                                <RubiksCube />
                            </Suspense>
                        </Canvas>
                    </div>

                    {/* Subtle Internal Glows */}
                    <div style={{
                        position: 'absolute',
                        top: '-10%',
                        right: '-10%',
                        width: '40%',
                        height: '40%',
                        background: 'radial-gradient(circle, rgba(127, 58, 161, 0.08) 0%, transparent 70%)',
                        pointerEvents: 'none'
                    }}></div>
                </motion.div>

                <style>{`
                    @media (max-width: 991px) {
                        .hero-3d-scene { display: none; }
                        .glass-hero-card { flex-direction: column !important; justify-content: center !important; }
                    }

                    @media (max-width: 768px) {
                        .hero-container { padding: 20px; }
                        .glass-hero-card { width: 92% !important; height: 75vh !important; padding: 25px !important; margin-top: 60px !important; }
                        h1 { font-size: 2.8rem !important; }
                        p { font-size: 0.8rem !important; }
                    }
                `}</style>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0], opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 2 }}
                style={{
                    position: 'absolute',
                    bottom: '40px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px'
                }}
            >
                <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, #fff, transparent)' }}></div>
            </motion.div>
        </section>
    );
}
