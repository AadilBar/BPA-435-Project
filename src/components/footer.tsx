import { Link, Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router";

export default function Footer() {
  return (
    <Box
      bg="#09090b" 
      py={4} 
      fontFamily="Sansation"
      fontWeight="700"
      fontSize="14px"
      position="relative"
      bottom="0"
      width="100%"
      height="auto" 
      pt={8} 
    >
      <Flex
        direction="column"
        align="center"
        justify="center"
        maxW="1200px"
        mx="auto"
        px={6}
        gap={4} 
        height="auto"
      >

        <Flex justify="center" gap={6} mb={4}>
          <Link href="https://spotify.com">
            <Image
              src={`${import.meta.env.BASE_URL}/images/Spotify.png`}
              alt="Spotify"
              height="24px"
            />
          </Link>
          <Link href="https://music.apple.com">
            <Image
              src={`${import.meta.env.BASE_URL}/images/Apple.png`}
              alt="Apple Music"
              height="24px"
            />
          </Link>
          <Link href="https://music.youtube.com">
            <Image
              src={`${import.meta.env.BASE_URL}/images/Youtube.png`}
              alt="Youtube"
              height="24px"
            />
          </Link>
        </Flex>


        <Text color="white" mb={2}>
          &copy; 2025 Stage Fright
        </Text>
        <Flex gap={4} justify="center" align="center" direction="row">
          <RouterLink to="/contact-us" color="white" onClick={() => window.scrollTo(0, 0)}>
            <Link
              _hover={{
                textDecoration: "underline",
                color: "red",
                transition: "color 0.3s ease",
              }}
            >
              Contact Us
            </Link>
          </RouterLink>
          <Text color="white">|</Text>
            <RouterLink to="/terms" color="white" onClick={() => window.scrollTo(0, 0)}>
            <Link
              _hover={{
              textDecoration: "underline",
              color: "red",
              transition: "color 0.3s ease",
              }}
            >
              Terms
            </Link>
            </RouterLink>
          <Text color="white">|</Text>
            <RouterLink to="/privacy" color="white" onClick={() => window.scrollTo(0, 0)}>
            <Link
              _hover={{
              textDecoration: "underline",
              color: "red",
              transition: "color 0.3s ease",
              }}
            >
              Privacy
            </Link>
            </RouterLink>
        </Flex>
      </Flex>
    </Box>
  );
}
