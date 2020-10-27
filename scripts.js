/**
 * Verkefni 7 – Caesar dulmál
 */

const LETTERS = `AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ`;

/**
 * Byrja forrit.
 */
function start() {
  const code = prompt(`Hvort viltu kóða eða afkóða streng? Skrifaðu „kóða“ eða „afkóða“`)
  if (code.toLocaleUpperCase() == `KÓÐA` || code.toLocaleUpperCase() == `AFKÓÐA`) {
    ask(code);
  } else {
    alert(`Veit ekki hvaða aðgerð „${code}“ er. Reyndu aftur.`);
  }
}

// Hér er gott að commenta út til að vinna í encode/decode föllum fyrst og síðan „viðmóti“ forrits
start();

function ask(action) {
  const numcode = prompt(`Hversu mikið á að hliðra streng? Gefðu upp heiltölu á bilinu [1, 31]`);
  if (Number.parseInt(numcode) < 1 || Number.parseInt(numcode) > 31) {
    alert(`${numcode} er ekki heiltala á bilinu [1, 31]. Reyndu aftur.`);
    ask();
  } else {
    const incode = prompt(`Gefðu upp strenginn sem á að ${action.toLocaleUpperCase()} með hliðrun ${numcode}:`);
    if (/\s/.test(incode)) {
      alert(`enginn spaces takk fyrir.`);
      ask();
    } else {
      if (action = `KÓÐA`) {
        encode(incode, numcode);
      }
      else {
        decode(incode, numcode);
      }
    }
  }
}

/**
 * Kóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal kóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til hægri
 */
function encode(str, n) {
  for (let i = 0; i < str.length; i++) {
    for (let j = 0; j < LETTERS.length; j++) {
      if (str.charAt(i).toLocaleUpperCase() == LETTERS.charAt(j)) {
        if (j + n >= LETTERS.length) {
          let tem = j - LETTERS.length + n;
          str = str.replace(str.charAt(i), LETTERS.charAt(tem));
          console.log(str);
        } else {
          str = str.replace(str.charAt(i), LETTERS.charAt(j+n));
          //console.log(str);
        }
        break;
      }
    }
  }
  
  return answer(str);
}


/**
 * Afkóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal afkóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til vinstri
 */
function decode(str, n) {
  for (let i = 0; i < str.length; i++) {
    for (let j = 0; j < LETTERS.length; j++) {
      if (str.charAt(i).toLocaleUpperCase() == LETTERS.charAt(j)) {
        if (i - n <= LETTERS.length) {
          let tem = LETTERS.length - (32 - j) - n;
          str = str.replace(str.charAt(i), LETTERS.charAt(tem));
          console.log(str);
        } else {
          str = str.replace(str.charAt(i), LETTERS.charAt(i-n));
          //console.log(str);
        }
        break;
      }
    }
  }
  
  return answer(str);
}

function answer(str) {
  if (confirm(`kóðinn þinn er ${str} viltu keyra aftur?`)) {
    // Já
    start();
  } else {
    // Nei
    return str;
  }
}

console.assert(encode('A', 3) === 'D', 'kóðun á A með n=3 er D');
console.assert(decode('D', 3) === 'A', 'afkóðun á D með n=3 er A');
console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 32) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'kóðun með n=32 er byrjunarstrengur');
console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 3) === 'DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 'kóðun á stafrófi með n=3');
console.assert(decode('DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 3) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'afkóðun á stafrófi með n=3');
console.assert(decode(encode('HALLÓHEIMUR', 13), 13) === 'HALLÓHEIMUR', 'kóðun og afkóðun eru andhverf');
