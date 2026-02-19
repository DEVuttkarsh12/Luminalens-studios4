import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STATUS_MESSAGES = [
    "Initializing Luminalens Studios",
    "Compiling Shaders",
    "Fetching Assets",
    "Optimizing Meshes",
    "Finalizing Render"
];

export default function Loader({ onFinished }) {
    const [progress, setProgress] = useState(0);
    const [statusIndex, setStatusIndex] = useState(0);

    useEffect(() => {
        // Weighted progress: starts fast, slows down at the end for "anticipation"
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onFinished, 500);
                    return 100;
                }

                // Slightly faster increment logic
                const remaining = 100 - prev;
                const increment = Math.max(2, Math.floor(Math.random() * (remaining / 8)) + 1);
                return Math.min(prev + increment, 100);
            });
        }, 150); // Faster interval (was 250)

        return () => clearInterval(interval);
    }, [onFinished]);

    useEffect(() => {
        // Cycle through status messages
        const messageInterval = setInterval(() => {
            setStatusIndex((prev) => (prev + 1) % STATUS_MESSAGES.length);
        }, 1200);

        return () => clearInterval(messageInterval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: '#080808',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10000,
                gap: '30px'
            }}
        >
            {/* Central Tech Ring Decoration with Glow */}
            <motion.div
                animate={{
                    rotate: 360,
                    boxShadow: [
                        "0 0 10px rgba(255,255,255,0.05)",
                        "0 0 30px rgba(255,255,255,0.2)",
                        "0 0 10px rgba(255,255,255,0.05)"
                    ]
                }}
                transition={{
                    rotate: { repeat: Infinity, duration: 8, ease: "linear" },
                    boxShadow: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                }}
                style={{
                    position: 'absolute',
                    width: 'clamp(200px, 60vw, 350px)',
                    height: 'clamp(200px, 60vw, 350px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '50%',
                    borderTop: '2px solid #fff'
                }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                <div style={{ position: 'relative', width: '250px' }}>
                    <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', width: '100%', position: 'absolute' }} />
                    <motion.div
                        style={{
                            height: '1px',
                            background: '#fff',
                            width: `${progress}%`,
                            transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                            position: 'relative',
                            boxShadow: '0 0 10px #fff'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', width: '250px', marginTop: '10px' }}>
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={STATUS_MESSAGES[statusIndex]}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="heading-font"
                            style={{
                                fontSize: '1rem',
                                letterSpacing: '0.3em',
                                textTransform: 'uppercase',
                                color: 'rgba(255,255,255,0.8)'
                            }}
                        >
                            {STATUS_MESSAGES[statusIndex]}
                        </motion.span>
                    </AnimatePresence>

                    <span style={{
                        fontSize: '0.65rem',
                        fontWeight: 400,
                        color: 'rgba(255,255,255,0.4)',
                        fontFamily: 'monospace'
                    }}>
                        {Math.min(progress, 100)}%
                    </span>
                </div>
            </div>

            {/* Decorative corners for a "tech viewport" feel */}
            <div style={{ position: 'absolute', top: '40px', left: '40px', borderLeft: '1px solid rgba(255,255,255,0.1)', borderTop: '1px solid rgba(255,255,255,0.1)', width: '20px', height: '20px' }} />
            <div style={{ position: 'absolute', bottom: '40px', right: '40px', borderRight: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)', width: '20px', height: '20px' }} />
        </motion.div>
    );
}
