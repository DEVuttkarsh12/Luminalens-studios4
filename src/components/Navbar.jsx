import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/LuminaL_1 (1).png';
import lensIcon from '../assets/Lumina_Lcircle.png';

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
            padding: scrolled ? '10px 0' : '15px 0',
            height: scrolled ? '70px' : '90px',
            background: scrolled || mobileMenuOpen ? 'rgba(8, 8, 8, 0.98)' : 'transparent',
            backdropFilter: scrolled || mobileMenuOpen ? 'blur(20px)' : 'none',
            borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
            display: 'flex',
            alignItems: 'center',
            overflow: 'visible'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '0 5%' // Balanced padding for ultra-wide feel
            }}>
                <div
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="nav-logo-container"
                    style={{
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        height: scrolled ? '60px' : '80px',
                        transition: 'height 0.3s ease',
                        position: 'relative'
                    }}
                >
                    <img
                        src={logo}
                        alt="Luminalens Studios"
                        className="nav-logo-img"
                        style={{
                            height: '100%',
                            width: 'auto',
                            objectFit: 'contain',
                            display: 'block',
                            transformOrigin: 'left center',
                            filter: 'brightness(1.1) contrast(1.1)'
                        }}
                    />
                    <div
                        className="nav-lens-icon"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: scrolled ? '65px' : '110px',
                            opacity: 0.9
                        }}
                    >
                        <img
                            src={lensIcon}
                            alt=""
                            style={{
                                height: scrolled ? '20px' : '26px',
                                width: 'auto',
                                objectFit: 'contain',
                                filter: 'brightness(1.2)'
                            }}
                        />
                    </div>
                </div>

                <div style={{ flex: 1 }} /> {/* Spacer to push links to the right */}

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

                    <button
                        className="glow-btn"
                        onClick={() => {
                            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
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
                        <button
                            className="glow-btn"
                            style={{ width: '100%', marginTop: '20px' }}
                            onClick={() => {
                                setMobileMenuOpen(false);
                                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            Get Started
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .nav-logo-img {
                    transform: ${scrolled ? 'scale(2.0) translateY(2px)' : 'scale(2.6) translateY(3px)'};
                }
                .nav-lens-icon {
                    transform: ${scrolled ? 'scale(1.1) translateY(2px)' : 'scale(1.4) translateY(3px)'};
                }

                @media (max-width: 991px) {
                    .desktop-nav { display: none !important; }
                    .mobile-toggle { display: flex !important; }
                }

                @media (max-width: 768px) {
                    .nav-logo-img {
                        transform: scale(1.6) translateY(2px) !important;
                    }
                    .nav-lens-icon {
                        margin-left: 45px !important;
                        transform: scale(0.8) translateY(2px) !important;
                    }
                    nav { height: 75px !important; }
                    .nav-logo-container { height: 50px !important; }
                }

                @media (max-width: 480px) {
                    .nav-logo-img {
                        transform: scale(2.0) translateY(2px) !important;
                    }
                    .nav-lens-icon {
                        margin-left: 45px !important;
                        transform: scale(0.9) translateY(2px) !important;
                    }
                    .nav-logo-container { height: 50px !important; }
                    nav { height: 75px !important; }
                }
            `}</style>
        </nav >
    );
}
