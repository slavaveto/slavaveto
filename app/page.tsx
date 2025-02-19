/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import LoremText from "@/app/assets/loremText";
import Avatar from "@/app/components/home_page/Avatar";
import Messengers from "@/app/components/home_page/Messengers";

import React, {useState, useCallback, useEffect} from 'react';
import {useRouter} from "next/navigation";
import {supabase} from '@/app/assets/supabaseClient';
import {Button} from "@nextui-org/react";
import {Spinner} from "@nextui-org/react";
import Footer from "@/app/components/Footer";
import DataLoader from "@/app/assets/dataLoader";
import usePageTransition from "@/app/assets/usePageTransition";

import Link from "next/link";

import YouTubeEmbed from "@/app/assets/youtubeEmbed";

import LocalText from "@/app/assets/localText";
import {useTranslation} from 'react-i18next';
import ProjBanner from "@/app/assets/projBanner";

import VideoPlayer from '@/app/assets/videoPlayer';

let isFirstLoad = true;

export default function Home() {

    const router = useRouter();
    const {t} = useTranslation();

    const [isDataLoading, setIsDataLoading] = useState(true);

    const {isInternalTransition, hasCheckedTransition, isExiting, showSpinner, handleNavigation} =
        usePageTransition(false, () => {
        });

    const [fetchPages, setFetchPages] = useState<any[]>([]);

    const handleDataLoad = (data: any[], isLoaded: boolean) => {
        setFetchPages(data); // Сохраняем полученные данные
        setIsDataLoading(!isLoaded);
        isFirstLoad = false; // Сбрасываем флаг первой загрузки
    };

    // Прокрутка наверх после загрузки данных
    useEffect(() => {
        if (!isDataLoading) {
            window.scrollTo(0, 0); // Прокручиваем страницу наверх
        }
    }, [isDataLoading]);

    return (

        <>
            <DataLoader onLoadAction={handleDataLoad} isFirstLoad={isFirstLoad}/>

            {isDataLoading && isFirstLoad && (
                <div className="spinner">
                    <Spinner/>
                </div>
            )}

            <div
                className={`page-transition ${
                    isExiting
                        ? 'page-transition-fadeout'
                        : isDataLoading
                            ? 'page-transition-fadein'
                            : ''
                }`}
            >

                <div className="flex flex-col min-h-svh">
                    <main
                        className="flex-grow container mx-auto px-3"
                        style={{maxWidth: '500px'}}>

                        <Link
                            className="flex justify-end mb-0 mt-[5px] p-0 items-center text-primary-500 hover:text-primary-400 transition"
                            style={{fontSize: '12px',}}
                            href='/stand-with-Ukraine'
                            onClick={(e) => {
                                e.preventDefault(); // Предотвращаем стандартное поведение ссылки
                                handleNavigation("stand_with_Ukraine"); // Вызываем fade-out и навигацию
                            }}

                        >
                            Stand with<img
                            src="https://storage.googleapis.com/app_slavaveto/ua_flag.png"
                            className="w-5 mx-2 rounded-[3px]"/>Ukraine
                        </Link>

                        {/*<Link*/}
                        {/*    onClick={(e) => {*/}
                        {/*        e.preventDefault(); // Предотвращаем стандартное поведение ссылки*/}
                        {/*        handleNavigation(`/error_page`); // Вызываем fade-out и навигацию*/}
                        {/*    }}*/}
                        {/*    href={`/error_page`} // Для SEO и правого клика на ссылке*/}
                        {/*    style={{*/}
                        {/*        cursor: 'pointer',*/}
                        {/*        // textDecoration: 'none',*/}
                        {/*        // color: 'inherit',*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*    error_page*/}
                        {/*</Link>*/}

                        <div className="flex flex-col gap-[20px] pt-0">
                            <Avatar/>
                            <Messengers/>

                            {/*<VideoPlayer publicId="ogxqiqaojxas1rywby4y" />*/}

                            {/*<VideoPlayer publicId="ogxqiqaojxas1rywby4y" posterTime={19} />*/}

                            {/*<YouTubeEmbed videoId="J5qxn8P6Hec" />*/}

                            {/*<div*/}
                            {/*    style={{*/}
                            {/*        padding: '118.52% 0 0 0',*/}
                            {/*        position: 'relative',*/}
                            {/*    }}*/}
                            {/*>*/}
                            {/*    <iframe*/}
                            {/*        src="https://player.vimeo.com/video/1049610552?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"*/}
                            {/*        frameBorder="0"*/}
                            {/*        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"*/}
                            {/*        title="Untitled Project 1"*/}
                            {/*        style={{*/}
                            {/*            position: 'absolute',*/}
                            {/*            top: '0',*/}
                            {/*            left: '0',*/}
                            {/*            width: '100%',*/}
                            {/*            height: '100%',*/}
                            {/*        }}*/}
                            {/*    >*/}
                            {/*    </iframe>*/}
                            {/*</div>*/}
                            {/*<script src="https://player.vimeo.com/api/player.js"></script>*/}

                            {fetchPages.map(({slug, page_key, btn_type}) => (

                                btn_type === 'image' ? (

                                    // Если btn_type === 'image', создаём ссылку в виде изображения
                                    <Link

                                        key={slug}
                                        onClick={(e) => {
                                            e.preventDefault(); // Предотвращаем стандартное поведение ссылки
                                            handleNavigation(`/${slug}`); // Вызываем fade-out и навигацию
                                        }}
                                        href={`/${slug}`} // Для SEO и правого клика на ссылке
                                        style={{
                                            cursor: 'pointer',
                                            textDecoration: 'none',
                                            color: 'inherit',
                                        }}
                                    >

                                        <ProjBanner pageKey={page_key}/>

                                    </Link>

                                ) : (
                                    <Button
                                        key={slug}
                                        onPress={() => handleNavigation(`${slug}`)}
                                        className="w-full text-base pt-[1px]"
                                        color="primary"
                                        variant={"faded"}
                                        radius="sm"
                                    >
                                        <LocalText text={"home_btn"} ns={`${page_key}`}/>
                                    </Button>

                                )
                            ))}

                            <LoremText paragraphs={0}/>

                        </div>

                    </main>
                    <Footer width="500"/>
                </div>
            </div>

        </>

    );

}
