import { Box, Flex, Link,} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';


function Navbar() {
    return ( 
        <Flex
            bg="#00000"
            p={4}
            align="center"
            justify="space-between"
        >
            <Box>
                <img
                    src='src/assets/react.svg'
                    alt='logo'
                    style={{width: '50px', height: '50px', marginRight: '10px'}}
                />
            </Box> 
            <Box>
                <>
                    <Link
                        as={RouterLink}
                        to="/"
                        mr={4}
                        color="Black"
                        _hover={{ textDecoration: 'underline' }}
                    >
                        Home
                    </Link>
                    <Link
                        as={RouterLink}
                        to="/about-us"
                        mr={4}
                        color="Black"
                        _hover={{ textDecoration: 'underline' }}
                    >
                        About Us
                    </Link>
                    <Link
                        as={RouterLink}
                        to="/tour"
                        mr={4}
                        color="Black"
                        _hover={{ textDecoration: 'underline' }}
                    >
                        tour
                    </Link>
                    <Link
                        as={RouterLink}
                        to="/store"
                        mr={4}
                        color="Black"
                        _hover={{ textDecoration: 'underline' }}
                    >
                        store
                    </Link>
                </>

      </Box>
        </Flex>
    )




}

export default Navbar;