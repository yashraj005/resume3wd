  import React from 'react';
  import './AboutUs.css';
  import { NavLink } from 'react-router-dom';
  const AboutUs = () => {
    // Replace these with actual image URLs and names
    const teamMembers = [
      { name: 'Ankita kajale', role: 'Founder & CEO',img :'' },
      { name: 'prapti kajale', role: 'Co-Founder & CTO', img: '' },
      { name: 'kushnali kajale', role: 'COO', img: "" },
      { name: 'kartiki kajale', role: 'Lead Developer', img:"" },
      // Add more team members...
    ];

    // Replace with actual YouTube video links
    const videos = [
      { title: 'Our Vision', url: 'https://www.youtube.com/embed/gwa2Os2LbRA?si=PeyaFxs0dNGjZ5yw' },
      { title: 'Meet the Team', url: 'https://www.youtube.com/embed/b265NNwht8M' },
    ];
  //<iframe width="685" height="514" src="https://www.youtube.com/embed/b265NNwht8M" title="Biography of 3WD Software Company.." frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    return (
      <div className="about-us-container">
        <section className="hero-about">
  <div className="video-container">
    <iframe
      className="background-video"
      src="https://www.youtube.com/embed/b265NNwht8M?autoplay=1&mute=1&controls=0&loop=1&playlist=b265NNwht8M&modestbranding=1&showinfo=0"
      title="3WD Software Background Video"
      frameBorder="0"
      allow="autoplay; fullscreen"
      allowFullScreen
    ></iframe>

    <div className="overlay"></div>

    <div className="hero-text">
      <h1>About 3WD Software</h1>
      <p>
        Empowering businesses with cutting-edge software solutions and a dedicated team of professionals.
      </p>
    </div>
  </div>
</section>




  {/* <h2>About Us</h2> */}
  <div className='subabout'>
  <p className='hero'>
    <p>
 3WD Software is a leading provider of enterprise software solutions, specializing in Sugar ERP and custom-built digital platforms. 
  Since our inception in 2011, we have remained committed to helping businesses streamline operations, enhance decision-making, 
  and manage their resources more efficiently. With a deep focus on innovation and reliability, we continue to empower organizations across industries.
 
    </p>
  <p>
    Our comprehensive offerings span across web-based ERP solutions, cross-platform Android/iOS applications, and robust desktop integrations with hardware systems. 
  Whether it’s automating daily operations or building complex, enterprise-grade systems, we deliver solutions that are scalable, secure, and tailored to each client's unique needs. 
  Our experienced development and consulting teams ensure that every solution adds real value to our clients’ business goals.

  </p>
  <p>
     At 3WD Software, we believe in building technology that makes a difference. 
  We prioritize user-friendly interfaces, seamless experiences, and long-term maintainability in every project we deliver. 
  Our culture of continuous learning, collaboration, and technical excellence allows us to stay ahead in a rapidly evolving digital world. 
  Join hands with us and unlock the potential of your business through smart software solutions.

  </p>
</p>




  </div>

<section className="core-values">
  <div className="value-box">
    <h3>✨ Creativity</h3>
    <p>
      We embrace innovation and out-of-the-box thinking. Our creative solutions not only solve real problems
      but also inspire new opportunities and success for every client we serve.
    </p>
  </div>
  <div className="value-box">
    <h3>🔧 Simplicity</h3>
    <p>
      We believe technology should be intuitive. Our solutions are designed to simplify complex operations
      and help businesses operate efficiently without overwhelming interfaces or processes.
    </p>
  </div>
</section>

      <marquee behavior="" direction="left" >3WD Software ✨ Creativity and 🔧 Simplicity</marquee>
        <section className="team">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div className="team-card" key={index}>
                <img src={member.img} alt={member.name} />
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="videos">
          <h2>Our Journey</h2>
          <div className="video-grid">
            {videos.map((video, index) => (
              <div className="video-card" key={index}>
                <iframe
                  src={video.url}
                  title={video.title}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
                <h4>{video.title}</h4>
              </div>
            ))}
          </div>
        </section>
        <address className='address'>
          <h3>lets meet</h3>
          <h3>Organization Name: 3Wd</h3><br/>
          <a href="https://maps.app.goo.gl/akavrNBrEGBrLvbM8">
          <h4>Visit us:</h4>
        <h4>3Wd</h4>
          <h4>Office No. 3, 4th floor, Mukti Corporate Plaza,</h4>
          <h4> Baramati Bhigwan Road, Near Panchayat Samiti</h4>
          <h4>Maharashtra 413102</h4>
          </a>
        </address>

        <footer className='footer'>
          <NavLink to="/home">
            <img src="https://images.jdmagicbox.com/comp/baramati/t8/9999p2112.2112.141215191520.z7t8/catalogue/3wd-software-baramati-midc-baramati-software-companies-fulyod0bop.jpg" alt="" />
          </NavLink>
  {/* Social Media Links */}
          <div className="social-links">
            <h4>Follow Us On</h4>
            <a href="https://www.instagram.com/yourcompany" target="_blank" rel="noopener noreferrer">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHP2W0X8Bj9Wwou8Y5Iv2q_Aa-nME9SMwEAA&s" alt="" />
            </a>
            <a href="https://www.facebook.com/yourcompany" target="_blank" rel="noopener noreferrer">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4OYeFe1SSekKsMrxinLH3mt0bm4kNXBremA&s" alt="" />
            </a>
            <a href="https://www.linkedin.com/company/yourcompany" target="_blank" rel="noopener noreferrer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/960px-LinkedIn_logo_initials.png" alt="" />
            </a>
          </div>
        </footer>
      </div>
    );
  };

  export default AboutUs;







