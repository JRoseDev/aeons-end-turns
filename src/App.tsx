import {
    Button,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarMenuItem,
} from '@nextui-org/react';
import { useReducer, useRef } from 'react';
import { Deck } from './components/Deck';
import { cardState } from './state/AECardState';
import { reducer } from './state/Reducer';
import { turnOrderDeck } from './state/TurnOrderDecks';
import { Fan } from './components/Fan';
import { useMediaPredicate } from 'react-media-hook';

function App() {
    const orientation = useMediaPredicate('(min-width: 500px)')
        ? 'horizontal'
        : 'vertical';

    const [state, dispatch] = useReducer(reducer, {
        deck: turnOrderDeck({ playerCount: 2, nemesisType: 'standard' }).map(
            (name) =>
                cardState('turnOrder', { isFaceUp: false, cardName: name })
        ),
        hand: [],
    });

    const sound = new Audio(state.sound ?? '');

    if (state.sound != null) {
        sound.play();
        dispatch({ type: 'soundPlayed' });
    }

    const deckRef = useRef<HTMLDivElement>(null);
    const handRef = useRef<HTMLDivElement>(null);

    const drawTopCard = () => {
        if (deckRef.current == null || handRef.current == null) {
            return;
        }

        dispatch({
            type: 'drawTopCard',
            deckCoords: deckRef.current.getBoundingClientRect(),
            handCoords: handRef.current.getBoundingClientRect(),
        });
    };

    return (
        <div className='w-full h-screen'>
            <Navbar position='sticky'>
                <NavbarContent>
                    <NavbarBrand>
                        <h1 className='text-xl font-ae-title'>
                            Aeon's End Turns
                        </h1>
                    </NavbarBrand>
                    <NavbarMenuItem>
                        <Button
                            color='primary'
                            onClick={() => {
                                dispatch({ type: 'shuffleDiscardIntoDeck' });
                            }}
                        >
                            Shuffle
                        </Button>
                    </NavbarMenuItem>
                </NavbarContent>
            </Navbar>
            <div className='flex'>
                <Deck
                    ref={deckRef}
                    cards={state.deck}
                    scale={2}
                    className='m-4'
                    onClick={() => {
                        drawTopCard();
                    }}
                />

                <Fan
                    ref={handRef}
                    cards={state.hand}
                    orientation={orientation}
                    className='m-4'
                />
            </div>
        </div>
    );
}

export default App;
