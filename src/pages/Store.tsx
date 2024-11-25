import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Item from '../components/merch_item';

export default function Store() {
    return (
        <>
       
        
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', height: '861px', backgroundColor: '#01010a', paddingTop: '20px' }}>
            <h1 style={{ fontFamily: 'Sansation', color: 'white', fontSize: '50px', fontWeight: '700' }}>Shop Stage Fright's Acessories</h1>
    
        
            <div style={styles.itemsContainer}>
            <Item imageUrl={`${import.meta.env.BASE_URL}/images/Spotify.png`} price= {49.99} title='title' description='description' link='/checkout'/>
            <Item imageUrl={`${import.meta.env.BASE_URL}/images/Spotify.png`}  price= {49.99} title='title' description='description' link='/checkout'/>
            <Item imageUrl={`${import.meta.env.BASE_URL}/images/Spotify.png`}  price= {49.99} title='title' description='description' link='/checkout'/>
            <Item imageUrl={`${import.meta.env.BASE_URL}/images/Spotify.png`}  price= {49.99} title='title' description='description' link='/checkout'/>
            <Item imageUrl={`${import.meta.env.BASE_URL}/images/Spotify.png`}  price= {49.99} title='title' description='description' link='/checkout'/>
            <Item imageUrl={`${import.meta.env.BASE_URL}/images/Spotify.png`}  price= {49.99} title='title' description='description' link='/checkout'/>
            </div>
        </div>


    </>
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



