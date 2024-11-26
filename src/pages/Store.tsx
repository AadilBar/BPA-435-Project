import Item from '../components/merch_item';

export default function Store() {
    return (
        <>
       
        
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', height: '861px', backgroundColor: '#01010a', paddingTop: '20px' }}>
            <h1 style={{ fontFamily: 'Sansation', color: 'white', fontSize: '50px', fontWeight: '700' }}>Shop Stage Fright's Acessories</h1>
    
        
            <div style={styles.itemsContainer}>
            <Item imageUrl={`${import.meta.env.BASE_URL}/images/Merch/Beanies/White Beanie.png`} price= {49.99} title='White Stage Fright Beanie' description='Crafted by master artisans using age-old techniques, this piece embodies the essence of timeless sophistication.' />
            <Item imageUrl={`${import.meta.env.BASE_URL}/images/Merch/Beanies/Color Beanie.png`} price= {49.99} title='Red Stage Fright Beanie' description='Designed with luxurious fabrics sourced from the lush Scottish Highlands, this garment offers unparalleled comfort and charm.' />
            <Item imageUrl={`${import.meta.env.BASE_URL}/images/Merch/Beanies/Black Beanie.png`} price= {49.99} title='Black Stage Fright Beanie' description='Made with sustainably sourced organic fibers, this piece is a tribute to both style and the planet.' />
            <Item imageUrl={`${import.meta.env.BASE_URL}/images/Merch/Hoodie/Big Logo/Big Black.png`} price= {49.99} title='Black Stage Fright Hoodie' description='Meticulously tailored in a Parisian atelier, this garment captures the spirit of haute couture.' />
            <Item imageUrl={`${import.meta.env.BASE_URL}/images/Merch/Hoodie/Big Logo/Big Red.png`} price= {49.99} title='Red Stage Fright Hoodie' description='Inspired by the serene beauty of desert blooms, this piece is crafted from fabrics as rare and resilient as nature itself.' />
            <Item imageUrl={`${import.meta.env.BASE_URL}/images/Merch/Hoodie/Big Logo/Big White.png`} price= {49.99} title='White Stage Fright Hoodie' description='Infused with the breezy charm of Mediterranean shores, this piece is your escape to eternal summer.' />
            <Item imageUrl={`${import.meta.env.BASE_URL}/images/Merch/Hoodie/Small Logo/Red Image from Photopea.png`} price= {49.99} title='Red SF Hoodie' description='Intricately designed with threads spun from the golden looms of Asia, this garment is a masterpiece of tradition and modernity.' />
            <Item imageUrl={`${import.meta.env.BASE_URL}/images/Merch/Hoodie/Small Logo/White Image from Photopea.png`} price= {49.99} title='White SF Hoodie' description='Spun from fibers harvested in the pristine Arctic wilderness, this piece offers unmatched warmth and refinement.' />
            <Item imageUrl={`${import.meta.env.BASE_URL}/images/Merch/Shirts/Big/Big Black Logo.png`} price= {49.99} title='Black Stage Fright T-Shirt' description='Every stitch in this garment tells the story of a master craftsperson’s dedication to perfection.' />
            <Item imageUrl={`${import.meta.env.BASE_URL}/images/Merch/Shirts/Big/Big Logo White.png`} price= {49.99} title='White Stage Fright T-Shirt' description='Crafted with velvets dyed using grapes from the lush vineyards of Tuscany, this piece is truly one of a kind.' />
            <Item imageUrl={`${import.meta.env.BASE_URL}/images/Merch/Shirts/Small/Small Black Logo.png`}  price= {49.99} title='Black SF T-Shirt' description='Woven with metallic fibers inspired by the shimmering expanse of the cosmos, this garment is a celestial marvel.' />
            <Item imageUrl={`${import.meta.env.BASE_URL}/images/Merch/Shirts/Small/Small Logo White.png`}  price= {49.99} title='White SF T-Shirt' description='Made from linens once favored by European royalty, this piece combines noble history with modern flair.' />
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



