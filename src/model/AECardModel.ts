export type AECardType = 'gem' | 'relic' | 'spell';

export interface AECardModel {
    id: string;
    type: AECardType;
    isFaceUp: boolean;
}

const cardCounts: Record<AECardType, number> = {
    gem: 0,
    relic: 0,
    spell: 0,
};

export const newCard = (
    type: AECardType,
    { isFaceUp }: { isFaceUp: boolean } = { isFaceUp: true }
): AECardModel => {
    const id = `${type}-${cardCounts[type]++}`;

    return { id, type, isFaceUp };
};
