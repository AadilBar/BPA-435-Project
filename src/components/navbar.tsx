import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router';
import { Link, Flex, Box, Image, VStack, IconButton } from '@chakra-ui/react';
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
} from "../components/ui/drawer"
import { GiHamburgerMenu } from "react-icons/gi";

function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false)

  const NavLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
    <RouterLink
      to={to}
    >
      <Box      fontFamily="Sansation"
      fontSize={16} 
      fontWeight="300"
      bg={location.pathname === to ? 'white' : 'transparent'}
      color={location.pathname === to ? 'black' : 'white'}
      p="6px 12px"
      mr={4}
      textAlign="center"
      onClick={() => setOpen(false)}>
        {children}
      </Box>
    </RouterLink>
  );

  return (
    <>
      <Flex
        bg="#000000"
        pt={{ base: '16', md: '16' }} // Smaller padding for mobile
        pb={{ base: '4', md: '4' }} // Smaller padding for mobile
        align="center"
        position="relative"
        w="100%"
        h={{ base: '64px', md: '64px' }} // Smaller height for mobile
        px={4}
      >
        {/* Logo aligned to the left */}
        <Box position="absolute" left="0" ml={{ base: 0, md: 5 }} top={5}>
          <RouterLink to="/">
            <Image
              src={`${import.meta.env.BASE_URL}/images/Full Logo.png`}
              alt="Home"
              height="50px"
            /> 
          </RouterLink>
        </Box>

        {/* Desktop Navigation */}
        <Flex
          flex="1"
          justify="center"
          align="center"
          top={10}
          display={{ base: 'none', md: 'flex' }}
        >
          <NavLink to="/about-us">ABOUT US</NavLink>
          <NavLink to="/tour">TOUR</NavLink>
          <NavLink to="/store">STORE</NavLink>
          <NavLink to="/contact-us">CONTACT US</NavLink>
        </Flex>

        {/* External Links aligned to the right */}
        <Box position="absolute" right="0" mr={5} display={{ base: 'none', md: 'flex' }}>
          <Flex align="center">
            <Link href="https://spotify.com" mr={4}>
              <img
                src={`${import.meta.env.BASE_URL}/images/Spotify.png`}
                alt="Spotify"
                style={{ height: '24px' }}
              />
            </Link>
            <Link href="https://music.apple.com" mr={4}>
              <img
                src={`${import.meta.env.BASE_URL}/images/Apple.png`}
                alt="Apple Music"
                style={{ height: '24px' }}
              />
            </Link>
            <Link href="https://music.youtube.com">
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
          mt={-8}
          right="0"
          mr={5}
          display={{ base: 'flex', md: 'none' }}
        >
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

    <DrawerRoot open={open} placement="end" onOpenChange={(e) => setOpen(e.open)} size="xs">
        <DrawerBackdrop />
        <DrawerContent bg="#000000" color="white" maxWidth="240px">
          <DrawerCloseTrigger />
          <Box height="20px" />
            <DrawerHeader fontSize="xl" fontWeight="300" fontFamily="Sansation" pl={3}>Menu</DrawerHeader>
            <Box height="20px" />
            <DrawerBody>
            <VStack align="start">
                <NavLink to="/">HOME</NavLink>
                <NavLink to="/about-us">ABOUT US</NavLink>
                <NavLink to="/tour">TOUR</NavLink>
                <NavLink to="/store">STORE</NavLink>
                <NavLink to="/contact-us">CONTACT US</NavLink>
                <Box mt={8} ml={3} display="flex" justifyContent="space-between" width="60%">
                    <Link href="https://spotify.com" mr={4}>
                        <img
                            src={`${import.meta.env.BASE_URL}/images/Spotify.png`}
                            alt="Spotify"
                            style={{ height: '24px' }}
                        />
                    </Link>
                    <Link href="https://music.apple.com" mr={4}>
                        <img
                            src={`${import.meta.env.BASE_URL}/images/Apple.png`}
                            alt="Apple Music"
                            style={{ height: '24px' }}
                        />
                    </Link>
                    <Link href="https://music.youtube.com">
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
      </DrawerRoot>
    </>
  );
}

export default Navbar;
