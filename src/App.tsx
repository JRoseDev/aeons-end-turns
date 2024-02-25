import { Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react';
import { useState } from 'react';
import { AECard, AECardType } from './components/AECard';
import { Deck } from './components/Deck';

const makeCard = (type: AECardType) => {
    return <AECard type={type} isFaceUp={false} scale={2} />;
};

function App() {
    const [isFaceUp, setIsFaceUp] = useState(true);

    return (
        <div className='h-screen w-screen'>
            <Navbar position='sticky'>
                <NavbarContent>
                    <NavbarBrand>Aeon's End Turns</NavbarBrand>
                </NavbarContent>
            </Navbar>
            <div className='flex gap-4'>
                <AECard
                    type='Gem'
                    isFaceUp={isFaceUp}
                    scale={2}
                    onClick={() => setIsFaceUp(!isFaceUp)}
                />
                <AECard
                    type='Relic'
                    isFaceUp={isFaceUp}
                    scale={2}
                    onClick={() => setIsFaceUp(!isFaceUp)}
                />
                <AECard
                    type='Spell'
                    isFaceUp={isFaceUp}
                    scale={2}
                    onClick={() => setIsFaceUp(!isFaceUp)}
                />

                <Deck
                    cards={Array(50)
                        .fill(0)
                        .map(() => makeCard('Gem'))}
                />
            </div>
        </div>
    );
}

export default App;
