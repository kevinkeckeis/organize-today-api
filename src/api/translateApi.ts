// https://www.deepl.com/docs-api
import axios from 'axios';

type Language = 'DE' | 'EN' | 'IT' | 'PT';

type Translation = {
  text: string;
  translation: string;
  detected_source_language: Language;
  target_lang: Language;
};

type TranslationFunc = (
  text: string,
  languague: Language
) => Promise<Translation>;

const getTranslation: TranslationFunc = async (text, language) => {
  const params = new URLSearchParams();
  params.append('auth_key', process.env['DeeplAuthKey'] || '');
  params.append('text', text);
  params.append('target_lang', language);
  let translation: Translation = {
    detected_source_language: 'EN',
    target_lang: language,
    text: '',
    translation: '',
  };

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
  return translation;
};

type TranslationsFunc = (
  text: string,
  language: Language[]
) => Promise<Translation[]>;

const getTranslations: TranslationsFunc = async (text, languages) => {
  const translations: Translation[] = [];
  const languagePromise = languages.map((language) =>
    getTranslation(text, language)
  );
  await Promise.all(languagePromise)
    .then((values) => {
      values.forEach((res) => translations.push(res));
    })
    .catch((error) => {
      console.log(error);
    });

  return translations;
};

export { getTranslations, getTranslation, Translation, Language };
