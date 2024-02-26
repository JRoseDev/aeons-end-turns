import { Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react';
import { AECard } from './components/AECard';
import { Deck } from './components/Deck';
import { motion } from 'framer-motion';
import { ReactNode, useCallback, useRef, useState } from 'react';
import { AECardModel, newCard } from './model/AECardModel';
import { Facing } from './components/Card';

type DeckCard = AECardModel & { render?: (card: AECardModel) => ReactNode };

const renderCard = ({ type, isFaceUp, id, render }: DeckCard) => {
    if (render != null) {
        return render({ type, isFaceUp, id });
    }

    return (
        <AECard
            key={id}
            type={type}
            facing={isFaceUp ? 'faceUp' : 'faceDown'}
            scale={2}
        />
    );
};

function App() {
    const [testCardFacing, setTestCardFacing] = useState<Facing>('faceDown');

    const [deck, setDeck] = useState<DeckCard[]>(
        Array(5)
            .fill(0)
            .map(() => newCard('gem', { isFaceUp: false }))
    );

    const [discard, setDiscard] = useState<DeckCard[]>(
        Array(3)
            .fill(0)
            .map(() => newCard('spell'))
    );

    const deckRef = useRef<HTMLDivElement>(null);
    const discardRef = useRef<HTMLDivElement>(null);

    const discardTopCard = useCallback(() => {
        if (deckRef.current == null || discardRef.current == null) {
            return;
        }

        setDeck((d) => d.slice(0, d.length - 1));

        /**
         * Discard is the 'from' even though we're discarding from
         * the deck to the discard because we're removing the old
         * element from the deck before animating the new element
         * we added to the discard.
         */
        const { x: fromX, y: fromY } =
            discardRef.current.getBoundingClientRect();
        const { x: toX, y: toY } = deckRef.current.getBoundingClientRect();

        const start = { x: toX - fromX, y: toY - fromY };

        setDiscard((d) =>
            d.concat({
                ...deck[deck.length - 1],
                isFaceUp: true,
                render: (card) => (
                    <motion.div
                        initial={{
                            transform: `translate(${start.x}px,${start.y}px)`,
                        }}
                        animate={{
                            transform: 'translate(0,0)',
                            transition: { duration: 0.6 },
                        }}
                    >
                        {
                            <AECard
                                key={card.id}
                                type={card.type}
                                initialFacing='faceDown'
                                facing='faceUp'
                                scale={2}
                            />
                        }
                    </motion.div>
                ),
            })
        );
    }, [deck]);

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
                    cards={deck.map(renderCard)}
                    onClick={() => {
                        discardTopCard();
                    }}
                />

                <Deck ref={discardRef} cards={discard.map(renderCard)} />
            </div>

            <AECard
                type='relic'
                initialFacing={
                    testCardFacing === 'faceUp' ? 'faceDown' : 'faceUp'
                }
                facing={testCardFacing}
                scale={2}
                onClick={() =>
                    setTestCardFacing(
                        testCardFacing === 'faceUp' ? 'faceDown' : 'faceUp'
                    )
                }
            />
        </div>
    );
}

export default App;
