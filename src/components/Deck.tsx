import { ReactNode, forwardRef } from 'react';
import clsx from 'clsx';

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
                                transform: `rotate(${getRandom(-2, 3)}deg)`,
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
