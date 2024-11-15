import "./globals.css";
import Nav from "@/app/components/Nav";
import styles from "@/app/styles/layout.module.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <div className={styles.layoutContainer}>
          <Nav />
          <main className={styles.mainContent}>{children}</main>
        </div>
      </body>
    </html>
  );
}
