import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { PuffLoader } from 'react-spinners';
import { sliderSettings } from '../../utils/common';
import 'swiper/css';
import useProperties from '../../hooks/useProperties';
import './Residencies.css';
import PropertyCard from '../PropertyCard/PropertyCard';

const Residencies = () => {
  const { data, isError, isLoading } = useProperties();
  if (isError) {
    <div className="wrapper">
      <span>Error while fetching data</span>
    </div>;
  }

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: '60vh' }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }
  return (
    <section id="residence-section">
      <section className="r-wrapper">
        <div className="paddings innerwidth r-container">
          <div className="flexColStart r-head ">
            <span className="orangeText">Best Choices</span>
            <span className="primaryText">Popular Houses</span>
          </div>

          <Swiper {...sliderSettings}>
            <SliderButtons />
            {data.slice(0, 8).map((card, i) => (
              <SwiperSlide key={i}>
                <PropertyCard card={card} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </section>
  );
};

export default Residencies;

const SliderButtons = () => {
  const swiper = useSwiper();
  return (
    <div className="flexCenter r-buttons">
      <button onClick={() => swiper.slidePrev()}>&lt;</button>
      <button onClick={() => swiper.slideNext()}>&gt;</button>
    </div>
  );
};
