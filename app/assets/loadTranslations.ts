
import React, {useEffect} from 'react';
import { useTranslation } from 'react-i18next';

export const useLoadTranslations = (namespace: string) => {
    const { t, i18n } = useTranslation(namespace); // Автоматически подключаем namespace

    useEffect(() => {
        const loadTranslations = async () => {
            try {
                const language = i18n.language as 'ru' | 'uk'; // Текущий язык
                const translationsModule = await import(`@/app/assets/locales/${namespace}`);
                const translations = translationsModule.default;

                const translationBundle = translations[language] || translations['ru']; // Fallback на русский

                // Добавляем переводы в i18n
                i18n.addResourceBundle(language, namespace, translationBundle, true, true);
            } catch (error) {
                console.error(`Ошибка загрузки переводов для namespace "${namespace}":`, error);
            }
        };

        loadTranslations();
    }, [i18n.language]);

    return { t, i18n }; // Возвращаем `t` и `i18n` для использования в компоненте
};
