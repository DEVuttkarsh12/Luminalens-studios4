import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Globe, CheckCircle } from 'lucide-react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const contactInfo = [
        { icon: <Mail size={20} />, text: 'Luminalensstudios@gmail.com', label: 'Email' },
        { icon: <Phone size={20} />, text: '+91 97791 73306', label: 'Phone' },
        { icon: <Globe size={20} />, text: 'www.luminalens.studio', label: 'Website' },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("https://formsubmit.co/ajax/Luminalensstudios@gmail.com", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    _subject: "New Query from Luminalens Studio"
                })
            });

            if (response.ok) {
                setShowSuccess(true);
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setShowSuccess(false), 5000);
            }
        } catch (error) {
            console.error("Submission error:", error);
            alert("Oops! Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section id="contact" className="section" style={{ minHeight: '100vh', padding: '140px 0' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    style={{ textAlign: 'center', marginBottom: 'clamp(50px, 8vw, 100px)' }}
                >
                    <h2 className="text-gradient-purple" style={{
                        fontSize: 'clamp(2.5rem, 8vw, 6.5rem)',
                        lineHeight: 1.05,
                        marginBottom: '1.5rem',
                        fontWeight: 900,
                        textTransform: 'uppercase'
                    }}>
                        Let's work <br />
                        Together.
                    </h2>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)', lineHeight: 1.7 }}>
                        Available for new projects. Bring your 3D visions to life with our specialized studio.
                    </p>
                </motion.div>

                <div className="contact-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: 'clamp(30px, 5vw, 80px)',
                    alignItems: 'start'
                }}>

                    {/* Contact Details & QR */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="glass-card-premium contact-card"
                        style={{
                            padding: 'clamp(30px, 5vw, 60px)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '30px'
                        }}
                    >
                        <h3 style={{ fontSize: '1.8rem', letterSpacing: '0.05em', margin: 0 }}>Contact Info</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                            {contactInfo.map((info) => (
                                <div key={info.label} style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                                    <div style={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '12px',
                                        background: 'rgba(255,255,255,0.03)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#fff',
                                        border: '1px solid rgba(255,255,255,0.1)'
                                    }}>
                                        {info.icon}
                                    </div>
                                    <div>
                                        <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', display: 'block', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '4px' }}>{info.label}</span>
                                        <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>{info.text}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{
                            marginTop: '20px',
                            padding: '40px',
                            background: 'rgba(255,255,255,0.015)',
                            borderRadius: '20px',
                            textAlign: 'center',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            <div style={{
                                width: '130px',
                                height: '130px',
                                background: '#fff',
                                padding: '12px',
                                borderRadius: '12px',
                                margin: '0 auto 25px auto'
                            }}>
                                <img
                                    src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=mailto:Luminalensstudios@gmail.com&bgcolor=ffffff&color=000000"
                                    alt="Official Contact QR"
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </div>
                            <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                                Feeling lazy enough? <br />
                                <span style={{ color: '#fff', fontWeight: 800 }}>Scan QR to start a conversation.</span>
                            </p>
                        </div>
                    </motion.div>

                    {/* Contact Form / Q&A */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="glass-card-premium contact-card"
                        style={{
                            padding: 'clamp(30px, 5vw, 60px)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '30px'
                        }}
                    >
                        <h3 style={{ fontSize: '1.8rem', letterSpacing: '0.05em', margin: 0 }}>Q&A / Query</h3>
                        <form
                            onSubmit={handleSubmit}
                            style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}
                        >
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '3px' }}>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Your Name"
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                                        padding: '12px 0',
                                        color: '#fff',
                                        outline: 'none',
                                        fontFamily: 'inherit',
                                        fontSize: '1rem',
                                        transition: '0.3s'
                                    }}
                                    onFocus={(e) => e.target.style.borderBottomColor = '#fff'}
                                    onBlur={(e) => e.target.style.borderBottomColor = 'rgba(255,255,255,0.1)'}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '3px' }}>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="Your Email"
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                                        padding: '12px 0',
                                        color: '#fff',
                                        outline: 'none',
                                        fontFamily: 'inherit',
                                        fontSize: '1rem',
                                        transition: '0.3s'
                                    }}
                                    onFocus={(e) => e.target.style.borderBottomColor = '#fff'}
                                    onBlur={(e) => e.target.style.borderBottomColor = 'rgba(255,255,255,0.1)'}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '3px' }}>Query</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    placeholder="How can we help you?"
                                    rows="3"
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                                        padding: '12px 0',
                                        color: '#fff',
                                        outline: 'none',
                                        resize: 'none',
                                        fontFamily: 'inherit',
                                        fontSize: '1rem',
                                        transition: '0.3s'
                                    }}
                                    onFocus={(e) => e.target.style.borderBottomColor = '#fff'}
                                    onBlur={(e) => e.target.style.borderBottomColor = 'rgba(255,255,255,0.1)'}
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="glow-btn"
                                style={{ marginTop: '20px', opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Sending...' : 'Submit Query'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>

            {/* Success Popup - Fixed Bottom Center */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: 100, x: '-50%' }}
                        style={{
                            position: 'fixed',
                            bottom: '40px',
                            left: '50%',
                            zIndex: 10000,
                            background: 'rgba(15, 8, 59, 0.95)',
                            backdropFilter: 'blur(20px)',
                            padding: '20px 40px',
                            borderRadius: '100px',
                            border: '1px solid var(--primary-glow)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        <CheckCircle size={24} color="var(--primary-glow)" />
                        <span className="heading-font" style={{ fontSize: '1rem', letterSpacing: '1px' }}>Query Submitted Successfully</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

export function Footer() {
    return (
        <footer style={{ padding: '100px 0 60px 0', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'transparent' }}>
            <div className="container">
                <div className="footer-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '60px' }}>
                    <div className="footer-brand-section">
                        <div style={{ fontWeight: 900, fontSize: '1.4rem', color: 'var(--text-main)', letterSpacing: '1px', marginBottom: '20px' }}>
                            Luminalens <span style={{ color: 'var(--text-muted)', fontWeight: 300 }}>Studios</span>
                        </div>
                        <p style={{ color: 'var(--text-muted)', maxWidth: '320px', lineHeight: 1.8, fontSize: '0.9rem' }}>
                            A premium creative agency specializing in the future of digital art and 3D experiences.
                        </p>
                    </div>

                    <div className="footer-links-container" style={{ display: 'flex', gap: 'clamp(40px, 8vw, 100px)' }}>
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

                <div style={{ marginTop: 'clamp(50px, 10vw, 100px)', textAlign: 'center', color: 'rgba(255,255,255,0.1)', fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
                    &copy; 2026 LUMINALENS STUDIOS - PROPELLED BY ANTIGRAVITY
                </div>
            </div>
            <style>{`
                @media (max-width: 768px) {
                    #contact { padding: 80px 0 !important; }
                    .contact-grid { 
                        grid-template-columns: 1fr !important;
                        gap: 40px !important;
                    }
                    .footer-content {
                        flex-direction: column !important;
                        gap: 30px !important;
                        text-align: center !important;
                        align-items: center !important;
                    }
                    .footer-links-container {
                        width: 100% !important;
                        justify-content: center !important;
                        gap: 40px !important;
                    }
                }
                @media (max-width: 480px) {
                    .contact-card {
                        padding: 25px 20px !important;
                    }
                    .footer-links-container {
                        flex-direction: column !important;
                        gap: 30px !important;
                    }
                }
            `}</style>
        </footer>
    );
}
