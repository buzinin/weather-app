import Vue from 'vue'
import VueI18n, { LocaleMessages } from 'vue-i18n'
Vue.use(VueI18n);

function loadLocaleMessages (): LocaleMessages {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages: LocaleMessages = {};
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key)
    }
  });
  return messages
}

function getBrowserLang() {
  let lang;
  try {
    lang = navigator.language;
  }catch (e) {
    lang = 'ru';
  }
  const currentLang = lang === 'ru' || lang === 'ru-RU' ? 'ru' : 'en';
  localStorage.setItem('app_lang', currentLang);
  return currentLang;
}

export default new VueI18n({
  locale: localStorage.getItem('app_lang') || getBrowserLang() || 'ru',
  fallbackLocale: 'en',
  messages: loadLocaleMessages(),
  silentTranslationWarn: true,
  missing: function missingLang(lang, keypath) {
    console.warn(lang, keypath)
  },
})
