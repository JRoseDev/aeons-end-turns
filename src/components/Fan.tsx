import clsx from 'clsx';
import { ReactNode, forwardRef } from 'react';

export interface FanProps {
    className?: string;
    cards: ReactNode;
}

/**
 * A fan of cards laid out in a line or column
 */
export const Fan = forwardRef<HTMLDivElement, FanProps>(
    ({ cards, className }, ref) => {
        return (
            <div className={clsx('flex gap-4', className)}>
                {cards}
                {/* Placeholder ref lets us know where the next element will go */}
                <div ref={ref} className='w-0 h-0' />
            </div>
        );
    }
);
