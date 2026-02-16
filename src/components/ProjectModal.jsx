import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCloseOutline, IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

const ProjectModal = ({ project, isOpen, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = project?.images || [project?.img];

    useEffect(() => {
        if (!isOpen) return;

        const timer = setInterval(() => {
            handleNext();
        }, 5000); // Auto-swipe every 5 seconds

        return () => clearInterval(timer);
    }, [isOpen, currentIndex]);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="modal-overlay"
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.85)',
                        backdropFilter: 'blur(12px)',
                        zIndex: 1000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px'
                    }}
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="glass-card-premium"
                        style={{
                            width: '100%',
                            maxWidth: '1200px',
                            height: 'auto',
                            maxHeight: '90vh',
                            background: 'rgba(15, 8, 59, 0.6)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '32px',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'row',
                            position: 'relative'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            style={{
                                position: 'absolute',
                                top: '24px',
                                right: '24px',
                                zIndex: 10,
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: 'none',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                                cursor: 'pointer',
                                backdropFilter: 'blur(10px)',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
                            onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                        >
                            <IoCloseOutline size={24} />
                        </button>

                        <div className="modal-content" style={{ display: 'flex', width: '100%', height: '100%', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', flex: 1, minHeight: '60vh', flexWrap: 'wrap' }}>
                                {/* Left Side: Description */}
                                <div style={{
                                    flex: '1',
                                    minWidth: '350px',
                                    padding: '60px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center'
                                }}>
                                    <span style={{
                                        color: 'var(--primary-glow)',
                                        fontWeight: 700,
                                        letterSpacing: '0.4em',
                                        textTransform: 'uppercase',
                                        fontSize: '0.8rem',
                                        marginBottom: '20px',
                                        display: 'block'
                                    }}>
                                        {project.category}
                                    </span>
                                    <h2 className="heading-font" style={{
                                        fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                                        marginBottom: '30px',
                                        color: '#fff',
                                        lineHeight: 1.1,
                                        fontWeight: 900
                                    }}>
                                        {project.title}
                                    </h2>
                                    <p style={{
                                        color: 'rgba(255, 255, 255, 0.6)',
                                        fontSize: '1.1rem',
                                        lineHeight: 1.8,
                                        fontWeight: 300,
                                        marginBottom: '40px'
                                    }}>
                                        {project.description}
                                    </p>

                                    {/* Tech Stack or additional info could go here */}
                                    <div style={{ display: 'flex', gap: '15px' }}>
                                        <div style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.05)', borderRadius: '100px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)' }}>
                                            Interactive
                                        </div>
                                        <div style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.05)', borderRadius: '100px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)' }}>
                                            Premium
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side: Slider */}
                                <div style={{
                                    flex: '1.2',
                                    minWidth: '450px',
                                    position: 'relative',
                                    background: '#000',
                                    overflow: 'hidden'
                                }}>
                                    <AnimatePresence mode='wait'>
                                        <motion.img
                                            key={currentIndex}
                                            src={images[currentIndex]}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    </AnimatePresence>

                                    {/* Controls */}
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '30px',
                                        right: '30px',
                                        display: 'flex',
                                        gap: '12px',
                                        zIndex: 5
                                    }}>
                                        <button
                                            onClick={handlePrev}
                                            className="nav-btn"
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                borderRadius: '50%',
                                                background: 'rgba(0, 0, 0, 0.5)',
                                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                                color: '#fff',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                backdropFilter: 'blur(10px)'
                                            }}
                                        >
                                            <IoChevronBackOutline size={20} />
                                        </button>
                                        <button
                                            onClick={handleNext}
                                            className="nav-btn"
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                borderRadius: '50%',
                                                background: 'rgba(0, 0, 0, 0.5)',
                                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                                color: '#fff',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                backdropFilter: 'blur(10px)'
                                            }}
                                        >
                                            <IoChevronForwardOutline size={20} />
                                        </button>
                                    </div>

                                    {/* Dots */}
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '30px',
                                        left: '30px',
                                        display: 'flex',
                                        gap: '8px',
                                        zIndex: 5
                                    }}>
                                        {images.map((_, i) => (
                                            <div
                                                key={i}
                                                style={{
                                                    width: i === currentIndex ? '30px' : '8px',
                                                    height: '8px',
                                                    borderRadius: '4px',
                                                    background: i === currentIndex ? 'var(--primary-glow)' : 'rgba(255,255,255,0.3)',
                                                    transition: 'all 0.3s ease'
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
            <style>{`
                @media (max-width: 900px) {
                    .modal-content > div { flex-direction: column-reverse !important; overflow-y: auto !important; }
                    .modal-content > div > div { flex: none !important; width: 100% !important; min-width: 0 !important; }
                    .modal-content > div > div:last-child { height: 40vh !important; }
                    .modal-content > div > div:first-child { padding: 40px 30px !important; }
                }
            `}</style>
        </AnimatePresence>
    );
};

export default ProjectModal;
