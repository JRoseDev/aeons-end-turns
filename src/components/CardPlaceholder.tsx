import type { FC } from 'react';
import { Card, type CardProps } from './Card';

export const CardPlaceholder: FC<Omit<CardProps, 'front' | 'back'>> = (
    props
) => {
    return (
        <Card
            front={<div className='bg-transparent pointer-events-none'></div>}
            back={<div className='bg-transparent pointer-events-none'></div>}
            {...props}
        />
    );
};
