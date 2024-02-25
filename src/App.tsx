import { Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react';

function App() {
    return (
        <div className='h-screen w-screen'>
            <Navbar position='sticky'>
                <NavbarContent>
                    <NavbarBrand>Aeon's End Turns</NavbarBrand>
                </NavbarContent>
            </Navbar>
        </div>
    );
}

export default App;
