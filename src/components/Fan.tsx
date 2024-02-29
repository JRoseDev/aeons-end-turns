import clsx from 'clsx';
import { forwardRef } from 'react';
import { AECardState } from '../state/AECardState';
import { AECard } from './AECard';

export interface FanProps {
    className?: string;
    cards: AECardState[];
}

/**
 * A fan of cards laid out in a line or column
 */
export const Fan = forwardRef<HTMLDivElement, FanProps>(
    ({ cards, className }, ref) => {
        return (
            <div className={clsx('flex gap-4', className)}>
                {cards.map((c) => (
                    <AECard key={c.id} card={c} />
                ))}
                {/* Placeholder ref lets us know where the next element will go */}
                <div key='placeholder' ref={ref} className='w-0 h-0' />
            </div>
        );
    }
);
