export type AECardType = 'gem' | 'relic' | 'spell' | 'turnOrder';

export interface AECardState {
    id: string;
    type: AECardType;
    owner: 'player' | 'nemesis';
    cardName?: string;
    isFaceUp: boolean;
    wasFaceUp: boolean;
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
    }
): AECardState => {
    const id = `${type}-${cardCounts[type]++}`;

    return { wasFaceUp: options.isFaceUp, ...options, id, type };
};
