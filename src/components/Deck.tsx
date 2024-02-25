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
        <div className={clsx(className, 'relative')}>
            {cards.map((c) => {
                return (
                    <div
                        className='absolute'
                        style={{ transform: `rotate(${getRandom(-2, 3)}deg)` }}
                    >
                        {c}
                    </div>
                );
            })}
        </div>
    );
};
