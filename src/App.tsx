import {
    Button,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarMenuItem,
    Tooltip,
} from '@nextui-org/react';
import clsx from 'clsx';
import { useReducer, useRef, useState } from 'react';
import { useMediaPredicate } from 'react-media-hook';
import { AECard } from './components/AECard';
import { CardActions } from './components/CardActions';
import { Deck } from './components/Deck';
import { Fan } from './components/Fan';
import { AECardState, cardState } from './state/AECardState';
import { reducer } from './state/Reducer';
import { shuffle } from './state/Shuffle';
import { turnOrderDeck } from './state/TurnOrderDecks';
import { motion } from 'framer-motion';
import { DragTarget } from './components/DragTarget';

const cardSizeClass = (orientation: 'vertical' | 'horizontal') =>
    clsx({
        'h-[calc(88px*2)]': orientation === 'vertical',
        'w-[calc(63px*2)]': orientation === 'horizontal',
    });

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

    const pageRef = useRef<HTMLDivElement>(null);
    const [draggingCard, setDraggingCard] = useState<AECardState | undefined>(
        undefined
    );

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
                ref={pageRef}
                className={clsx('grid', {
                    'grid-cols-2 grid-flow-col': orientation === 'vertical',
                    'grid-cols-1 grid-flow-row': orientation === 'horizontal',
                })}
            >
                <div className='flex grow'>
                    <div
                        className={clsx({
                            'ml-auto mr-auto': orientation === 'vertical',
                            'ml-10': orientation === 'horizontal',
                        })}
                    >
                        <Deck
                            className='m-4 mt-8'
                            onClick={() => {
                                dispatch({ type: 'drawTopCard' });
                            }}
                        >
                            {state.deck.map((c) => (
                                <AECard
                                    card={c}
                                    className={cardSizeClass(orientation)}
                                />
                            ))}
                        </Deck>
                    </div>

                    <DragTarget
                        className='w-40 h-[30%] border-2 border-foreground-200 text-foreground-500 flex place-content-center flex-wrap'
                        dragStatus={
                            draggingCard == null
                                ? { type: 'notDragging' }
                                : { type: 'dragging', target: draggingCard }
                        }
                        variants={{
                            targetted: { borderColor: 'ActiveBorder' },
                        }}
                        whileDragOver='targetted'
                        onDrop={(card) => {
                            dispatch({ type: 'cardToTop', card });
                        }}
                    >
                        Top
                    </DragTarget>
                </div>

                <Fan
                    className={clsx('place-content-start mt-6 mb-0 ', {
                        'ml-auto mr-auto h-[calc(100vh-6rem)]':
                            orientation === 'vertical',
                        'ml-8': orientation === 'horizontal',
                    })}
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
                            delay={500}
                            showArrow={true}
                            placement={
                                orientation === 'vertical'
                                    ? 'left-start'
                                    : 'bottom'
                            }
                            isDisabled={animatingCards.includes(c)}
                        >
                            {/* div is required for tooltip to work */}
                            <motion.div
                                className={cardSizeClass(orientation)}
                                drag
                                dragConstraints={pageRef}
                                dragMomentum={false}
                                dragSnapToOrigin={true}
                                whileDrag={{
                                    zIndex: 10,
                                    opacity: 0.7,
                                    pointerEvents: 'none',
                                }}
                                onDragStart={() => {
                                    setAnimatingCards((a) => a.concat(c));
                                    setDraggingCard(c);
                                }}
                                onDragEnd={() => {
                                    setAnimatingCards((a) =>
                                        a.filter((x) => x !== c)
                                    );
                                    setDraggingCard(undefined);
                                }}
                            >
                                <AECard
                                    className={cardSizeClass(orientation)}
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
                            </motion.div>
                        </Tooltip>
                    )}
                />
            </div>
        </div>
    );
}

export default App;
