import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import {QueryClient,QueryClientProvider} from "@tanstack/react-query";
import {AuthProvider} from "../helpers/useAuth";
import "../base.css";
import Index from "../pages/_index";
import About from "../pages/about";
import Events from "../pages/events";
import Gallery from "../pages/gallery";
import Join from "../pages/join";
import Contact from "../pages/contact";
import Login from "../pages/login";
import Admin from "../pages/admin";
import Setup from "../pages/setup";
const queryClient=new QueryClient();
function App(){return <QueryClientProvider client={queryClient}><AuthProvider><Routes>
<Route path="/" element={<Index/>}/><Route path="/about" element={<About/>}/><Route path="/events" element={<Events/>}/><Route path="/gallery" element={<Gallery/>}/><Route path="/join" element={<Join/>}/><Route path="/contact" element={<Contact/>}/><Route path="/login" element={<Login/>}/><Route path="/admin" element={<Admin/>}/><Route path="/setup" element={<Setup/>}/>
</Routes></AuthProvider></QueryClientProvider>}
ReactDOM.createRoot(document.getElementById("root")!).render(<React.StrictMode><BrowserRouter><App/></BrowserRouter></React.StrictMode>);