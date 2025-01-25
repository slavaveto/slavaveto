import React from "react";
import {useTranslation} from "react-i18next";

interface LocalTextProps {
    text: string; // Ключ перевода
    ns: string; // Пространство имён
    lh?: string; // Высота строки (опционально)
}

const LocalText: React.FC<LocalTextProps> = ({text, ns, lh}) => {
    const {t} = useTranslation();
    let translatedText = t(text, {ns}); // Переводим текст

    const lineHeight = lh || "1.2";

    // Обрабатываем текст для замены
    translatedText = parseImgBlockAndWrap(translatedText);

    translatedText = enhanceExternalLinks(translatedText);

    // // Преобразуем текст с чипами
    // translatedText = parseTextWithChips(translatedText);

    // Проверяем, содержит ли текст HTML
    const isRich = isRichText(translatedText);

    if (isRich) {
        // Если текст содержит HTML
        return (
            <span
                className="some_rich_text"
                style={{lineHeight}}
                dangerouslySetInnerHTML={{__html: translatedText}}
            />
        );
    }

    // Если текст — простой, рендерим как есть
    return <span style={{lineHeight}}>{translatedText}</span>;
};


// Добавление иконки к внешним ссылкам
const enhanceExternalLinks = (text: string): string => {
    const linkPattern = /<a\s+([^>]*href=["'][^"']+["'][^>]*)>(.*?)<\/a>/gi;

    return text.replace(linkPattern, (match, attributes, innerText) => {
        return `
            <a ${attributes} style="display: inline-flex; align-items: center; gap: 3px;">
                ${innerText}
                <span style="margin-top:-1px">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link">
                    <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" x2="21" y1="14" y2="3"></line>
                </svg>
                </span>
            </a>
        `;
    });
};

const parseImgBlockAndWrap = (text: string): string => {
    const imgBlockPattern = /<p>\[img_block\]<\/p>/g;

    return text.replace(imgBlockPattern, () => {
        return `
        <figure>
          <!-- Здесь будет содержимое figure -->
        </figure>
      `;
    })
        // Оборачиваем первый <p> после <figure> в <div>
        .replace(/<figure>(.*?)<\/figure>\s*<p>(.*?)<\/p>/gs, (_, figureContent, firstParagraph) => {
            return `
        <div style="display: flex; margin-bottom: 5px; ">
        
<!--        <div style="float:left;  ">-->
        <figure>${figureContent}</figure>
<!--        </div>-->
        
        <div style="width:75%">
        <p>${firstParagraph}</p>
        </div>
        
        </div>`;
        });
};

// Замена [chip:цвет:текст] на HTML с классами
const parseTextWithChips = (text: string): string => {
    const chipPattern = /\[chip(?::([a-zA-Z]+))?:(.*?)\]/g;

    // Допустимые цвета
    const colorOptions = ["primary", "secondary", "success", "warning", "danger"];

    return text.replace(chipPattern, (_, color, chipText) => {
        // Проверяем, валидный ли цвет, и устанавливаем цвет по умолчанию
        const chipColor = color && colorOptions.includes(color) ? color : "primary";

        return `<span class="chip ${chipColor}">${chipText}</span>`;
    });
};


// Функция для проверки на HTML
const isRichText = (text: string): boolean => {
    const htmlTagPattern = /<\/?[a-z][\s\S]*>/i; // Проверка на наличие HTML-тегов
    return htmlTagPattern.test(text);
};

export default LocalText;

