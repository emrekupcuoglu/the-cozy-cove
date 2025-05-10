// ? Global layout
// Each Next.js needs to have a global layout called the RootLayout. This layout will be used to wrap all the pages in the application. This layout will be used to add the header, footer, and other global elements that are common to all the pages in the application.
// This layout wrap the entire application so it will apply to every single route in the application. So therefore it needs to contain the <html> and the <body> tag.
// So the global HTML structure will come from this RootLayout, so whatever we write in the html such as the lang attribute this will make it into the server side rendered HTML

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Metadata } from "next";
import "@/app/_styles/globals.css";
// With Next.js we can self host any google font easily by using the next/font package. Thanks to this we do not need to send a request to the google servers. With this instead of downloading the font from a google server we are serving it ourself, this improves the performance, and it even is good for privacy because we are not sending a request to google servers, and might be required by GDPR.
// We can also import our fonts by using next/font/local
// We can add this fonts as a util class to tailwind using the variable property, check the Next.js docs for more info. But in essence we extend the fontFamily in the tailwind.config.ts and add the josefin.variable instead of the josefin.className to the body tag
import { Josefin_Sans } from "next/font/google";
const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-josefin",
});

import Header from "./_components/Header";
import { ReservationProvider } from "./_contexts/ReservationContext";
import { SessionProvider } from "next-auth/react";

// We don't need the <head> tag because we have other ways of influencing the head tag in Next.js
export const metadata: Metadata = {
  title: {
    template: "%s | The Cozy Cove",
    default: "Welcome | The Cozy Cove",
  },
  description:
    "Luxurious cabin hotel located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests.",
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* To use our custom fonts with we need add both the josefin.variable and the created tailwind class.*/}
      <SessionProvider>
        <body
          className={`${josefin.variable} relative flex min-h-screen flex-col bg-primary-950 font-sans text-primary-100 antialiased`}
        >
          <Header />
          <div className="grid flex-1 grid-cols-1 px-20 py-16 md:px-8 md:py-12">
            <main className="mx-auto w-full max-w-7xl">
              <ReservationProvider>{children}</ReservationProvider>
            </main>
          </div>
          <Analytics />
          <SpeedInsights />
        </body>
      </SessionProvider>
    </html>
  );
}

export default RootLayout;
