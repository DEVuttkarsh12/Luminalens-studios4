import { motion } from 'framer-motion';
import HeroScene from './HeroScene';

export default function Hero() {
    return (
        <section id="home" className="section" style={{ height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
            <HeroScene />

            <div className="container hero-container" style={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start'
            }}>
                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        textAlign: 'left',
                        width: '100%'
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
                        fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
                        lineHeight: 0.9,
                        marginBottom: '2.5rem',
                        maxWidth: '850px',
                        fontWeight: 900,
                        textAlign: 'left',
                        color: '#fff'
                    }}
                        className="hero-title"
                    >
                        Your dream <br />
                        <span style={{
                            color: '#fff',
                            filter: 'drop-shadow(0 10px 20px rgba(127, 58, 161, 0.4))',
                            textShadow: '0 0 10px rgba(255,255,255,0.2)'
                        }}>Our canvas</span>
                    </h1>

                    <p style={{
                        color: 'rgba(241, 245, 249, 0.95)',
                        maxWidth: '550px',
                        fontSize: '1.25rem',
                        marginBottom: '3.5rem',
                        lineHeight: 1.7,
                        letterSpacing: '0.01em',
                        fontWeight: 400,
                        textAlign: 'left'
                    }}
                        className="hero-subtext"
                    >
                        We’re a multimedia design company working across 3D, motion, video, digital, and social. Everything we create comes from one place and one mindset, so your brand stays clear and consistent wherever it shows up.
                    </p>

                    <div className="hero-btns" style={{ display: 'flex', gap: '30px', justifyContent: 'flex-start' }}>
                        <button className="glow-btn" style={{ background: 'var(--accent-gradient)', color: '#fff', border: 'none' }}>View Projects</button>
                        <button style={{
                            border: '1px solid var(--primary-glow)',
                            padding: '14px 36px',
                            borderRadius: '4px',
                            color: 'var(--text-main)',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            fontSize: '0.9rem',
                            background: 'transparent'
                        }}
                            onMouseEnter={(e) => e.target.style.background = 'rgba(127, 58, 161, 0.1)'}
                            onMouseLeave={(e) => e.target.style.background = 'transparent'}
                        >
                            Our Services
                        </button>
                    </div>
                </motion.div>
                <style>{`
                    @media (max-width: 768px) {
                        .hero-container { justify-content: center !important; }
                        .hero-content { align-items: center !important; textAlign: center !important; }
                        .hero-title { font-size: 3.2rem !important; text-align: center !important; }
                        .hero-subtext { text-align: center !important; font-size: 1.1rem !important; }
                        .hero-btns { flex-direction: column; width: 100%; gap: 15px !important; }
                        .hero-btns button { width: 100%; }
                    }
                    @media (min-width: 1800px) {
                        .hero-title { font-size: 7rem !important; max-width: 1200px !important; }
                        .hero-subtext { font-size: 1.5rem !important; max-width: 750px !important; }
                    }
                `}</style>
            </div>

            {/* Minimal Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                style={{
                    position: 'absolute',
                    bottom: '40px',
                    left: '50.1%',
                    transform: 'translateX(-50%)',
                    width: '1px',
                    height: '50px',
                    background: 'linear-gradient(to bottom, #fff, transparent)',
                    opacity: 0.2
                }}
            />
        </section>
    );
}
