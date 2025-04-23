import Contact from '../components/Contact/Contact';
import GetStarted from '../components/GetStarted/GetStarted';
import Hero from '../components/Hero/Hero';
import Residencies from '../components/Residencies/Residencies';

const Website = () => {
  return (
    <div className="App">
      <div>
        <div className="white-gradient" />
        <Hero />
      </div>
      <Residencies />
      <Contact />
      <GetStarted />
    </div>
  );
};

export default Website;
