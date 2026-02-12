import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'Work', href: '#work' },
        { name: 'Services', href: '#services' },
        { name: 'About', href: '#about' },
        { name: 'Testimonials', href: '#testimonials' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            zIndex: 1000,
            transition: 'var(--transition-smooth)',
            padding: scrolled ? '15px 0' : '30px 0',
            background: scrolled || mobileMenuOpen ? 'rgba(8, 8, 8, 0.98)' : 'transparent',
            backdropFilter: scrolled || mobileMenuOpen ? 'blur(20px)' : 'none',
            borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none'
        }}>
            <div className="container" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <div style={{ fontWeight: 900, fontSize: '1.2rem', color: '#fff', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    <span style={{ color: 'var(--primary-glow)', fontWeight: 800 }}>Luminalens</span> Studios
                </div>

                {/* Desktop Menu */}
                <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '50px' }}>
                    <ul style={{ display: 'flex', gap: '35px', margin: 0 }}>
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <a href={link.href} style={{
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                    color: scrolled ? 'var(--text-main)' : 'var(--text-muted)',
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase'
                                }}
                                    onMouseEnter={(e) => e.target.style.color = '#fff'}
                                    onMouseLeave={(e) => e.target.style.color = scrolled ? '#fff' : '#888'}
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <button className="glow-btn">
                        Get Started
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="mobile-toggle"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    style={{
                        display: 'none',
                        flexDirection: 'column',
                        gap: '6px',
                        padding: '10px',
                        zIndex: 1100
                    }}
                >
                    <span style={{ width: '25px', height: '2px', background: '#fff', transition: '0.3s', transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none' }} />
                    <span style={{ width: '25px', height: '2px', background: '#fff', transition: '0.3s', opacity: mobileMenuOpen ? 0 : 1 }} />
                    <span style={{ width: '25px', height: '2px', background: '#fff', transition: '0.3s', transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none' }} />
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        style={{
                            position: 'absolute',
                            top: '100%',
                            left: '0',
                            width: '100%',
                            background: 'rgba(8, 8, 8, 0.98)',
                            padding: '40px 20px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '30px',
                            alignItems: 'center',
                            borderBottom: '1px solid rgba(255,255,255,0.1)'
                        }}
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                style={{
                                    fontSize: '1.2rem',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.2em'
                                }}
                            >
                                {link.name}
                            </a>
                        ))}
                        <button className="glow-btn" style={{ width: '100%', marginTop: '20px' }}>
                            Get Started
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                @media (max-width: 991px) {
                    .desktop-nav { display: none !important; }
                    .mobile-toggle { display: flex !important; }
                }
            `}</style>
        </nav>
    );
}
