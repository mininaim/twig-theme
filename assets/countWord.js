function countWords(text) {
  if (typeof text !== 'string' || text.length === 0) {
    return 0;
  }

  let count = 0;

  let insideWord = false;

  for (let i = 0; i < text.length; i++) {
    if (/[\w'\u0600-\u06FF]/.test(text[i])) {
      insideWord = true;
    } else if (insideWord) {
      count++;
      insideWord = false;
    }
  }

  if (insideWord) {
    count++;
  }

  return count;
}

async function countWordsInText(text) {
  try {
    const htmlElement = document.querySelector('html');
    const lang = htmlElement.getAttribute('lang');

    const words = text.split(/\s/g);
    const wordCount = words.length;
    if (lang === 'ar') {
      return `${wordCount} كلمة`;
    } else {
      return `${wordCount} words`;
    }
  } catch (error) {
    console.error(error);
  }
}
