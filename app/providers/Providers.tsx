'use client';

import {NextUIProvider} from '@nextui-org/react'
import i18n from "@/app/providers/I18nextProvider";
import {I18nextProvider} from 'react-i18next';
import {ThemeProvider} from '@/app/providers/ThemeProvider';
import {useEffect} from 'react';

export function Providers({children}: { children: React.ReactNode }) {
    //const pathname = usePathname();

    useEffect(() => {
        const updateLangAttribute = () => {
            const currentLanguage = i18n.language || 'ru-RU'; // Текущий язык (по умолчанию русский)

// Преобразуем язык в формат с регионом
            const languageWithRegion = currentLanguage === 'ru'
                ? 'ru-RU'
                : currentLanguage === 'uk'
                    ? 'uk-UA'
                    : currentLanguage; // Если язык не соответствует известным, оставляем как есть

            document.documentElement.lang = languageWithRegion; // Устанавливаем атрибут lang
        };

        updateLangAttribute(); // Устанавливаем начальное значение

        // Подписываемся на изменение языка
        i18n.on('languageChanged', updateLangAttribute);

        return () => {
            i18n.off('languageChanged', updateLangAttribute); // Отписываемся при размонтировании
        };
    }, []);

    return (
        <I18nextProvider i18n={i18n}>
            <NextUIProvider>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </NextUIProvider>
        </I18nextProvider>
    )
}