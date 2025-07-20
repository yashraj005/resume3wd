import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Home = () => {
  const [randomServices, setRandomServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      const response = await fetch('http://localhost:5000/api/services');
      const data = await response.json();
      const shuffled = [...data].sort(() => 0.5 - Math.random());
      setRandomServices(shuffled.slice(0, 3));
    };

    fetchServices();
  }, []);

  const renderMedia = (service) => {
    if (!service.media || !service.mediaType) return null;

    if (service.mediaType.startsWith('video/')) {
      return (
        <video controls className="media">
          <source src={`http://localhost:5000${service.media}`} type={service.mediaType} />
        </video>
      );
    } else if (service.mediaType.startsWith('image/')) {
      return (
        <img src={`http://localhost:5000${service.media}`} alt={service.title} className="media" />
      );
    }
    return null;
  };

  const handleclick = () => {
    navigate("/services")
  }

  return (
    <div className="home-container">
     

<header className="hero">
  {/* Video Background should be outside hero-content */}
  <div className="video-bg">
    <iframe
      src="https://www.youtube.com/embed/3ItYHNzmxQI?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&playlist=3ItYHNzmxQI"
      title="YouTube video background"
      frameBorder="0"
      allow="autoplay; fullscreen"
      allowFullScreen
    ></iframe>
  </div>

  <div className="hero-content">
    <h1>Welcome to 3WD SOFTWARE</h1>
    <p>Empowering businesses with innovative software solutions since 2011.</p>
    <p>We design and develop mobile apps for <strong>Android</strong> and <strong>iOS</strong> platforms.</p>
    <a href="/contactus" className="start-btn">Start Now</a>
  </div>
</header>




      <section className="agriculture-module">
        <h2>Agriculture Module</h2>
        <p>
          Manages farmer records, Aadhaar & PAN updates, bank account linking, and land details.<br />
          Helps factories efficiently track and manage farmer information and crop production.
        </p>

        <div className="progress-steps">
          <div className="step completed">Farmer Registration</div>
          <div className="step completed">Cane Plantation</div>
          <div className="step current">Cane Harvesting Program</div>
          <div className="step">Automatic Number Taking</div>
          <div className="step">H&T Agreement</div>
          <div className="step">Cane Bill</div>
          <div className="step">H&T Bill</div>
          <div className="step">Weigh Bridge</div>
          <div className="step">All Required Reports</div>
        </div>
        <a href="/contactUs">
          <button>Get Yours</button>
        </a>
      </section>

      <div className="services-container" onClick={handleclick}>
        <h2>Services Provided</h2>
        <div className="cards">
          {randomServices.slice().reverse().map(service => (
            <div key={service._id} className="card">
              {renderMedia(service)}
              <h3>
                {service.title.length > 50
                  ? <>{service.title.slice(0, 50)}... <span className="more-text">more</span></>
                  : service.title}
              </h3>
              <p>
                {service.description.length > 100
                  ? <>{service.description.slice(0, 100)}... <span className="more-text">more</span></>
                  : service.description}
              </p>
              <div className="button-group">
                {service.playstore && <a href={service.playstore} target="_blank" rel="noopener noreferrer"><img src="https://img.icons8.com/fluent/600/google-play-store-new.png"></img></a>}
                {service.appstore && <a href={service.appstore} target="_blank" rel="noopener noreferrer"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/App_Store_%28iOS%29.svg/512px-App_Store_%28iOS%29.svg.png"></img></a>}
                {service.website && <a href={service.website} target="_blank" rel="noopener noreferrer"><img src="https://cdn-icons-png.flaticon.com/512/5045/5045810.png"></img></a>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="features">
        <h2>Why Choose 3WD Software?</h2>
        <p className="intro-text">
          With over a decade of industry expertise and a commitment to innovation, 3WD Software stands out for its reliable ERP solutions that empower sugar factories and other enterprises across India.
        </p>
        <div className="feature-cards">
          <a href="/aboutus">
            <div className="card">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxq5TmzFlerblhdodvanNpmEtUoceXZqgDeA&s" alt="" />
              <h3>Proven Expertise</h3>
              <p>Industry-leading experience with a proven track record since 2011. Successfully deployed ERP in 40+ sugar factories.</p>
            </div>
          </a>
          <a href="/client">
            <div className="card">
              <img src="https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PI0V1LS5WZJo6hr7IxL4/media/0ec97597-4898-47c1-a5fb-7ca7bb50f836.png" alt="" />
              <h3>Trusted by 100+ Clients</h3>
              <p>Delivering scalable, future-ready software that adapts to evolving business needs.</p>
            </div>
          </a>
          <a href="https://maps.app.goo.gl/Ug13LjnD2ztsQFRNA">
            <div className="card">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPvf9bHAHOC3byVKuHA9PlG9OY3pjA_TZU2w&s" alt="" />
              <h3>Secure Infrastructure</h3>
              <p>Robust and reliable systems that ensure data protection and business continuity.</p>
            </div>
          </a>
          <a href="/contactus">
            <div className="card">
              <img src="https://img.freepik.com/free-vector/organic-flat-customer-support_23-2148895051.jpg?semt=ais_hybrid&w=740" alt="" />
              <h3>Dedicated Support</h3>
              <p>Round-the-clock support for uninterrupted operations and quick issue resolution.</p>
            </div>
          </a>
          <a href="">
            <div className="card">
              <img src="https://www.computerhope.com/jargon/s/seamless-integration.png" alt="" />
              <h3>Seamless Integration</h3>
              <p>Hardware and software integration for easy transition and minimal downtime.</p>
            </div>
          </a>
        </div>
        
      </section>

        
        <div class="services-section">
          <div class="row">
          <div class="col-lg-8 col-lg-offset-2">
            <h2>Our Services</h2>
            <p>With over 25 technical specialists at the helm, including above key team members, we bring a wealth
              of knowledge and experience to every project we undertake. Our diverse team is adept at tackling
              complex challenges and finding creative solutions that drive success.</p>
          </div>
        </div>
          <div class="row  ">
          <div class="col-lg-3 col-sm-5 wow fadeIn service-box" data-wow-delay=".2s">
            <h4><i class="ion-ios-pie-outline icon-big"></i> Managed IT Services : </h4>
            <p>Comprehensive management of an organization’s IT infrastructure and end-user
              systems on a proactive basis.
              Services include network monitoring, data backup, disaster recovery, and IT
              support.</p>
          </div>
          <div class="col-lg-3 col-sm-6 wow fadeIn service-box" data-wow-delay=".3s">
            <h4><i class="ion-ios-basketball-outline icon-big"></i> IT Consulting :
            </h4>
            <p>Expert advice on technology strategies and solutions to improve business processes and achieve goals.
              Includes assessments, IT strategy development, and system integrations.
              </p>
          </div>
          <div class="col-lg-3 col-sm-6 wow fadeIn service-box" data-wow-delay=".4s">
            <h4><i class="ion-ios-monitor-outline icon-big"></i> Software Development :
            </h4>
            <p>Custom application development tailored to specific business needs. Includes mobile app development, web application development, and software
              maintenance.
              </p>
          </div>
          <div class="col-lg-3 col-sm-6 wow fadeIn service-box" data-wow-delay=".5s">
            <h4><i class="ion-ios-stopwatch-outline icon-big"></i> Cloud Services :
            </h4>
            <p>Cloud infrastructure setup, management, and optimization.
              Services include cloud migration, cloud storage solutions, and cloud computing
              services (IaaS, PaaS, SaaS).</p>
          </div>
          <div class="col-lg-3 col-sm-6 wow fadeIn service-box" data-wow-delay=".6s">
            <h4><i class="ion-ios-analytics-outline icon-big"></i>IT Support :
            </h4>
            <p>Technical support services for troubleshooting and resolving IT issues.
              Includes remote support, on-site support, and help desk services.</p>
          </div>
          <div class="col-lg-3 col-sm-6 wow fadeIn service-box" data-wow-delay=".7s">
            <h4><i class="ion-ios-medical-outline icon-big"></i>System Integration :
            </h4>
            <p>Integration of various IT systems and software to ensure they work together seamlessly.
              Includes ERP, CRM, and other business systems integrations.</p>
          </div>
          <div class="col-lg-3 col-sm-6 wow fadeIn service-box" data-wow-delay=".8s">
            <h4><i class="ion-ios-clock-outline icon-big"></i>Virtualization Services :
            </h4>
            <p>Deployment and management of virtual environments to optimize IT resources.
              Includes server virtualization, desktop virtualization, and storage virtualization.</p>
          </div>
          <div class="col-lg-3 col-sm-6 wow fadeIn service-box" data-wow-delay=".9s">
            <h4><i class="ion-ios-settings icon-big"></i>IoT (Internet of Things) Services :
            </h4>
            <p>Development and management of IoT solutions.
              Includes IoT device management, data analytics, and IoT security.</p>
          </div>
        </div>  
</div>

      <section className="section features-benefits">
        <div className='keyAndBenefits'>
          <div className="features-list">
            <h2>🛠️ Key Features</h2>
            <ul>
              <li>Web-Based Cloud Deployment</li>
              <li>Mobile ERP</li>
              <li>Two-Tier ERP Architecture</li>
              <li>Secured Environment</li>
              <li>Multi-Level Operation</li>
              <li>Minimum Software Dependency</li>
              <li>User-Friendly Interface</li>
              <li>Real-Time Data Synchronization</li>
              <li>Automated Reporting & Analytics</li>
              <li>Comprehensive ERP Modules</li>
            </ul>
          </div>

          <div className="benefits-list">
            <h2>🎯 Benefits</h2>
            <ul>
              <li>Data Security</li>
              <li>Standardized & Centralized Data</li>
              <li>Regulatory Compliance</li>
              <li>Increased Productivity</li>
              <li>Enhanced Visibility</li>
              <li>Scalability</li>
              <li>Mobility</li>
              <li>Cost Savings</li>
              <li>Organized Workflows</li>
              <li>Real-Time Reporting</li>
              <li>Operational Efficiency</li>
              <li>Better Customer Service</li>
              <li>Improved Collaboration</li>
              <li>Flexible Architecture</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>Get Our App</h2>
        <p>Available on Play Store & App Store. Download now!</p>
        <div className="app-links">
          <a href="https://play.google.com/store/apps/developer?id=3WD+Software&hl=en_IN" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/fluent/600/google-play-store-new.png" alt="Google Play Store" />
          </a>
          <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/App_Store_%28iOS%29.svg/512px-App_Store_%28iOS%29.svg.png" alt="Apple App Store" />
          </a>
        </div>
      </section>

      <footer>
        <p>&copy; 2025 3WD SOFTWARE. All rights reserved.</p>
        <div className='footer-btn'>
          <a href="https://www.termsfeed.com/live/d00797c0-f8e8-449a-9e9f-b45292feefe1" className="privacy-button">Privacy Policy</a>
          <a href="/aboutus" className="privacy-button">About Us</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;














// import React from 'react';
// import './Home.css';
// import { useNavigate } from 'react-router-dom';
// import { useEffect, useState } from 'react';

// const Home = () => {
//   const [randomServices, setRandomServices] = useState([]);
//   const navigate = useNavigate();
  

//   useEffect(() => {
//   const fetchServices = async () => {
//     const response = await fetch('http://localhost:5000/api/services'); // Replace with your API
//     const data = await response.json();
//     const shuffled = [...data].sort(() => 0.5 - Math.random());
//     setRandomServices(shuffled.slice(0, 3));
//   };

//   fetchServices();
// }, []);
//    const renderMedia = (service) => {
//     if (!service.media || !service.mediaType) return null;

//     if (service.mediaType.startsWith('video/')) {
//       return (
//         <video controls className="media">
//           <source src={`http://localhost:5000${service.media}`} type={service.mediaType} />
//         </video>
//       );
//     } else if (service.mediaType.startsWith('image/')) {
//       return (
//         <img src={`http://localhost:5000${service.media}`} alt={service.title} className="media" />
//       );
//     }
//     return null;
//   };

//   const handleclick = ()=> {
//     navigate("/services")
//   }

//   return (
//     <div className="home-container">
//       <header className="hero">
//   <h1>Welcome to 3WD SOFTWARE</h1>
//   <p>Empowering businesses with innovative software solutions since 2011.</p>
//   <p>We design and develop mobile apps for <strong>Android</strong> and <strong>iOS</strong> platforms. Whether you need a custom app or reliable support, we're here to help. Start the conversation with us today!</p>
//   <button>
//     <a href="/contactus">Start Now</a>
//   </button>
// </header>
// <section class="agriculture-module">
//   <h2>Agriculture Module</h2>
//   <p>
//     Manages farmer records, Aadhaar & PAN updates, bank account linking, and land details.<br/>
//     Helps factories efficiently track and manage farmer information and crop production.
//   </p>

//   <div class="progress-steps">
//     <div class="step completed">Farmer Registration</div>
//     <div class="step completed">Cane Plantation</div>
//     <div class="step current">Cane Harvesting Program</div>
//     <div class="step">Automatic Number Taking</div>
//     <div class="step">H&T Agreement</div>
//     <div class="step">Cane Bill</div>
//     <div class="step">H&T Bill</div>
//     <div class="step">Weigh Bridge</div>
//     <div class="step">All Required Reports</div>
//   </div>
//     <a href="/contactUs">
//   <button> Get Yours</button>
//     </a>
// </section>
// <div className="services-container" onClick={handleclick}>
//       <h2>Our Services</h2>

//       <div className="cards">
//         {randomServices.slice().reverse().map(service => (
//           <div key={service._id} className="card" >
//             {renderMedia(service)}

//             <h3>
//               {service.title.length > 50
//                 ? <>{service.title.slice(0, 50)}... <span className="more-text">more</span></>
//                 : service.title}
//             </h3>

//             <p>
//               {service.description.length > 100
//                 ? <>{service.description.slice(0, 100)}... <span className="more-text">more</span></>
//                 : service.description}
//             </p>

//             <div className="button-group">
//               {service.playstore && <a href={service.playstore} target="_blank" rel="noopener noreferrer"><button>Play Store</button></a>}
//               {service.appstore && <a href={service.appstore} target="_blank" rel="noopener noreferrer"><button>App Store</button></a>}
//               {service.website && <a href={service.website} target="_blank" rel="noopener noreferrer"><button>Website</button></a>}
//             </div>
//           </div>
//         ))}
//       </div>
//       </div>

//       <section className="features">
//   <h2>Why Choose 3WD Software?</h2>
//   <p className="intro-text">
//     With over a decade of industry expertise and a commitment to innovation, 3WD Software stands out for its reliable ERP solutions that empower sugar factories and other enterprises across India.
//   </p>
//   <div className="feature-cards">
//     <a href="/aboutus">
//     <div className="card">
//       <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxq5TmzFlerblhdodvanNpmEtUoceXZqgDeA&s" alt="" />
//       <h3>Proven Expertise</h3>
//       <p>Industry-leading experience with a proven track record since 2011. Successfully deployed ERP in 40+ sugar factories.</p>
//     </div></a>
//     <a href="/client" >
//     <div className="card">
//       <img src="https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/PI0V1LS5WZJo6hr7IxL4/media/0ec97597-4898-47c1-a5fb-7ca7bb50f836.png" alt="" />
//       <h3>Trusted by 100+ Clients</h3>
//       <p>Delivering scalable, future-ready software that adapts to evolving business needs.</p>
//     </div>
//     </a>
//     <a href="https://maps.app.goo.gl/Ug13LjnD2ztsQFRNA">
//     <div className="card">
//       <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPvf9bHAHOC3byVKuHA9PlG9OY3pjA_TZU2w&s" alt="" />
//       <h3>Secure Infrastructure</h3>
//       <p>Robust and reliable systems that ensure data protection and business continuity.</p>
//     </div>
//     </a>
//     <a href="/contactus">
//     <div className="card">
//       <img src="https://img.freepik.com/free-vector/organic-flat-customer-support_23-2148895051.jpg?semt=ais_hybrid&w=740" alt="" />
//       <h3>Dedicated Support</h3>
//       <p>Round-the-clock support for uninterrupted operations and quick issue resolution.</p>
//     </div>
//     </a>
//     <a href="">
//       <div className="card">
//       <img src="https://www.computerhope.com/jargon/s/seamless-integration.png" alt="" />
//       <h3>Seamless Integration</h3>
//       <p>Hardware and software integration for easy transition and minimal downtime.</p>
//     </div>
//     </a>
//   </div>
// </section>
// <section className="section features-benefits">
//   <div className='keyAndBenefits'>

//   <div className="features-list">
//     <h2>🛠️ Key Features</h2>
//     <ul>
//       <li>Web-Based Cloud Deployment</li>
//       <li>Mobile ERP</li>
//       <li>Two-Tier ERP Architecture</li>
//       <li>Secured Environment</li>
//       <li>Multi-Level Operation</li>
//       <li>Minimum Software Dependency</li>
//       <li>User-Friendly Interface</li>
//       <li>Real-Time Data Synchronization</li>
//       <li>Automated Reporting & Analytics</li>
//       <li>Comprehensive ERP Modules</li>
//     </ul>
//   </div>

//   <div className="benefits-list">
//     <h2>🎯 Benefits</h2>
//     <ul>
//       <li>Data Security</li>
//       <li>Standardized & Centralized Data</li>
//       <li>Regulatory Compliance</li>
//       <li>Increased Productivity</li>
//       <li>Enhanced Visibility</li>
//       <li>Scalability</li>
//       <li>Mobility</li>
//       <li>Cost Savings</li>
//       <li>Organized Workflows</li>
//       <li>Real-Time Reporting</li>
//       <li>Operational Efficiency</li>
//       <li>Better Customer Service</li>
//       <li>Improved Collaboration</li>
//       <li>Flexible Architecture</li>
//     </ul>
//   </div>
//   </div>
// </section>


//       <section className="cta">
//         <h2>Get Our App</h2>
//         <p>Available on Play Store & App Store. Download now!</p>
//         <div className="app-links">
//           <a href="https://play.google.com/store/apps/developer?id=3WD+Software&hl=en_IN" target="_blank" rel="noopener noreferrer">
//             <img src="https://img.icons8.com/fluent/600/google-play-store-new.png" alt="Google Play Store" />
//           </a>
//           <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
//             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/App_Store_%28iOS%29.svg/512px-App_Store_%28iOS%29.svg.png" alt="Apple App Store" />
//           </a>
//         </div>
//       </section>

//       <footer>
//         <p>&copy; 2025 3WD SOFTWARE. All rights reserved.</p>
//         <div className='footer-btn'>
//         <a href="https://www.termsfeed.com/live/d00797c0-f8e8-449a-9e9f-b45292feefe1" className="privacy-button">Privacy Policy</a>
//         <a href="/aboutus" className="privacy-button">About Us</a>
//         </div>
//       </footer>
          
//     </div>
//   );
// };

// export default Home;
