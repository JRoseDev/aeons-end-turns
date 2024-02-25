import { FC, ReactNode } from 'react';
import clsx from 'clsx';

export interface CardProps {
    className?: string;
    isFaceUp?: boolean;
    front: ReactNode;
    back: ReactNode;
    scale?: number;
    onClick?: (isFaceUp: boolean) => void;
}

export const Card: FC<CardProps> = ({
    className,
    isFaceUp = true,
    front,
    back,
    scale = 1,
    onClick,
}) => {
    return (
        <div
            className={clsx(
                className,
                `relative transition-transform duration-500`,
                { 'cursor-pointer': onClick != null }
            )}
            style={{
                height: 88 * scale,
                width: 63 * scale,
                perspective: '1000px',
                transformStyle: 'preserve-3d',
                transform: !isFaceUp ? 'rotateY(180deg)' : 'none',
            }}
            onClick={() => onClick?.(isFaceUp)}
        >
            <div
                className={'w-full h-full absolute'}
                style={{ backfaceVisibility: 'hidden' }}
            >
                {front}
            </div>
            <div
                className={'w-full h-full absolute'}
                style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                }}
            >
                {back}
            </div>
        </div>
    );
};
