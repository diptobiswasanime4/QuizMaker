import "./globals.css";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import RegisterPopup from "@/components/RegisterPopup";
import AuthProvider from "@/components/AuthProvider";

axios.defaults.baseURL = process.env.BASE_URL;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);

  return (
    <html lang="en">
      <AuthProvider>
        <body className="">
          <div className="">
            <Navbar />
            {children}
            <Footer />
          </div>
          <RegisterPopup />
        </body>
      </AuthProvider>
    </html>
  );
}
