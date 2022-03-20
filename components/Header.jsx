
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { useState } from "react"
import { APP_NAME } from '../config';

const Header = ({ props }) => {

    const [isToggled, setIsToggled] = useState(false)

    const toggle = () => {
        setIsToggled(!isToggled)
    }

    return (
        <>
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">{APP_NAME}</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isToggled} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/components/">Components</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </>
    );

}


export default Header;