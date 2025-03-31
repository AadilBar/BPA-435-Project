import React, { useContext, useEffect, useState } from 'react';
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
import { FaShoppingCart, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { child, get, getDatabase, onValue, ref } from 'firebase/database';
import { keyframes } from '@emotion/react';

const bounceAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const scaleBounceAnimation = keyframes`
  0%, 100% {
    transform: scale(1) translateY(0);
  }
  50% {
    transform: scale(1.2) translateY(-10px);
  }
`;

function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [Name, setName] = useState<string>("");
  const {user} = useContext(UserContext);
  const [cartItems, setCartItems] = useState(0);
  const [tourItems, setTourItems] = useState(0);
  const [cartBounce, setCartBounce] = useState(false);


  useEffect(() => {
    if (user) {
      const database = getDatabase();
      const userRef = ref(database, "users/" + (user.email ? user.email.replace('.', ',') : ''));
      get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setName(data.Name);
          

        }
      }).catch((error) => {
        console.error(error);
      });

      const cartRef = child(userRef, "/cart/totalItems");
      const toursRef = child(userRef, "/tours/totalItems");

      onValue(cartRef, (snapshot) => {
          if (snapshot.exists()) {
          const data = snapshot.val();
          setCartItems(data);
          setCartBounce(true);
          setTimeout(() => setCartBounce(false), 500);
          }
      }, (error) => {
          console.error(error);
      });

      onValue(toursRef, (snapshot) => {
          if (snapshot.exists()) {
          const data = snapshot.val();
          setTourItems(data);
          setCartBounce(true);
          setTimeout(() => setCartBounce(false), 500);
          }
      }, (error) => {
          console.error(error);
      });

    }
  }, [user]);
  


  const {
    handleSignout,
  } = useLogin();

  const NavLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
    <RouterLink to={to} onClick={() => window.scrollTo(0, 0)}>
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
        borderRadius="8px"
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
        pt={{ base: '3', md: '3' }} 
        pb={{ base: '2', md: '2' }} 
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
          <RouterLink to="/" onClick={() => window.scrollTo(0, 0)}>
            <Image
              src={` /images/Full Logo.png`}
              alt="Home"
              height="50px"
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
          <NavLink to="/albums">ALBUMS</NavLink>
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
                  <Box position="relative">
                    <IconButton color="white" size={"2xl"} variant={"ghost"} animation={cartBounce ? `${bounceAnimation} 0.5s` : 'none'}>
                      <FaShoppingCart />
                    </IconButton>
                    {(cartItems > 0 || tourItems > 0) && (
                      <Box
                        position="absolute"
                        top="3"
                        right="2"
                        bg="#E9204F"
                        color="white"
                        borderRadius="full"
                        width="20px"
                        height="20px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        fontSize="12px"
                        animation={cartBounce ? `${scaleBounceAnimation} 0.5s` : 'none'}
                      >
                        {cartItems + tourItems}
                      </Box>
                    )}
                  </Box>
                </RouterLink>
                <Box width="10px" />
                <Box position="relative">
                  <Button
                  p={5}
                  backgroundColor={"#E9204F"}
                  onClick={() => setDropOpen(!dropOpen)}
                  _hover={{ bg: "#c5173e" }}
                  _active={{ bg: "#a31332" }}
                  >
                  Hi, {Name.split(' ')[0] + "  "}▼
                  </Button>
                  {dropOpen && (
                  <Box
                    position="absolute"
                    top="100%"
                    right="0"
                    mt={2}
                    bg="gray.800"
                    color="white"
                    boxShadow="lg"
                    borderRadius="md"
                    overflow="hidden"
                    zIndex={10}
                  >
                    <RouterLink to="/account" onClick={() => setDropOpen(false)}>
                    <Box
                      p={3}
                      _hover={{ bg: "gray.700" }}
                      display="flex"
                      alignItems="center"
                    >
                      <FaUserCircle style={{ marginRight: '8px' }} />
                      Account
                    </Box>
                    </RouterLink>
                    <Box
                    p={3}
                    _hover={{ bg: "gray.700" }}
                    display="flex"
                    alignItems="center"
                    onClick={() => {
                      setDropOpen(false);
                      handleSignout();
                    }}
                    >
                    <FaSignOutAlt style={{ marginRight: '8px' }} />
                    Logout
                    </Box>
                  </Box>
                  )}
                </Box>

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
        <DrawerContent bg="#09090b" color="white" maxWidth="240px">
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
                <NavLink to="/albums">ALBUMS</NavLink>
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
                <Box position="relative">
                  <IconButton color="white" size={"2xl"} variant={"ghost"} animation={cartBounce ? `${bounceAnimation} 0.5s` : 'none'}>
                    <FaShoppingCart />
                  </IconButton>
                  <Box
                      position="absolute"
                      top="3"
                      right="2"
                      bg="#E9204F"
                      color="white"
                      borderRadius="full"
                      width="20px"
                      height="20px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontSize="12px"
                      animation={cartBounce ? `${scaleBounceAnimation} 0.5s` : 'none'}
                    >
                      1
                  </Box>
                </Box>
                </RouterLink>
                <Box width="10px" />
                <Box position="relative">
                  <Box>
                  <Button position={'relative'}
                    p={5}
                    backgroundColor={"#E9204F"}
                    onClick={() => setDropOpen(!dropOpen)}
                    >
                  Hi, {Name.split(' ')[0] + "  "}▼
                    </Button>
                  </Box>
                  {dropOpen && (
                    <Box
                    position="absolute"
                    top="100%"
                    right="0"
                    mt={2}
                    bg="gray.800"
                    color="white"
                    boxShadow="md"
                    borderRadius="md"
                    overflow="hidden"
                    >
                    <RouterLink to="/account" onClick={() => setDropOpen(false)}>
                      <Box p={2} _hover={{ bg: "gray.700" }} display="flex" alignItems="center">
                      <FaUserCircle style={{ marginRight: '8px' }} />
                        Account
                      </Box>
                    </RouterLink>
                    <Box
                      p={2}
                      _hover={{ bg: "gray.700" }}
                      display="flex"
                      alignItems="center"
                      onClick={handleSignout}
                    >
                      <FaSignOutAlt style={{ marginRight: '8px' }} />
                      Logout
                    </Box>
                    </Box>
                  )}
                </Box>
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
