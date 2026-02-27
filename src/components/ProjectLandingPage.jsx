import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { IoArrowBackOutline } from 'react-icons/io5';

const ProjectLandingPage = ({ project, isOpen, onClose, onNext }) => {
    const containerRef = useRef(null);

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

    const slideCount = project?.slides?.length || 0;
    // Hero (1) + Overview (1) + Slides (N) + Next Project (1)
    const totalScreens = 3 + slideCount;

    const { scrollYProgress } = useScroll({
        container: containerRef
    });

    // Transform vertical scroll into horizontal movement
    const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(totalScreens - 1) * 100}vw`]);

    // Portal target
    const portalRoot = typeof document !== 'undefined' ? document.body : null;

    if (!project && !isOpen) return null;

    const content = (
        <motion.div
            ref={containerRef}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: '#050505',
                zIndex: 100000,
                overflowX: 'hidden',
                overflowY: 'auto',
                color: '#fff'
            }}
        >
            <div style={{ height: `${totalScreens * 100}vh`, position: 'relative' }}>
                <div style={{
                    position: 'sticky',
                    top: 0,
                    height: '100vh',
                    width: '100vw',
                    overflow: 'hidden'
                }}>
                    {/* Sticky Back Button */}
                    <motion.button
                        onClick={onClose}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
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

                    <motion.div
                        style={{ x, display: 'flex', height: '100vh', width: 'max-content' }}
                    >
                        {/* 1. Hero Section */}
                        <div style={{ width: '100vw', height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
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
                                <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.3em', opacity: 0.5 }}>Scroll</span>
                                <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, var(--primary-glow), transparent)' }} />
                            </div>
                        </div>

                        {/* 2. Overview Section */}
                        <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 10vw' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(400px, 1.2fr) 0.8fr', gap: '80px', maxWidth: '1400px', width: '100%' }}>
                                <div>
                                    <h2 style={{ fontSize: '3rem', marginBottom: '40px', fontWeight: 800 }}>Project Overview</h2>
                                    <p style={{ fontSize: '1.4rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.7)', fontWeight: 300 }}>{project.description}</p>
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
                        </div>

                        {/* 3. Gallery Slides */}
                        {project.slides?.map((slide, index) => (
                            <div key={index} style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 5vw' }}>
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1.2fr 0.8fr',
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
                                    <div style={{ paddingRight: '20px' }}>
                                        <h3 style={{ fontSize: '2.2rem', marginBottom: '20px', fontWeight: 700, color: '#fff' }}>{slide.title}</h3>
                                        <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, fontWeight: 300 }}>{slide.description}</p>
                                    </div>
                                </motion.div>
                            </div>
                        ))}

                        {/* 4. Next Project / Footer */}
                        <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                            <p style={{ color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '20px', fontSize: '0.9rem' }}>Next Project</p>
                            <h2
                                onClick={onNext}
                                style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 800, cursor: 'pointer', marginBottom: '40px' }}
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
                        </div>
                    </motion.div>
                </div>
            </div>

            <style>{`
                .hover-text-glow:hover {
                    text-shadow: 0 0 20px rgba(183, 142, 255, 0.5);
                    color: var(--primary-glow);
                }
                @media (max-width: 900px) {
                    .back-btn { top: 20px !important; left: 20px !important; padding: 8px 16px !important; }
                }
            `}</style>
        </motion.div>
    );

    return portalRoot ? createPortal(content, portalRoot) : null;
};

export default ProjectLandingPage;
