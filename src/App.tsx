import { Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react';
import { Card } from './components/Card';
import { useState } from 'react';

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
                <Card
                    isFaceUp={isFaceUp}
                    front={'Front!'}
                    back={'Back!'}
                    onClick={() => setIsFaceUp(!isFaceUp)}
                />
            </div>
        </div>
    );
}

export default App;
