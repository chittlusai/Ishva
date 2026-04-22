import { UserProvider } from "@/lib/userContext";
import "./globals.css";

export const metadata = {
  title: "Ishiva Digital Technologies — We Build. We Market. We Scale.",
  description:
    "From idea to revenue — complete digital growth ecosystem. Premium website development, SEO, performance marketing, AI automation, and branding by Ishiva Digital Technologies Pvt Ltd.",
  keywords: [
    "digital agency",
    "web development",
    "SEO",
    "performance marketing",
    "AI automation",
    "branding",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Ambient Background Orbs */}
        <div className="ambient-orb orb-1" />
        <div className="ambient-orb orb-2" />
        <div className="ambient-orb orb-3" />

        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
