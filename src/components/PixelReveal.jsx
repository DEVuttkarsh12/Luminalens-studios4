import { motion } from 'framer-motion';

export default function PixelReveal({ onFinished }) {
    // Higher density for a more "legit" pixelated feel
    const columns = 40;
    const rows = 24;
    const totalBlocks = columns * rows;

    // Animation variants for the blocks
    const blockVariants = {
        initial: { opacity: 1, scale: 1.1 },
        reveal: (i) => {
            const x = i % columns;
            const y = Math.floor(i / columns);
            const centerX = (columns - 1) / 2;
            const centerY = (rows - 1) / 2;

            // Calculate distance from center for radial effect
            const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
            const maxDistance = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));

            return {
                opacity: 0,
                scale: 1,
                transition: {
                    duration: 0.5,
                    // More sophisticated delay with controlled randomness
                    delay: (distance / maxDistance) * 0.8 + Math.random() * 0.3,
                    ease: [0.22, 1, 0.36, 1] // Smooth quintic ease
                }
            };
        }
    };

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 6000,
                display: 'grid',
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`,
                pointerEvents: 'none'
            }}
        >
            {[...Array(totalBlocks)].map((_, i) => (
                <motion.div
                    key={i}
                    custom={i}
                    variants={blockVariants}
                    initial="initial"
                    animate="reveal"
                    onAnimationComplete={() => {
                        // Only trigger onFinished once, for the last potential block
                        if (i === totalBlocks - 1) {
                            setTimeout(onFinished, 500);
                        }
                    }}
                    style={{
                        background: 'var(--bg-color)', // Match the main background color
                        width: '101%', // Slight overlap to prevent gaps
                        height: '101%'
                    }}
                />
            ))}
        </div>
    );
}
