import { motion } from 'framer-motion';
import { FC, ReactNode } from 'react';

export interface Coords {
    x: number;
    y: number;
}

export interface MoveProps {
    from: Coords;
    to: Coords;
    children: ReactNode;
}

/**
 * Animate an element moving from one location to another.
 */
export const Move: FC<MoveProps> = ({ from, to, children }) => {
    const start = { x: to.x - from.x, y: to.y - from.y };

    return (
        <motion.div
            initial={{
                transform: `translate(${start.x}px,${start.y}px)`,
            }}
            animate={{
                transform: 'translate(0,0)',
                transition: { duration: 0.6 },
            }}
        >
            {children}
        </motion.div>
    );
};
