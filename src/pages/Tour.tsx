import EventItem from '../components/event';
import Footer from '../components/footer';

export default function Tour() {
    return (
        <>
       
        
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#000000', paddingTop: '20px' }}>
            <h1 style={{ fontFamily: 'Sansation', color: 'white', fontSize: '50px', fontWeight: '700' }}>Tour Dates</h1>
    
        
            <div style={styles.itemsContainer}>
                    <EventItem imageUrl={`${import.meta.env.BASE_URL}/images/Shows/HuntingtonBankPav.png`} location='Huntington Bank Pavilion' address={" 1300 S Linn White Dr, Chicago, IL 60605"} price={500} startDate={new Date('2025-06-01')} endDate={new Date('2025-06-02')}/>
                    <EventItem imageUrl={`${import.meta.env.BASE_URL}/images/Shows/Credit1Pav.png`} location='Credit Union 1 Arena' address={"525 S Racine Ave, Chicago, IL 60607"} price={500} startDate={new Date('2025-06-01')} endDate={new Date('2025-06-02')}/>
                    <EventItem imageUrl={`${import.meta.env.BASE_URL}/images/Shows/Credit1Amp.png`} location='Credit Union 1 Amphitheater' address={"19100 Ridgeland Ave, Tinley Park, IL 60477"} price={500} startDate={new Date('2025-06-01')} endDate={new Date('2025-06-02')}/>
                    <EventItem imageUrl={`${import.meta.env.BASE_URL}/images/Shows/Riviera.png`} location='Riviera Theatre' address={"4746 N Racine Ave, Chicago, IL 60640"} price={500} startDate={new Date('2025-06-01')} endDate={new Date('2025-06-02')}/>
                    <EventItem imageUrl={`${import.meta.env.BASE_URL}/images/Shows/SaltShed.png`} location='Salt Shed' address={"1357 N Elston Ave, Chicago, IL 60642"} price={500} startDate={new Date('2025-06-01')} endDate={new Date('2025-06-02')}/>
                    <EventItem imageUrl={`${import.meta.env.BASE_URL}/images/Shows/UnitedCenter.png`} location='United Center' address={"1901 W Madison St, Chicago, IL 60612"} price={500} startDate={new Date('2025-06-01')} endDate={new Date('2025-06-02')}/>

            </div>
        </div>
        <Footer/>


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



