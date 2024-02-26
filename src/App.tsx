import { Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react';
import { AECard, AECardType } from './components/AECard';
import { Deck } from './components/Deck';
import { motion } from 'framer-motion';
import { useCallback, useRef, useState } from 'react';

const makeCard = (type: AECardType) => {
    return <AECard type={type} isFaceUp={false} scale={2} />;
};

function App() {
    const [deck, setDeck] = useState(
        Array(50)
            .fill(0)
            .map(() => makeCard('Gem'))
    );

    const [discard, setDiscard] = useState(
        Array(3)
            .fill(0)
            .map(() => <AECard type={'Spell'} isFaceUp={true} scale={2} />)
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

        const topCard = (
            <motion.div
                style={{
                    transform: `translate(${start.x}px,${start.y}px)`,
                }}
                animate={{
                    transform: 'translate(0,0)',
                }}
            >
                {deck[deck.length - 1]}
            </motion.div>
        );
        setDiscard((d) => d.concat(topCard));
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
                    cards={deck}
                    onClick={() => {
                        discardTopCard();
                    }}
                />

                <Deck ref={discardRef} cards={discard} />
            </div>
        </div>
    );
}

export default App;
