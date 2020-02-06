// eslint-disable-next-line camelcase,@typescript-eslint/camelcase
import iso639 from 'iso-639-1'

function mapLanguage(language: any) {
  return {
    ...language,
    nativeName: language.nativeName.substring(
      0,
      language.nativeName.indexOf(',') || language.nativeName.length - 1,
    ),
  }
}

export const codes = iso639.getAllCodes().map(mapLanguage)
