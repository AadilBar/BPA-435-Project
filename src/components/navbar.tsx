import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router';
import { Flex, Box, Image, VStack, IconButton, Button } from '@chakra-ui/react';
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
} from "../components/ui/drawer"
import { GiHamburgerMenu } from "react-icons/gi";
import useLogin from '../Auth/functions';

function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const {

    user,
    handleSignout,

  } = useLogin();

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
        pt={{ base: '16', md: '16' }} // Smaller padding for mobile
        pb={{ base: '4', md: '4' }} // Smaller padding for mobile
        align="center"
        justify={"center"}
        position="relative"
        w="100%"
        h={{ base: '72px', md: '80px' }} // Smaller height for mobile
        px={4}
      >

        {/* Desktop Navigation */}
        <Flex
          flex="1"
          justify="right"
          align="center"
          display={{ base: 'none', md: 'flex' }}
        >
          <NavLink to="/about-us">ABOUT US</NavLink>
          <NavLink to="/tour">TOUR</NavLink>
        </Flex>

        <Box mx={{ base: 0, md: 2 }}>
          <RouterLink to="/">
            <Image
              src={`${import.meta.env.BASE_URL}/images/Full Logo.png`}
              alt="Home"
              height="50px"
            /> 
          </RouterLink>
        </Box>
        
        <Flex
          flex="1"
          justify="left"
          align="center"
          display={{ base: 'none', md: 'flex' }}
        >
          <NavLink to="/store">STORE</NavLink>
          <NavLink to="/contact-us">CONTACT US</NavLink>
        </Flex>

        {/* External Links aligned to the right */}
        <Box position="absolute" right="0" mr={5} display={{ base: 'none', md: 'flex' }}>
          <Flex align="center">
            {!user ? (
              <>
                <RouterLink to="/signup">
                  <Button p={5}>Sign Up</Button>
                </RouterLink>
                <Box width="10px" />
                <RouterLink to="/login">
                  <Button p={5} backgroundColor={"#E9204F"}>Login</Button>
                </RouterLink>
              </>
            ) : (
              <>
              <RouterLink to="/cart">
                <Button p={5} backgroundColor={"#E9204F"}>Cart</Button>
              </RouterLink>
              <RouterLink to="/cart">
                <Button p={5} backgroundColor={"#E9204F"} onClick={handleSignout}>Logout</Button>
              </RouterLink>
              </>
            )}
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
                <Flex align="center">
            {!user ? (
              <>
                <RouterLink to="/signup">
                  <Button p={5}>Sign Up</Button>
                </RouterLink>
                <Box width="10px" />
                <RouterLink to="/login">
                  <Button p={5} backgroundColor={"#E9204F"}>Login</Button>
                </RouterLink>
              </>
            ) : (
              <>
              <RouterLink to="/cart">
                <Button p={5} backgroundColor={"#E9204F"}>Cart</Button>
              </RouterLink>
              <RouterLink to="/cart">
                <Button p={5} backgroundColor={"#E9204F"} onClick={handleSignout}>Logout</Button>
              </RouterLink>
              </>
            )}
          </Flex>
                </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </DrawerRoot>
    </>
  );
}

export default Navbar;
