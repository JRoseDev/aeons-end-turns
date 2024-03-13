import {
    Button,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarMenuItem,
    Tooltip,
} from '@nextui-org/react';
import clsx from 'clsx';
import { useReducer, useState } from 'react';
import { useMediaPredicate } from 'react-media-hook';
import { AECard } from './components/AECard';
import { CardActions } from './components/CardActions';
import { Deck } from './components/Deck';
import { Fan } from './components/Fan';
import { AECardState, cardState } from './state/AECardState';
import { reducer } from './state/Reducer';
import { shuffle } from './state/Shuffle';
import { turnOrderDeck } from './state/TurnOrderDecks';

function App() {
    const orientation = useMediaPredicate('(min-width: 500px)')
        ? 'horizontal'
        : 'vertical';

    const [state, dispatch] = useReducer(reducer, {
        deck: shuffle(
            turnOrderDeck({ playerCount: 2, nemesisType: 'standard' })
        ).map((card) =>
            cardState('turnOrder', {
                isFaceUp: false,
                cardName: card.name,
                owner: card.owner,
            })
        ),
        hand: [],
    });

    const sound = new Audio(state.sound ?? '');

    if (state.sound != null) {
        sound.play();
        dispatch({ type: 'soundPlayed' });
    }

    const [animatingCards, setAnimatingCards] = useState<AECardState[]>([]);

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
                            scale={2}
                            className='m-4'
                            onClick={() => {
                                dispatch({ type: 'drawTopCard' });
                            }}
                        >
                            {state.deck.map((c) => (
                                <AECard card={c} />
                            ))}
                        </Deck>
                    </div>
                </div>

                <Fan
                    cards={state.hand}
                    orientation={orientation}
                    minSize={6}
                    renderCard={(c) => (
                        <Tooltip
                            content={
                                <div
                                    className={clsx('flex gap-4 p-2', {
                                        'flex-col': orientation === 'vertical',
                                    })}
                                >
                                    <CardActions card={c} onAction={dispatch} />
                                </div>
                            }
                            showArrow={true}
                            placement={
                                orientation === 'vertical' ? 'left' : 'bottom'
                            }
                            isDisabled={animatingCards.includes(c)}
                        >
                            {/* div is required for tooltip to work */}
                            <div>
                                <AECard
                                    card={c}
                                    onLayoutAnimationStart={() => {
                                        setAnimatingCards((a) => a.concat(c));
                                    }}
                                    onLayoutAnimationComplete={() => {
                                        setAnimatingCards((a) =>
                                            a.filter((x) => x !== c)
                                        );
                                    }}
                                />
                            </div>
                        </Tooltip>
                    )}
                    className={clsx(
                        'place-content-center m-4  max-h-[calc(100vh-6rem)] grow',
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
