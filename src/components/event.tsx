import { Card, Icon } from "@chakra-ui/react"
import { Button } from "./ui/button"
import { Image, Text } from "@chakra-ui/react"
import './event.css';
import { MdOutlineLocationOn } from "react-icons/md";
import { Link} from 'react-router';
import { motion } from "framer-motion"; // Import motion

interface EventProps {
    imageUrl: string;
    place: string;
    address: String;
    price: number;
    startDate: Date;
    endDate: Date;
    mapData: string;
}

const EventItem: React.FC<EventProps> = ({ imageUrl, place, address, price, startDate, endDate, mapData }) => {
  return (
    <Link 
      to="/tour_details" 
      className="item-link" 
      state={{ imageUrl, place, address, price, startDate, endDate, mapData}} 
      onClick={() => window.scrollTo(0, 0)}
    >

      <motion.div
        className="event-container" 
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }} 
        transition={{ duration: 0.8 }}
      >
        <Card.Root maxW="md" overflow="hidden" p="4">
          <Image
              src={imageUrl}
              alt="Event Image"
              borderRadius="md"
          />
          <Card.Body gap="2">
              <div style={{ height: 3 }}></div>
              <Card.Title fontSize={20} fontFamily={"Sansation"} fontWeight={700}>
                  Stage Fright: {place}
              </Card.Title>
              <Card.Description fontSize={20} fontFamily={"Sansation"} fontWeight={700}>
                  <Icon boxSize={6}>
                      <MdOutlineLocationOn />
                  </Icon>
                  {address}
              </Card.Description>
              <Text fontFamily={"Sansation"} fontWeight={700} fontSize={20} mt="2">
                  Starting Price: ${price}
              </Text>
              <hr />
              <Text fontFamily={"Sansation"} fontWeight={700} fontSize={20} mt="2">
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
      </motion.div>
    </Link>
  );
};

export default EventItem;