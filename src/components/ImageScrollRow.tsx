import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ImageScrollRow() {
    const containerRef = useRef<HTMLElement>(null);

    // Track the scroll progress through the container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'], // From when it enters the viewport to when it leaves
    });

    const images = [
        '/footer_1.avif',
        '/footer_2.avif',
        '/footer_3.avif',
        '/footer_4.avif',
        '/footer_5.avif',
    ];

    // Duplicate images so we have plenty of tiles for the scroll translation
    const duplicatedImages = [...images, ...images];

    // Scroll horizontally leftwards as user scrolls down
    // Changed the end percentage from -25% to -15% to slow down the scrubbing
    const imagesX = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);

    return (
        <section
            ref={containerRef}
            className="relative flex items-center overflow-hidden w-full bg-white pt-4 pb-8 md:pt-8 md:pb-12"
        >
            <motion.div
                className="flex gap-4 md:gap-6"
                style={{ x: imagesX }}
            >
                {duplicatedImages.map((img, i) => (
                    <div
                        key={i}
                        className="flex-shrink-0 w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[35vw] h-[55dvh] min-h-[400px]"
                    >
                        <div
                            className="h-full w-full bg-cover bg-center rounded-[16px] md:rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] grayscale-[0.2]"
                            style={{ backgroundImage: `url(${img})` }}
                        />
                    </div>
                ))}
            </motion.div>
        </section>
    );
}
