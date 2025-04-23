import './Footer.css';

const Footer = () => {
  return (
    <section className="f-wrapper">
      <div className="paddings innerWidth flexCenter f-container">
        {/* Left Side */}
        <div className="flexColStart f-left">
          <img src="./logo.png" alt="" width={120} />

          <span className="secondaryText">
            Buy the best house in Nepal <br /> Predict Its price.
          </span>
        </div>

        <div className="flexColStart f-right">
          <span className="primaryText">Information</span>
          <span className="secondaryText">Kathmandu University, Dhulikhel</span>

          <div className="flexCenter f-menu">
            <h3>Produced by:</h3>
            <span>Shashwat</span>
            <span>Shubin</span>
            <span>Siddhartha</span>
            <span>Binaya</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
