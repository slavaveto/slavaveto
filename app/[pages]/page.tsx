import React from "react";
import { supabase } from "@/app/assets/supabaseClient";
import { redirect } from "next/navigation";

interface PageProps {
    params: {
        pages: string;
    };
}

export default async function Page({ params }: Awaited<PageProps>) {
    const slug = params.pages;

    const startTime = Date.now();

    // Получаем данные из базы данных
    const { data, error } = await supabase
        .from("_pages")
        .select("page_key")
        .eq("slug", slug)
        .single();

    if (error || !data?.page_key) {
        console.error("Ошибка загрузки page_key:", error);
        redirect("/error_page");
    }

    const pageNamespace = data.page_key;

    const elapsedTime = Date.now() - startTime;
    const delay = Math.max(500 - elapsedTime, 0); // Минимальная задержка в 500 мс
    if (delay > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay));
    }

    // Динамически загружаем компонент на основе pageNamespace
    let DynamicComponent: React.FC<{ namespace: string }> | null = null;

    try {
        const componentModule = await import(`@/app/[pages]/pages/${pageNamespace}`);
        DynamicComponent = componentModule.default;
    } catch (err) {
        console.error(`Ошибка загрузки компонента для ${pageNamespace}:`, err);
        redirect("/error_page");
    }

    if (!DynamicComponent) {
        redirect("/error_page");
    }

    return (
        <>
            <DynamicComponent namespace={pageNamespace} />
        </>
    );
}