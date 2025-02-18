import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/_custom/theme-provider";
import Header from "@/components/_custom/Header";
// react toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// clerk
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { SidebarProvider } from "@/components/ui/sidebar";


export const metadata: Metadata = {
  title: "Kanai Notes App",
  description: "A simple note-taking app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        suppressHydrationWarning

      >
        <body
          className={`antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            <SidebarProvider defaultOpen>
              <div className="w-full min-h-screen container mx-auto flex flex-col ">
                <Header />
                {children}
              </div>

            </SidebarProvider>
            <ToastContainer limit={1} autoClose={3000} />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
