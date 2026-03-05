import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import AuthPopup from "./AuthPopup";

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex flex-col gap-15">
                <Outlet />
            </main>
            <Footer />
            {/* Global auth popup — shown/hidden by AuthContext */}
            <AuthPopup />
        </div>
    )
}