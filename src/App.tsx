import { Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react';
import { useReducer, useRef } from 'react';
import { Deck } from './components/Deck';
import { AECardState, cardState } from './state/AECardState';
import { reducer } from './state/Reducer';
import { turnOrderCards } from './state/TurnOrderCards';
import { AECard, AECardProps } from './components/AECard';

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
        deck: Object.values(turnOrderCards).map((name) =>
            cardState('turnOrder', { isFaceUp: false, cardName: name })
        ),
        discard: [],
        testCard: cardState('relic'),
    });

    const deckRef = useRef<HTMLDivElement>(null);
    const discardRef = useRef<HTMLDivElement>(null);

    const discardTopCard = () => {
        if (deckRef.current == null || discardRef.current == null) {
            return;
        }

        dispatch({
            type: 'dicardTopCard',
            deckElement: deckRef.current,
            discardElement: discardRef.current,
        });
    };

    return (
        <div className='w-full h-screen'>
            <Navbar position='sticky'>
                <NavbarContent>
                    <NavbarBrand>Aeon's End Turns</NavbarBrand>
                </NavbarContent>
            </Navbar>
            <div className='flex justify-between'>
                <Deck
                    ref={deckRef}
                    cards={state.deck.map(renderCardState)}
                    onClick={() => {
                        discardTopCard();
                    }}
                />

                <Deck
                    ref={discardRef}
                    cards={state.discard.map(renderCardState)}
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
