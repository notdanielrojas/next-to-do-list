import "./globals.css";
import Nav from "@/app/components/Nav";
import styles from "@/app/styles/layout.module.css";
import { UserProvider } from "@/context/UserContext";
import { Poppins } from "next/font/google";

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
      <body>
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
