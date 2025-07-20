import React, { useEffect, useState } from 'react';
import './Client.css';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/clients')
      .then(res => res.json())
      .then(data => setClients(data))
      .catch(err => console.error('Error fetching clients:', err));
  }, []);

  const getMediaUrl = (path) => `http://localhost:5000${path?.replace(/\\/g, '/')}`;

  const renderMedia = (item) => {
    if (!item.media || !item.mediaType) return null;

    if (item.mediaType.startsWith('video/')) {
      return (
        <video controls className="media">
          <source src={getMediaUrl(item.media)} type={item.mediaType} />
          Your browser does not support the video tag.
        </video>
      );
    } else if (item.mediaType.startsWith('image/')) {
      return (
        <img src={getMediaUrl(item.media)} alt={item.title} className="media" />
      );
    }

    return null;
  };

  const handleCardClick = (e, client) => {
    if (
      e.target.tagName === 'BUTTON' ||
      e.target.closest('button')
    ) return;

    setSelectedClient(client);
  };

  return (
    <div className="clients-container">
      <h2>Our Clients</h2>

      <div className="client-cards">
        {clients.slice().reverse().map(client => (
          <div key={client._id} className="client-card" onClick={(e) => handleCardClick(e, client)}>
            {renderMedia(client)}
            <h3>{client.title}</h3>
            <p>
              {client.description && client.description.length > 150
                ? client.description.slice(0, 150) + '...'
                : client.description}
            </p>
            {client.description && client.description.length > 150 && (
              <button onClick={() => setSelectedClient(client)}>Read More</button>
            )}
          </div>
        ))}
      </div>

      {selectedClient && (
        <div className="modal-overlay" onClick={() => setSelectedClient(null)}>
          <div
            className="modal-card"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={() => setSelectedClient(null)}>×</button>

            {renderMedia(selectedClient)}
            <h3>{selectedClient.title}</h3>
            <p>{selectedClient.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clients;
