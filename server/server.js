// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/3wdservices', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// ==== Schemas ====

const serviceSchema = new mongoose.Schema({
  title: String,
  description: String,
  playstore: String,
  appstore: String,
  website: String,
  media: String,
  mediaType: String,
}, { timestamps: true });

const blogSchema = new mongoose.Schema({
  title: String,
  description: String,
  media: String,
  mediaType: String,
}, { timestamps: true });

const clientSchema = new mongoose.Schema({
  title: String,
  description: String,
  media: String,
  mediaType: String,
}, { timestamps: true });

const Service = mongoose.model('Service', serviceSchema);
const Blog = mongoose.model('Blog', blogSchema);
const Client = mongoose.model('Client', clientSchema);

// ==== Multer Setup ====
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm', 'video/ogg'];
    cb(null, allowed.includes(file.mimetype));
  }
});

// ========== Routes ==========

// === Services ===
app.get('/api/services', async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/services', upload.single('media'), async (req, res) => {
  try {
    const { title, description, playstore, appstore, website } = req.body;
    const mediaPath = req.file ? `/uploads/${req.file.filename}` : '';
    const mediaType = req.file ? req.file.mimetype : '';
    const newService = new Service({ title, description, playstore, appstore, website, media: mediaPath, mediaType });
    await newService.save();
    res.json(newService);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/services/:id', upload.single('media'), async (req, res) => {
  try {
    const { title, description, playstore, appstore, website } = req.body;
    const updateData = { title, description, playstore, appstore, website };

    if (req.file) {
      const old = await Service.findById(req.params.id);
      if (old?.media) {
        const oldPath = path.join(__dirname, old.media);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      updateData.media = `/uploads/${req.file.filename}`;
      updateData.mediaType = req.file.mimetype;
    }

    const updated = await Service.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updated) return res.status(404).json({ message: 'Service not found' });
    res.json(updated);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/services/:id', async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    if (service.media) {
      const filePath = path.join(__dirname, service.media);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    res.json({ message: 'Deleted successfully' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// === Blogs ===
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/blogs', upload.single('media'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const mediaPath = req.file ? `/uploads/${req.file.filename}` : '';
    const mediaType = req.file ? req.file.mimetype : '';
    const newBlog = new Blog({ title, description, media: mediaPath, mediaType });
    await newBlog.save();
    res.json(newBlog);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/blogs/:id', upload.single('media'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const updateData = { title, description };

    if (req.file) {
      const old = await Blog.findById(req.params.id);
      if (old?.media) {
        const oldPath = path.join(__dirname, old.media);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      updateData.media = `/uploads/${req.file.filename}`;
      updateData.mediaType = req.file.mimetype;
    }

    const updated = await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updated) return res.status(404).json({ message: 'Blog not found' });
    res.json(updated);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    if (blog.media) {
      const filePath = path.join(__dirname, blog.media);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    res.json({ message: 'Deleted successfully' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// === Clients ===
app.get('/api/clients', async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/clients', upload.single('media'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const mediaPath = req.file ? `/uploads/${req.file.filename}` : '';
    const mediaType = req.file ? req.file.mimetype : '';
    const newClient = new Client({ title, description, media: mediaPath, mediaType });
    await newClient.save();
    res.json(newClient);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/clients/:id', upload.single('media'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const updateData = { title, description };

    if (req.file) {
      const old = await Client.findById(req.params.id);
      if (old?.media) {
        const oldPath = path.join(__dirname, old.media);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }

      updateData.media = `/uploads/${req.file.filename}`;
      updateData.mediaType = req.file.mimetype;
    }

    const updated = await Client.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updated) return res.status(404).json({ message: 'Client not found' });
    res.json(updated);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/clients/:id', async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client not found' });

    if (client.media) {
      const filePath = path.join(__dirname, client.media);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    res.json({ message: 'Deleted successfully' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// === Start Server ===
app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));












// // server.js
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const multer = require('multer');
// const mongoose = require('mongoose');
// const fs = require('fs');
// const path = require('path');

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(bodyParser.json());
// app.use('/uploads', express.static('uploads'));

// // MongoDB connection
// mongoose.connect('mongodb://localhost:27017/3wdservices', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log('MongoDB error:', err));

// // ==== Service Schema ====
// const serviceSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   playstore: String,
//   appstore: String,
//   website: String,
//   media: String,
//   mediaType: String,
// });

// const Service = mongoose.model('Service', serviceSchema);

// const blogSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   media: String,
//   mediaType: String,
// }, { timestamps: true });

// const Blog = mongoose.model('Blog', blogSchema);


// // ==== Multer setup ====
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, 'uploads/'),
//   filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
// });

// const upload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = [
//       'image/jpeg',
//       'image/png',
//       'image/webp',
//       'image/gif',
//       'video/mp4',
//       'video/webm',
//       'video/ogg'
//     ];
//     if (allowedTypes.includes(file.mimetype)) cb(null, true);
//     else cb(new Error('Invalid file type'), false);
//   }
// });

// // ==== Service Routes ====

// // Get all services
// app.get('/api/services', async (req, res) => {
//   try {
//     const services = await Service.find();
//     res.json(services);
//   } catch {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Add new service
// app.post('/api/services', upload.single('media'), async (req, res) => {
//   try {
//     const { title, description, playstore, appstore, website } = req.body;
//     const mediaPath = req.file ? `/uploads/${req.file.filename}` : '';
//     const mediaType = req.file ? req.file.mimetype : '';

//     const newService = new Service({
//       title,
//       description,
//       playstore,
//       appstore,
//       website,
//       media: mediaPath,
//       mediaType
//     });
//     await newService.save();
//     res.json(newService);
//   } catch {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Update service
// app.put('/api/services/:id', upload.single('media'), async (req, res) => {
//   try {
//     const { title, description, playstore, appstore, website } = req.body;
//     const updateData = { title, description, playstore, appstore, website };

//     if (req.file) {
//       const old = await Service.findById(req.params.id);
//       if (old?.media) {
//         const oldPath = path.join(__dirname, old.media);
//         if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
//       }

//       updateData.media = `/uploads/${req.file.filename}`;
//       updateData.mediaType = req.file.mimetype;
//     }

//     const service = await Service.findByIdAndUpdate(req.params.id, updateData, { new: true });
//     if (!service) return res.status(404).json({ message: 'Service not found' });
//     res.json(service);
//   } catch {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Delete service
// app.delete('/api/services/:id', async (req, res) => {
//   try {
//     const service = await Service.findByIdAndDelete(req.params.id);
//     if (!service) return res.status(404).json({ message: 'Service not found' });

//     if (service.media) {
//       const filePath = path.join(__dirname, service.media);
//       if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
//     }

//     res.json({ message: 'Deleted successfully' });
//   } catch {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // ==== Blog Routes ====

// // Get all blogs
// app.get('/api/blogs', async (req, res) => {
//   try {
//     const blogs = await Blog.find().sort({ createdAt: -1 });
//     res.json(blogs);
//   } catch {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Add new blog
// app.post('/api/blogs', upload.single('media'), async (req, res) => {
//   try {
//     const { title, description } = req.body;
//     const mediaPath = req.file ? `/uploads/${req.file.filename}` : '';
//     const mediaType = req.file ? req.file.mimetype : '';

//     const newBlog = new Blog({ title, description, media: mediaPath, mediaType });
//     await newBlog.save();
//     res.json(newBlog);
//   } catch {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Update blog
// app.put('/api/blogs/:id', upload.single('media'), async (req, res) => {
//   try {
//     const { title, description } = req.body;
//     const updateData = { title, description };

//     if (req.file) {
//       const old = await Blog.findById(req.params.id);
//       if (old?.media) {
//         const oldPath = path.join(__dirname, old.media);
//         if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
//       }

//       updateData.media = `/uploads/${req.file.filename}`;
//       updateData.mediaType = req.file.mimetype;
//     }

//     const blog = await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true });
//     if (!blog) return res.status(404).json({ message: 'Blog not found' });
//     res.json(blog);
//   } catch {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Delete blog
// app.delete('/api/blogs/:id', async (req, res) => {
//   try {
//     const blog = await Blog.findByIdAndDelete(req.params.id);
//     if (!blog) return res.status(404).json({ message: 'Blog not found' });

//     if (blog.media) {
//       const filePath = path.join(__dirname, blog.media);
//       if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
//     }

//     res.json({ message: 'Deleted successfully' });
//   } catch {
//     res.status(500).json({ message: 'Server error' });
//   }
// });



// // for clients

// const clients = new mongoose.Schema({
//   title : String ,
//   desc : String,
//   media : String,
//   mediaType : String
// });
// const Client =mongoose.model('Client' , clients);

// // Get all Clients
// app.get('/api/clients', async (req, res) => {
//   try {
//     const clients = await Client.find().sort({ createdAt: -1 });
//     res.json(clients);
//   } catch {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Add new Clients
// app.post('/api/clients', upload.single('media'), async (req, res) => {
//   try {
//     const { title, description } = req.body;
//     const mediaPath = req.file ? `/uploads/${req.file.filename}` : '';
//     const mediaType = req.file ? req.file.mimetype : '';

//     const newClient = new Client({ title, description, media: mediaPath, mediaType });
//     await newClient.save();
//     res.json(newClient);
//   } catch {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Update Clients
// app.put('/api/clients/:id', upload.single('media'), async (req, res) => {
//   try {
//     const { title, description } = req.body;
//     const updateData = { title, description };

//     if (req.file) {
//       const old = await Client.findById(req.params.id);
//       if (old?.media) {
//         const oldPath = path.join(__dirname, old.media);
//         if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
//       }

//       updateData.media = `/uploads/${req.file.filename}`;
//       updateData.mediaType = req.file.mimetype;
//     }

//     const client = await Client.findByIdAndUpdate(req.params.id, updateData, { new: true });
//     if (!client) return res.status(404).json({ message: 'Blog not found' });
//     res.json(client);
//   } catch {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Delete Clients
// app.delete('/api/clients/:id', async (req, res) => {
//   try {
//     const client = await Client.findByIdAndDelete(req.params.id);
//     if (!client) return res.status(404).json({ message: 'Blog not found' });

//     if (client.media) {
//       const filePath = path.join(__dirname, client.media);
//       if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
//     }

//     res.json({ message: 'Deleted successfully' });
//   } catch {
//     res.status(500).json({ message: 'Server error' });
//   }
// });













// // Start server
// app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));























// // server.js
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const multer = require('multer');
// const mongoose = require('mongoose');
// const fs = require('fs');
// const path = require('path');

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(bodyParser.json());
// app.use('/uploads', express.static('uploads'));

// // MongoDB connection
// mongoose.connect('mongodb://localhost:27017/3wdservices', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => console.log('MongoDB connected'))
//   .catch(err => console.log('MongoDB error:', err));

// // Schema
// const serviceSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   playstore: String,
//   appstore: String,
//   website: String,
//   media: String,
//   mediaType: String,
// });

// const Service = mongoose.model('Service', serviceSchema);

// // Multer setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, 'uploads/'),
//   filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
// });

// const upload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm', 'video/ogg'];
//     if (allowedTypes.includes(file.mimetype)) cb(null, true);
//     else cb(new Error('Invalid file type'), false);
//   },
// });

// // Routes
// app.get('/api/services', async (req, res) => {
//   try {
//     const services = await Service.find();
//     res.json(services);
//   } catch {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// app.post('/api/services', upload.single('media'), async (req, res) => {
//   try {
//     const { title, description, playstore, appstore, website } = req.body;
//     const mediaPath = req.file ? `/uploads/${req.file.filename}` : '';
//     const mediaType = req.file ? req.file.mimetype : '';

//     const newService = new Service({ title, description, playstore, appstore, website, media: mediaPath, mediaType });
//     await newService.save();
//     res.json(newService);
//   } catch {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// app.put('/api/services/:id', upload.single('media'), async (req, res) => {
//   try {
//     const { title, description, playstore, appstore, website } = req.body;
//     const updateData = { title, description, playstore, appstore, website };

//     if (req.file) {
//       const old = await Service.findById(req.params.id);
//       if (old?.media) {
//         const oldPath = path.join(__dirname, old.media);
//         if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
//       }

//       updateData.media = `/uploads/${req.file.filename}`;
//       updateData.mediaType = req.file.mimetype;
//     }

//     const service = await Service.findByIdAndUpdate(req.params.id, updateData, { new: true });
//     if (!service) return res.status(404).json({ message: 'Service not found' });
//     res.json(service);
//   } catch {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// app.delete('/api/services/:id', async (req, res) => {
//   try {
//     const service = await Service.findByIdAndDelete(req.params.id);
//     if (!service) return res.status(404).json({ message: 'Service not found' });

//     if (service.media) {
//       const filePath = path.join(__dirname, service.media);
//       if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
//     }

//     res.json({ message: 'Deleted successfully' });
//   } catch {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));



























// // backend/server.js
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const multer = require('multer');
// const mongoose = require('mongoose');
// const fs = require('fs');
// const path = require('path');

// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use('/uploads', express.static('uploads'));

// // MongoDB connection
// mongoose.connect('mongodb://localhost:27017/3wdservices', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => console.log('MongoDB connected'))
//   .catch(err => console.log('MongoDB error:', err));

// // Schema
// const serviceSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   link: String,
//   media: String,      // Path to media file (image or video)
//   mediaType: String,  // MIME type (e.g., 'image/jpeg' or 'video/mp4')
// });

// const Service = mongoose.model('Service', serviceSchema);

// // Multer setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, 'uploads/'),
//   filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
// });

// const upload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm', 'video/ogg'];
//     if (allowedTypes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new Error('Invalid file type'), false);
//     }
//   },
// });

// // Routes

// // Get all services
// app.get('/api/services', async (req, res) => {
//   try {
//     const services = await Service.find();
//     res.json(services);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Add a new service
// app.post('/api/services', upload.single('media'), async (req, res) => {
//   try {
//     const { title, description, link } = req.body;
//     const mediaPath = req.file ? `/uploads/${req.file.filename}` : '';
//     const mediaType = req.file ? req.file.mimetype : '';

//     const newService = new Service({ title, description, link, media: mediaPath, mediaType });
//     await newService.save();

//     res.json(newService);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Update a service
// app.put('/api/services/:id', upload.single('media'), async (req, res) => {
//   try {
//     const { title, description, link } = req.body;

//     const updateData = { title, description, link };
//     if (req.file) {
//       // Optional: Delete the old media file from disk
//       const oldService = await Service.findById(req.params.id);
//       if (oldService && oldService.media) {
//         const oldPath = path.join(__dirname, oldService.media);
//         if (fs.existsSync(oldPath)) {
//           fs.unlinkSync(oldPath);
//         }
//       }

//       updateData.media = `/uploads/${req.file.filename}`;
//       updateData.mediaType = req.file.mimetype;
//     }

//     const service = await Service.findByIdAndUpdate(req.params.id, updateData, { new: true });
//     if (!service) return res.status(404).json({ message: 'Service not found' });

//     res.json(service);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Delete a service
// app.delete('/api/services/:id', async (req, res) => {
//   try {
//     const service = await Service.findByIdAndDelete(req.params.id);
//     if (!service) return res.status(404).json({ message: 'Service not found' });

//     // Delete media file from disk
//     if (service.media) {
//       const filePath = path.join(__dirname, service.media);
//       if (fs.existsSync(filePath)) {
//         fs.unlinkSync(filePath);
//       }
//     }

//     res.json({ message: 'Deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Start server
// app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));



