import {
    Box,
    Center,
    Flex,
    Image,
    Stack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
// import { Drawer, List, ListItem, ListItemText } from '@material-ui/core';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { FaBars, FaSearch, FaShoppingCart, FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../../../images/logo.jpeg';
import { useSelector } from 'react-redux';
import { UserOptions } from './UserOptions';
import Button from '@mui/material/Button';
import './Navbar.css';

export const Navbar = () => {
    const { isAuthenticated, user } = useSelector(state => state.user)
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Navbar options
    const options = [
        { label: 'Home', link: '/' },
        { label: 'Products', link: '/products' },
        { label: 'About', link: '/about' },
        { label: 'Contact', link: '/contact' }
    ];
    return (
        <Flex
            w="90%"
            m="auto"
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="center"
            gap={5}
        >
            <Box>
                <Link to="/">
                    <Image w={100} objectFit="cover" src={logo} alt="Surshaa" />
                </Link>
            </Box>


            <div className="menu" >
                <Center display={['none', 'none', 'flex']} >
                    <Stack direction="row" spacing={10} >
                        <Link to="/">
                            <Button variant="text">Home</Button>
                        </Link>
                        <Link to="/products">
                            <Button variant="text">Products</Button>
                        </Link>
                        <Link to="/about">
                            <Button variant="text">About</Button>
                        </Link>
                        <Link to="/contact">
                            <Button variant="text">Contact</Button>
                        </Link>
                    </Stack>
                </Center>
            </div>
            <div className='menu'>
                <Center gap={10}>
                    <Link to="/search"><FaSearch /></Link>
                    <Link to="/cart"><FaShoppingCart mr={5} /></Link>
                    {isAuthenticated ? <UserOptions user={user} /> : <Link to="/login"> <FaUserAlt /></Link>}
                </Center>
            </div>
            {/* Menu button */}
            <div className="small">
                <Button variant="text" onClick={toggleMenu}>
                    <FaBars />
                </Button>
                {isAuthenticated && <UserOptions user={user} />}
                <Drawer
                    anchor="left"
                    open={isMenuOpen}
                    onClose={() => setIsMenuOpen(false)}
                >
                    {/* Drawer content */}
                    <List>
                        {options.map(option => (
                            <ListItem button component="a" href={option.link} key={option.label}>
                                <ListItemText primary={option.label} />
                            </ListItem>
                        ))}
                        {/* Additional menu options */}
                        <ListItem button component={Link} to="/search">
                            <FaSearch />
                            <ListItemText primary="Search" />
                        </ListItem>
                        <ListItem button component={Link} to="/cart">
                            <FaShoppingCart />
                            <ListItemText primary="Cart" />
                        </ListItem>
                        {isAuthenticated ? (
                            <ListItem>
                                <FaUserAlt />
                                <ListItemText primary={user.name} />
                            </ListItem>
                        ) : (
                            <ListItem button component={Link} to="/login">
                                <FaUserAlt />
                                <ListItemText primary="Login" />
                            </ListItem>
                        )}
                    </List>
                </Drawer>
            </div>

        </Flex>
    );
};
