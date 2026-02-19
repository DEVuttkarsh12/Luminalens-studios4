import { motion } from 'framer-motion';

const testimonials = [
    {
        id: 1,
        name: "Alex Rivera",
        role: "Creative Director, Nexus",
        text: "The 3D artifacts produced by Luminalens are nothing short of breathtaking. They've redefined our brand's visual language with their futuristic vision.",
        rating: 5
    },
    {
        id: 2,
        name: "Sarah Chen",
        role: "Founder, Ethereal Labs",
        text: "Seamless collaboration and stunning results. Their ability to take abstract concepts and turn them into immersive digital realities is unparalleled.",
        rating: 5
    },
    {
        id: 3,
        name: "Marcus Thorne",
        role: "Lead Developer, Chronos",
        text: "Working with them was the best decision for our project. The attention to detail in the VFX sequences they provided was truly world-class.",
        rating: 5
    }
];

export default function Testimonials() {
    return (
        <section id="testimonials" className="section" style={{ background: 'transparent' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    style={{ marginBottom: '5rem', textAlign: 'center' }}
                >
                    <span style={{
                        color: 'var(--primary-glow)',
                        fontWeight: 700,
                        letterSpacing: '0.3em',
                        textTransform: 'uppercase',
                        fontSize: '0.8rem',
                        display: 'block',
                        marginBottom: '1rem'
                    }}>
                        Client Feedback
                    </span>
                    <h2 className="text-gradient-purple" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '1.5rem', fontWeight: 900 }}>Testimonials</h2>
                    <div style={{ width: '40px', height: '2px', background: 'var(--accent-gradient)', margin: '0 auto' }}></div>
                </motion.div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(280px, 90vw, 360px), 1fr))',
                    gap: '25px',
                    padding: '0 10px'
                }}>
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10, backgroundColor: 'rgba(255, 255, 255, 0.06)' }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="glass-card-premium"
                            style={{
                                padding: 'clamp(25px, 5vw, 40px)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                height: '100%',
                                cursor: 'pointer'
                            }}
                        >
                            <div>
                                <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
                                    {[...Array(t.rating)].map((_, i) => (
                                        <span key={i} style={{ color: 'var(--primary-glow)', fontSize: '0.8rem' }}>★</span>
                                    ))}
                                </div>
                                <p style={{
                                    fontSize: '1.1rem',
                                    lineHeight: 1.7,
                                    color: 'rgba(255,255,255,0.85)',
                                    fontStyle: 'italic',
                                    marginBottom: '30px'
                                }}>
                                    "{t.text}"
                                </p>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: 'var(--accent-gradient)',
                                    opacity: 0.2
                                }}></div>
                                <div>
                                    <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>{t.name}</h4>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.role}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
