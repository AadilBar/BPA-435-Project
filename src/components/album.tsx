import { Card, Flex, Icon, Link } from "@chakra-ui/react"
import { Image } from "@chakra-ui/react"
import './event.css';
import { MdOutlineLocationOn } from "react-icons/md";

interface EventProps {
    imageUrl: string;
    name: string;
    releaseDate: Date;
    
  }


const Album: React.FC<EventProps> = ({ imageUrl, name, releaseDate}) => {
return (
    <Card.Root maxW="md" overflow="hidden" p="4" className="event-container">
        <Image
            src={imageUrl}
            alt="Green double couch with wooden legs"
            borderRadius="md"
        />
        <Card.Body gap="2" fontFamily={"Sansation"} fontWeight={700} fontSize={20}>
            <Flex align="center"></Flex>
            <Card.Title fontSize={20} fontFamily={"Sansation"} fontWeight={700}>{name}</Card.Title>
            <Card.Description fontSize={20}  fontFamily={"Sansation"} fontWeight={700}>
              Released: {releaseDate.toDateString()}
              <Icon boxSize={6}>
                    <MdOutlineLocationOn />
                </Icon>
            </Card.Description>
            Listen:
        </Card.Body>
        <Card.Footer gap="2">
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
        </Card.Footer>
    </Card.Root>
)
}

export default Album;