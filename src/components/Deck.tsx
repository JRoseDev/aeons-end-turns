import clsx from 'clsx';
import { useState, type FC, type ReactNode } from 'react';
import { cardSizeStyle } from '../util/CardSizeStyle';
import { getRandom } from '../util/GetRandom';

interface DeckProps {
    className?: string;
    children: ReactNode[];
    scale: number;
    onClick?: () => void;
}

export const Deck: FC<DeckProps> = ({
    children,
    className,
    scale = 1,
    onClick,
}) => {
    const [rotations, setRotations] = useState((): number[] =>
        children.map(() => getRandom(-2, 3))
    );

    if (rotations.length < children.length) {
        setRotations(children.map((_, i) => rotations[i] ?? getRandom(-2, 3)));
    }

    return (
        <div
            className={clsx(className, 'relative', {
                'cursor-pointer': children.length > 0 && onClick != null,
            })}
            style={cardSizeStyle(scale)}
            onClick={() => children.length > 0 && onClick?.()}
        >
            {children.map((c, i) => {
                return (
                    <div
                        key={i}
                        className='absolute top-0'
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
};
