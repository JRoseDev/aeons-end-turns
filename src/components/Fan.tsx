import clsx from 'clsx';
import { forwardRef } from 'react';
import { AECardState } from '../state/AECardState';
import { AECard } from './AECard';

export interface FanProps {
    className?: string;
    orientation?: 'horizontal' | 'vertical';
    cards: AECardState[];
}

/**
 * A fan of cards laid out in a line or column
 */
export const Fan = forwardRef<HTMLDivElement, FanProps>(
    ({ cards, className, orientation = 'horizontal' }, ref) => {
        return (
            <div
                className={clsx(
                    'flex gap-4',
                    { 'flex-col': orientation === 'vertical' },
                    className
                )}
            >
                {cards.map((c, i) => (
                    <div
                        key={c.id}
                        className={clsx('min-w-0 min-h-0 max-h-fit max-w-fit', {
                            shrink: i < cards.length - 1,
                            'shrink-0': i === cards.length - 1,
                        })}
                    >
                        <AECard card={c} />
                    </div>
                ))}
                {/* Placeholder ref lets us know where the next element will go */}
                <div key='placeholder' ref={ref} className='w-0 h-0' />
            </div>
        );
    }
);
