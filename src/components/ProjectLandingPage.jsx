import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IoArrowBackOutline } from 'react-icons/io5';

const ProjectLandingPage = ({ project, isOpen, onClose, onNext }) => {

    // Disable body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Portal target
    const portalRoot = typeof document !== 'undefined' ? document.body : null;

    if (!project && !isOpen) return null;

    const content = (
        <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: '#050505',
                zIndex: 100000,
                overflowY: 'auto',
                color: '#fff',
                scrollBehavior: 'smooth'
            }}
        >
            {/* Sticky Back Button */}
            <motion.button
                onClick={onClose}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="back-btn"
                style={{
                    position: 'fixed',
                    top: '40px',
                    left: '40px',
                    zIndex: 100,
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '50px',
                    padding: '12px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: '#fff',
                    cursor: 'pointer',
                    backdropFilter: 'blur(10px)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase'
                }}
                whileHover={{ scale: 1.05, background: 'rgba(255, 255, 255, 0.1)' }}
                whileTap={{ scale: 0.95 }}
            >
                <IoArrowBackOutline size={20} />
                Back
            </motion.button>

            {/* 1. Hero Section */}
            <section style={{ width: '100%', height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <motion.img
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.6 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    src={project.img}
                    alt={project.title}
                    style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(1.2)' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(5,5,5,0.2), #050505)' }} />
                <div style={{ position: 'relative', textAlign: 'center', zIndex: 1, padding: '0 20px' }}>
                    <motion.span style={{ fontSize: 'clamp(0.8rem, 2vw, 1rem)', textTransform: 'uppercase', letterSpacing: '0.5em', color: 'var(--primary-glow)', marginBottom: '20px', display: 'block' }}>{project.category}</motion.span>
                    <motion.h1 style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', fontWeight: 900, lineHeight: 0.9, margin: 0 }} className="text-premium">{project.title}</motion.h1>
                </div>
                <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.3em', opacity: 0.5 }}>Scroll Down</span>
                    <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, var(--primary-glow), transparent)' }} />
                </div>
            </section>

            {/* 2. Overview Section */}
            <section style={{ width: '100%', padding: '160px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="overview-container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '80px', maxWidth: '1400px', width: '90%' }}>
                    <div>
                        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '40px', fontWeight: 800 }}>Project Overview</h2>
                        <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', lineHeight: 1.8, color: 'rgba(255,255,255,0.7)', fontWeight: 300 }}>{project.description}</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', justifyContent: 'center' }}>
                        <div>
                            <h4 style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginBottom: '15px' }}>Industry</h4>
                            <p style={{ fontSize: '1.2rem' }}>{project.category}</p>
                        </div>
                        <div>
                            <h4 style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginBottom: '15px' }}>Deliverables</h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                {['3D Design', 'Interactive', 'Motion', 'Visual Effects'].map(item => (
                                    <span key={item} style={{ padding: '8px 16px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', fontSize: '0.9rem' }}>{item}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Gallery Slides */}
            <section style={{ width: '100%', paddingBottom: '160px' }}>
                {project.slides?.map((slide, index) => (
                    <div key={index} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 5vw' }}>
                        <motion.div
                            whileInView={{ opacity: 1, y: 0 }}
                            initial={{ opacity: 0, y: 50 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="gallery-slide-card"
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'minmax(300px, 1.2fr) 0.8fr',
                                gap: '60px',
                                maxWidth: '1300px',
                                width: '100%',
                                alignItems: 'center',
                                background: 'rgba(255, 255, 255, 0.02)',
                                borderRadius: '32px',
                                padding: '40px',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                backdropFilter: 'blur(10px)',
                                boxShadow: '0 40px 100px rgba(0,0,0,0.3)'
                            }}
                        >
                            <div style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <img src={slide.src} alt={slide.title} style={{ width: '100%', display: 'block' }} />
                            </div>
                            <div className="slide-content" style={{ paddingRight: '20px' }}>
                                <h3 style={{ fontSize: '2.2rem', marginBottom: '20px', fontWeight: 700, color: '#fff' }}>{slide.title}</h3>
                                <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, fontWeight: 300 }}>{slide.description}</p>
                            </div>
                        </motion.div>
                    </div>
                ))}
            </section>

            {/* 4. Next Project / Footer */}
            <section style={{ width: '100%', padding: '160px 0', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                <p style={{ color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '20px', fontSize: '0.9rem' }}>Next Project</p>
                <h2
                    onClick={onNext}
                    style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', fontWeight: 800, cursor: 'pointer', marginBottom: '40px' }}
                    className="hover-text-glow"
                >
                    Explore More
                </h2>
                <motion.button
                    onClick={onClose}
                    style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', padding: '15px 40px', borderRadius: '50px', color: '#fff', fontSize: '1rem', cursor: 'pointer' }}
                    whileHover={{ scale: 1.05, background: '#fff', color: '#000' }}
                    whileTap={{ scale: 0.95 }}
                >
                    Back to Portfolio
                </motion.button>
            </section>

            <style>{`
                .hover-text-glow:hover {
                    text-shadow: 0 0 20px rgba(183, 142, 255, 0.5);
                    color: var(--primary-glow);
                }
                @media (max-width: 900px) {
                    .back-btn { 
                        top: 20px !important; 
                        left: 20px !important; 
                        padding: 10px 20px !important; 
                        font-size: 0.8rem !important; 
                    }
                    section { padding: 100px 20px !important; }
                    .overview-container, .gallery-slide-card { 
                        grid-template-columns: 1fr !important; 
                        gap: 40px !important; 
                        padding: 30px !important;
                    }
                    .slide-content { padding-right: 0 !important; }
                    .slide-content h3 { font-size: 1.8rem !important; }
                }
                @media (max-width: 480px) {
                    .back-btn { top: 15px !important; left: 15px !important; }
                    .gallery-slide-card { padding: 20px !important; border-radius: 20px !important; }
                    h2 { font-size: 2.22rem !important; }
                    h1 { font-size: 3.5rem !important; }
                    .overview-container p { font-size: 1.1rem !important; }
                }
            `}</style>
        </motion.div>
    );

    return portalRoot ? createPortal(content, portalRoot) : null;
};

export default ProjectLandingPage;
