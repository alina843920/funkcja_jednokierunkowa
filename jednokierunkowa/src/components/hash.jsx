import { SHA256 } from "crypto-js";

const generateHash = (input) => {
  return SHA256(input).toString();
};

const bruteForceAttack = (targetHash, maxLength) => {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  for (let length = 1; length <= maxLength; length++) {
    const combinations = getCombinations(characters, length);
    for (const combination of combinations) {
      const hash = generateHash(combination);
      if (hash === targetHash) {
        return combination;
      }
    }
  }
  return null;
};
const dictionaryAttack = async (targetHash) => {
  try {
    const response = await fetch("/words.txt");
    const wordsText = await response.text();
    const words = wordsText.split("\n").map((word) => word.trim());

    for (const word of words) {
      const hash = generateHash(word);
      if (hash === targetHash) {
        return word;
      }
    }
    return null;
  } catch (error) {
    console.error("Error", error);
    return null;
  }
};
const getCombinations = (characters, length) => {
  const combinations = [];
  if (length === 1) {
    for (const char of characters) {
      combinations.push(char);
    }
  } else {
    for (const char of characters) {
      const remainingCombinations = getCombinations(characters, length - 1);
      for (const combination of remainingCombinations) {
        combinations.push(char + combination);
      }
    }
  }
  return combinations;
};

export { generateHash, bruteForceAttack, dictionaryAttack };
