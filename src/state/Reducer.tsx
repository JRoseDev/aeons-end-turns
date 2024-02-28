import { move } from '../animations/Move';
import { getRandom } from '../util/GetRandom';
import { AECardState } from './AECardState';
import { State } from './State';
import SuccessSound from '../assets/Success.mp3';
import DramaticSound from '../assets/DramaticSting.mp3';

export type Action =
    | {
          type: 'dicardTopCard';
          deckElement: HTMLDivElement;
          discardElement: HTMLDivElement;
      }
    | {
          type: 'flipTestCard';
      }
    | { type: 'shuffleDiscardIntoDeck' }
    | { type: 'soundPlayed' };

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'dicardTopCard': {
            const newDeck = state.deck.slice(0, state.deck.length - 1);

            const card: AECardState = {
                ...state.deck[state.deck.length - 1],
                isFaceUp: true,
                /**
                 * Discard is the 'from' even though we're discarding from
                 * the deck to the discard because we're removing the old
                 * element from the deck before animating the new element
                 * we added to the discard.
                 */
                animation: move({
                    from: action.discardElement.getBoundingClientRect(),
                    to: action.deckElement.getBoundingClientRect(),
                }),
            };

            const newDiscard = state.discard.concat(card);
            const sound =
                card.cardName === 'Nemesis' ? DramaticSound : SuccessSound;

            return { ...state, deck: newDeck, discard: newDiscard, sound };
        }

        case 'shuffleDiscardIntoDeck':
            return {
                ...state,
                deck: state.deck
                    .concat(
                        state.discard.map((c) => ({
                            ...c,
                            isFaceUp: false,
                            wasFaceUp: false,
                        }))
                    )
                    .sort(() => getRandom(-1, 2)),
                discard: [],
            };

        case 'soundPlayed':
            return { ...state, sound: undefined };

        case 'flipTestCard':
            return {
                ...state,
                testCard: {
                    ...state.testCard,
                    isFaceUp: !state.testCard.isFaceUp,
                    wasFaceUp: state.testCard.isFaceUp,
                },
            };

        default:
            return state;
    }
};
