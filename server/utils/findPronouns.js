export default function findPronouns(text) {
  return sortWords(pronounParser(text));
}

// this function will return an array of pronouns from a string of text
const pronounParser = str => {
  let arr = str.split(' ').filter(word => word); // convert string to array of words; only include words (no empty strings)
  arr = arr.filter((word, i, a) => {
    let prevWord = a[i - 1];
    return word
      && i !== 0 // exclude the first word (will always be capitalized)
      && /^[a-zA-Z]/.test(arr[i]) // exclude anything that does not start with a letter
      && !word.includes('—') // excludes any two words that have been joined by an em-dash
      && !word.includes('-') // excludes and two words that have been joined by a hyphen
      && prevWord[prevWord.length - 1] !== '.' // excludes first word of a sentence
      && prevWord[prevWord.length - 1] !== '!' // excludes first word of a sentence
      && prevWord[prevWord.length - 1] !== '?' // excludes first word of a sentence
      && prevWord[prevWord.length - 2] !== '.' // excludes first word of a sentence if previous sentence ended in close quote
  })
  .map(word => word.replace(/'s/g, '')) // remove 's from end of words
  .map(word =>  word.replace(/\W+/g, "")); // remove any non letter characters (i.e. extraneous quotes)
  // remove any date words
  arr = arr.filter(word => {
    const dateWords = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri',  'Sat', 'Sun'];
    return !dateWords.includes(word);
  })
  let pronounObj = {};
  let i = 0;
  while (i < arr.length) {
    if (/^[A-Z]/.test(arr[i])) { // check if word is capitalized
      let newWord;
      if (/^[A-Z]/.test(arr[i + 1])) { // if next word is capitalized too, combine them
        newWord = `${arr[i]} ${arr[i + 1]}`;
        i++;
      } else {
        newWord = `${arr[i]}`; // else only add the word itself
      }
      pronounObj[newWord] ? pronounObj[newWord]++ : pronounObj[newWord] = 1; // count the number of occurences
    }
    i++;
  }
  return pronounObj;
}

// convert obj of words to array by rate of occurrence
const sortWords = objOfWords => {
  const hash = {};
  let arrayOfOccurrences = [];
  let arrayOfWords = [];
  for (const word in objOfWords) {
    if (hash[objOfWords[word]]) {
      hash[objOfWords[word]].push({
        title: word,
        description: null,
        image: null,
        link: null
      });
    } else {
      hash[objOfWords[word]] = [{
        title: word,
        description: null,
        image: null,
        link: null
      }];
    }
  }
  for (const num in hash) {
    arrayOfOccurrences.push(+num);
  }
  arrayOfOccurrences = arrayOfOccurrences.sort((a, b) => b - a);
  arrayOfOccurrences.forEach(key => {
    arrayOfWords = arrayOfWords.concat(hash[key]);
  })
  return arrayOfWords;
}


