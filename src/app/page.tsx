import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";
import Categories from "@/sections/Categories";

import Footer from "@/components/Footer";
import ChooseYourPlant from "@/sections/ChooseYourPlant";
import ScrollIndicator from "@/components/ScrollIndicator";
import Stats from '@/sections/Stats';
import CustomerReviews from '@/sections/CustomerReviews';
import OurClients from '@/sections/OurClients';
import CustomizePage from "./customize/page";





export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Navbar />
      <Hero />
      <CustomizePage/>
     

       

      <Categories />

      
      
      <CustomerReviews />
      <OurClients />
      <Stats/>

      <ScrollIndicator />

      <Footer />
    </main>
  );
}
