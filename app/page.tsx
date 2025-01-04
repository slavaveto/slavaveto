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

import {useTranslation} from 'react-i18next';

let isFirstLoad = true;

export default function Home() {

    const router = useRouter();

    const { t: ui } = useTranslation('ui');
    const { t: home } = useTranslation('home');
    const { t: main_btns } = useTranslation('main_btns');

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


    // Изменяем имя состояния, чтобы избежать конфликта
    const [fetchedPages, setFetchedPages] = useState<{ slug: string; page_key: string; btn_type: string  }[]>([]);

    useEffect(() => {
        const fetchPages = async () => {
            try {
                // Имитация минимальной задержки для спиннера
                await new Promise((resolve) => setTimeout(resolve, 0));

                // Запрос к базе данных
                const { data, error } = await supabase
                    .from('_pages')
                    .select('slug, page_key, order, btn_type, is_hidden')
                    .order('order', { ascending: true }); // Сортировка по order

                if (error) throw error;

                // Фильтруем записи, исключая те, где is_hidden === true
                const visiblePages = data.filter((page) => !page.is_hidden);

                // Устанавливаем массив объектов { slug, page_key } в состояние
                setFetchedPages(visiblePages.map(({ slug, page_key, btn_type }) => ({ slug, page_key, btn_type })));
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


                        {fetchedPages.map(({ slug, page_key, btn_type }) => (
                            btn_type === 'image' ? (
                                // Если btn_type === 'image', создаём ссылку в виде изображения
                                <a
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
                                    <img
                                        //src={`/path/to/image/${page_key}.jpg`} // Путь к изображению
                                        src={main_btns(`${page_key}_btn`)} // Путь к изображению
                                        alt={`Изображение для ${page_key}`} // Альтернативный текст
                                        className="block dark:hidden rounded-md hover:opacity-90 transition-opacity border-2 " // Стили
                                        style={{cursor: 'pointer'}}
                                    />
                                    <img
                                        //src={`/path/to/image/${page_key}.jpg`} // Путь к изображению
                                        src={main_btns(`${page_key}_btn_dark`)} // Путь к изображению
                                        alt={`Изображение для ${page_key}`} // Альтернативный текст
                                        className="hidden dark:block rounded-md hover:opacity-90 transition-opacity  px-[1px]" // Стили
                                        style={{cursor: 'pointer'}}
                                    />
                                </a>

                            ) : (
                                <Button
                                    key={slug}
                                    onPress={() => handleNavigation(`${slug}`)}
                                    className="w-full text-base pt-[1px]"
                                    color="primary"
                                    variant={"faded"}
                                    radius="sm"
                                >
                                    {main_btns(`${page_key}_btn`)}

                                </Button>

                            )
                        ))}


                        <LoremText paragraphs={0}/>

                    </div>

                </main>
                <Footer/>
            </div>

        </>

    );

}
