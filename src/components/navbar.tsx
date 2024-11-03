import { Box, Flex, Link,} from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';


function Navbar() {
    const location = useLocation();

    return (
        <Flex
            bg="#000000"
            pt={"16"}
            pb={"4"}
            align="center"
            justify="space-between"
        >
            <Box alignItems="center" display="flex" justifyContent="center" width="100%">
                <>
                    <Link
                        as={RouterLink}
                        to="/"
                        mr={4}
                        fontFamily="Sansation"
                        fontSize={16}
                        fontWeight={'300'}
                        bg={location.pathname === '/' ? 'white' : 'transparent'}
                        color={location.pathname === '/' ? 'black' : 'White'}
                        p="6px 12px"
                    >
                        HOME
                    </Link>
                    <Link
                        as={RouterLink}
                        to="/about-us"
                        mr={4}
                        fontFamily="Sansation"
                        fontSize={16}
                        fontWeight={'300'}
                        bg={location.pathname === '/about-us' ? 'white' : 'transparent'}
                        color={location.pathname === '/about-us' ? 'black' : 'White'}
                        p="6px 12px"
                    >
                        ABOUT US
                    </Link>
                    <Link
                        as={RouterLink}
                        to="/tour"
                        mr={4}
                        fontFamily="Sansation"
                        fontSize={16}
                        fontWeight={'300'}
                        bg={location.pathname === '/tour' ? 'white' : 'transparent'}
                        color={location.pathname === '/tour' ? 'black' : 'White'}
                        p="6px 12px"
                    >
                        TOUR
                    </Link>
                    <Link
                        as={RouterLink}
                        to="/store"
                        mr={4}
                        fontFamily="Sansation"
                        fontSize={16}
                        fontWeight={'300'}
                        bg={location.pathname === '/store' ? 'white' : 'transparent'}
                        color={location.pathname === '/store' ? 'black' : 'White'}
                        p="6px 12px"
                    >
                        STORE
                    </Link>
                    <Link
                        as={RouterLink}
                        to="/albums"
                        mr={4}
                        fontFamily="Sansation"
                        fontSize={16}
                        fontWeight={'300'}
                        bg={location.pathname === '/albums' ? 'white' : 'transparent'}
                        color={location.pathname === '/albums' ? 'black' : 'White'}
                        p="6px 12px"
                    >
                        ALBUMS
                    </Link>
                    <Link
                        as={RouterLink}
                        to="/contact-us"
                        mr={4}
                        fontFamily="Sansation"
                        fontSize={16}
                        fontWeight={'300'}
                        bg={location.pathname === '/contact-us' ? 'white' : 'transparent'}
                        color={location.pathname === '/contact-us' ? 'black' : 'White'}
                        p="5px 12px 6px 12px"
                    >
                        CONTACT US
                    </Link>
                </>

      </Box>
        </Flex>
    )




}

export default Navbar;