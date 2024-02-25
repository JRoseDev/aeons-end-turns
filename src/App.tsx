import { Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react';
import { useState } from 'react';
import { AECard } from './components/AECard';

function App() {
    const [isFaceUp, setIsFaceUp] = useState(true);

    return (
        <div className='h-screen w-screen'>
            <Navbar position='sticky'>
                <NavbarContent>
                    <NavbarBrand>Aeon's End Turns</NavbarBrand>
                </NavbarContent>
            </Navbar>
            <div>
                <AECard
                    type='Gem'
                    isFaceUp={isFaceUp}
                    onClick={() => setIsFaceUp(!isFaceUp)}
                />
            </div>
        </div>
    );
}

export default App;
