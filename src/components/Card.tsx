import { FC, ReactNode } from 'react';

export interface CardProps {
    isFaceUp?: boolean;
    front: ReactNode;
    back: ReactNode;
    scale?: number;
    onClick?: (isFaceUp: boolean) => void;
}

export const Card: FC<CardProps> = ({
    isFaceUp = true,
    front,
    back,
    scale = 1,
    onClick,
}) => {
    return (
        <div
            className={`relative transition-transform duration-500 ${
                onClick == null ? '' : 'cursor-pointer'
            }`}
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
