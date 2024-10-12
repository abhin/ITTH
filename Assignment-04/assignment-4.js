// Answer 1 Palindrome Check for Strings - Own Logic
const Answer1 = (word = "") => {
  const wordArray = word.toString().trim().split("");

  let isPalidromWord = false;

  if (wordArray.length > 1) {
    isPalidromWord = true;
    const endIndex = parseInt(wordArray.length / 2);
    for (i = 1; i <= endIndex; i++) {
      if (
        wordArray[i - 1].toLowerCase() !== wordArray.splice(-1)[0].toLowerCase()
      ) {
        isPalidromWord = false;
        break;
      }
    }
  }

  return isPalidromWord;
};

// Answer 1 Palindrome Check for Strings - Web reference

const Answer01 = (word = "") => {
  const reverseWord = word.toString().trim().split("").reverse();
  return word.toString() === reverseWord.join("");
};
console.log(Answer1(112111));
// console.log(Answer1(12));

/* -------------------------------------------------- Answer 1 Ends -------------------------------------------------- */

// Answer 1 Second largest element in the array - Partial web reference

const Answer2 = (numArray = []) => {
  let firstLargest = -Infinity;
  let secondLargest = -Infinity;

  if (numArray.length == 1) {
    return num[0];
  }

  for (let num of numArray) {
    if (num > firstLargest) {
      secondLargest = firstLargest;
      firstLargest = num;
    } else if (num > secondLargest && num !== firstLargest) {
      secondLargest = num;
    }
  }

  return secondLargest;
};

console.log(Answer2([1, 20, 3000, 400]));

/* -------------------------------------------------- Answer 2 Ends -------------------------------------------------- */

// Answer 3 Sum of digits of a given number - Own logic

// const Answer3 = (number = 0) => {
//   const sum = number
//     .toString()
//     .split("")
//     .reduce((accu, curr) => {
//       return parseInt(accu) + parseInt(curr);
//     });

//   return sum;
// };

// Answer 3 Sum of digits of a given number - Web Reference 
var Answer3 = (num = 0) => {
	let sum = 0;
    while (num) {
        digit = num % 10;
        sum += digit;
        num = (num - digit) / 10;
    }
    return sum;
};

console.log(Answer3(2124561));

/* -------------------------------------------------- Answer 3 Ends -------------------------------------------------- */

// Answer 4 Write a function that counts the number of vowels in a given string. - Own Logic

const Answer4 = (text = "") => {
  const vowels = ["a", "e", "i", "o", "u"];
  let vowelCount = 0;
  var letterArray = text
    .toString()
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase()
    .split("");

  for (letter of letterArray) {
    if (vowels.includes(letter)) {
      vowelCount++;
    }
  }

  return vowelCount;
};

// program to count the number of vowels in a string - Web reference

function Answer04(str) {
  // find the count of vowels
  const count = str.match(/[aeiou]/gi).length;

  // return number of vowels
  return count;
}

console.log(
  "Answer4 :: ",
  Answer4("dhSHDJ djsdsadfoqadps ekdm fiao jdJHAJDSD.payByCasoh(#)")
);
// console.log("Answer04 :: ", Answer04("dhSHDJ djsdsadfoqadps ekdm fiao jdJHAJDSD.payByCasoh(#)"));

/* -------------------------------------------------- Answer 4 Ends -------------------------------------------------- */
