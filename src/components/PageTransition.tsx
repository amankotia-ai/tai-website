import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
    children: React.ReactNode;
}

const transitionVariants = {
    initial: {
        opacity: 0,
        y: 12,
        filter: 'blur(4px)'
    },
    enter: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
        }
    },
    exit: {
        opacity: 0,
        y: -12,
        filter: 'blur(4px)',
        transition: {
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
        }
    },
};

const PageTransition = ({ children }: PageTransitionProps) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <motion.div
            initial="initial"
            animate="enter"
            exit="exit"
            variants={transitionVariants}
            className="page-transition-wrapper flex flex-col min-h-screen" // Ensures the footer stays at bottom during transitions
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
