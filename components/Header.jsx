import { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import nProgress from 'nprogress';
import { APP_NAME } from '../config';
import { signout, isAuth } from '../actions/auth';
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

Router.onRouteChangeStart = url => nProgress.start()
Router.onRouteChangeComplete = url => nProgress.done()
Router.onRouteChangeError = url => nProgress.done()

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <Navbar color="light" light expand="md">
                <Link href="/">
                    <NavLink className="font-weight-bold">{APP_NAME}</NavLink>
                </Link>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        {!isAuth() && (
                            <>
                                <NavItem>
                                    <Link href="/signIn">
                                        <NavLink>Signin</NavLink>
                                    </Link>
                                </NavItem>
                                <NavItem>
                                    <Link href="/signUp">
                                        <NavLink>Signup</NavLink>
                                    </Link>
                                </NavItem>
                            </>
                        )}

                        {isAuth() && (
                            <NavItem>
                                <NavLink style={{ cursor: 'pointer' }} onClick={() => signout(() => Router.replace(`/signIn`))}>
                                    Signout
                                </NavLink>
                            </NavItem>
                        )}


                        {(isAuth() && isAuth().role === 0) &&
                            <NavItem>
                                <NavLink href="/user">
                                    {`${isAuth().name}'s Dashboard`}
                                </NavLink>
                            </NavItem>
                        }

                        {(isAuth() && isAuth().role === 1) &&
                            <NavItem>
                                <NavLink href="/admin">

                                    {`${isAuth().name}'s Dashboard`}

                                </NavLink>
                            </NavItem>
                        }
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
};

export default Header;