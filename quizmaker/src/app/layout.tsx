import "./globals.css";
import axios from "axios";
import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import RegisterPopup from "@/components/RegisterPopup";

axios.defaults.baseURL = process.env.BASE_URL;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);

  return (
    <html lang="en">
      <body className="">
        <div className="">
          <Navbar />
          {children}
        </div>
        <RegisterPopup />
      </body>
    </html>
  );
}
