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
          <Link href="https://open.spotify.com/user/3134f72ql3dn4z6gbrvcrgcs4vqa">
            <Image
              src={` /images/Spotify.png`}
              alt="Spotify"
              height="24px"
            />
          </Link>
          <Link href="https://music.apple.com">
            <Image
              src={` /images/Apple.png`}
              alt="Apple Music"
              height="24px"
            />
          </Link>
          <Link href="https://music.youtube.com/channel/UC_-Opt2taZLj_xpxP1utQxw?feature=shared">
            <Image
              src={` /images/Youtube.png`}
              alt="Youtube"
              height="24px"
            />
          </Link>
        </Flex>

        <Box width="100%" maxW="800px" height="1px" bg="gray.600" mb={4} />

        <Flex direction="column" align="center" width="100%" maxW="800px" mb={4}>
          <Box textAlign="center" mb={4}>
            <Text color="white" fontSize="16px" fontWeight="bold" mb={2}>
              Waubonsie Valley High School
            </Text>
            <Text color="white" fontSize="14px" mb={2}>
              Aurora, IL
            </Text>
          </Box>

          <Box textAlign="center" mb={4}>
            <Text color="white" fontSize="16px" fontWeight="bold" mb={2}>
              BPA 435 Website Design Team
            </Text>
            <Text color="white" fontSize="14px" mb={2}>
              Capture the Moment
            </Text>
          </Box>

          <Box textAlign="center">
            <Text color="white" fontSize="16px" fontWeight="bold" mb={2}>
              Created by:
            </Text>
            <Flex direction="column" align="center" gap={1}>
              <Text color="white" fontSize="14px">Aadil Brakat</Text>
              <Text color="white" fontSize="14px">Amogh Shivanna</Text>
              <Text color="white" fontSize="14px">Jeevith Veerasarvanan</Text>
              <Text color="white" fontSize="14px">Pradyun Fatwani</Text>
            </Flex>
          </Box>
        </Flex>

        <Text color="white" textAlign="center" mb={4}>
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
