import { Link, Box, Flex, Image, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box
      bg="#333333" // Dark gray background
      py={4} // Reduced padding for a smaller footer
      fontFamily="Sansation"
      fontWeight="700"
      fontSize="14px"
      position="relative"
      bottom="0"
      width="100%"
      height="auto" // Footer height adjusted for simplicity
      pt={8} // Added padding above to prevent content from being on top of the footer
    >
      <Flex
        direction="column"
        align="center"
        justify="center"
        maxW="1200px"
        mx="auto"
        px={6}
        gap={4} // Added spacing between elements
        height="auto"
      >
        {/* Social Icons Section - Listed above the text */}
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

        {/* Text Section - Centered content with spacing */}
        <Text color="white" mb={2}>
          &copy; 2023 Stage Fright
        </Text>
        <Flex gap={4} justify="center" align="center" direction="row">
          <Link
            href="/contact"
            color="white"
            _hover={{
              textDecoration: "underline",
              color: "red",
              transition: "color 0.3s ease",
            }}
          >
            Contact Us
          </Link>
          <Text color="white">|</Text>
          <Link
            href="/terms"
            color="white"
            _hover={{
              textDecoration: "underline",
              color: "red",
              transition: "color 0.3s ease",
            }}
          >
            Terms
          </Link>
          <Text color="white">|</Text>
          <Link
            href="/privacy"
            color="white"
            _hover={{
              textDecoration: "underline",
              color: "red",
              transition: "color 0.3s ease",
            }}
          >
            Privacy
          </Link>
          <Text color="white">|</Text>
          <Link
            href="/cookie-choices"
            color="white"
            _hover={{
              textDecoration: "underline",
              color: "red",
              transition: "color 0.3s ease",
            }}
          >
            Cookie Choices
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}
