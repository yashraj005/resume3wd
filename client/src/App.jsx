



import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./compo/Navbar";
import ContactUs from "./pages/ContactUs";
import Service from "./pages/Service";
import AboutUs from "./pages/AboutUs";
// import { Home } from "lucide-react";
import Home from "./pages/Home"
import Admin from "./pages/Admin";
import WhatWeServe from "./pages/WhatWeServe";
import Blogs from "./pages/Blogs";
import Client from "./pages/Client";


// import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  return (
    <>
    <div>
      <Routes>
        <Route path="/" element={
          <div>
            <Navbar/>
            <Home/>
          </div>
        } />

        <Route path="/whatweserve" element={
          <div>
          <Navbar/>
          <WhatWeServe/>
          </div>
        }
        />
        
        <Route path="/home" element={
          <div>
          <Navbar/>
          <Home/>
          </div>
        }
        />

        <Route path="/services" element={
          <div>
          <Navbar/>
          <Service/>
          </div>
        }
        />
        <Route path="/blogs" element={
          <div>
          <Navbar/>
          <Blogs/>
          </div>
        }
        />

        <Route path="/client" element={
          <div>
          <Navbar/>
          <Client/>
          </div>
        }
        />
        <Route path="/admin" element={
          <div>
          {/* <Navbar/> */}
          <Admin/>
          </div>
        }
        />

        <Route path="/aboutus" element={
          <div>
          <Navbar/>
          <AboutUs/>
          </div>
        }
        />

        <Route path="/contactus" element={
          <div>
          <Navbar/>
          <ContactUs/>
          </div>
        }
        />
      </Routes>
    </div>
    </>
  )
}

export default App
