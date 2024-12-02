import "./globals.css";
import Nav from "@/app/components/Nav";
import styles from "@/app/styles/layout.module.css";
import { UserProvider } from "@/context/UserContext";
import { Poppins } from "next/font/google";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "To do it",
  description: "Welcome to your task planification app",
  metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${poppins.variable} antialiased`}>
        <UserProvider>
          <div className={styles.layoutContainer}>
            <Nav />
            <main className={styles.mainContent}>{children}</main>
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
