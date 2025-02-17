import Navbar from "../Navbar/Navbar.jsx";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar />

      <div className="container lg:max-w-screen-xl mx-auto">
        <div className="mb-4">
          <Outlet />
        </div>
      </div>
    </>
  );
}
