import { Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react';
import { AECard, AECardType } from './components/AECard';
import { Deck } from './components/Deck';

const makeCard = (type: AECardType) => {
    return <AECard type={type} isFaceUp={false} scale={2} />;
};

function App() {
    return (
        <div className='h-screen w-full'>
            <Navbar position='sticky'>
                <NavbarContent>
                    <NavbarBrand>Aeon's End Turns</NavbarBrand>
                </NavbarContent>
            </Navbar>
            <div className='flex justify-between'>
                <Deck
                    cards={Array(50)
                        .fill(0)
                        .map(() => makeCard('Gem'))}
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
