import React from 'react';
import {
  Box,
  Flex,
  Link,
  Image,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link as RouterLink, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const NavLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
    <Link
      as={RouterLink}
      to={to}
      fontFamily="Sansation"
      fontSize={16}
      fontWeight="300"
      bg={location.pathname === to ? 'white' : 'transparent'}
      color={location.pathname === to ? 'black' : 'white'}
      p="6px 12px"
      mr={4}
      textAlign="center"
      onClick={onClose}
    >
      {children}
    </Link>
  );

  return (
    <>
      {/* Navbar */}
      <Flex
        bg="#000000"
        pt={{ base: '16', md: '16' }} // Smaller padding for mobile
        pb={{ base: '4', md: '4' }} // Smaller padding for mobile
        align="center"
        position="relative"
        w="100%"
        h={{ base: '48px', md: '64px' }} // Smaller height for mobile
        px={4}
      >
        {/* Logo aligned to the left */}
        <Box position="absolute" left="0" ml={{ base: 0, md: 5 }}>
          <Link as={RouterLink} to="/">
            <Image
              src={`${import.meta.env.BASE_URL}/images/Full Logo.png`}
              alt="Home"
              height="50px"
            /> 
          </Link>
        </Box>

        {/* Desktop Navigation */}
        <Flex
          flex="1"
          justify="center"
          align="center"
          display={{ base: 'none', md: 'flex' }}
        >
          <NavLink to="/about-us">ABOUT US</NavLink>
          <NavLink to="/tour">TOUR</NavLink>
          <NavLink to="/store">STORE</NavLink>
          <NavLink to="/albums">ALBUMS</NavLink>
          <NavLink to="/contact-us">CONTACT US</NavLink>
        </Flex>

        {/* External Links aligned to the right */}
        <Box position="absolute" right="0" mr={5} display={{ base: 'none', md: 'flex' }}>
          <Flex align="center">
            <Link href="https://spotify.com" isExternal mr={4}>
              <img
                src={`${import.meta.env.BASE_URL}/images/Spotify.png`}
                alt="Spotify"
                style={{ height: '24px' }}
              />
            </Link>
            <Link href="https://music.apple.com" isExternal mr={4}>
              <img
                src={`${import.meta.env.BASE_URL}/images/Apple.png`}
                alt="Apple Music"
                style={{ height: '24px' }}
              />
            </Link>
            <Link href="https://music.youtube.com" isExternal>
              <img
                src={`${import.meta.env.BASE_URL}/images/Youtube.png`}
                alt="Youtube"
                style={{ height: '24px' }}
              />
            </Link>
          </Flex>
        </Box>

        {/* Hamburger Menu for Mobile */}
        <Box
          position="absolute"
          right="0"
          mr={5}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            icon={<HamburgerIcon />}
            aria-label="Open menu"
            size="lg"
            variant="ghost"
            color="white"
            onClick={onOpen}
          />
        </Box>
      </Flex>

    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xs">
      <DrawerOverlay />
        <DrawerContent bg="#000000" color="white" maxWidth="240px">
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <VStack align="start">
                <NavLink to="/">HOME</NavLink>
                <NavLink to="/about-us">ABOUT US</NavLink>
                <NavLink to="/tour">TOUR</NavLink>
                <NavLink to="/store">STORE</NavLink>
                <NavLink to="/albums">ALBUMS</NavLink>
                <NavLink to="/contact-us">CONTACT US</NavLink>
                <Box mt={8} display="flex" justifyContent="space-between" width="60%">
                    <Link href="https://spotify.com" isExternal mr={4}>
                        <img
                            src={`${import.meta.env.BASE_URL}/images/Spotify.png`}
                            alt="Spotify"
                            style={{ height: '24px' }}
                        />
                    </Link>
                    <Link href="https://music.apple.com" isExternal mr={4}>
                        <img
                            src={`${import.meta.env.BASE_URL}/images/Apple.png`}
                            alt="Apple Music"
                            style={{ height: '24px' }}
                        />
                    </Link>
                    <Link href="https://music.youtube.com" isExternal>
                        <img
                            src={`${import.meta.env.BASE_URL}/images/Youtube.png`}
                            alt="Youtube"
                            style={{ height: '24px' }}
                        />
                    </Link>
                </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Navbar;
