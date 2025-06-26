import CategoryCard from "../CategoryCard";
import Footer from "../Footer";
import Header from "../Header/Header";
import HeroSection from "../HeroSection";
import ProductCard from "../ProductCard";
import SellerCard from "../SellerCard";

const Home =()=>{
    return(
        <>
        <Header/>
        <HeroSection/>
        <ProductCard/>
        <CategoryCard/>
        <SellerCard/>
        <Footer />
        </>
    )

}
export default Home;