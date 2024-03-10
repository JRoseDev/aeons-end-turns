const player1 = { name: '1', owner: 'player' } as const;
const player2 = { name: '2', owner: 'player' } as const;
const player3 = { name: '3', owner: 'player' } as const;
const player4 = { name: '4', owner: 'player' } as const;
const wildcard = { name: 'Wild', owner: 'player' } as const;
const nemesis = { name: 'Nemesis', owner: 'nemesis' } as const;

type TurnOrderCard = '1' | '2' | '3' | '4' | 'Wild' | 'Nemesis';

export type PlayerCount = 1 | 2 | 3 | 4;
export type NemesisType = 'standard' | 'maelstrom';

const playerCards: Record<
    PlayerCount,
    { name: TurnOrderCard; owner: 'player' | 'nemesis' }[]
> = {
    '1': [player1, player1, player1, player1],
    '2': [player1, player1, player2, player2],
    '3': [player1, player2, player3, wildcard],
    '4': [player1, player2, player3, player4],
};

const nemesisCards: Record<
    NemesisType,
    { name: TurnOrderCard; owner: 'player' | 'nemesis' }[]
> = {
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
