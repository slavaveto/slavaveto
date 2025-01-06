"use client";

import React, {useState} from "react";
import Header from "@/app/[pages]/components/Header";
import {useTranslation} from "react-i18next";
import LoremText from "@/app/components/LoremText";
import ContactForm from "@/app/components/ContactForm";
import CustomAlert from "@/app/components/CustomAlert";
import Link from "next/link";
import {TbArrowBackUp} from "react-icons/tb";


export default function Messsage ({page_namespace}: { page_namespace: string }) {

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

                <CustomAlert
                    color="warning"
                    showIcon={false}
                    title=""
                    description="">

                    <div className="pl-0 flex w-full -justify-center  -pt-[30px] ">


                        <Link className="flex flex-row text-primary-500 hover:text-primary-400 transition items-center"
                              href="/"

                        > <TbArrowBackUp size={24} className=""/> <span
                            className="pl-4 text-[14px]">{misc('return_home')}</span> </Link>


                    </div>

                </CustomAlert>



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