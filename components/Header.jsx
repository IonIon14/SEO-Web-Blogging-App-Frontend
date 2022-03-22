
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
import Link from 'next/link';

const Header = ({ props }) => {

    const [isToggled, setIsToggled] = useState(false)

    const toggle = () => {
        setIsToggled(!isToggled)
    }

    return (
        <>
            <Navbar color="light" light expand="md">
                <Link href="/">
                    <NavLink className='font-weight-bold'>{APP_NAME}</NavLink>
                </Link>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isToggled} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Link href="/signIn">
                                <NavLink>
                                    Sign In
                                </NavLink>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link href="/signUp">
                                <NavLink>
                                    Sign Up
                                </NavLink>
                            </Link>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </>
    );

}


export default Header;