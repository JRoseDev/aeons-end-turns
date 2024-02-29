import { AECardState } from './AECardState';

export type Deck = AECardState[];

export interface State {
    deck: Deck;
    hand: Deck;
    sound?: string;
}
