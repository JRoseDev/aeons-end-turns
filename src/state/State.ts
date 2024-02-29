import { AECardState } from './AECardState';

export type Deck = AECardState[];

export interface State {
    deck: Deck;
    hand: Deck;
    testCard: AECardState;
    sound?: string;
}
