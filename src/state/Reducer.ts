import DramaticSound from '../assets/DramaticSting.mp3';
import SuccessSound from '../assets/Success.mp3';
import { AECardState } from './AECardState';
import { State } from './State';

export type Action =
    | { type: 'drawTopCard' }
    | { type: 'shuffleDiscardIntoDeck' }
    | { type: 'soundPlayed' };

const shuffle = <T>(items: T[]): T[] => {
    let currentIndex = items.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [items[currentIndex], items[randomIndex]] = [
            items[randomIndex],
            items[currentIndex],
        ];
    }

    return items;
};

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'drawTopCard': {
            const newDeck = state.deck.slice(0, state.deck.length - 1);

            const card: AECardState = {
                ...state.deck[state.deck.length - 1],
                isFaceUp: true,
            };

            const newDiscard = state.hand.concat(card);
            const sound =
                card.cardName === 'Nemesis' ? DramaticSound : SuccessSound;

            return { ...state, deck: newDeck, hand: newDiscard, sound };
        }

        case 'shuffleDiscardIntoDeck':
            return {
                ...state,
                deck: shuffle(
                    state.deck.concat(
                        state.hand.map((c) => ({
                            ...c,
                            isFaceUp: false,
                            wasFaceUp: false,
                        }))
                    )
                ),
                hand: [],
            };

        case 'soundPlayed':
            return { ...state, sound: undefined };

        default:
            return state;
    }
};
