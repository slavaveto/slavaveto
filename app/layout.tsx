import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import { Providers } from "@/app/providers/Providers";
import { themeScript } from "@/app/assets/themeScript";
import React from "react"; // Обновите путь, если требуется


const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "В.Вето | Персональный сайт психолога",
    description: "Психология, психотерапия, психологическое консультирование",
    icons: {
        icon: "/favicon.ico"
    },
};

export default  function RootLayout({ children }: { children: React.ReactNode }) {




    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            <script
                dangerouslySetInnerHTML={{
                    __html: themeScript,
                }}
            />


        </head>
        <body className={`${inter.variable} antialiased`}>
        <Providers>


                    {children}


        </Providers>
        </body>
        </html>
    );
}