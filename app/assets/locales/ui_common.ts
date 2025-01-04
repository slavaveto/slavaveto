type LanguageKeys = 'ru' | 'uk';

const uiTranslations = {
    ru: {
        return_to_home: "вернуться назад",

    },
    uk: {
        return_to_home: "повернутися назад",

    },
} as const;

type uiTranslations = typeof uiTranslations;

export default uiTranslations;
