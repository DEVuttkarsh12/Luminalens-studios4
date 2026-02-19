import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCloseOutline, IoChevronBackOutline, IoChevronForwardOutline, IoExpandOutline, IoContractOutline } from 'react-icons/io5';

const ProjectModal = ({ project, isOpen, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);

    // Derive images and per-slide data
    const slides = project?.slides || null;
    const images = slides
        ? slides.map((s) => s.src)
        : project?.images || [project?.img];

    // Reset index when a new project is opened
    useEffect(() => {
        if (isOpen) setCurrentIndex(0);
    }, [isOpen, project?.id]);

    // Auto-swipe
    useEffect(() => {
        if (!isOpen) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [isOpen, currentIndex, images.length]);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    if (!project) return null;

    // Dynamic per-slide content
    const currentTitle = slides ? slides[currentIndex]?.title : project.title;
    const currentDescription = slides
        ? slides[currentIndex]?.description
        : project.description;

    // Portal target (usually document.body)
    const portalRoot = typeof document !== 'undefined' ? document.body : null;

    const modalContent = (
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
                        zIndex: 9000,
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
                            width: '90%',
                            maxWidth: '1000px',
                            height: '75vh',
                            maxHeight: '700px',
                            background: 'rgba(15, 8, 59, 0.85)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '32px',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'row',
                            position: 'relative',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
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
                            <div style={{ display: 'flex', width: '100%', height: '100%', flexWrap: 'wrap' }}>
                                {/* Left Side: Dynamic Description */}
                                <div style={{
                                    flex: '1',
                                    minWidth: '350px',
                                    padding: '40px',
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

                                    {/* Animated title that changes per slide */}
                                    <AnimatePresence mode="wait">
                                        <motion.h2
                                            key={currentTitle}
                                            className="heading-font"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.35 }}
                                            style={{
                                                fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                                                marginBottom: '20px',
                                                color: '#fff',
                                                lineHeight: 1.1,
                                                fontWeight: 900
                                            }}
                                        >
                                            {currentTitle}
                                        </motion.h2>
                                    </AnimatePresence>

                                    {/* Animated description that changes per slide */}
                                    <AnimatePresence mode="wait">
                                        <motion.p
                                            key={currentDescription}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.35, delay: 0.05 }}
                                            style={{
                                                color: 'rgba(255, 255, 255, 0.6)',
                                                fontSize: '1.05rem',
                                                lineHeight: 1.8,
                                                fontWeight: 300,
                                                marginBottom: '35px'
                                            }}
                                        >
                                            {currentDescription}
                                        </motion.p>
                                    </AnimatePresence>

                                    {/* Slide counter */}
                                    <span style={{
                                        color: 'rgba(255, 255, 255, 0.35)',
                                        fontSize: '0.85rem',
                                        fontWeight: 500,
                                        letterSpacing: '0.15em'
                                    }}>
                                        {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
                                    </span>
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
                                            alt={currentTitle}
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
                                                onClick={() => setCurrentIndex(i)}
                                                style={{
                                                    width: i === currentIndex ? '30px' : '8px',
                                                    height: '8px',
                                                    borderRadius: '4px',
                                                    background: i === currentIndex ? 'var(--primary-glow)' : 'rgba(255,255,255,0.3)',
                                                    transition: 'all 0.3s ease',
                                                    cursor: 'pointer'
                                                }}
                                            />
                                        ))}
                                    </div>

                                    {/* Expand Button */}
                                    <button
                                        onClick={() => setIsExpanded(true)}
                                        style={{
                                            position: 'absolute',
                                            top: '20px',
                                            left: '20px',
                                            zIndex: 10,
                                            background: 'rgba(0, 0, 0, 0.5)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            borderRadius: '12px',
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
                                        className="hover-scale"
                                    >
                                        <IoExpandOutline size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            {/* Expanded View Overlay */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 10000,
                            backgroundColor: 'rgba(0, 0, 0, 0.95)',
                            backdropFilter: 'blur(20px)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onClick={() => setIsExpanded(false)}
                    >
                        {/* Close Expanded Button */}
                        <button
                            onClick={() => setIsExpanded(false)}
                            style={{
                                position: 'absolute',
                                top: '30px',
                                right: '30px',
                                zIndex: 10010,
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                borderRadius: '50%',
                                width: '50px',
                                height: '50px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                            className="hover-scale"
                        >
                            <IoCloseOutline size={28} />
                        </button>

                        <motion.img
                            src={images[currentIndex]}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            style={{
                                maxWidth: '95vw',
                                maxHeight: '95vh',
                                objectFit: 'contain',
                                borderRadius: '8px',
                                boxShadow: '0 0 50px rgba(0,0,0,0.5)'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
            <style>{`
                @media (max-width: 900px) {
                    .glass-card-premium {
                        flex-direction: column !important;
                        height: 90vh !important;
                        max-height: none !important;
                        border-radius: 24px !important;
                        width: 95% !important;
                    }
                    .modal-content > div { 
                        flex-direction: column-reverse !important; 
                        overflow-y: auto !important; 
                    }
                    .modal-content > div > div { 
                        flex: none !important; 
                        width: 100% !important; 
                        min-width: 0 !important; 
                    }
                    .modal-content > div > div:last-child { 
                        height: 35vh !important;
                        min-height: 250px !important;
                    }
                    .modal-content > div > div:first-child { 
                        padding: 30px 20px !important; 
                    }
                    .modal-content h2 {
                        font-size: 1.8rem !important;
                    }
                    .modal-content p {
                        font-size: 0.9rem !important;
                        line-height: 1.6 !important;
                    }
                }

                @media (max-width: 480px) {
                    .glass-card-premium {
                        height: 95vh !important;
                        border-radius: 16px !important;
                    }
                    .modal-content > div > div:last-child { 
                        height: 30vh !important;
                        min-height: 200px !important;
                    }
                    .modal-content > div > div:first-child { 
                        padding: 20px 15px !important; 
                    }
                    .modal-content h2 {
                        font-size: 1.5rem !important;
                    }
                    .nav-btn {
                        width: 40px !important;
                        height: 40px !important;
                    }
                    button[style*="top: '24px'"] {
                        top: 15px !important;
                        right: 15px !important;
                        width: 32px !important;
                        height: 32px !important;
                    }
                }
            `}</style>
        </AnimatePresence>
    );

    return portalRoot ? createPortal(modalContent, portalRoot) : null;
};

export default ProjectModal;
