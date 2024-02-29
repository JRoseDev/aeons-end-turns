import { FC, ReactNode } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const variants = {
    faceUp: {
        transform: 'rotateY(0)',
        transition: { duration: 0.6 },
    },
    faceDown: {
        transform: 'rotateY(180deg)',
        transition: { duration: 0.6 },
    },
};

export type Facing = keyof typeof variants;

export interface CardProps {
    className?: string;
    initialFacing?: Facing;
    facing?: Facing;
    front: ReactNode;
    back: ReactNode;
    scale?: number;
    onClick?: (facing: Facing) => void;
}

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
            className={clsx(className, 'relative', {
                'cursor-pointer': onClick != null,
            })}
            style={{
                height: 88 * scale,
                width: 63 * scale,
                transformStyle: 'preserve-3d',
            }}
            onClick={() => onClick?.(facing)}
        >
            <div
                className={'w-full h-full absolute drop-shadow-lg'}
                style={{ backfaceVisibility: 'hidden' }}
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
                    transform: 'rotateY(-180deg)',
                }}
            >
                {back}
            </div>
        </motion.div>
    );
};
