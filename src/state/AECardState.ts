export type AECardType = 'gem' | 'relic' | 'spell' | 'turnOrder';

export interface AECardState {
    id: string;
    type: AECardType;
    cardName?: string;
    isFaceUp: boolean;
}

const cardCounts: Record<AECardType, number> = {
    gem: 0,
    relic: 0,
    spell: 0,
    turnOrder: 0,
};

export const cardState = (
    type: AECardType,
    { isFaceUp, cardName }: { isFaceUp: boolean; cardName?: string } = {
        isFaceUp: true,
    }
): AECardState => {
    const id = `${type}-${cardCounts[type]++}`;

    return { id, type, isFaceUp, cardName };
};
