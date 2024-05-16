import "./App.css";

import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Helmet, HelmetProvider } from "react-helmet-async";

function App() {
  const helmetContext = {};
  return (
    <>
      <HelmetProvider>
        <Header />

        <Outlet />

        <Footer />
      </HelmetProvider>
    </>
  );
}

export default App;
