import { motion } from 'framer-motion';
import { Mail, Phone, Globe } from 'lucide-react';

export default function Contact() {
    const contactInfo = [
        { icon: <Mail size={20} />, text: 'hello@studio-x.creative', label: 'Email' },
        { icon: <Phone size={20} />, text: '+91 98765 43210', label: 'Phone' },
        { icon: <Globe size={20} />, text: 'www.studio-x.creative', label: 'Website' },
    ];

    return (
        <section id="contact" className="section" style={{ minHeight: '100vh', padding: '140px 0' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    style={{ textAlign: 'center', marginBottom: '100px' }}
                >
                    <h2 style={{ fontSize: 'clamp(3rem, 10vw, 6.5rem)', lineHeight: 0.9, marginBottom: '2.5rem', fontWeight: 900 }}>
                        Let's work <br />
                        Together.
                    </h2>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem', lineHeight: 1.7 }}>
                        Available for new projects. Bring your 3D visions to life with our specialized studio.
                    </p>
                </motion.div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '80px',
                    alignItems: 'start'
                }}>
                    {/* Contact Details & QR */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="glass"
                        style={{ padding: '60px' }}
                    >
                        <h3 style={{ fontSize: '1.8rem', marginBottom: '2.5rem', letterSpacing: '0.05em' }}>Contact Info</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginBottom: '50px' }}>
                            {contactInfo.map((info) => (
                                <div key={info.label} style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                                    <div style={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '4px',
                                        background: 'rgba(255,255,255,0.03)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#fff',
                                        border: '1px solid rgba(255,255,255,0.05)'
                                    }}>
                                        {info.icon}
                                    </div>
                                    <div>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '4px' }}>{info.label}</span>
                                        <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>{info.text}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{
                            marginTop: '50px',
                            padding: '40px',
                            background: 'rgba(255,255,255,0.015)',
                            borderRadius: '8px',
                            textAlign: 'center',
                            border: '1px solid var(--glass-border)'
                        }}>
                            <div style={{
                                width: '130px',
                                height: '130px',
                                background: '#fff',
                                padding: '12px',
                                borderRadius: '4px',
                                margin: '0 auto 25px auto'
                            }}>
                                <img
                                    src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=mailto:hello@studio-x.creative&bgcolor=ffffff&color=000000"
                                    alt="Official Contact QR"
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </div>
                            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                                Feeling lazy enough? <br />
                                <span style={{ color: '#fff', fontWeight: 700 }}>Scan QR to start a conversation.</span>
                            </p>
                        </div>
                    </motion.div>

                    {/* Contact Form / Q&A */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="glass"
                        style={{ padding: '60px' }}
                    >
                        <h3 style={{ fontSize: '1.8rem', marginBottom: '2.5rem', letterSpacing: '0.05em' }}>Q&A / Query</h3>
                        <form style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px' }}>Name</label>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        borderBottom: '1px solid var(--glass-border)',
                                        padding: '15px 0',
                                        color: '#fff',
                                        outline: 'none',
                                        fontFamily: 'inherit',
                                        transition: '0.3s'
                                    }}
                                    onFocus={(e) => e.target.style.borderBottomColor = '#fff'}
                                    onBlur={(e) => e.target.style.borderBottomColor = 'rgba(255,255,255,0.1)'}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px' }}>Email</label>
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        borderBottom: '1px solid var(--glass-border)',
                                        padding: '15px 0',
                                        color: '#fff',
                                        outline: 'none',
                                        fontFamily: 'inherit',
                                        transition: '0.3s'
                                    }}
                                    onFocus={(e) => e.target.style.borderBottomColor = '#fff'}
                                    onBlur={(e) => e.target.style.borderBottomColor = 'rgba(255,255,255,0.1)'}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px' }}>Query</label>
                                <textarea
                                    placeholder="How can we help you?"
                                    rows="4"
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        borderBottom: '1px solid var(--glass-border)',
                                        padding: '15px 0',
                                        color: '#fff',
                                        outline: 'none',
                                        resize: 'none',
                                        fontFamily: 'inherit',
                                        transition: '0.3s'
                                    }}
                                    onFocus={(e) => e.target.style.borderBottomColor = '#fff'}
                                    onBlur={(e) => e.target.style.borderBottomColor = 'rgba(255,255,255,0.1)'}
                                ></textarea>
                            </div>
                            <button className="glow-btn" style={{ marginTop: '20px', width: '100%' }}>Submit Query</button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export function Footer() {
    return (
        <footer style={{ padding: '100px 0 60px 0', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'transparent' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '60px' }}>
                    <div>
                        <div style={{ fontWeight: 900, fontSize: '1.4rem', color: 'var(--text-main)', letterSpacing: '1px', marginBottom: '20px' }}>
                            Luminalens <span style={{ color: 'var(--text-muted)', fontWeight: 300 }}>Studios</span>
                        </div>
                        <p style={{ color: 'var(--text-muted)', maxWidth: '320px', lineHeight: 1.8, fontSize: '0.9rem' }}>
                            A premium creative agency specializing in the future of digital art and 3D experiences.
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '100px' }}>
                        <div>
                            <h5 style={{ color: 'var(--text-main)', marginBottom: '25px', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem' }}>Links</h5>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {['Home', 'Work', 'Services', 'About'].map(link => (
                                    <li key={link}><a href={`#${link.toLowerCase()}`} style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{link}</a></li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h5 style={{ color: 'var(--text-main)', marginBottom: '25px', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem' }}>Connect</h5>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {['Instagram', 'ArtStation', 'Twitter', 'LinkedIn'].map(link => (
                                    <li key={link}><a href="#" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{link}</a></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: '100px', textAlign: 'center', color: 'rgba(255,255,255,0.1)', fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
                    &copy; 2026 LUMINALENS STUDIOS - PROPELLED BY ANTIGRAVITY
                </div>
            </div>
        </footer>
    );
}
