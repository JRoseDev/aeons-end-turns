import clsx from 'clsx';
import { useMemo, type FC } from 'react';
import { AECardState } from '../state/AECardState';
import { AECard } from './AECard';
import { CardPlaceholder } from './CardPlaceholder';

export interface FanProps {
    className?: string;
    orientation?: 'horizontal' | 'vertical';
    cards: AECardState[];
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
    minSize,
}) => {
    const placeholders = useMemo(() => {
        return new Array(Math.max((minSize ?? 0) - cards.length, 0))
            .fill(undefined)
            .map((_, i) => <CardPlaceholder key={`placeholder-${i}`} scale={2} />);
    }, [minSize, cards.length]);

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
            {placeholders}
        </div>
    );
};
