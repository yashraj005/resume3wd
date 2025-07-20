import React, { useEffect, useState } from 'react';
import './Service.css'; // You’ll also update this

const Services = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/services')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error(err));
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

  const handleCardClick = (e, service) => {
    if (
      e.target.tagName === 'BUTTON' ||
      e.target.tagName === 'A' ||
      e.target.closest('a') ||
      e.target.closest('button')
    ) return; // Prevent modal open when clicking buttons/links

    setSelectedService(service);
  };

  return (
    <div className="services-container">
      <h2>Our Services</h2>

      <div className="service-cards">
        {services.slice().reverse().map(service => (
          <div key={service._id} className="card" onClick={(e) => handleCardClick(e, service)}>
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
              {service.playstore && <a href={service.playstore} target="_blank" rel="noopener noreferrer" className='button-img'><img src="https://img.icons8.com/fluent/600/google-play-store-new.png" alt="" /></a>}
              {service.appstore && <a href={service.appstore} target="_blank" rel="noopener noreferrer" className='button-img'><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/App_Store_%28iOS%29.svg/2048px-App_Store_%28iOS%29.svg.png" alt="" /></a>}
              {service.website && <a href={service.website} target="_blank" rel="noopener noreferrer" className='button-img'><img src="https://cdn-icons-png.flaticon.com/512/5045/5045810.png" alt="" /></a>}
            </div>
          </div>
        ))}
      </div>

      {selectedService && (
        <div className="modal-overlay" onClick={() => setSelectedService(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedService(null)}>×</button>

            {renderMedia(selectedService)}
            <h3>{selectedService.title}</h3>
            <p>{selectedService.description}</p>

            <div className="button-group">
              {selectedService.playstore && <a href={selectedService.playstore} target="_blank" rel="noopener noreferrer" className='button-img'><img src="https://img.icons8.com/fluent/600/google-play-store-new.png" alt="" /></a>}
              {selectedService.appstore && <a href={selectedService.appstore} target="_blank" rel="noopener noreferrer" className='button-img'><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/App_Store_%28iOS%29.svg/2048px-App_Store_%28iOS%29.svg.png" alt="" /></a>}
              {selectedService.website && <a href={selectedService.website} target="_blank" rel="noopener noreferrer" className='button-img'><img src="https://cdn-icons-png.flaticon.com/512/5045/5045810.png" alt="" /></a>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
