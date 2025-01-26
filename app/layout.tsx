import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import { Montserrat } from 'next/font/google';
import "./globals.css";
import { Providers } from "@/app/providers/Providers";
import { themeScript } from "@/app/assets/themeScript";
import React from "react"; // Обновите путь, если требуется


const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});
const montserrat = Montserrat({
    display: "swap",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "В.Вето | Персональный сайт психолога",
    description: "Психологическое консультирование и психотерапия",
    icons: {
        icon: process.env.NODE_ENV === "development" ? "/favicon_local.png" : "/favicon.png",
    },
    openGraph: {
        title: "В.Вето | Персональный сайт психолога",
        description: "Психологическое консультирование и психотерапия",
        images: [
            {
                url: "https://storage.googleapis.com/app_slavaveto/me.png",
                width: 600, // Ширина изображения
                height: 600, // Высота изображения
                alt: " ",
            },
        ],
    },
};

export default  function RootLayout({ children }: { children: React.ReactNode }) {

    return (
        // <html lang="en" suppressHydrationWarning>
        <html lang="ru-RU" translate="no" className={montserrat.className} suppressHydrationWarning>
        <head>
            <script
                dangerouslySetInnerHTML={{
                    __html: themeScript,
                }}
            />


        </head>
        <body>
        <Providers>


            {children}


        </Providers>
        </body>
        </html>
        );
        }