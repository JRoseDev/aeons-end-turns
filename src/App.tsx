import {
    Button,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarMenuItem,
} from '@nextui-org/react';
import { useReducer, useRef } from 'react';
import { AECard, AECardProps } from './components/AECard';
import { Deck } from './components/Deck';
import { AECardState, cardState } from './state/AECardState';
import { reducer } from './state/Reducer';
import { turnOrderDeck } from './state/TurnOrderDecks';
import { Fan } from './components/Fan';

const renderCardState = ({
    type,
    isFaceUp,
    wasFaceUp,
    id,
    cardName,
    animation: Animation,
    onClick,
}: AECardState & { onClick?: AECardProps['onClick'] }) => {
    const card = (
        <AECard
            key={id}
            type={type}
            cardName={cardName}
            facing={isFaceUp ? 'faceUp' : 'faceDown'}
            initialFacing={wasFaceUp ? 'faceUp' : 'faceDown'}
            scale={2}
            onClick={onClick}
        />
    );

    if (Animation != null) {
        return <Animation>{card}</Animation>;
    }

    return card;
};

function App() {
    const [state, dispatch] = useReducer(reducer, {
        deck: turnOrderDeck({ playerCount: 2, nemesisType: 'standard' }).map(
            (name) =>
                cardState('turnOrder', { isFaceUp: false, cardName: name })
        ),
        hand: [],
        testCard: cardState('relic'),
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
                    <NavbarBrand>Aeon's End Turns</NavbarBrand>
                    <NavbarMenuItem>
                        <Button
                            onClick={() => {
                                dispatch({ type: 'shuffleDiscardIntoDeck' });
                            }}
                        >
                            Shuffle
                        </Button>
                    </NavbarMenuItem>
                </NavbarContent>
            </Navbar>
            <div className='flex flex-col'>
                <Deck
                    ref={deckRef}
                    cards={state.deck.map(renderCardState)}
                    onClick={() => {
                        drawTopCard();
                    }}
                />

                <Fan
                    ref={handRef}
                    cards={state.hand.map(renderCardState)}
                    className='w-10'
                />
            </div>

            {renderCardState({
                ...state.testCard,
                onClick: () => {
                    dispatch({ type: 'flipTestCard' });
                },
            })}
        </div>
    );
}

export default App;
