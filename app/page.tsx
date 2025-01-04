'use client';

import LoremText from "@/app/components/LoremText";
import Avatar from "@/app/components/home_page/avatar";
import Messengers from "@/app/components/home_page/messengers";

import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import {useRouter} from "next/navigation";
import {supabase} from '@/app/assets/supabaseClient';
import {Button} from "@nextui-org/react";
import {Spinner} from "@nextui-org/react";



import Footer from "@/app/components/Footer";

let isFirstLoad = true;

export default function Home() {

    const router = useRouter();

    // Состояния загрузки и данных
    const [isLoaded, setIsLoaded] = useState(false); // Управление спиннером
    const [pageLoaded, setPageLoaded] = useState(false); // Загрузка страницы
    const [pages, setPages] = useState<string[]>([]); // Список страниц
    const [isExiting, setIsExiting] = useState(false); // Fade-out эффект

    useEffect(() => {
        if (isLoaded) {
            window.scrollTo(0, 0); // Прокручиваем страницу наверх
        }
    }, [isLoaded]);


    useEffect(() => {
        const fetchPages = async () => {
            try {
                // Имитация минимальной задержки для спиннера
                await new Promise((resolve) => setTimeout(resolve, 0));

                // Запрос к базе данных
                const { data, error } = await supabase
                    .from('_pages')
                    .select('slug, order, is_hidden')
                    //.eq('page_key', 'your_page_key') // Замените 'your_page_key' на нужное значение
                    .order('order', { ascending: true }); // Сортировка по order

                if (error) throw error;

                // Фильтруем записи, исключая те, где is_hidden === true
                const visiblePages = data.filter((page) => !page.is_hidden);

                // Устанавливаем массив slug в состояние
                setPages(visiblePages.map((page) => page.slug));
            } catch (err) {
                console.error('Ошибка загрузки страниц:', err);
            } finally {
                setPageLoaded(true); // Уведомляем, что данные загружены
            }
        };

        fetchPages();
    }, []);


    // Эффект для управления отображением спиннера
    useEffect(() => {
        const timer = setTimeout(() => {
            if (pageLoaded) {
                setIsLoaded(true); // Завершаем загрузку
                isFirstLoad = false;
                //console.log("Первая загрузка", isFirstLoad); //
            }
        }, isFirstLoad ? 1000 : 50);// Минимальное время спиннера

        return () => clearTimeout(timer);
    }, [pageLoaded]);

    // Обработчик перехода
    const handleNavigation = (href: string) => {
        setIsExiting(true); // Включаем fade-out
        setTimeout(() => {
            router.push(href); // Переход на новую страницу
        }, 500); // Длительность fade-out
    };

    return (

        <>

            {!isLoaded && isFirstLoad && (
                <div
                    className="fixed inset-0 flex justify-center items-center h-screen translate-y-[-10vh] xs450:translate-y-[-5vh]">
                    <Spinner/>
                </div>
            )}
            <div
                style={{
                    transition: isExiting
                        ? 'opacity 300ms ease, transform 500ms ease' // Длительность для isExiting
                        : 'opacity 500ms ease, transform 50ms ease', // Длительность для isLoaded
                }}
                className={`flex flex-col min-h-svh ${
                    isExiting
                        ? 'opacity-0 pointer-events-none translate-y-5' // Fade-out и сдвиг вниз
                        : isLoaded
                            ? 'opacity-100 translate-y-0' // Показ и начальное положение
                            : 'opacity-0' // Исчезновение (пока не загрузилось)
                }`}


            >

                <main
                    className="flex-grow container mx-auto px-3 max-w-custom -xs450:overflow-y-auto -xs450:max-h-[calc(100vh-74px)]">
                    <div className="flex flex-col gap-[20px] pt-6">
                        <Avatar/>

                        <Messengers/>

                        {pages.map((slug) => (
                            <Button
                                key={slug}
                                onPress={() => handleNavigation(`${slug}`)}
                                className="w-full text-base pt-[1px]"
                                color="primary"
                                variant={"faded"}
                                radius="sm"
                            >
                                Перейти на {slug}
                            </Button>

                        ))}


                        <LoremText paragraphs={0}/>

                    </div>

                </main>
                <Footer/>
            </div>

        </>

    );

}
