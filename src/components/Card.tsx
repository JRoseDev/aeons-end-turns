import { FC, ReactNode } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { cardSizeStyle } from '../util/CardSizeStyle';

const variants = {
    faceUp: {
        transform: 'rotateY(180deg)',
        transition: { duration: 0.3, delay: 0.3 },
    },
    faceDown: {
        transform: 'rotateY(0deg)',
        transition: { duration: 0.3, delay: 0.3 },
    },
};

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
    scale?: number;
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
    scale = 1,
    onClick,
}) => {
    return (
        <motion.div
            variants={variants}
            initial={initialFacing ?? facing}
            animate={facing}
            className={clsx(className, {
                'cursor-pointer': onClick != null,
            })}
            style={{
                ...cardSizeStyle(scale),
                transformStyle: 'preserve-3d',
            }}
            onClick={() => onClick?.(facing)}
        >
            <div
                className={'w-full h-full absolute drop-shadow-lg'}
                style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                }}
            >
                {front}
            </div>
            <div
                className='absolute w-0.5 h-full bg-white rounded-full'
                style={{ transform: 'rotateY(90deg)' }}
            />
            <div
                className={'w-full h-full absolute drop-shadow-lg'}
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
