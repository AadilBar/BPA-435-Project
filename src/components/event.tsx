import { Card, Icon } from "@chakra-ui/react"
import { Button } from "./ui/button"
import { Image, Text } from "@chakra-ui/react"
import './event.css';
import { MdOutlineLocationOn } from "react-icons/md";

interface EventProps {
    imageUrl: string;
    location: string;
    address: String;
    price: number;
    startDate: Date;
    endDate: Date;
    
  }


const EventItem: React.FC<EventProps> = ({ imageUrl, location, address, price, startDate, endDate }) => {
return (
    <Card.Root maxW="md" overflow="hidden" p="4" className="event-container">
        <Image
            src={imageUrl}
            alt="Green double couch with wooden legs"
            borderRadius="md"
        />
        <Card.Body gap="2">
            <div style={{height: 3}}></div>
            <Card.Title fontSize={20} fontFamily={"Sansation"} fontWeight={700}>Stage Fright: {location}</Card.Title>
            <Card.Description fontSize={20}  fontFamily={"Sansation"} fontWeight={700}>
                <Icon boxSize={6}>
                    <MdOutlineLocationOn />
                </Icon>
                {address}
            </Card.Description>
            <Text fontFamily={"Sansation"} fontWeight={700} fontSize={20}  mt="2">
                Starting Price: ${price}
            </Text>
            <hr />
            <Text fontFamily={"Sansation"} fontWeight={700} fontSize={20}  mt="2">
                Start Date: {startDate.toDateString()}
            </Text>
            <Text fontFamily={"Sansation"} fontWeight={700} fontSize={20} mt="2">
                End Date: {endDate.toDateString()}
            </Text>
        </Card.Body>
        <Card.Footer gap="2">
            <Button variant="solid" p={3}>Learn More</Button>
        </Card.Footer>
    </Card.Root>
)
}

export default EventItem;