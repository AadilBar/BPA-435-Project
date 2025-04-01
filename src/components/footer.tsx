import { Link, Box, Flex, Image, Text, Grid, GridItem } from "@chakra-ui/react";

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
    >
      <Flex
        direction="column"
        align="center"
        justify="center"
        maxW="1200px"
        mx="auto"
        px={6}
        gap={3} 
        height="auto"
      >
        {/* Main footer content in a grid */}
        <Grid 
          templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
          width="100%" 
          gap={4} 
          mb={2}
        >
          {/* School Information */}
          <GridItem textAlign={{ base: "center", md: "left" }}>
            <Text color="white" fontSize="16px" fontWeight="bold" mb={1}>
              Waubonsie Valley High School
            </Text>
            <Text color="white" fontSize="14px" mb={1}>
              Aurora, IL
            </Text>
            <Text color="white" fontSize="14px" fontWeight="bold" mb={1}>
              BPA 435 Website Design Team
            </Text>
            <Text color="white" fontSize="14px">
              Capture the Moment
            </Text>
          </GridItem>

          {/* Created by */}
          <GridItem textAlign="center">
            <Text color="white" fontSize="16px" fontWeight="bold" mb={1}>
              Created by:
            </Text>
            <Flex direction="column" align="center" gap={0}>
              <Text color="white" fontSize="14px">Aadil Barkat</Text>
              <Text color="white" fontSize="14px">Amogh Shivanna</Text>
              <Text color="white" fontSize="14px">Jeevith Veerasaravanan</Text>
              <Text color="white" fontSize="14px">Pradyun Fatwani</Text>
            </Flex>
          </GridItem>

          {/* Social Media Links */}
          <GridItem textAlign={{ base: "center", md: "right" }}>
            <Text color="white" fontSize="16px" fontWeight="bold" mb={2}>
              Find Our Music
            </Text>
            <Flex justify={{ base: "center", md: "flex-end" }} gap={4}>
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
          </GridItem>
        </Grid>

        <Box width="100%" height="1px" bg="gray.600" my={2} />

        {/* Copyright and Navigation Links */}
        <Flex 
          direction={{ base: "column", sm: "row" }} 
          justify="space-between" 
          align="center" 
          width="100%"
          gap={2}
        >
          <Text color="white" fontSize="14px">
            &copy; 2025 Stage Fright
          </Text>

          <Flex gap={4} justify="center" align="center">
            <Link
              href="/#/contact-us"
              onClick={() => window.scrollTo(0, 0)}
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
              href="/#/terms"
              onClick={() => window.scrollTo(0, 0)}
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
              href="/#/privacy"
              onClick={() => window.scrollTo(0, 0)}
              color="white"
              _hover={{
                textDecoration: "underline",
                color: "red",
                transition: "color 0.3s ease",
              }}
            >
              Privacy
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
