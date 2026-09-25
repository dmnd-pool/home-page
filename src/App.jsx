import Nav from './components/Nav.jsx';
import Hero from './components/sections/Hero.jsx';
import Stats from './components/sections/Stats.jsx';
import BlockMilestone from './components/sections/BlockMilestone.jsx';
import Efficiency from './components/sections/Efficiency.jsx';
import BuiltForEvery from './components/sections/BuiltForEvery.jsx';
import ChooseYourBlock from './components/sections/ChooseYourBlock.jsx';
import Mempool from './components/sections/Mempool.jsx';
import BlockBuilding from './components/sections/BlockBuilding.jsx';
import Comparison from './components/sections/Comparison.jsx';
import Slice from './components/sections/Slice.jsx';
import Dashboard from './components/sections/Dashboard.jsx';
import Faq from './components/sections/Faq.jsx';
import Blog from './components/sections/Blog.jsx';
import Cta from './components/sections/Cta.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <header className="sticky top-0 z-50 bg-bg-default pt-6 lg:pt-0">
        <Nav />
      </header>

      <main>
        <Hero />
        <Stats />
        <BlockMilestone />
        <Efficiency />
        <BuiltForEvery />
        <ChooseYourBlock />
        <Mempool />
        <BlockBuilding />
        <Comparison />
        <Slice />
        <Dashboard />
        <Faq />
        <Blog />
        <Cta />
      </main>

      <Footer />
    </>
  );
}
