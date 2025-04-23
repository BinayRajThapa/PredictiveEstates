import SearchBar from '../SearchBar/SearchBar';
import './Hero.css';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="hero-wrapper">
      <div className="paddings innerWidth flexCenter hero-container">
        {/*left section*/}
        <div className="flexColStart hero-left">
          <div className="hero-title">
            <div className="orange-circle"></div>
            <motion.h1
              initial={{ y: '2rem', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 2, type: 'spring', stiffness: 120 }}
            >
              Home <br /> Is where <br /> Story Begins
            </motion.h1>
          </div>
          <div className="flexColStart hero-des">
            <span>Welcome to the best Real Estate Website of Nepal </span>
            <span>Find the property the suits YOU</span>
          </div>
          <SearchBar />
        </div>
        {/*right section*/}
        <div className="flexCenter hero-right">
          <motion.div
            initial={{ x: '7rem', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2, type: 'spring', stiffness: 120 }}
            className="image-container"
          >
            <img src="./hero-image.jpg" alt="" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
