import { motion, type Variants } from 'framer-motion';
import { useState, type ReactNode } from 'react';

interface DragTargetProps<T = unknown> {
    className?: string;
    children: ReactNode;
    dragStatus: { type: 'notDragging' } | { type: 'dragging'; target: T };
    variants: Variants;
    whileDragOver: string;
    onDrop?: (data: T) => void;
}

/**
 * Component to work around https://github.com/framer/motion/issues/538
 */
export const DragTarget = <T,>({
    className,
    dragStatus,
    onDrop,
    variants,
    whileDragOver,
    children,
}: DragTargetProps<T>) => {
    const [isDraggedOver, setIsDraggedOver] = useState(false);

    return (
        <motion.div
            className={className}
            variants={variants}
            animate={isDraggedOver ? whileDragOver : undefined}
            onMouseEnter={() => {
                if (dragStatus.type === 'dragging') {
                    setIsDraggedOver(true);
                }
            }}
            onMouseLeave={() => {
                setIsDraggedOver(false);
            }}
            onMouseUp={() => {
                if (dragStatus.type === 'dragging' && isDraggedOver) {
                    onDrop?.(dragStatus.target);
                    setIsDraggedOver(false);
                }
            }}
        >
            {children}
        </motion.div>
    );
};
