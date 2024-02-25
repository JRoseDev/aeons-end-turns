import { FC, ReactNode } from 'react';

interface CardProps {
    isFaceUp?: boolean;
    front: ReactNode;
    back: ReactNode;
    onClick?: (isFaceUp: boolean) => void;
}

export const Card: FC<CardProps> = ({
    isFaceUp = true,
    front,
    back,
    onClick,
}) => {
    return (
        <div
            className={`relative transition-transform duration-500`}
            style={{
                height: 88,
                width: 63,
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
