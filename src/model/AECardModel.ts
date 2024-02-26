export type AECardType = 'gem' | 'relic' | 'spell' | 'turnOrder';

export interface AECardModel {
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

export const newCard = (
    type: AECardType,
    { isFaceUp, cardName }: { isFaceUp: boolean; cardName?: string } = {
        isFaceUp: true,
    }
): AECardModel => {
    const id = `${type}-${cardCounts[type]++}`;

    return { id, type, isFaceUp, cardName };
};
