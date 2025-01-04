type LanguageKeys = 'ru' | 'uk';

const homeTranslations = {
    ru: {
        title: "Вячеслав Вето",
        subtitle: "психолог, психотерапевт",
        greeting: "Здравствуйте,\nменя зовут Вячеслав Вето и я рад вас приветствовать на своем сайте!",
        btn_about: "Обо мне",
        title_image: "me.jpg",
        title_image_dark: "me_dark.jpg",
    },
    uk: {
        title: "В'ячеслав Вето",
        subtitle: "психолог, психотерапевт",
        greeting: "Вітаю,\nмене звати В’ячеслав Вета, і я радий вітати вас на своєму сайті!",
        btn_about: "Про мене",
    },
} as const;

type HomeTranslations = typeof homeTranslations;

export default homeTranslations;
