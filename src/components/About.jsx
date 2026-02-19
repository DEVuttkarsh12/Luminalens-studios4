import { motion } from 'framer-motion';
import AboutImg from '../assets/about us/Scorpio_3-removebg-preview.png';

export default function About() {
    return (
        <section id="about" className="section" style={{ position: 'relative', overflow: 'hidden', background: 'transparent' }}>
            {/* Dynamic Background Elements */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1],
                        x: [0, 50, 0],
                        y: [0, -30, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                        position: 'absolute',
                        top: '-10%',
                        left: '-10%',
                        width: '50%',
                        height: '60%',
                        background: 'radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)',
                        filter: 'blur(80px)',
                        borderRadius: '50%'
                    }}
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.05, 0.15, 0.05],
                        x: [0, -40, 0],
                        y: [0, 60, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    style={{
                        position: 'absolute',
                        bottom: '10%',
                        right: '-5%',
                        width: '40%',
                        height: '50%',
                        background: 'radial-gradient(circle, var(--secondary-glow) 0%, transparent 70%)',
                        filter: 'blur(100px)',
                        borderRadius: '50%'
                    }}
                />
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '40px',
                    alignItems: 'center'
                }}>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        style={{ textAlign: 'center' }}
                    >
                        <span style={{ color: 'var(--primary-glow)', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.8rem', display: 'block', marginBottom: '1rem' }}>
                            The Collective
                        </span>
                        <h2 className="text-gradient-purple" style={{ fontSize: 'clamp(2.2rem, 8vw, 4.5rem)', marginTop: '1rem', marginBottom: '2rem', lineHeight: 1.1 }}>Who We <br />Are.</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '600px', marginInline: 'auto' }}>
                            We’re a multidisciplinary design company bringing together designers, visual artists, and creative thinkers. We work closely, move with intention, and focus on building work that feels clear and consistent across platforms.

                        </p>
                        <div style={{ display: 'flex', gap: '20px', marginTop: '30px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <div>
                                <h4 className="heading-font" style={{ fontSize: '2rem', color: 'var(--primary-glow)' }}>10k+</h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 600 }}>Professionals</p>
                            </div>
                            <div>
                                <h4 className="heading-font" style={{ fontSize: '2rem', color: 'var(--primary-glow)' }}>100+</h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 600 }}>Projects</p>
                            </div>
                            <div>
                                <h4 className="heading-font" style={{ fontSize: '2rem', color: 'var(--primary-glow)' }}>5+</h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 600 }}>Industries</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        style={{
                            position: 'relative',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '20px'
                        }}
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.5 }}
                            className="scorpio-container"
                            style={{
                                width: '100%',
                                height: 'auto',
                                minHeight: '300px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                zIndex: 2,
                                overflow: 'visible'
                            }}
                        >
                            <img
                                src={AboutImg}
                                alt="Studio Scorpio"
                                className="about-scorpio-img"
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
            <style>{`
                .about-scorpio-img {
                    width: 160%;
                    max-width: none;
                    max-height: 1000px;
                    object-fit: contain;
                }
                @media (max-width: 768px) {
                    .about-scorpio-img {
                        width: 100% !important;
                        max-height: 400px !important;
                    }
                    .scorpio-container {
                        min-height: 300px !important;
                    }
                    #about { padding: 80px 0 !important; }
                }
            `}</style>
            <style>{`
                .about-scorpio-img {
                    width: 160%;
                    max-width: none;
                    max-height: 1000px;
                    object-fit: contain;
                }
                @media (max-width: 768px) {
                    .about-scorpio-img {
                        width: 100% !important;
                        max-height: 400px !important;
                    }
                    .scorpio-container {
                        min-height: 300px !important;
                    }
                    #about { padding: 80px 0 !important; }
                }
            `}</style>
        </section>
    );
}
