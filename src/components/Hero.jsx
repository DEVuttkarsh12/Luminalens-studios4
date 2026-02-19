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
                    // background: 'radial-gradient(circle, rgba(127, 58, 161, 0.1) 0%, transparent 70%)',
                    // filter: 'blur(100px)',
                    zIndex: 0,
                    pointerEvents: 'none'
                }}></div>
                <div style={{
                    position: 'absolute',
                    bottom: '10%',
                    right: '5%',
                    width: '60%',
                    height: '60%',
                    // background: 'radial-gradient(circle, rgba(93, 34, 209, 0.1) 0%, transparent 70%)',
                    // filter: 'blur(100px)',
                    zIndex: 0,
                    pointerEvents: 'none'
                }}></div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    style={{
                        width: '91%',
                        maxWidth: 'var(--container-width)', // Use CSS variable for scaling
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: 'clamp(25px, 4vw, 100px)', // Increased upper bound
                        zIndex: 10,
                        marginTop: '100px', // More breathing room
                        gap: '5vw' // Explicit gap for spacing
                    }}
                >
                    {/* Left: Content */}
                    <div style={{
                        textAlign: 'left',
                        maxWidth: '800px', // Increased for large screens
                        zIndex: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start'
                    }}>
                        <span style={{
                            fontSize: 'clamp(0.7rem, 0.8vw, 0.9rem)',
                            fontWeight: 700,
                            letterSpacing: '0.5em',
                            textTransform: 'uppercase',
                            marginBottom: '1.5rem',
                            fontFamily: '"Inter", sans-serif',
                            color: 'rgba(255,255,255,0.7)',
                            display: 'block'
                        }}>
                            Capabilities / Creative Studio
                        </span>
                        <div style={{ display: 'flex', flexDirection: 'column' }}></div>
                        <h1 className="text-premium" style={{
                            fontSize: 'clamp(2rem, 6vw, 4.8rem)',
                            lineHeight: 1.1,
                            fontWeight: 900,
                            color: '#fff',
                            textTransform: 'uppercase',
                            marginBottom: '2rem'
                        }}>
                            Your <span className="text-gradient-purple">Dream</span><br />
                            Our <span className="text-gradient-purple">Canvas</span>
                        </h1>

                        <p style={{
                            fontSize: 'clamp(0.85rem, 1.3vw, 1.2rem)', // Increased upper bound
                            lineHeight: 1.7,
                            color: 'rgba(255,255,255,0.8)',
                            fontWeight: 400,
                            maxWidth: '550px', // More space for text
                            marginBottom: '3rem',
                            fontFamily: '"Inter", sans-serif'
                        }}>
                            We build high-end digital experiences using 3D, motion, and visual storytelling. Everything we create is designed to be premium, consistent, and memorable.
                        </p>

                        <button className="glow-btn magnetic-btn" style={{ padding: 'clamp(14px, 1vw, 20px) clamp(35px, 2.5vw, 50px)', fontSize: 'clamp(0.75rem, 0.8vw, 1rem)' }}>
                            Start a Project
                        </button>
                    </div>

                    {/* Right: 3D Cube Scene */}
                    <div className="hero-3d-scene" style={{
                        flex: 1.2, // Give it more weight on large screens
                        height: '75vh',
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
                </motion.div>

                <style>{`
                    @media (max-width: 991px) {
                        .hero-3d-scene { display: none; }
                        .hero-container > div { 
                            flex-direction: column !important; 
                            justify-content: center !important; 
                            text-align: center !important;
                            padding-top: 5vh !important;
                        }
                        .hero-container > div > div { 
                            align-items: center !important; 
                            text-align: center !important; 
                        }
                    }

                    @media (max-width: 768px) {
                        .hero-container { padding: 20px; }
                        h1 { 
                            font-size: clamp(2.2rem, 10vw, 3.5rem) !important; 
                            line-height: 1.05 !important;
                            margin-bottom: 1.5rem !important;
                        }
                        p { 
                            font-size: 0.95rem !important; 
                            margin-bottom: 2rem !important;
                        }
                    }

                    @media (max-width: 480px) {
                        . hero-container > div {
                            padding-top: 10vh !important;
                        }
                        h1 { 
                            font-size: clamp(1.8rem, 12vw, 2.5rem) !important; 
                        }
                        p {
                            font-size: 0.85rem !important;
                        }
                        .glow-btn {
                            padding: 12px 25px !important;
                            font-size: 0.8rem !important;
                        }
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
