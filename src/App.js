import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Header from "./components/Header";
import "./assets/Styles/Header.css"
import Views from "./Views/index";
import {
  AppLayout,
  
} from '@cloudscape-design/components';
import AppHeader from "components/Header";
import Sidebar from "components/Sidebar";

// import AsideNavigation from "components/AsideNavigation";

function App() {
  return (
    <Router>
  <AppHeader></AppHeader>
    <AppLayout
    className="custom-app-layout"
    
  

     navigationWidth={230}
    headerSelector="#header"
 headerVariant="high-contrast"
    navigation={
      <Sidebar></Sidebar>
    }
    toolsHide={true}
    content={
<MainContent/>
    }
  />

  
     </Router>
  );
}
function MainContent() {
  return (
      <Routes>
        <Route path="*" element={<Views />} />
      </Routes>
  );
}
export default App;