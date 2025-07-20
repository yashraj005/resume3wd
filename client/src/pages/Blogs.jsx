import React, { useEffect, useState } from 'react';
import './Blogs.css';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/blogs')
      .then(res => res.json())
      .then(data => setBlogs(data))
      .catch(err => console.error(err));
  }, []);

  const renderMedia = (item) => {
    if (!item.media || !item.mediaType) return null;

    if (item.mediaType.startsWith('video/')) {
      return (
        <video controls className="media">
          <source src={`http://localhost:5000${item.media}`} type={item.mediaType} />
        </video>
      );
    } else if (item.mediaType.startsWith('image/')) {
      return (
        <img src={`http://localhost:5000${item.media}`} alt={item.title} className="media" />
      );
    }
    return null;
  };

  const handleCardClick = (e, blog) => {
    if (
      e.target.tagName === 'BUTTON' ||
      e.target.closest('button')
    ) return;

    setSelectedBlog(blog);
  };

  return (
    <div className="blogs-container">
      <h2>Our Blogs</h2>

      <div className="blog-cards">
        {blogs.slice().reverse().map(blog => (
          <div key={blog._id} className="blog-card" onClick={(e) => handleCardClick(e, blog)}>
            {renderMedia(blog)}
            <h3>{blog.title}</h3>
            <p>
              {blog.description.length > 150
                ? blog.description.slice(0, 150) + '...'
                : blog.description}
            </p>
            {blog.description.length > 150 && (
              <button onClick={() => setSelectedBlog(blog)}>Read More</button>
            )}
          </div>
        ))}
      </div>

      {selectedBlog && (
        <div className="modal-overlay" onClick={() => setSelectedBlog(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedBlog(null)}>×</button>

            {renderMedia(selectedBlog)}
            <h3>{selectedBlog.title}</h3>
            <p>{selectedBlog.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;
