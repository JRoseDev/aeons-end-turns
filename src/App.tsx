import {
    Button,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarMenuItem,
} from '@nextui-org/react';
import clsx from 'clsx';
import { useReducer, useRef } from 'react';
import { useMediaPredicate } from 'react-media-hook';
import { Deck } from './components/Deck';
import { Fan } from './components/Fan';
import { cardState } from './state/AECardState';
import { reducer } from './state/Reducer';
import { turnOrderDeck } from './state/TurnOrderDecks';
import { shuffle } from './state/Shuffle';

function App() {
    const orientation = useMediaPredicate('(min-width: 500px)')
        ? 'horizontal'
        : 'vertical';

    const [state, dispatch] = useReducer(reducer, {
        deck: shuffle(
            turnOrderDeck({ playerCount: 2, nemesisType: 'standard' })
        ).map((name) =>
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

        dispatch({ type: 'drawTopCard' });
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
            <div
                className={clsx('grid', {
                    'grid-cols-2 grid-flow-col': orientation === 'vertical',
                    'grid-cols-1 grid-flow-row': orientation === 'horizontal',
                })}
            >
                <div className='flex grow'>
                    <div
                        className={clsx({
                            'ml-auto mr-auto': orientation === 'vertical',
                            'ml-4': orientation === 'horizontal',
                        })}
                    >
                        <Deck
                            ref={deckRef}
                            cards={state.deck}
                            scale={2}
                            className='m-4'
                            onClick={() => {
                                drawTopCard();
                            }}
                        />
                    </div>
                </div>

                <Fan
                    ref={handRef}
                    cards={state.hand}
                    orientation={orientation}
                    className={clsx(
                        'items-center m-4 justify-items-center max-h-96 grow',
                        {
                            'ml-auto mr-auto': orientation === 'vertical',
                            'ml-8': orientation === 'horizontal',
                        }
                    )}
                />
            </div>
        </div>
    );
}

export default App;
