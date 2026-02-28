import { Outlet } from "react-router";
import { Header, } from "./header";
import { Footer } from "./footer";
import useAuthListener from "@/hook/use-auth";


export default function RootLayout() {
    useAuthListener();

    return (
        <div>
            <Header />
            <div>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}