import Link from "next/link";
import {supabase} from "@/app/assets/supabaseClient";

import FadeWrapper from "@/app/[pages]/components/FadeWrapper";
import Footer from "@/app/components/Footer";

import YouTubeEmbed from "@/app/components/YouTubeEmbed"; // Укажите путь к компоненту

import LoremText from "@/app/components/LoremText";
import {IoIosArrowBack} from "react-icons/io";
import React from "react";

import ClientTranslation from "./components/ClientTranslation"

export default async function Page({params}: { params: { pages: string } }) {
    const slug = params.pages;

    // Получаем данные из базы данных
    const {data, error} = await supabase
        .from('_pages') // Имя вашей таблицы
        .select('page_key') // Указываем столбец, который нам нужен
        .eq('slug', slug) // Фильтруем по slug
        .single(); // Ожидаем одну запись

    if (error) {
        console.error('Ошибка загрузки page_key:', error);
        return <p>Ошибка загрузки данных.</p>;
    }

    const pageKey = data?.page_key;
    const page_namespace = pageKey.split('_')[1];

    return (

        <FadeWrapper>

            <div className="header_bg opacity-90 backdrop-blur-3xl"
                 style={{

                     position: 'sticky',
                     top: 0
                 }}
            >

                <div className="container flex mx-auto px-3  items-center max-w-custom">

                    <div className="flex flex-col ">

                        <Link
                            color="foreground"
                            href="/"
                            className="mt-5 mb-4 pr-1 flex flex-row items-center"
                        >
                            <IoIosArrowBack className="-ml-[9px]" size={26}/>
                            {/*<p className=" mb-[1px] -font-semibold">{ui('return_home')}</p>*/}
                            <p className=" mb-[1px] -font-semibold">
                                <ClientTranslation phrase_key="return_home" namespace="ui"/>
                            </p>

                        </Link>

                        <div className="text-2xl -ml-[1px] mb-4 text-primary -font-semibold">
                            <ClientTranslation phrase_key="title" namespace={page_namespace}/>
                        </div>
                    </div>

                </div>
            </div>


                <div className="flex flex-col min-h-svh">


                    <main
                        className="flex-grow container mx-auto px-3 max-w-custom -xs450:overflow-y-auto -xs450:max-h-[calc(100vh-74px)]">

                        <div className="flex flex-col ">


                            <LoremText paragraphs={5}/>


                        </div>
                    </main>
                    <Footer/>

                </div>


        </FadeWrapper>
);
}


