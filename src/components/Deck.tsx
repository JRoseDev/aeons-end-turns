import clsx from 'clsx';
import { ReactNode, forwardRef, useState } from 'react';
import { getRandom } from '../util/GetRandom';
import { cardSizeStyle } from '../util/CardSizeStyle';

interface DeckProps {
    className?: string;
    cards: ReactNode[];
    scale: number;
    onClick?: () => void;
}

export const Deck = forwardRef<HTMLDivElement, DeckProps>(
    ({ cards, className, scale = 1, onClick }, ref) => {
        const [rotations, setRotations] = useState((): number[] =>
            cards.map(() => getRandom(-2, 3))
        );

        if (rotations.length < cards.length) {
            setRotations(cards.map((_, i) => rotations[i] ?? getRandom(-2, 3)));
        }

        return (
            <div
                ref={ref}
                className={clsx(
                    className,
                    'relative',
                    {
                        'cursor-pointer': cards.length > 0 && onClick != null,
                    }
                )}
                style={cardSizeStyle(scale)}
                onClick={() => cards.length > 0 && onClick?.()}
            >
                {cards.map((c, i) => {
                    return (
                        <div
                            key={i}
                            className='absolute top-0'
                            style={{
                                transform: `rotate(${rotations[i]}deg)`,
                            }}
                        >
                            {c}
                        </div>
                    );
                })}
            </div>
        );
    }
);
