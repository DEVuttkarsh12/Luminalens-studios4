import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Playground = () => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        let particles = [];
        const particleCount = window.innerWidth < 768 ? 250 : 800; // Massive increase for "floor" density
        const mouseRadius = 180; // Adjusted radius for a sweeping effect

        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.baseX = x;
                this.baseY = y;
                this.size = Math.random() * 1.5 + 0.5; // Smaller, like dust or sand
                this.density = (Math.random() * 30) + 10;
                this.color = `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`; // Subtle white/grey dust
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }

            update() {
                let dx = mouseRef.current.x - this.x;
                let dy = mouseRef.current.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                let maxDistance = mouseRadius;

                // Strong, snappy repulsion when mouse gets close
                let force = Math.pow((maxDistance - distance) / maxDistance, 3);
                let directionX = forceDirectionX * force * this.density * 3;
                let directionY = forceDirectionY * force * this.density * 3;

                if (distance < mouseRadius) {
                    this.x -= directionX;
                    this.y -= directionY;
                } else {
                    // Very slow, dreamy return to simulate dust settling back on the floor
                    if (this.x !== this.baseX) {
                        let dx = this.x - this.baseX;
                        this.x -= dx / 50;
                    }
                    if (this.y !== this.baseY) {
                        let dy = this.y - this.baseY;
                        this.y -= dy / 50;
                    }
                }
            }
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                let x = Math.random() * canvas.width;
                let y = Math.random() * canvas.height;
                particles.push(new Particle(x, y));
            }
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].draw();
                particles[i].update();
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const handleMouseMove = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        mouseRef.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };

    const handleMouseLeave = () => {
        mouseRef.current = { x: -1000, y: -1000 };
    };

    return (
        <section
            id="playground"
            className="section"
            style={{
                minHeight: '80vh',
                position: 'relative',
                overflow: 'hidden',
                background: 'rgba(5, 5, 5, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                padding: '100px 0'
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <canvas
                ref={canvasRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 1
                }}
            />

            <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', pointerEvents: 'none' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span style={{
                        color: '#fff',
                        fontSize: '0.8rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.6em',
                        marginBottom: '2rem',
                        display: 'block',
                        fontWeight: 700
                    }}>
                        Interactive Playground
                    </span>
                    <h2 className="text-premium" style={{
                        fontSize: 'clamp(2rem, 5vw, 4.5rem)',
                        fontWeight: 900,
                        lineHeight: 1.2,
                        maxWidth: '900px',
                        margin: '0 auto',
                        marginBottom: '2rem'
                    }}>
                        "Creativity is intelligence <br />
                        <span className="text-gradient-purple">having fun.</span>"
                    </h2>
                    <p style={{
                        color: 'rgba(255, 255, 255, 0.4)',
                        fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)',
                        letterSpacing: '0.1em',
                        fontStyle: 'italic'
                    }}>
                        — Albert Einstein
                    </p>
                </motion.div>
            </div>

            {/* Hint */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.5 }}
                transition={{ delay: 1 }}
                style={{
                    position: 'absolute',
                    top: '40px',
                    fontSize: '0.7rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    color: 'var(--primary-glow)',
                    fontWeight: 800,
                    zIndex: 2
                }}
            >
                Hover to Play
            </motion.div>
        </section>
    );
};

export default Playground;
