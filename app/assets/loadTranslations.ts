import fs from 'fs';
import path from 'path';

const translationsDir = path.join(process.cwd(), 'app/assets/locales');

const loadTranslations = async () => {
    const translations: Record<string, any> = {};

    const files = fs.readdirSync(translationsDir);

    for (const file of files) {
        if (file.endsWith('.ts')) {
            const moduleName = file.replace('.ts', '');
            const module = await import(`@/app/assets/locales/${moduleName}`);
            translations[moduleName] = module.default;
        }
    }

    return translations;
};

export default loadTranslations;