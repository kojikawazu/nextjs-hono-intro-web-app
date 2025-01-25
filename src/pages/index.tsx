import NavBar from '@/components/navbar/NavBar';
import Hero from '@/components/hero/Hero';
import About from '@/components/about/About';
import Careers from '@/components/careers/Careers';
import Skills from '@/components/skills/Skills';
import Contact from '@/components/contact/Contact';
import Footer from '@/components/footer/Footer';
import FrontArea from '@/components/front/FrontArea';
/**
 * ホームページ
 * @returns JSX.Element
 */
export default function Home() {
    return (
        <>
            <NavBar />
            <Hero />
            <About />
            <Careers />
            <Skills />
            <Contact />
            <Footer />
            <FrontArea />
            {/* <GetJsonDataPage /> */}
        </>
    );
}
