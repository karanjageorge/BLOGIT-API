import { Routes, Route } from "react-router-dom";
import Register from "./pages/auth/RegistrationForm";
import Login from "./pages/auth/LoginForm";
import Home from "./pages/LandingPage/Home";
import { Toaster } from "sonner";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreateBlog from "./pages/Blogs/CreateBlog";
import EditBlog from "./pages/Blogs/EditBlog";
import ViewBlog from "./pages/Blogs/ViewBlog";
import MyBlogs from "./pages/Blogs/MyBlogs";
import Trash from "./pages/Blogs/Trash";

import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <>
      {/* Toast notifications */}
      <Toaster richColors position="top-center" />

      {/* Page routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
         <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/blogs/create" element={<CreateBlog/>} />
          <Route path="/blogs/edit/:id" element={<EditBlog />} />
          <Route path="/blogs/view/:id" element={<ViewBlog />} />
           <Route path="/blogs/myblogs" element={<MyBlogs />} />
             <Route path="/profile/trash" element={<Trash/>} />
             
             
        <Route path="/profile" element={<Profile />} />
           
      </Routes>
    </>
  );
}

export default App;
