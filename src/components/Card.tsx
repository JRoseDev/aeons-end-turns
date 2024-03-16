import { FC, ReactNode } from 'react';
import clsx from 'clsx';
import { motion, type Variants } from 'framer-motion';

const variants = {
    faceUp: {
        transform: 'rotateY(180deg)',
        transition: { duration: 0.3, delay: 0.3 },
    },
    faceDown: {
        transform: 'rotateY(0deg)',
        transition: { duration: 0.3, delay: 0.3 },
    },
} satisfies Variants;

export type Facing = keyof typeof variants;

export interface CardProps {
    className?: string;
    /**
     * If different from `facing`, the card will play a flip animation
     */
    initialFacing?: Facing;
    facing?: Facing;
    front: ReactNode;
    back: ReactNode;
    onClick?: (facing: Facing) => void;
}

/**
 * A card with front and back content which can be flipped.
 */
export const Card: FC<CardProps> = ({
    className,
    initialFacing,
    facing = 'faceUp',
    front,
    back,
    onClick,
}) => {
    return (
        <motion.div
            variants={variants}
            initial={initialFacing ?? facing}
            animate={facing}
            className={clsx('aspect-[63/88] grid', className, {
                'cursor-pointer': onClick != null,
            })}
            style={{ transformStyle: 'preserve-3d' }}
            onClick={() => onClick?.(facing)}
        >
            <div
                className={'drop-shadow-lg col-start-1 row-start-1'}
                style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                }}
            >
                {front}
            </div>
            <div
                className='w-0.5 h-full col-start-1 row-start-1 bg-white rounded-full'
                style={{ transform: 'rotateY(90deg)' }}
            />
            <div
                className={'col-start-1 row-start-1 drop-shadow-lg'}
                style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(0deg)',
                }}
            >
                {back}
            </div>
        </motion.div>
    );
};
