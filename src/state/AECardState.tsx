import { FC, ReactNode } from 'react';

export type AECardType = 'gem' | 'relic' | 'spell' | 'turnOrder';

export interface AECardState {
    id: string;
    type: AECardType;
    cardName?: string;
    isFaceUp: boolean;
    wasFaceUp: boolean;
    animation?: FC<{ children: ReactNode }>;
}

const cardCounts: Record<AECardType, number> = {
    gem: 0,
    relic: 0,
    spell: 0,
    turnOrder: 0,
};

export const cardState = (
    type: AECardType,
    options: Omit<AECardState, 'type' | 'id' | 'wasFaceUp'> & {
        wasFaceUp?: boolean;
    } = {
        isFaceUp: true,
    }
): AECardState => {
    const id = `${type}-${cardCounts[type]++}`;

    return { wasFaceUp: options.isFaceUp, ...options, id, type };
};
