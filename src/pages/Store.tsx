import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Item from '../components/merch_item';

export default function Store() {
    return (
        <div style={{ color: 'white' }}>
            <h1>Store</h1>

            <div style={styles.itemsContainer}>
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
            </div>
        </div>
    );
}
const styles: { [key: string]: React.CSSProperties } = {
    itemsContainer: {
        display: 'flex', // align horiz
        flexWrap: 'wrap', 
        gap: '16px', 
        justifyContent: 'center', // centers items horizontally
    }
};