"use client";

import { Tabs, Tab } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function LangToggle() {
    const { i18n } = useTranslation(); // Получаем экземпляр i18next

    // Функция для смены языка
    const handleLanguageChange = (key: string) => {
        i18n.changeLanguage(key); // Меняем язык
        localStorage.setItem("language", key); // Сохраняем выбор пользователя
    };

    // Проверяем сохранённый язык при загрузке компонента
    useEffect(() => {
        const savedLanguage = localStorage.getItem("language");
        console.log("сохраненный язык", savedLanguage);
        if (savedLanguage && savedLanguage !== i18n.language) {
            i18n.changeLanguage(savedLanguage); // Устанавливаем сохранённый язык
        }
    }, [i18n]);

    return (
        <Tabs
            aria-label="Options"
            color="default"
            size="sm"
            selectedKey={i18n.language} // Устанавливаем текущий язык
            onSelectionChange={(key) => handleLanguageChange(key as string)} // Обработчик смены языка
            classNames={{
                tabContent: "group-data-[selected=true]:text-primary-400 w-[20px]",
            }}


        >
            <Tab key="ru" title="RU" className="font-semibold text-[13px]" ></Tab>
            <Tab key="uk" title="UA" className="font-semibold text-[13px]"></Tab>
        </Tabs>
    );
}
