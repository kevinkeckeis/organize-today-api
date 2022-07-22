// https://www.deepl.com/docs-api
import axios from 'axios';

type Language = 'DE' | 'EN' | 'IT' | 'PT';

type Translation = {
  text: string;
  translation: string;
  detected_source_language: Language;
  target_lang: Language;
};

const getTranslation = async (text: string, language: Language) => {
  const params = new URLSearchParams();
  params.append('auth_key', '201e5e2a-d4ba-f435-d70d-22804f8c484a:fx');
  params.append('text', text);
  params.append('target_lang', language);
  let translation: Translation | null;

  try {
    const baseUrl = 'https://api-free.deepl.com/v2/translate?';
    const url = baseUrl + params.toString();
    const { data } = await axios.post(url, {
      headers: {
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
      },
    });
    const translationData = data.translations[0];
    translation = {
      text,
      translation: translationData.text,
      detected_source_language: translationData.detected_source_language,
      target_lang: language,
    };

    return translation;
  } catch (error) {
    console.log(error);
  }
};

const getTranslations = async (text: string, languages: Language[]) => {
  const translations: Translation[] = [];
  const languagePromise = languages.map(
    async (language) => await getTranslation(text, language)
  );
  await Promise.all(languagePromise).then((values) => {
    values.forEach((val) => val && translations.push());
  });
  console.log(translations);
  return translations;
};

export { getTranslations, getTranslation, Translation, Language };
