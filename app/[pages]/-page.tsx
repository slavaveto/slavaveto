import {supabase} from "@/app/assets/supabaseClient";

import FadeWrapper from "@/app/[pages]/components/FadeWrapper";
import Footer from "@/app/components/Footer";

import { redirect } from 'next/navigation';

import YouTubeEmbed from "@/app/components/YouTubeEmbed"; // Укажите путь к компоненту

import LoremText from "@/app/components/LoremText";
import React from "react";

import ClientTranslation from "./components/ClientTranslation"

import ErrorPage from "@/app/[pages]/pages/errorPage";
import UkrainePage from "@/app/[pages]/pages/ukrainePage";

import AboutPage from "@/app/[pages]/pages/aboutPage";

import RequestPage from "@/app/[pages]/pages/RequestPage";
import Tg4gtPage from "@/app/[pages]/pages/tg4gtPage";

export default async function Page({params}: { params: { pages: string } }) {
    const slug = params.pages;

    // Получаем данные из базы данных
    const {data, error} = await supabase
        .from('_pages') // Имя вашей таблицы
        .select('page_key') // Указываем столбец, который нам нужен
        .eq('slug', slug) // Фильтруем по slug
        .eq('is_active', true) // Учитываем только активные записи
        .single(); // Ожидаем одну запись

    if (error) {
        console.error('Ошибка загрузки page_key:', error);
        redirect('/error-page');
    }

    const pageKey = data?.page_key;
    const page_namespace = pageKey.split('_')[1];

    //console.log("page_namespace", pageKey);

    const components: Record<string, React.FC<{ page_namespace: string }>> = {
        errorPage: ErrorPage,
        ukrainePage: UkrainePage,

        aboutPage: AboutPage,

        tg4gtPage: Tg4gtPage,

        requestPage: RequestPage,


    };
    const DynamicComponent = components[`${page_namespace}Page`];




    return (

        <FadeWrapper>
            <div className="flex flex-col min-h-svh">
                {/*{pageKey !== 'page_error' && <Header width="550" page_namespace={page_namespace}/>}*/}

                {/*<main className="flex-grow container mx-auto px-3 pt-3"*/}
                {/*      style={{ maxWidth: '550px' }}>*/}

                    <DynamicComponent page_namespace={page_namespace}/>

                {/*</main>*/}

                    <Footer width="550"/>
            </div>


        </FadeWrapper>
);
}


