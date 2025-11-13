import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "HI DEM",
  description: "powered by DROPBOOST.it",
};

export default async function RootLayout({ children }) {


  return (
    <html lang="it" suppressHydrationWarning className="h-full min-h-0 ">
      <body className={`${geistSans.variable} ${geistMono.variable} h-dvh min-h-0 overflow-hidden bg-background text-foreground `}>
        <ThemeProvider attribute='class' enableSystem defaultTheme='system'>
          <Analytics/>
            {children}
        </ThemeProvider>
      </body>
    </html>
  );
}