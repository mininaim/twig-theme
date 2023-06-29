async function estimateReadingTime(text) {
  const htmlElement = document.querySelector('html');
  const lang = htmlElement.getAttribute('lang');

  if (
    text.endsWith('.jpg') ||
    text.endsWith('.png') ||
    text.endsWith('.gif') ||
    text.endsWith('.bmp') ||
    text.endsWith('.tiff')
  ) {
    return lang === 'en' ? 'The text represents an image file' : 'النص يمثل ملف صورة';
  }

  const wordCount = text.split(/\s/g).length;
  const readingTime = Math.ceil(wordCount / 200);
  return lang === 'en'
    ? `Estimated reading time: ${readingTime} minutes`
    : `الوقت المقدر للقراءة: ${readingTime} دقائق`;
}
