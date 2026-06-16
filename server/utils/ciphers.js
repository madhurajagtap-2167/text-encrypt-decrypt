// Caesar Cipher Encrypt
export const encryptCaesar = (text, shift) => {
  if (!text) return '';
  // Normalize shift to be within 0-25
  const s = ((parseInt(shift, 10) % 26) + 26) % 26;
  return text
    .split('')
    .map((char) => {
      const code = char.charCodeAt(0);
      // Uppercase letters
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + s) % 26) + 65);
      }
      // Lowercase letters
      if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 + s) % 26) + 97);
      }
      return char;
    })
    .join('');
};

// Caesar Cipher Decrypt
export const decryptCaesar = (text, shift) => {
  if (!text) return '';
  const s = ((parseInt(shift, 10) % 26) + 26) % 26;
  // Decrypt is equivalent to encrypting with a negative shift (which is 26 - s)
  return encryptCaesar(text, 26 - s);
};

// ROT13 Cipher Encrypt/Decrypt (ROT13 is symmetric, encrypt/decrypt are identical)
export const encryptROT13 = (text) => {
  return encryptCaesar(text, 13);
};

export const decryptROT13 = (text) => {
  return encryptCaesar(text, 13);
};

// Reverse Cipher (Reverse is symmetric, encrypt/decrypt are identical)
export const encryptReverse = (text) => {
  if (!text) return '';
  return text.split('').reverse().join('');
};

export const decryptReverse = (text) => {
  if (!text) return '';
  return text.split('').reverse().join('');
};
