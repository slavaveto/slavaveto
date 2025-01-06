"use client";

import React, {useState} from "react";
import Header from "@/app/[pages]/components/Header";
import {useTranslation} from "react-i18next";
import LoremText from "@/app/components/LoremText";

export default function AboutPage({page_namespace}: { page_namespace: string }) {

    const [activeKey, setActiveKey] = useState("description"); // Начальная вкладка

    const {t: about} = useTranslation('about');
    const {t: misc} = useTranslation('misc');
    const HtmlString = ({text}: { text: string }) => (
        <span dangerouslySetInnerHTML={{__html: text}}/>
    );

    return (
        <>
            <Header width="550" page_namespace={page_namespace} activeKey={activeKey} setActiveKey={setActiveKey}
                    disableAllTabs={true} // Отключаем все вкладки
            />


            <main className="flex-grow container mx-auto px-3"
                  style={{maxWidth: '550px'}}>

                <HtmlString text={about('text')}/>
                {/*<LoremText paragraphs={5}/>*/}


            </main>
        </>
    )

}