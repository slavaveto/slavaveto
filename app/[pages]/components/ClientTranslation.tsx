

"use client";

import { useTranslation } from 'react-i18next';

interface ClientTranslationProps {
    phrase_key: string; // Ключ перевода
    namespace: string; // Пространство имен
}

export default function ClientTranslation({ phrase_key, namespace }: ClientTranslationProps) {
    const { t } = useTranslation(namespace); // Подключаем пространство имен


    return <>{t(phrase_key)}</> // Перевод ключа из указанного namespace
}