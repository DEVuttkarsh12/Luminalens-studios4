import { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    // Spring physics for smooth trailing - adjusted for "average/legit" speed
    const mouseX = useSpring(0, { stiffness: 250, damping: 35, restDelta: 0.001 });
    const mouseY = useSpring(0, { stiffness: 250, damping: 35, restDelta: 0.001 });

    useEffect(() => {
        const checkTouch = () => {
            setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
        };
        checkTouch();

        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            if (
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') ||
                target.closest('a') ||
                target.classList.contains('glass')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [mouseX, mouseY]);

    if (isTouchDevice) return null;

    return (
        <>
            {/* Central Dot */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: -4,
                    left: -4,
                    width: 8,
                    height: 8,
                    backgroundColor: '#fff',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 99999,
                    x: mouseX,
                    y: mouseY
                }}
            />

            {/* Outer Ring */}
            <motion.div
                animate={{
                    scale: isHovering ? 2.5 : 1,
                    opacity: isHovering ? 0.3 : 0.6
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{
                    position: 'fixed',
                    top: -20,
                    left: -20,
                    width: 40,
                    height: 40,
                    border: '1px solid #fff',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 99998,
                    x: mouseX,
                    y: mouseY
                }}
            />
        </>
    );
}
