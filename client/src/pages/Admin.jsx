import React, { useEffect, useState } from "react";
import "./Service.css";
import "./Admin.css";

const Admin = () => {
  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    playstore: "",
    appstore: "",
    website: "",
    media: null,
  });
  const [editId, setEditId] = useState(null);

  const [blogs, setBlogs] = useState([]);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
    media: null,
  });
  const [editBlogId, setEditBlogId] = useState(null);

  const [clients, setClients] = useState([]);
  const [showClientForm, setShowClientForm] = useState(false);
  const [clientData, setClientData] = useState({
    title: "",
    description: "",
    media: null,
  });
  const [editClientId, setEditClientId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error(err));

    fetch("http://localhost:5000/api/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error(err));

    fetch("http://localhost:5000/api/clients")
      .then((res) => res.json())
      .then((data) => setClients(data))
      .catch((err) => console.error(err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleBlogInput = (e) => {
    const { name, value, files } = e.target;
    setBlogData({ ...blogData, [name]: files ? files[0] : value });
  };

  const handleClientInput = (e) => {
    const { name, value, files } = e.target;
    setClientData({ ...clientData, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (val) form.append(key, val);
    });

    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `http://localhost:5000/api/services/${editId}`
      : "http://localhost:5000/api/services";

    try {
      const res = await fetch(url, { method, body: form });
      if (res.ok) {
        alert(editId ? "Project updated!" : "Project added!");
        window.location.reload();
      } else {
        alert("Error saving project.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/services/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Deleted!");
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
      alert("Delete failed.");
    }
  };

  const handleEdit = (service) => {
    setFormData({
      title: service.title,
      description: service.description,
      playstore: service.playstore || "",
      appstore: service.appstore || "",
      website: service.website || "",
      media: null,
    });
    setEditId(service._id);
    setShowForm(true);
  };

  const renderMedia = (item) => {
    if (!item.media) return null;
    const url = `http://localhost:5000${item.media}`;
    return item.media.endsWith(".mp4") || item.media.includes("video") ? (
      <video controls className="media">
        <source src={url} />
      </video>
    ) : (
      <img src={url} alt={item.title} className="media" />
    );
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.entries(blogData).forEach(([key, val]) => {
      if (val) form.append(key, val);
    });

    const method = editBlogId ? "PUT" : "POST";
    const url = editBlogId
      ? `http://localhost:5000/api/blogs/${editBlogId}`
      : "http://localhost:5000/api/blogs";

    try {
      const res = await fetch(url, { method, body: form });
      if (res.ok) {
        alert(editBlogId ? "Blog updated!" : "Blog added!");
        window.location.reload();
      } else {
        alert("Error saving blog.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error.");
    }
  };

  const handleBlogDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Deleted!");
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
      alert("Delete failed.");
    }
  };

  const handleBlogEdit = (blog) => {
    setBlogData({
      title: blog.title,
      description: blog.description,
      media: null,
    });
    setEditBlogId(blog._id);
    setShowBlogForm(true);
  };

  const handleClientSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.entries(clientData).forEach(([key, val]) => {
      if (val) form.append(key, val);
    });

    const method = editClientId ? "PUT" : "POST";
    const url = editClientId
      ? `http://localhost:5000/api/clients/${editClientId}`
      : "http://localhost:5000/api/clients";

    try {
      const res = await fetch(url, { method, body: form });
      if (res.ok) {
        alert(editClientId ? "Client updated!" : "Client added!");
        window.location.reload();
      } else {
        alert("Error saving client.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error.");
    }
  };

  const handleClientDelete = async (id) => {
    if (!window.confirm("Delete this client?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/clients/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Deleted!");
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
      alert("Delete failed.");
    }
  };

  const handleClientEdit = (client) => {
    setClientData({
      title: client.title,
      description: client.description,
      media: null,
    });
    setEditClientId(client._id);
    setShowClientForm(true);
  };

  return (
    <div className="adminpanel">
      <div className="a">
        <h2>Add services</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditId(null);
            setFormData({
              title: "",
              description: "",
              playstore: "",
              appstore: "",
              website: "",
              media: null,
            });
          }}
        >
          {showForm ? "Cancel" : "Add Project"}
        </button>

        {showForm && (
          <form
            className="addservices"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
            <input
              type="url"
              name="playstore"
              placeholder="Play Store Link"
              value={formData.playstore}
              onChange={handleInputChange}
            />
            <input
              type="url"
              name="appstore"
              placeholder="App Store Link"
              value={formData.appstore}
              onChange={handleInputChange}
            />
            <input
              type="url"
              name="website"
              placeholder="Website Link"
              value={formData.website}
              onChange={handleInputChange}
            />
            <input
              type="file"
              name="media"
              accept="image/*,video/*"
              onChange={handleInputChange}
            />
            <button type="submit">{editId ? "Update" : "Add"} Project</button>
          </form>
        )}

        <div className="service-cards">
          {services.map((service) => (
            <div key={service._id} className="card">
              {renderMedia(service)}
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              {service.playstore && (
                <a
                  href={service.playstore}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button>Play Store</button>
                </a>
              )}
              {service.appstore && (
                <a
                  href={service.appstore}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button>App Store</button>
                </a>
              )}
              {service.website && (
                <a
                  href={service.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button>Website</button>
                </a>
              )}
              <button onClick={() => handleEdit(service)}>Edit</button>
              <button onClick={() => handleDelete(service._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>

      <div className="b">
        <h2>Blog Admin</h2>
        <button
          onClick={() => {
            setShowBlogForm(!showBlogForm);
            setEditBlogId(null);
            setBlogData({ title: "", description: "", media: null });
          }}
        >
          {showBlogForm ? "Cancel" : "Add Blog"}
        </button>

        {showBlogForm && (
          <form
            className="addservices"
            onSubmit={handleBlogSubmit}
            encType="multipart/form-data"
          >
            <input
              type="text"
              name="title"
              placeholder="Blog Title"
              value={blogData.title}
              onChange={handleBlogInput}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={blogData.description}
              onChange={handleBlogInput}
              required
            />
            <input
              type="file"
              name="media"
              accept="image/*,video/*"
              onChange={handleBlogInput}
            />
            <button type="submit">{editBlogId ? "Update" : "Add"} Blog</button>
          </form>
        )}

        <div className="service-cards">
          {blogs.map((blog) => (
            <div key={blog._id} className="card">
              {renderMedia(blog)}
              <h3>{blog.title}</h3>
              <p>
                {blog.description ? blog.description.slice(0, 100) + "..." : ""}
              </p>
              <button onClick={() => handleBlogEdit(blog)}>Edit</button>
              <button onClick={() => handleBlogDelete(blog._id)}>Delete</button>
            </div>
          ))}
        </div>
          
      </div>
      <div className="c">
        
        <h2>Client Admin</h2>
        <button
          onClick={() => {
            setShowClientForm(!showClientForm);
            setEditClientId(null);
            setClientData({ title: "", description: "", media: null });
          }}
        >
          {showClientForm ? "Cancel" : "Add Client"}
        </button>

        {showClientForm && (
          <form
            className="addservices"
            onSubmit={handleClientSubmit}
            encType="multipart/form-data"
          >
            <input
              type="text"
              name="title"
              placeholder="Client Title"
              value={clientData.title}
              onChange={handleClientInput}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={clientData.description}
              onChange={handleClientInput}
              required
            />
            <input
              type="file"
              name="media"
              accept="image/*,video/*"
              onChange={handleClientInput}
            />
            <button type="submit">
              {editClientId ? "Update" : "Add"} Client
            </button>
          </form>
        )}

        <div className="service-cards">
          {clients.map((client) => (
            <div key={client._id} className="card">
              {renderMedia(client)}
              <h3>{client.title}</h3>
              <p>
                {client.description
                  ? client.description.slice(0, 100) + "..."
                  : ""}
              </p>
              <button onClick={() => handleClientEdit(client)}>Edit</button>
              <button onClick={() => handleClientDelete(client._id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;

// this code have few error for description

// // Admin.js
// import React, { useEffect, useState } from 'react';
// import './Service.css';
// import './Admin.css';

// const Admin = () => {
//   const [services, setServices] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     playstore: '',
//     appstore: '',
//     website: '',
//     media: null,
//   });
//   const [editId, setEditId] = useState(null);

//   // blogs
//   const [blogs, setBlogs] = useState([]);
// const [showBlogForm, setShowBlogForm] = useState(false);
// const [blogData, setBlogData] = useState({ title: '', description: '', media: null });
// const [editBlogId, setEditBlogId] = useState(null);
//   // client
//   const [clients, setClients] = useState([]);
// const [showClientForm, setShowClientForm] = useState(false);
// const [clientData, setClientData] = useState({ title: '', description: '', media: null });
// const [editClientId, setEditClientId] = useState(null);

//   useEffect(() => {
//     fetch('http://localhost:5000/api/services')
//       .then(res => res.json())
//       .then(data => setServices(data))
//       .catch(err => console.error(err));
//   }, []);

//   // blogs
//   useEffect(() => {
//   fetch('http://localhost:5000/api/blogs')
//     .then(res => res.json())
//     .then(data => setBlogs(data))
//     .catch(err => console.error(err));
// }, []);

//   // clients
//   useEffect(() => {
//   fetch('http://localhost:5000/api/clients')
//     .then(res => res.json())
//     .then(data => setClients(data))
//     .catch(err => console.error(err));
// }, []);

//   const handleInputChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData({ ...formData, [name]: files ? files[0] : value });
//   };

//   //blogs
//    const handleBlogInput = (e) => {
//   const { name, value, files } = e.target;
//   setBlogData({ ...blogData, [name]: files ? files[0] : value });
// };
//    const handleClientInput = (e) => {
//   const { name, value, files } = e.target;
//   setClientData({ ...clientData, [name]: files ? files[0] : value });
// };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const form = new FormData();
//     Object.entries(formData).forEach(([key, val]) => {
//       if (val) form.append(key, val);
//     });

//     const method = editId ? 'PUT' : 'POST';
//     const url = editId
//       ? `http://localhost:5000/api/services/${editId}`
//       : 'http://localhost:5000/api/services';

//     try {
//       const res = await fetch(url, { method, body: form });
//       if (res.ok) {
//         alert(editId ? 'Project updated!' : 'Project added!');
//         window.location.reload();
//       } else {
//         alert('Error saving project.');
//       }
//     } catch (err) {
//       console.error(err);
//       alert('Server error.');
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Delete this project?')) return;
//     try {
//       const res = await fetch(`http://localhost:5000/api/services/${id}`, { method: 'DELETE' });
//       if (res.ok) {
//         alert('Deleted!');
//         window.location.reload();
//       }
//     } catch (err) {
//       console.error(err);
//       alert('Delete failed.');
//     }
//   };

//   const handleEdit = (service) => {
//     setFormData({
//       title: service.title,
//       description: service.description,
//       playstore: service.playstore || '',
//       appstore: service.appstore || '',
//       website: service.website || '',
//       media: null,
//     });
//     setEditId(service._id);
//     setShowForm(true);
//   };

//   const renderMedia = (service) => {
//     if (!service.media || !service.mediaType) return null;
//     return service.mediaType.startsWith('video/')
//       ? (
//         <video controls className="media">
//           <source src={`http://localhost:5000${service.media}`} type={service.mediaType} />
//         </video>
//       )
//       : (
//         <img src={`http://localhost:5000${service.media}`} alt={service.title} className="media" />
//       );
//   };

//   // blogs
//     //blogs
//    const handleBlogSubmit = async (e) => {
//   e.preventDefault();
//   const form = new FormData();
//   Object.entries(blogData).forEach(([key, val]) => {
//     if (val) form.append(key, val);
//   });

//   const method = editBlogId ? 'PUT' : 'POST';
//   const url = editBlogId
//     ? `http://localhost:5000/api/blogs/${editBlogId}`
//     : 'http://localhost:5000/api/blogs';

//   try {
//     const res = await fetch(url, { method, body: form });
//     if (res.ok) {
//       alert(editBlogId ? 'Blog updated!' : 'Blog added!');
//       window.location.reload();
//     } else {
//       alert('Error saving blog.');
//     }
//   } catch (err) {
//     console.error(err);
//     alert('Server error.');
//   }
// };

// const handleBlogDelete = async (id) => {
//   if (!window.confirm('Delete this blog?')) return;
//   try {
//     const res = await fetch(`http://localhost:5000/api/blogs/${id}`, { method: 'DELETE' });
//     if (res.ok) {
//       alert('Deleted!');
//       window.location.reload();
//     }
//   } catch (err) {
//     console.error(err);
//     alert('Delete failed.');
//   }
// };

// const handleBlogEdit = (blog) => {
//   setBlogData({
//     title: blog.title,
//     description: blog.description,
//     media: null,
//   });
//   setEditBlogId(blog._id);
//   setShowBlogForm(true);
// };

// //Clients
//    const handleClientSubmit = async (e) => {
//   e.preventDefault();
//   const form = new FormData();
//   Object.entries(clientData).forEach(([key, val]) => {
//     if (val) form.append(key, val);
//   });

//   const url = editClientId
//     ? `http://localhost:5000/api/clients/${editClientId}`
//     : 'http://localhost:5000/api/clients';

//   try {
//     // eslint-disable-next-line no-undef
//     const res = await fetch(url, {method, body :form });
//     if (res.ok) {
//       alert(editClientId ? 'Client updated!' : 'Client added!');
//       window.location.reload();
//     } else {
//       alert('Error saving blog.');
//     }
//   } catch (err) {
//     console.error(err);
//     alert('Server error.');
//   }
// };

// const handleClientDelete = async (id) => {
//   if (!window.confirm('Delete this client?')) return;
//   try {
//     const res = await fetch(`http://localhost:5000/api/clients/${id}`, { method: 'DELETE' });
//     if (res.ok) {
//       alert('Deleted!');
//       window.location.reload();
//     }
//   } catch (err) {
//     console.error(err);
//     alert('Delete failed.');
//   }
// };

// const handleClientEdit = (client) => {
//   setBlogData({
//     title: client.title,
//     description: client.description,
//     media: null,
//   });
//   setEditBlogId(client._id);
//   setShowBlogForm(true);
// };

//   return (
//     <div className='adminpanel'>
//       <div className='a'>

//       <h2>Add services</h2>
//       <button onClick={() => {
//         setShowForm(!showForm);
//         setEditId(null);
//         setFormData({ title: '', description: '', playstore: '', appstore: '', website: '', media: null });
//       }}>
//         {showForm ? 'Cancel' : 'Add Project'}
//       </button>

//       {showForm && (
//         <form className="addservices" onSubmit={handleSubmit} encType="multipart/form-data">
//           <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleInputChange} required />
//           <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} required />
//           <input type="url" name="playstore" placeholder="Play Store Link" value={formData.playstore} onChange={handleInputChange} />
//           <input type="url" name="appstore" placeholder="App Store Link" value={formData.appstore} onChange={handleInputChange} />
//           <input type="url" name="website" placeholder="Website Link" value={formData.website} onChange={handleInputChange} />
//           <input type="file" name="media" accept="image/*,video/*" onChange={handleInputChange} />
//           <button type="submit">{editId ? 'Update' : 'Add'} Project</button>
//         </form>
//       )}

//       <div className="service-cards">
//         {services.map(service => (
//           <div key={service._id} className="card">
//             {renderMedia(service)}
//             <h3>{service.title}</h3>
//             <p>{service.description}</p>
//             {service.playstore && <a href={service.playstore} target="_blank" rel="noopener noreferrer"><button>Play Store</button></a>}
//             {service.appstore && <a href={service.appstore} target="_blank" rel="noopener noreferrer"><button>App Store</button></a>}
//             {service.website && <a href={service.website} target="_blank" rel="noopener noreferrer"><button>Website</button></a>}
//             <button onClick={() => handleEdit(service)}>Edit</button>
//             <button onClick={() => handleDelete(service._id)}>Delete</button>
//           </div>
//         ))}
//       </div>
//             </div>
//       <div className='b'>

//       <h2>Blog Admin</h2>
// <button onClick={() => {
//   setShowBlogForm(!showBlogForm);
//   setEditBlogId(null);
//   setBlogData({ title: '', description: '', media: null });
// }}>
//   {showBlogForm ? 'Cancel' : 'Add Blog'}
// </button>

// {showBlogForm && (
//   <form className='addservices' onSubmit={handleBlogSubmit} encType="multipart/form-data">
//     <input type="text" name="title" placeholder="Blog Title" value={blogData.title} onChange={handleBlogInput} required />
//     <textarea name="description" placeholder="Description" value={blogData.description} onChange={handleBlogInput} required />
//     <input type="file" name="media" accept="image/*,video/*" onChange={handleBlogInput} />
//     <button type="submit">{editBlogId ? 'Update' : 'Add'} Blog</button>
//   </form>
// )}

// <div className="service-cards">
//   {blogs.map(blog => (
//     <div key={blog._id} className="card">
//       {renderMedia(blog)}
//       <h3>{blog.title}</h3>
//       <p>{blog.description.slice(0, 100)}...</p>
//       <button onClick={() => handleBlogEdit(blog)}>Edit</button>
//       <button onClick={() => handleBlogDelete(blog._id)}>Delete</button>
//     </div>
//   ))}
// </div>

// {/* //  client adminpanel */}

// <h2>Client Admin</h2>
// <button onClick={() => {
//   setShowClientForm(!showClientForm);
//   setEditClientId(null);
//   setClientData({ title: '', description: '', media: null });
// }}>
//   {showClientForm ? 'Cancel' : 'Add Client'}
// </button>

// {showClientForm && (
//   <form className='addservices' onSubmit={handleClientSubmit} encType="multipart/form-data">
//     <input type="text" name="title" placeholder="Client Title" value={clientData.title} onChange={handleClientInput} required />
//     <textarea name="description" placeholder="Description" value={clientData.description} onChange={handleClientInput} required />
//     <input type="file" name="media" accept="image/*,video/*" onChange={handleClientInput} />
//     <button type="submit">{editClientId ? 'Update' : 'Add'} Client</button>
//   </form>
// )}

// <div className="service-cards">
//   {clients.map(client => (
//     <div key={client._id} className="card">
//       {renderMedia(client)}
//       <h3>{client.title}</h3>
//       <p>{client.description.slice(0, 100)}...</p>
//       <button onClick={() => handleClientEdit(client)}>Edit</button>
//       <button onClick={() => handleClientDelete(client._id)}>Delete</button>
//     </div>
//   ))}
// </div>
// </div>

// </div>
//   );
// };

// export default Admin;

// // Admin.js
// import React, { useEffect, useState } from 'react';
// import './Service.css';
// import './Admin.css';

// const Admin = () => {
//   const [services, setServices] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({ title: '', description: '', link: '', media: null });
//   const [editId, setEditId] = useState(null);

//   useEffect(() => {
//     fetch('http://localhost:5000/api/services')
//       .then(res => res.json())
//       .then(data => setServices(data))
//       .catch(err => console.error(err));
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData({ ...formData, [name]: files ? files[0] : value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const form = new FormData();
//     form.append('title', formData.title);
//     form.append('description', formData.description);
//     form.append('link', formData.link);
//     if (formData.media) form.append('media', formData.media);

//     const method = editId ? 'PUT' : 'POST';
//     const url = editId
//       ? `http://localhost:5000/api/services/${editId}`
//       : 'http://localhost:5000/api/services';

//     try {
//       const res = await fetch(url, { method, body: form });
//       if (res.ok) {
//         alert(editId ? 'Project updated!' : 'Project added!');
//         window.location.reload();
//       } else {
//         alert('Error: Something went wrong.');
//       }
//     } catch (err) {
//       console.error(err);
//       alert('Error: Could not connect to the server.');
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Delete this project?')) return;
//     try {
//       const res = await fetch(`http://localhost:5000/api/services/${id}`, { method: 'DELETE' });
//       if (res.ok) {
//         alert('Deleted!');
//         window.location.reload();
//       } else {
//         alert('Error deleting the project.');
//       }
//     } catch (err) {
//       console.error(err);
//       alert('Error deleting the project.');
//     }
//   };

//   const handleEdit = (service) => {
//     setFormData({
//       title: service.title,
//       description: service.description,
//       link: service.link,
//       media: null, // Media will be uploaded fresh when editing
//     });
//     setEditId(service._id);
//     setShowForm(true);
//   };

//   const renderMedia = (service) => {
//     if (!service.media || !service.mediaType) return null;

//     if (service.mediaType.startsWith('video/')) {
//       return (
//         <video controls className="media">
//           <source src={`http://localhost:5000${service.media}`} type={service.mediaType} />
//           Your browser does not support the video tag.
//         </video>
//       );
//     } else if (service.mediaType.startsWith('image/')) {
//       return <img src={`http://localhost:5000${service.media}`} alt={service.title} className="media" />;
//     } else {
//       return <p>Unsupported media type</p>;
//     }
//   };

//   return (
//     <div>
//       <h2>Admin Dashboard</h2>
//       <button onClick={() => {
//         setShowForm(!showForm);
//         setEditId(null);
//         setFormData({ title: '', description: '', link: '', media: null });
//       }}>
//         {showForm ? 'Cancel' : 'Add Project'}
//       </button>

//       {showForm && (
//         <form onSubmit={handleSubmit} encType="multipart/form-data">
//           <input
//             type="text"
//             name="title"
//             placeholder="Title"
//             value={formData.title}
//             onChange={handleInputChange}
//             required
//           />
//           <textarea
//             name="description"
//             placeholder="Description"
//             value={formData.description}
//             onChange={handleInputChange}
//             required
//           />
//           <input
//             type="url"
//             name="link"
//             placeholder="Link"
//             value={formData.link}
//             onChange={handleInputChange}
//             required
//           />
//           <input
//             type="file"
//             name="media"
//             accept="image/*,video/*"
//             onChange={handleInputChange}
//           />
//           <button type="submit">{editId ? 'Update' : 'Add'} Project</button>
//         </form>
//       )}

//       <div className="service-cards">
//         {services.map(service => (
//           <div key={service._id} className="card">
//             {renderMedia(service)}
//             <h3>{service.title}</h3>
//             <p>{service.description}</p>
//             <a href={service.link} target="_blank" rel="noopener noreferrer">
//               <button>Open</button>
//             </a>
//             <button onClick={() => handleEdit(service)}>Edit</button>
//             <button onClick={() => handleDelete(service._id)}>Delete</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Admin;
