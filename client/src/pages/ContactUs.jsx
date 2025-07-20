import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send('service_rgf5bip', 'template_rjqp49q', formData, 'iq1NIdw0fVI8DAF9y')
      .then(() => {
        setSuccess(true);
        setError(false);
        setFormData({ name: '', email: '', message: '' });
      })
      .catch(() => {
        setError(true);
        setSuccess(false);
      });
  };

  return (
    <div className="contact-container">
      
      <div className="contact-details">
        <h3>Contact Information</h3>
        <p><strong>Phone:</strong> 02112 244070</p>
        <p><strong>Care:</strong> 9096 880 808 / 9975 495 123</p>
        <p><strong>Email:</strong> info@3wdsoft.com</p>

        <h4>Our Offices</h4>
        {/* Office sections remain unchanged */}

        <div className="office">
          <h5>Mumbai</h5>
          <p>Office No - 21, Grand Square, Anand Nagar, Thane, New Mumbai</p>
          <p>Maharashtra - 400607</p>
          <p><strong>Call:</strong> 8446 846 854</p>
          <p><strong>Email:</strong> mumbai@3wdsoft.in</p>
        </div>

        <div className="office">
          <h5>Pune</h5>
          <p>Office No.1, 4th Floor, Vertex Arcade, Chimanya Ganapati Chowk, Sadashiv Peth</p>
          <p>Maharashtra - 400607</p>
          <p><strong>Call:</strong> 8669 138 188</p>
          <p><strong>Email:</strong> pune@3wdsoft.in</p>
        </div>

        <div className="office">
          <h5>Baramati</h5>
          <p>Office No. 3, 4th floor, Mukti Corporate Plaza, Baramati Bhigwan Road, Near Panchayat Samiti</p>
          <p>Maharashtra 413102</p>
          <p><strong>Call:</strong> 9860 697 877</p>
          <p><strong>Email:</strong> baramati@3wdsoft.in</p>
        </div>

        <div className="office">
          <h5>Hyderabad</h5>
          <p>Office No.401, MAA Grandeur's, Aurobindo Colony, Miyapur</p>
          <p>Hyderabad - 500049</p>
          <p><strong>Call:</strong> 8317 212 081</p>
          <p><strong>Email:</strong> hyderabad@3wdsoft.in</p>
        </div>

        

      </div>
      <h2 className='heading'>Contact Us</h2>

      <form onSubmit={handleSubmit} className="contact-form">
        <input 
          type="text" 
          name="name" 
          placeholder="Your Name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />

        <input 
          type="email" 
          name="email" 
          placeholder="Your Email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />

        <textarea 
          name="message" 
          placeholder="Your Message also mention your contact info ex.Phone number" 
          value={formData.message} 
          onChange={handleChange} 
          required
        ></textarea>

        <button type="submit">Send Message</button>
      </form>

      {success && <p className="success-message">Message sent successfully!</p>}
      {error && <p className="error-message">Failed to send message. Try again.</p>}
      <address className='address'>
  
          
          <a href="https://maps.app.goo.gl/akavrNBrEGBrLvbM8">
          <h4>Visit us:</h4>
        <h4>3Wd</h4>
          <h4>Office No. 3, 4th floor, Mukti Corporate Plaza,</h4>
          <h4> Baramati Bhigwan Road, Near Panchayat Samiti</h4>
          <h4>Maharashtra 413102</h4>
          </a>
        </address>
    <div className='map-div'>
      

      <iframe className='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3791.149689075977!2d74.57874447495367!3d18.157017082867483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc39ffce73bb13d%3A0x51b8564096cb46cc!2s3WD%20Software!5e0!3m2!1sen!2sin!4v1749206726671!5m2!1sen!2sin"  referrerpolicy="no-referrer"></iframe>
    </div>

      
    </div>
    
  );
};

export default ContactUs;
