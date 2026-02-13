import { motion } from 'framer-motion';
import { Box, User, Zap, Palette, Share2, Play, Layout } from 'lucide-react';

const services = [
    {
        title: '3D Design & Visualisation',
        desc: 'High-quality 3D design and visualisation for products, spaces, and digital experiences. Used to explore form, scale, and realism across platforms.',
        icon: <Box size={32} />
    },
    {
        title: 'Character Design & Illustration',
        desc: 'Original character design and illustration for brands, campaigns, and storytelling. From early concepts to fully developed character styles.',
        icon: <User size={32} />
    },
    {
        title: 'CGI & VFX',
        desc: 'CGI and visual effects created to enhance stories and brand communication. From subtle effects to detailed, high-impact visuals.',
        icon: <Zap size={32} />
    },
    {
        title: 'Branding & Visual Identity Design',
        desc: 'Branding and visual identity design that stays consistent and recognisable. Logos, brand systems, and visual guidelines built for long-term use.',
        icon: <Palette size={32} />
    },
    {
        title: 'Social Media Design & Content Creation',
        desc: 'Social media design and content creation for everyday brand presence. Platform-specific visuals, motion content, and creative formats.',
        icon: <Share2 size={32} />
    },
    {
        title: 'Motion Graphics & Animation',
        desc: 'Motion graphics and animation designed to add clarity and movement. Explainers, transitions, and animated brand elements.',
        icon: <Play size={32} />
    },
    {
        title: 'Campaign Design & Visual Systems',
        desc: 'Campaign design and visual systems that work across channels. Connecting individual assets into one cohesive visual language.',
        icon: <Layout size={32} />
    }
];

export default function Services() {
    return (
        <section id="services" className="section" style={{ background: 'transparent', position: 'relative', zIndex: 1 }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    style={{ marginBottom: '6rem', textAlign: 'center' }}
                >
                    <span style={{
                        color: 'var(--primary-glow)',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        letterSpacing: '0.6em',
                        textTransform: 'uppercase',
                        opacity: 0.8,
                        display: 'block'
                    }}>
                        Capabilities
                    </span>
                    <h2 className="text-gradient-purple" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', marginTop: '1.5rem', fontWeight: 900, letterSpacing: '-0.02em' }}>
                        What We Do Best
                    </h2>
                </motion.div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
                    gap: 'clamp(40px, 4vw, 80px)',
                }}>
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: index * 0.05 }}
                            className="glass-service-card"
                            style={{
                                padding: '50px 40px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '30px',
                                minHeight: '340px',
                                justifyContent: 'center'
                            }}
                        >
                            <div style={{
                                position: 'absolute',
                                top: '40px',
                                right: '40px',
                                fontSize: '4.5rem',
                                fontWeight: 900,
                                opacity: 0.06, // Slightly more visible for the rich background
                                fontVariantNumeric: 'tabular-nums',
                                color: '#fff',
                                fontFamily: '"Outfit", sans-serif'
                            }}>
                                {index + 1 < 10 ? `0${index + 1}` : index + 1}
                            </div>

                            <div style={{
                                color: '#fff',
                                width: '64px',
                                height: '64px',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                background: 'rgba(255, 255, 255, 0.03)' // Very subtle for base
                            }}>
                                {service.icon}
                            </div>

                            <div>
                                <h3 className="text-gradient-purple" style={{
                                    fontSize: '1.6rem',
                                    fontWeight: 800,
                                    letterSpacing: '-0.01em',
                                    lineHeight: 1.2,
                                    marginBottom: '15px'
                                }}>
                                    {service.title}
                                </h3>
                                <p style={{
                                    color: 'rgba(255, 255, 255, 0.5)',
                                    lineHeight: 1.7,
                                    fontSize: '0.98rem',
                                    fontWeight: 400
                                }}>
                                    {service.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
