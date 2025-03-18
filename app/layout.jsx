import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import PageTransition from "../components/PageTransition";
import StairTransition from "../components/StairTransition";
import Footer from "../components/Footer";
import LiveSupport from "../components/LiveSupport";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrainsMono",
  subsets: ["latin"],
  weight:["100", "200", "300", "400", "500", "600", "700", "800"],
});



export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={jetbrainsMono.variable}
      >
        <Header />
        <StairTransition />
        <PageTransition>
        {children}
        </PageTransition>
        <LiveSupport />
        <Footer />
        <script src="https://platform.linkedin.com/badges/js/profile.js" async defer type="text/javascript"></script>
      </body>
    </html>
  );
}
