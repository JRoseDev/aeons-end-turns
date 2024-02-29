import clsx from 'clsx';
import { forwardRef } from 'react';
import { AECardState } from '../state/AECardState';
import { AECard } from './AECard';

export interface FanProps {
    className?: string;
    orientation?: 'horizontal' | 'vertical';
    direction?: 'standard' | 'reversed';
    cards: AECardState[];
}

/**
 * A fan of cards laid out in a line or column
 */
export const Fan = forwardRef<HTMLDivElement, FanProps>(
    (
        {
            cards,
            className,
            orientation = 'horizontal',
            direction = 'standard',
        },
        ref
    ) => {
        return (
            <div
                className={clsx(
                    'flex gap-4 w-fit',
                    {
                        'flex-col': orientation === 'vertical',
                        'flex-col-reverse':
                            orientation === 'vertical' &&
                            direction === 'reversed',
                        'flex-row-reverse':
                            orientation === 'horizontal' &&
                            direction === 'reversed'
                    },
                    className
                )}
            >
                {cards.map((c) => (
                    <AECard key={c.id} card={c} />
                ))}
                {/* Placeholder ref lets us know where the next element will go */}
                <div key='placeholder' ref={ref} className='w-0 h-0' />
            </div>
        );
    }
);
