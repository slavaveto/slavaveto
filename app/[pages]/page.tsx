
import Link from "next/link";
import { supabase } from "@/app/assets/supabaseClient";

import FadeWrapper from "@/app/[pages]/FadeWrapper";
import Footer from "@/app/components/Footer";



import LoremText from "@/app/components/LoremText";
import { IoIosArrowBack } from "react-icons/io";
import React from "react";

export default async function Page({ params }: { params: { pages: string } }) {
    const slug = params.pages;


    // const { data: page, error } = await supabase
    //     .from("_pages")
    //     .select("*")
    //     .eq("slug", slug)
    //     .single();


    return (
        <FadeWrapper>
            <div className="flex flex-col min-h-svh">

                <main
                    className="flex-grow container mx-auto px-3 max-w-custom -xs450:overflow-y-auto -xs450:max-h-[calc(100vh-74px)]">
                    <div className="flex flex-col ">

                        <Link
                            color="foreground"
                            href="/"
                            //onPress={() => router.back()}
                            className="mt-5 mb-4 pr-1 flex flex-row items-center"
                        >
                            <IoIosArrowBack className="-ml-[9px]" size={26}/>
                            <p className=" mb-[1px] -font-semibold">return_to_home</p>

                        </Link>

                        <div className="text-2xl -ml-[1px] mb-4 text-primary -font-semibold">btn_about</div>


                        <LoremText paragraphs={0}/>


                    </div>
                </main>
                <Footer/>

            </div>


        </FadeWrapper>
    );
}


