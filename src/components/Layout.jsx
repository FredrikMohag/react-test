import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header högst upp */}
      <Header />

      {/* Innehållsdel */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer längst ner */}
      <Footer />
    </div>
  );
}
