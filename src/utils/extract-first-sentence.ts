import { htmlToText } from 'html-to-text'
export const extractFirstSentence = (htmlContent: string): string => {
  const textContent = htmlToText(htmlContent, {
    wordwrap: false,
  })
  const firstSentence = textContent.split('. ')[0] + '.'
  return firstSentence
}
