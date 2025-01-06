import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router';
import { Box, Flex, Image, IconButton } from '@chakra-ui/react';
import { GiHamburgerMenu } from 'react-icons/gi';

function Navbar() {
  const location = useLocation();
  const [, setOpen] = useState(false);

  const NavLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
    <RouterLink to={to}>
      <Box
        fontFamily="Sansation"
        fontSize={16}
        fontWeight="300"
        bg={location.pathname === to ? 'white' : 'transparent'}
        color={location.pathname === to ? 'black' : 'white'}
        p="6px 12px"
        textAlign="center"
        onClick={() => setOpen(false)}
        transition="color 0.3s ease"
        _hover={{
          color: '#E9204F', // Red hover effect
        }}
      >
        {children}
      </Box>
    </RouterLink>
  );

  return (
    <>
      <Flex
        bg="#000000"
        align="center"
        justify="center"
        position="relative"
        w="100%"
        h={{ base: '72px', md: '80px' }}
        px={6}
      >
        {/* Categories and Logo */}
        <Flex align="center" justify="center" w="fit-content" gap={8}>
          {/* Left Categories */}
          <Flex gap={4}>
            <NavLink to="/about-us">ABOUT US</NavLink>
            <NavLink to="/tour">TOUR</NavLink>
          </Flex>

          {/* Centered Logo */}
          <Box>
            <RouterLink to="/">
              <Image
                src={`${import.meta.env.BASE_URL}/images/Full Logo.png`}
                alt="Home"
                height="50px"
              />
            </RouterLink>
          </Box>

          {/* Right Categories */}
          <Flex gap={4}>
            <NavLink to="/store">STORE</NavLink>
            <NavLink to="/contact-us">CONTACT US</NavLink>
          </Flex>
        </Flex>

        {/* Hamburger Menu for Mobile */}
        <Box display={{ base: 'flex', md: 'none' }} position="absolute" right="0" mr={5}>
          <IconButton
            aria-label="Open menu"
            size="lg"
            variant="ghost"
            color="white"
            onClick={() => setOpen(true)}
          >
            <GiHamburgerMenu />
          </IconButton>
        </Box>
      </Flex>
    </>
  );
}

export default Navbar;
