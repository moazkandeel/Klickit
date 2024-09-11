import React from 'react';

import './contactstyle.css'; 
import bg from "../../Assets/Contact.svg";


const Contact = () => {
  return (
    <div className="bg-img">
      <h2 className="text-white text-center " id="head">
        Get in touch with us...
      </h2>
      <p className="text-white text-center h-p" style={{ padding: '2px 25%' }}>
        Thank you for your interest in our services. Please fill out the form below or e-mail us at{' '}
        <a href="mailto:info@klickit.co" className="link-mail">
        info@klickit.co
        </a>{' '}
        and we will get back to you promptly regarding your request.
      </p>

      <div className="box row">
        <div className="col-xl-6 col-lg-6 col-md-12 col-12 row">
          <div className="touch col-lg-12 col-md-12 col-12">
            <img src={bg} alt="logo" className="imagee" />
          </div>

          <div className="touch col-lg-12 col-md-12 col-12">
            <h3 className="title">Get in touch</h3>
            <hr className="line" />

            <div className="box3">
              <i className="fa-solid fa-phone pos-icon bord" style={{ display: 'inline-flex' }}></i>
              <a href="tel:+917719830631" className="link-color">
                +91 7719830631
              </a>
              <br />
              <i className="fa-solid fa-envelope pos-icon bord" style={{ display: 'inline-flex' }}></i>
              <a href="mailto:info@klickit.co" className="link-color">
                  info@klickit.co
                </a>
                  
              <br />
              <i className="fa-solid fa-location-dot bord pos-icon" style={{ display: 'inline-flex' }}></i>
              <a href="loc.html" className="link-color loc">
                
                Office 221, Centro Egypt Mall, 5th Settlement, New Cairo 11835, Egypt
              </a>
            </div>
          </div>
        </div>

        <div className="col-xl-6 col-lg-6 col-md-12 col-12 box-in">
        <div className="box-1">
          <form action="index.php" method="post" className="form">
            
            <div className="input-group">
              <i className="fa-solid fa-user pos"></i>
              <input type="text" name="fname" placeholder="First Name" />
            </div>
            
            <div className="input-group">
              <i className="fa-solid fa-user pos"></i>
              <input type="text" name="lname" placeholder="Last Name" />
            </div>
            
            <div className="input-group">
              <i className="fa-solid fa-phone pos"></i>
              <input type="tel" name="phone" placeholder="Phone" />
            </div>
            
            <div className="input-group">
              <i className="fa-solid fa-envelope pos"></i>
              <input type="email" name="email" placeholder="Email" />
            </div>
            
            <div className="input-group">
              <i className="fa-solid fa-bars pos-1"></i>
              <textarea placeholder="Message" name="msg"></textarea>
            </div>
            
            <button type="submit" className="btn btn-primary butun">Send Message</button>
            
            <p className="text-muted justify-content-center">
              Apni Car does not sell, share, or trade customer information. Your privacy is very important to us.
            </p>
          </form>
        </div>
      </div>
      
      </div>
    </div>
  );
};

export default Contact;
