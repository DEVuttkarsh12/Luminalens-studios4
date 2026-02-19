import { motion } from 'framer-motion';

export default function Offerings() {
    return (
        <section className="section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    style={{ marginBottom: '5rem' }}
                >
                    <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '1.5rem', fontWeight: 900 }}>Services we offer</h2>
                    <div style={{ width: '60px', height: '1px', background: '#fff', opacity: 0.3 }}></div>
                </motion.div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(280px, 90vw, 400px), 1fr))',
                    gap: '30px'
                }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="glass"
                        style={{
                            padding: 'clamp(30px, 8vw, 60px)',
                            borderRadius: '24px',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            background: 'rgba(15, 10, 45, 0.25)',
                            backdropFilter: 'blur(16px) saturate(180%)',
                            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
                        }}
                    >
                        <h3 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', marginBottom: '1.5rem', fontWeight: 700 }}>Core Services</h3>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {['3D Character Design', 'CGI Environment Building', 'VFX Post-Production', '3D Product Visualization'].map(item => (
                                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '15px', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                                    <div style={{ width: '4px', height: '4px', background: '#fff', opacity: 0.5, flexShrink: 0 }}></div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                    [diff_block_end]
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="glass"
                        style={{ padding: 'clamp(30px, 8vw, 60px)', borderRadius: '24px' }}
                    >
                        <h3 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', marginBottom: '1.5rem', fontWeight: 700 }}>Additional Focus</h3>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {['Game-ready Asset Creation', '3D Sculpting for Print', 'High-end Illustrations', 'Motion Graphics Design'].map(item => (
                                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '15px', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                                    <div style={{ width: '4px', height: '4px', background: '#888', opacity: 0.5, flexShrink: 0 }}></div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
