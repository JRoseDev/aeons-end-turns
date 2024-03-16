import clsx from 'clsx';
import { type FC, type ReactNode } from 'react';
import { AECardState } from '../state/AECardState';

export interface FanProps {
    className?: string;
    classNames?: { placeholder: string };
    orientation?: 'horizontal' | 'vertical';
    cards: AECardState[];
    renderCard: (card: AECardState) => ReactNode;
    /**
     * Set the minimum height/width of the fan (depending on orientation)
     * as if it was holding a given number of cards.
     */
    minSize?: number;
}

/**
 * A fan of cards laid out in a line or column
 */
export const Fan: FC<FanProps> = ({
    cards,
    className,
    orientation = 'horizontal',
    minSize = 0,
    renderCard,
}) => {
    const size = Math.max(minSize, cards.length);

    return (
        <div
            className={clsx('grid gap-4', className)}
            style={
                orientation === 'vertical'
                    ? {
                          // Divide the grid into equal-sized rows, except for the last,
                          // which gets as much space as it needs.
                          gridTemplateRows: `repeat(${size}, calc((100% - 16rem) / ${size})) auto`,
                      }
                    : {
                          gridTemplateColumns: `repeat(${size}, calc((100% - 12rem) / ${size})) ${
                              minSize > 0 ? '' : ''
                          }`,
                      }
            }
        >
            {cards.map((c) => renderCard(c))}
        </div>
    );
};
