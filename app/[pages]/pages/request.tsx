"use client";

import React, {useState} from "react";
import Header from "@/app/[pages]/components/Header";
import {useTranslation} from "react-i18next";
import LoremText from "@/app/components/LoremText";
import ContactForm from "@/app/components/ContactForm";
import Footer from "@/app/components/Footer";


export default function Request ({page_namespace}: { page_namespace: string }) {

    const [activeKey, setActiveKey] = useState("description"); // Начальная вкладка

    const {t: misc} = useTranslation('misc');
    const HtmlString = ({text}: { text: string }) => (
        <span dangerouslySetInnerHTML={{__html: text}}/>
    );

    const isMessageRequired = false;

    return (
        <>
            <Header width="450" page_namespace={page_namespace} activeKey={activeKey} setActiveKey={setActiveKey}
                    disableAllTabs={true} // Отключаем все вкладки
            />


            <main className="flex-grow container mx-auto px-3"
                  style={{maxWidth: '450px'}}>


                <div>
                    <ContactForm
                        isMessageRequired={isMessageRequired}
                        page={page_namespace}
                        formMessageBefore={misc('request_page_text_before')}
                        formMessageAfter={misc('request_page_text_after')}
                        onSubmitSuccess={() => {
                        }}/>

                </div>

                {/*<HtmlString text={about('text')}/>*/}
                {/*<LoremText paragraphs={5}/>*/}


            </main>
            <Footer width="450" />
        </>
    )

}