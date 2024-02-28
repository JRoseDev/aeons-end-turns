import { AECardState } from './AECardState';

export type Deck = AECardState[];

export interface State {
    deck: Deck;
    discard: Deck;
    testCard: AECardState;
    sound?: string;
}
