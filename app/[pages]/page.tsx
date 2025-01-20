import React from "react";
import { supabase } from "@/app/assets/supabaseClient";
import { redirect } from "next/navigation";

interface PageProps {
    params: {
        pages: string;
    };
}

export default async function Page({ params }: PageProps) {
    const slug = params.pages;

    const startTime = Date.now();

    // Получаем данные из базы данных
    const { data, error } = await supabase
        .from("_pages") // Имя вашей таблицы
        .select("page_key") // Указываем столбец, который нам нужен
        .eq("slug", slug) // Фильтруем по slug
        .single(); // Ожидаем одну запись

    if (error || !data) {
        console.error("Ошибка загрузки page_key:", error);
        redirect("/error_page"); // Перенаправляем на страницу ошибки
    }

    const pageKey = data.page_key;
    const pageNamespace = pageKey; // Здесь вы можете использовать логику извлечения пространства имен, если нужно

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
        redirect("/error_page"); // Перенаправляем на страницу ошибки
    }

    if (!DynamicComponent) {
        redirect("/error_page"); // Если компонент не загрузился, перенаправляем
    }

    return (
        <>
            <DynamicComponent namespace={pageNamespace} />
        </>
    );
}