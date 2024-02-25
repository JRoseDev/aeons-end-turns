import { FC, ReactNode } from 'react';
import clsx from 'clsx';

interface DeckProps {
    className?: string;
    cards: ReactNode[];
}

function getRandom(min: number, max: number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

export const Deck: FC<DeckProps> = ({ cards, className }) => {
    return (
        <div className={clsx(className, 'relative p-2')}>
            {cards.map((c, i) => {
                return (
                    <div
                        className={clsx({ absolute: i > 0, 'top-0': i > 0 })}
                        style={{ transform: `rotate(${getRandom(-2, 3)}deg)` }}
                    >
                        {c}
                    </div>
                );
            })}
        </div>
    );
};
