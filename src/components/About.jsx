import { motion } from 'framer-motion';

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
                    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                    gap: '80px',
                    alignItems: 'center'
                }}>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span style={{ color: 'var(--primary-glow)', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.9rem', display: 'block', marginBottom: '1rem' }}>
                            The Collective
                        </span>
                        <h2 className="text-gradient-purple" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginTop: '1rem', marginBottom: '2rem' }}>Who We <br />Are.</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                            We’re a multidisciplinary design company bringing together designers, visual artists, and creative thinkers. We work closely, move with intention, and focus on building work that feels clear and consistent across platforms.

                        </p>
                        <div style={{ display: 'flex', gap: '30px', marginTop: '40px' }}>
                            <div>
                                <h4 className="heading-font" style={{ fontSize: '2.5rem', color: 'var(--primary-glow)' }}>10k+</h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 600 }}>creative professionals
                                </p>
                            </div>
                            <div>
                                <h4 className="heading-font" style={{ fontSize: '2.5rem', color: 'var(--primary-glow)' }}>100+</h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 600 }}>finished projects</p>
                            </div>
                            <div>
                                <h4 className="heading-font" style={{ fontSize: '2.5rem', color: 'var(--primary-glow)' }}>5+</h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 600 }}>Industries partnered with</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        style={{ position: 'relative' }}
                    >
                        <motion.div
                            whileHover={{ y: -10, scale: 1.02 }}
                            transition={{ duration: 0.5 }}
                            className="glass-card-premium"
                            style={{
                                width: '100%',
                                height: '500px',
                                borderRadius: '30px',
                                overflow: 'hidden',
                                position: 'relative',
                                zIndex: 2
                            }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop"
                                alt="Studio Team"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                            />
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(45deg, rgba(84, 22, 181, 0.4), transparent)'
                            }}></div>
                        </motion.div>

                        {/* Decorative element */}
                        <motion.div
                            animate={{
                                scale: [1, 1.05, 1],
                                opacity: [0.2, 0.4, 0.2]
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            style={{
                                position: 'absolute',
                                top: '-20px',
                                right: '-20px',
                                width: '200px',
                                height: '200px',
                                border: '2px solid var(--primary-glow)',
                                borderRadius: '30px',
                                zIndex: 1
                            }}
                        ></motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
