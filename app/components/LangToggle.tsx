"use client";

import {Tabs, Tab} from "@nextui-org/react";
import {useTranslation} from "react-i18next";
import React, {useEffect} from "react";
import {DarkThemeIcon} from "@/app/assets/svgIcons";

export default function LangToggle() {
    const {i18n} = useTranslation(); // Получаем экземпляр i18next

    // Функция для смены языка
    const handleLanguageChange = (key: string) => {
        i18n.changeLanguage(key); // Меняем язык
        localStorage.setItem("language", key); // Сохраняем выбор пользователя
    };

    // Проверяем сохранённый язык при загрузке компонента
    useEffect(() => {
        const savedLanguage = localStorage.getItem("language");
        //console.log("Cохраненный язык", savedLanguage);
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
                tabList: "gap-[4px] sm:gap-[0px] p-[0px] ",
                tab: "h-[34px] md:h-[30px] px-[10px] md:px-[8px]",
                tabContent: " group-data-[selected=true]:text-primary-400",
            }}

        >
            <Tab key="ru" className="font-semibold text-[13px]"
                 title={
                     <div className="flex items-center mt-[2px]">
                         RU
                     </div>
                 }
            />
            <Tab key="uk"  className="font-semibold text-[13px]"
                 title={
                     <div className="flex items-center mt-[2px]">
                         UA
                     </div>
                 }
            />
        </Tabs>
    );
}

