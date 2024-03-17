import clsx from 'clsx';
import { useState, type ReactNode, forwardRef } from 'react';
import { getRandom } from '../util/GetRandom';

interface DeckProps {
    className?: string;
    children: ReactNode[];
    onClick?: () => void;
}

export const Deck = forwardRef<HTMLDivElement, DeckProps>(
    ({ children, className, onClick }, ref) => {
        const [rotations, setRotations] = useState((): number[] =>
            children.map(() => getRandom(-2, 3))
        );

        if (rotations.length < children.length) {
            setRotations(
                children.map((_, i) => rotations[i] ?? getRandom(-2, 3))
            );
        }

        return (
            <div
                ref={ref}
                className={clsx(className, 'grid', {
                    'cursor-pointer': children.length > 0 && onClick != null,
                })}
                onClick={() => children.length > 0 && onClick?.()}
            >
                {children.map((c, i) => {
                    return (
                        <div
                            key={i}
                            className='col-start-1 row-start-1'
                            style={{
                                transform: `rotate(${rotations[i]}deg)`,
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
