const player1 = '1';
const player2 = '2';
const player3 = '3';
const player4 = '4';
const wildcard = 'Wild';
const nemesis = 'Nemesis';

type TurnOrderCard = '1' | '2' | '3' | '4' | 'Wild' | 'Nemesis';

export type PlayerCount = 1 | 2 | 3 | 4;
export type NemesisType = 'standard' | 'maelstrom';

const playerCards: Record<PlayerCount, TurnOrderCard[]> = {
    '1': [player1, player1, player1, player1],
    '2': [player1, player1, player2, player2],
    '3': [player1, player2, player3, wildcard],
    '4': [player1, player2, player3, player4],
};

const nemesisCards: Record<NemesisType, TurnOrderCard[]> = {
    standard: [nemesis, nemesis],
    maelstrom: [nemesis, nemesis],
};

export const turnOrderDeck = ({
    playerCount,
    nemesisType,
}: {
    playerCount: PlayerCount;
    nemesisType: NemesisType;
}) => {
    return [...playerCards[playerCount], ...nemesisCards[nemesisType]];
};
