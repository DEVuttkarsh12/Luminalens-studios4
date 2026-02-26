import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IoArrowBackOutline } from 'react-icons/io5';

const ProjectLandingPage = ({ project, isOpen, onClose }) => {
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

    if (!project) return null;

    // Portal target
    const portalRoot = typeof document !== 'undefined' ? document.body : null;

    const content = (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: '#050505',
                        zIndex: 100000, // Extremely high to be above navbar
                        overflowX: 'hidden',
                        overflowY: 'auto',
                        color: '#fff'
                    }}
                >
                    {/* Sticky Back Button */}
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        onClick={onClose}
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

                    {/* Hero Section */}
                    <div style={{
                        height: '100vh',
                        width: '100%',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden'
                    }}>
                        <motion.img
                            initial={{ scale: 1.2, opacity: 0 }}
                            animate={{ scale: 1, opacity: 0.6 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            src={project.img}
                            alt={project.title}
                            style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                filter: 'brightness(1.2)'
                            }}
                        />
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to bottom, rgba(5,5,5,0.2), #050505)'
                        }} />

                        <div style={{ position: 'relative', textAlign: 'center', zIndex: 1, padding: '0 20px' }}>
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                style={{
                                    fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5em',
                                    color: 'var(--primary-glow)',
                                    marginBottom: '20px',
                                    display: 'block'
                                }}
                            >
                                {project.category}
                            </motion.span>
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                style={{
                                    fontSize: 'clamp(3rem, 10vw, 8rem)',
                                    fontWeight: 900,
                                    lineHeight: 0.9,
                                    margin: 0
                                }}
                                className="text-premium"
                            >
                                {project.title}
                            </motion.h1>
                        </div>

                        {/* Scroll Indicator */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5, duration: 1 }}
                            style={{
                                position: 'absolute',
                                bottom: '40px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '10px'
                            }}
                        >
                            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.3em', opacity: 0.5 }}>Scroll</span>
                            <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, var(--primary-glow), transparent)' }} />
                        </motion.div>
                    </div>

                    {/* Content Sections */}
                    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '100px 4vw' }}>

                        {/* Overview Section */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '80px', marginBottom: '150px' }}>
                            <div>
                                <h2 style={{ fontSize: '2.5rem', marginBottom: '40px', fontWeight: 800 }}>Overview</h2>
                                <p style={{ fontSize: '1.2rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.7)', fontWeight: 300 }}>
                                    {project.description}
                                </p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                                <div>
                                    <h4 style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginBottom: '15px' }}>Industry</h4>
                                    <p style={{ fontSize: '1.1rem' }}>{project.category}</p>
                                </div>
                                <div>
                                    <h4 style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginBottom: '15px' }}>Deliverables</h4>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                        {['3D Design', 'Interactive', 'Motion', 'Visual Effects'].map(item => (
                                            <span key={item} style={{ padding: '8px 16px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', fontSize: '0.85rem' }}>{item}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Visual Gallery */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
                            {project.slides?.map((slide, index) => (
                                <div key={index} style={{
                                    display: 'grid',
                                    gridTemplateColumns: index % 2 === 0 ? '1.5fr 1fr' : '1fr 1.5fr',
                                    gap: '60px',
                                    alignItems: 'center'
                                }}>
                                    <div style={{ order: index % 2 === 0 ? 1 : 2 }}>
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8 }}
                                            style={{
                                                borderRadius: '24px',
                                                overflow: 'hidden',
                                                boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                                                border: '1px solid rgba(255,255,255,0.1)'
                                            }}
                                        >
                                            <img src={slide.src} alt={slide.title} style={{ width: '100%', display: 'block' }} />
                                        </motion.div>
                                    </div>
                                    <div style={{ order: index % 2 === 0 ? 2 : 1 }}>
                                        <motion.h3
                                            initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            style={{ fontSize: '2rem', marginBottom: '20px', fontWeight: 700 }}
                                        >
                                            {slide.title}
                                        </motion.h3>
                                        <motion.p
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.2 }}
                                            style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, fontWeight: 300 }}
                                        >
                                            {slide.description}
                                        </motion.p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer Link */}
                        <div style={{ marginTop: '150px', textAlign: 'center', padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                            <p style={{ color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '20px', fontSize: '0.8rem' }}>Next Project</p>
                            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, cursor: 'pointer' }} className="hover-text-glow">Explore More</h2>
                            <motion.button
                                onClick={onClose}
                                style={{
                                    marginTop: '50px',
                                    background: 'transparent',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    padding: '15px 40px',
                                    borderRadius: '50px',
                                    color: '#fff',
                                    fontSize: '1rem',
                                    cursor: 'pointer'
                                }}
                                whileHover={{ scale: 1.05, background: '#fff', color: '#000' }}
                            >
                                Back to Portfolio
                            </motion.button>
                        </div>
                    </div>

                    <style>{`
                        .hover-text-glow:hover {
                            text-shadow: 0 0 20px rgba(183, 142, 255, 0.5);
                            color: var(--primary-glow);
                        }
                        @media (max-width: 900px) {
                            div[style*="gridTemplateColumns"] {
                                grid-template-columns: 1fr !important;
                            }
                            div[style*="order"] {
                                order: unset !important;
                            }
                            .back-btn {
                                top: 20px !important;
                                left: 20px !important;
                                padding: 8px 16px !important;
                            }
                        }
                    `}</style>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return portalRoot ? createPortal(content, portalRoot) : null;
};

export default ProjectLandingPage;
