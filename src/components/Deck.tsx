import clsx from 'clsx';
import { ReactNode, forwardRef, useState } from 'react';

interface DeckProps {
    className?: string;
    cards: ReactNode[];
    onClick?: () => void;
}

function getRandom(min: number, max: number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

export const Deck = forwardRef<HTMLDivElement, DeckProps>(
    ({ cards, className, onClick }, ref) => {
        const [rotations, setRotations] = useState((): number[] =>
            cards.map(() => getRandom(-2, 3))
        );

        if (rotations.length < cards.length) {
            setRotations(cards.map((_, i) => rotations[i] ?? getRandom(-2, 3)));
        }

        return (
            <div
                ref={ref}
                className={clsx(className, 'relative p-2', {
                    'cursor-pointer': onClick != null,
                })}
                onClick={() => onClick?.()}
            >
                {cards.map((c, i) => {
                    return (
                        <div
                            key={i}
                            className={clsx({
                                absolute: i > 0,
                                'top-0': i > 0,
                            })}
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
