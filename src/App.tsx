import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import NewHeroPage from './pages/NewHeroPage';
import PortfolioShaderPage from './pages/PortfolioShaderPage';
import ResearchPage from './pages/ResearchPage';
import ArticlePage from './pages/ArticlePage';
import PlatformPage from './pages/PlatformPage';
import WhoWeArePage from './pages/WhoWeArePage';
import PressNewsPage from './pages/PressNewsPage';
import LicensingPage from './pages/LicensingPage';
import CastIdPage from './pages/CastIdPage';
import HomePageV2 from './pages/HomePageV2';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';

function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/homepage-v2" element={<PageTransition><HomePageV2 /></PageTransition>} />
          <Route path="/platform" element={<PageTransition><PlatformPage /></PageTransition>} />
          <Route path="/who-we-are" element={<PageTransition><WhoWeArePage /></PageTransition>} />
          <Route path="/press-news" element={<PageTransition><PressNewsPage /></PageTransition>} />
          <Route path="/licensing" element={<PageTransition><LicensingPage /></PageTransition>} />
          <Route path="/cast-id" element={<PageTransition><CastIdPage /></PageTransition>} />
          <Route path="/new-hero" element={<PageTransition><NewHeroPage /></PageTransition>} />
          <Route path="/portfolio-shader" element={<PageTransition><PortfolioShaderPage /></PageTransition>} />
          <Route path="/research" element={<PageTransition><ResearchPage /></PageTransition>} />
          <Route path="/research/:id" element={<PageTransition><ArticlePage /></PageTransition>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
}

export default App;
