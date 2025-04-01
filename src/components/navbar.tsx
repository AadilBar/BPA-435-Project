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
import { FaShoppingCart, FaSignOutAlt, FaUserCircle, FaMusic, FaMapSigns, FaStore, FaEnvelope, FaInfoCircle } from "react-icons/fa";
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

  const NavLink: React.FC<{ to: string; children: React.ReactNode; icon: React.ReactNode }> = ({ to, children, icon }) => (
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
        display="flex"
        alignItems="center"
        gap="8px"
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
        _after: {
          width: '100%',
        },
          }
        : {}
        }
      >
        <Box color={location.pathname === to ? 'black' : 'white'}>
          {icon}
        </Box>
        <Box 
          color={location.pathname === to ? 'black' : 'white'}
          _hover={location.pathname !== to ? { color: '#E9204F' } : {}}
        >
          {children}
        </Box>
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
        px={{ base: 2, sm: 3, md: 4 }}
      >
        {/* Left divider line */}
        <Box 
          position="absolute"
          top="50%"
          transform="translateY(-50%)"
          left={{ base: '34%', md: '37%' }}
          width={{ base: '8%', md: '5%' }}
          height="1px"
          bg="white"
          display={{ base: 'none', md: 'none', lg: 'block' }}
        />

        {/* Right divider line */}
        <Box 
          position="absolute"
          top="50%"
          transform="translateY(-50%)"
          right={{ base: '34%', md: '37%' }}
          width={{ base: '8%', md: '5%' }}
          height="1px"
          bg="white"
          display={{ base: 'none', md: 'none', lg: 'block' }}
        />

        <Flex
          flex="1"
          justify="center"
          align="center"
          display={{ base: 'none', md: 'flex' }}
          gap={{ md: 1, lg: 2 }}
        >
          <NavLink to="/albums" icon={<FaMusic />}>
            <Box as="span" display={{ md: 'inline', lg: 'inline' }}>ALBUMS</Box>
          </NavLink>
          <NavLink to="/tour" icon={<FaMapSigns />}>
            <Box as="span" display={{ md: 'inline', lg: 'inline' }}>TOUR</Box>
          </NavLink>
          <NavLink to="/store" icon={<FaStore />}>
            <Box as="span" display={{ md: 'inline', lg: 'inline' }}>STORE</Box>
          </NavLink>
        </Flex>
        
        <Box mx={{ base: 0, md: 1 }} minW={{ base: "auto", md: "50px" }}>
          <RouterLink to="/" onClick={() => window.scrollTo(0, 0)}>
            <Image
              src={` /images/Full Logo.png`}
              alt="Home"
              height={{ base: "45px", md: "50px" }}
              transition="transform 0.3s ease"
              _hover={{ transform: 'scale(1.1)' }}
            /> 
          </RouterLink>
        </Box>
        
        <Flex
          flex="1"
          justify="center"
          align="center"
          display={{ base: 'none', md: 'flex' }}
          gap={{ md: 1, lg: 2 }}
        >
          <NavLink to="/contact-us" icon={<FaEnvelope />}>
            <Box as="span" display={{ md: 'inline', lg: 'inline' }}>CONTACT</Box>
          </NavLink>
          <NavLink to="/about-us" icon={<FaInfoCircle />}>
            <Box as="span" display={{ md: 'inline', lg: 'inline' }}>ABOUT</Box>
          </NavLink>
        </Flex>

        <Box 
          position="absolute" 
          right="0" 
          mr={{ base: 2, sm: 3, md: 5 }} 
          display={{ base: 'none', md: 'flex' }}
        >
          <Flex align="center">
            {!user ? (
              <>
                <RouterLink to="/signup">
                  <Button p={{ base: 3, md: 4, lg: 5 }} fontSize={{ base: "sm", lg: "md" }}>Sign Up</Button>
                </RouterLink>
                <Box width={{ base: "5px", md: "10px" }} />
                <RouterLink to="/login">
                  <Button p={{ base: 3, md: 4, lg: 5 }} backgroundColor={"#E9204F"} fontSize={{ base: "sm", lg: "md" }}>Login</Button>
                </RouterLink>
              </>
            ) : (
                <>
                <RouterLink to="/cart">
                  <Box position="relative">
                    <IconButton 
                      color="white" 
                      size={{ base: "lg", lg: "2xl" }} 
                      variant={"ghost"} 
                      animation={cartBounce ? `${bounceAnimation} 0.5s` : 'none'}
                      aria-label="Shopping cart"
                    >
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
                <Box width={{ base: "5px", md: "10px" }} />
                <Box position="relative">
                  <Button
                    p={{ base: 3, md: 4, lg: 5 }}
                    backgroundColor={"#E9204F"}
                    onClick={() => setDropOpen(!dropOpen)}
                    _hover={{ bg: "#c5173e" }}
                    _active={{ bg: "#a31332" }}
                    fontSize={{ base: "sm", lg: "md" }}
                  >
                    Hi, {Name.split(' ')[0]}▼
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
                <NavLink to="/" icon={<FaMusic />}>HOME</NavLink>
                <NavLink to="/about-us" icon={<FaInfoCircle />}>ABOUT US</NavLink>
                <NavLink to="/tour" icon={<FaMapSigns />}>TOUR</NavLink>
                <NavLink to="/store" icon={<FaStore />}>STORE</NavLink>
                <NavLink to="/contact-us" icon={<FaEnvelope />}>CONTACT US</NavLink>
                <NavLink to="/albums" icon={<FaMusic />}>ALBUMS</NavLink>
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
