import './Contact.css';
import { MdCall } from 'react-icons/md';
import { BsFillChatDotsFill } from 'react-icons/bs';

const Contact = () => {
  return (
    <section id="contact-section">
      <section className="c-wrapper">
        <div className="paddings innerwidth flexCenter c-container">
          {/* left side */}
          <div className="flexColStart c-left">
            <span className="orangeText">Our Contacts</span>
            <span className="primaryText">Easy to Contact Us</span>
            <span className="secondaryText">
              We are always at your services
            </span>

            <div className="flexColStart contactModes">
              {/* first row */}
              <div className="flexColStart row">
                <div className="flexColCenter mode">
                  <div className="flexStart">
                    <div className="flexCenter icon">
                      <MdCall size={25} />
                    </div>
                    <div className="flexColStart detail">
                      <span className="primaryText">Call</span>
                      <span className="secondaryText">+977-9810117772</span>
                    </div>
                  </div>
                  <div className="flexCenter button">
                    <a
                      href="https://www.whatsapp.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {' '}
                      Call Now
                    </a>
                  </div>
                </div>

                {/* second mode */}
                <div className="flexColCenter mode">
                  <div className="flexStart">
                    <div className="flexCenter icon">
                      <BsFillChatDotsFill size={25} />
                    </div>
                    <div className="flexColStart detail">
                      <span className="primaryText">Chat</span>
                      <span className="secondaryText">+977-9810117772</span>
                    </div>
                  </div>
                  <div className="flexCenter button">
                    <a
                      href="https://www.whatsapp.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {' '}
                      Chat Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* right side */}
          <div className="c-right">
            <div className="image-container">
              <img src="./contact.jpg" alt="" />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Contact;
