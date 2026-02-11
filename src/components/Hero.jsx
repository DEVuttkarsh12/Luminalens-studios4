import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import HeroGeom from './HeroGeom';

export default function Hero() {
    return (
        <section id="home" className="section" style={{ height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', position: 'relative' }}>


            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                    <HeroGeom />
                </Canvas>
            </div>

            <div className="container hero-container" style={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        width: '100%',
                        zIndex: 2
                    }}
                >
                    <span style={{
                        color: 'var(--text-muted)',
                        fontWeight: 700,
                        letterSpacing: '0.4em',
                        textTransform: 'uppercase',
                        fontSize: '0.8rem',
                        marginBottom: '1.5rem',
                        display: 'block'
                    }}>
                        Creative Agency
                    </span>


                    <h1 style={{
                        fontSize: 'clamp(3.5rem, 10vw, 7rem)',
                        lineHeight: 1,
                        marginBottom: '2.5rem',
                        fontWeight: 800,
                        color: '#fff',
                        letterSpacing: '-0.03em',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.1em',
                        fontFamily: '"Inter", sans-serif'
                    }}
                        className="hero-title"
                    >
                        <span style={{ display: 'flex', alignItems: 'baseline', gap: '0.3em' }}>
                            <span style={{ fontSize: '0.5em', fontWeight: 300, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)' }}>Your</span>
                            <span className="animate-gradient" style={{
                                background: 'linear-gradient(135deg, #c084fc 0%, #db2777 50%, #c084fc 100%)', // Animated Gradient loop
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text', // Standard property
                                WebkitTextFillColor: 'transparent',
                                color: 'transparent', // Fallback
                                display: 'inline-block',
                                fontStyle: 'italic',
                                fontFamily: '"Playfair Display", serif',
                                filter: 'drop-shadow(0 0 25px rgba(192, 132, 252, 0.4))', // Stronger glow
                                paddingRight: '0.1em' // Prevent italic clip
                            }}>dream</span>
                        </span>
                        <span style={{ display: 'flex', alignItems: 'baseline', gap: '0.3em' }}>
                            <span style={{ fontSize: '0.5em', fontWeight: 300, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)' }}>Our</span>
                            <span className="animate-gradient" style={{
                                background: 'linear-gradient(135deg, #c084fc 0%, #db2777 50%, #c084fc 100%)',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                color: 'transparent',
                                display: 'inline-block',
                                fontStyle: 'italic',
                                fontFamily: '"Playfair Display", serif',
                                filter: 'drop-shadow(0 0 25px rgba(219, 39, 119, 0.4))',
                                paddingRight: '0.1em'
                            }}>canvas</span>
                        </span>
                    </h1>

                    <p style={{
                        color: 'rgba(241, 245, 249, 0.8)',
                        maxWidth: '600px',
                        fontSize: '1.25rem',
                        marginBottom: '3.5rem',
                        lineHeight: 1.7,
                        fontWeight: 400
                    }}
                        className="hero-subtext"
                    >
                        We're a multimedia design company working across 3D, motion, video, digital, and social. Everything we create comes from one place and one mindset.
                    </p>

                    <div className="hero-btns" style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                        <button className="glow-btn" style={{ background: 'var(--accent-gradient)', color: '#fff', border: 'none', padding: '16px 40px' }}>View Projects</button>
                        <button style={{
                            border: '1px solid rgba(255,255,255,0.2)',
                            padding: '16px 40px',
                            borderRadius: '4px',
                            color: '#fff',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            fontSize: '0.9rem',
                            background: 'rgba(255,255,255,0.03)',
                            backdropFilter: 'blur(5px)'
                        }}
                            onMouseEnter={(e) => { e.target.style.background = 'rgba(255,255,255,0.1)'; e.target.style.borderColor = '#fff'; }}
                            onMouseLeave={(e) => { e.target.style.background = 'rgba(255,255,255,0.03)'; e.target.style.borderColor = 'rgba(255,255,255,0.2)'; }}
                        >
                            Our Services
                        </button>
                    </div>
                </motion.div>
                <style>{`
                    @media (max-width: 768px) {
                        .hero-title { font-size: 3.5rem !important; }
                        .hero-btns { flex-direction: column; width: 100%; gap: 15px; }
                        .hero-btns button { width: 100%; }
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
