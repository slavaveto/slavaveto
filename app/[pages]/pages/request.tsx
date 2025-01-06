"use client";

import React, {useState} from "react";
import Header from "@/app/[pages]/components/Header";
import {useTranslation} from "react-i18next";
import LoremText from "@/app/components/LoremText";
import ContactForm from "@/app/components/ContactForm";


export default function Request ({page_namespace}: { page_namespace: string }) {

    const [activeKey, setActiveKey] = useState("description"); // Начальная вкладка

    const {t: misc} = useTranslation('misc');
    const HtmlString = ({text}: { text: string }) => (
        <span dangerouslySetInnerHTML={{__html: text}}/>
    );

    const isEmailSendingEnabled = true;
    //const isEmailSendingEnabled = false;
    const isMessageRequired = false;

    return (
        <>
            <Header width="550" page_namespace={page_namespace} activeKey={activeKey} setActiveKey={setActiveKey}
                    disableAllTabs={true} // Отключаем все вкладки
            />


            <main className="flex-grow container mx-auto px-3"
                  style={{maxWidth: '550px'}}>


                <div>
                    <ContactForm
                        isEmailSendingEnabled={isEmailSendingEnabled}
                        isMessageRequired={isMessageRequired}
                        page={page_namespace}
                        onSubmitSuccess={() => {
                        }}/>

                </div>

                {/*<HtmlString text={about('text')}/>*/}
                {/*<LoremText paragraphs={5}/>*/}


            </main>
        </>
    )

}