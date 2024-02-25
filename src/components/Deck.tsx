import { FC, ReactNode } from 'react';

interface DeckProps {
    cards: ReactNode[];
}

function getRandom(min: number, max: number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

export const Deck: FC<DeckProps> = ({ cards }) => {
    return (
        <div className='relative'>
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
