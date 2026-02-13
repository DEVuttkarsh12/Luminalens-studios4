import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import videoSrc from '../assets/short logo animation (1).mp4';

export default function IntroVideo({ onFinished }) {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.error("Video autoplay failed:", error);
                // If autoplay fails (e.g. browser policy), skip to site
                onFinished();
            });
        }
    }, [onFinished]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 5000
            }}
        >
            <video
                ref={videoRef}
                src={videoSrc}
                onEnded={onFinished}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                }}
                muted
                playsInline
            />
        </motion.div>
    );
}
