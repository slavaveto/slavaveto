'use client';

import {useEffect, useState} from "react";
import {useRouter} from 'next/navigation';

const FadeWrapper = ({children}: { children: React.ReactNode }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const router = useRouter();

    useEffect(() => {
            window.scrollTo(0, 0); // Прокручиваем страницу наверх
    })

    const handleNavigation = (href: string) => {
        setIsExiting(true); // Активируем fade-out
        setTimeout(() => {

            router.push(href); // Выполняем переход после завершения анимации
            //setIsExiting(false); // Сбрасываем состояние после завершения перехода

        }, 300); // Длительность fade-out должна совпадать с CSS transition
    };

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 0); // Пауза перед показом
        return () => clearTimeout(timer); // Очищаем таймер
    }, []);

    return (
        <div
            style={{
                transition: isExiting
                    ? 'opacity 300ms ease, transform 300ms ease' // Fade-out
                    : 'opacity 500ms ease, transform 50ms ease', // Fade-in
            }}
            className={`flex flex-col min-h-svh ${
                isExiting
                    ? 'opacity-0 pointer-events-none translate-y-5' // Fade-out и сдвиг вниз
                    : isVisible
                        ? 'opacity-100 translate-y-0' // Показ и начальное положение
                        : 'opacity-0' // Исчезновение (пока не загрузилось)
            }`}
        >
            {/* Перехватываем клики на ссылки */}
            <div onClick={(e) => handleLinkClick(e)}>
                {children}
            </div>
        </div>
    );

    function handleLinkClick(event: React.MouseEvent<HTMLDivElement>) {
        const link = (event.target as HTMLElement).closest('a');
        //console.log('Ссылка найдена:', link);
        if (link && link.href.startsWith(window.location.origin)) {
            event.preventDefault(); // Предотвращаем переход по ссылке
            //console.log('Переход через handleNavigation:', link.href);
            handleNavigation(link.href); // Обрабатываем fade-out
        }
    }
};

export default FadeWrapper;
