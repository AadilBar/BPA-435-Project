import React, { useContext, useState } from 'react';
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
import { UserContext } from '../App';
import { FaShoppingCart } from "react-icons/fa";

function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const {user} = useContext(UserContext);
  


  const {
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
        _after={{
          content: '""',
          display: 'block',
          width: '0',
          height: location.pathname !== to ? '2px' : '0',
          bg: '#E9204F',
          transition: 'width 0.3s ease',
          marginTop: location.pathname !== to ? '4px' : '0',
        }}
        _hover={
          location.pathname !== to
        ? {
        color: '#E9204F',
        _after: {
          width: '100%',
        },
          }
        : {}
        }
      >
        {children}
      </Box>
    </RouterLink>
  );

  return (
    <>
      <Flex
        bg={'black'} 
        pt={{ base: '3', md: '3' }} // Further reduced padding-top
        pb={{ base: '2', md: '2' }} // Further reduced padding-bottom
        align="center"
        justify={"center"}
        position="relative"
        w="100%"
        h={{ base: '72px', md: '80px' }} 
        px={4}
      >


        <Flex
          flex="1"
          justify="right"
          align="center"
          display={{ base: 'none', md: 'flex' }}
        >
          <NavLink to="/about-us">ABOUT US</NavLink>
          <NavLink to="/tour">TOUR</NavLink>
        </Flex>
        <Box mx={{ base: 0, md: 1 }}>
          <RouterLink to="/">
            <Image
              src={`${import.meta.env.BASE_URL}/images/Full Logo.png`}
              alt="Home"
              height="30px" // Further reduced logo height
              transition="transform 0.3s ease"
              _hover={{ transform: 'scale(1.1)' }}
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
                <IconButton color="white" size={"2xl"} variant={"ghost"}>
                    <FaShoppingCart />
                    </IconButton>
                </RouterLink>
              <Box width="10px" />
              <RouterLink to="/signup">
                <Button p={5} backgroundColor={"#E9204F"} onClick={handleSignout}>Logout</Button>
              </RouterLink>
              </>
            )}
          </Flex>
        </Box>


        <Box
          position="absolute"
          mt={0}
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
                    <IconButton color="white" size={"2xl"} variant={"ghost"}>
                    <FaShoppingCart />
                    </IconButton>
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
