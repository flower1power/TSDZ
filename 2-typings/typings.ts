// @ts-ignore
import makeOrdinal = require('./makeOrdinal');
// @ts-ignore
import isFinite = require('./isFinite');
// @ts-ignore
import isSafeNumber = require('./isSafeNumber');
import {LastWord, LESS_THAN_TWENTY, NumberConstants, TENTHS_LESS_THAN_HUNDRED} from "./constats";

export default function toWords(number: number | string, asOrdinal?: boolean): string {
    const num: number = parseInt(number as string, 10);

    if (!isFinite(num)) {
        throw new TypeError(
            'Not a finite number: ' + number + ' (' + typeof number + ')'
        );
    }
    if (!isSafeNumber(num)) {
        throw new RangeError(
            'Input is not a safe number, it’s either too large or too small.'
        );
    }
    const words: string = generateWords(num);
    return asOrdinal ? makeOrdinal(words) : words;
}

function generateWords(number: number, words: string[] = []): string {
    let remainder: number;
    let word: string = '';

    if (number === 0) {
        return words.length === 0 ? 'zero' : words.join(' ').replace(/,$/, '');
    }

    if (number < 0) {
        words.push('minus');
        number = Math.abs(number);
    }

    if (number < 20) {
        remainder = 0;
        word = LESS_THAN_TWENTY[number];
    } else if (number < NumberConstants.ONE_HUNDRED) {
        remainder = number % NumberConstants.TEN;
        word = TENTHS_LESS_THAN_HUNDRED[Math.floor(number / NumberConstants.TEN)];

        if (remainder) {
            word += '-' + LESS_THAN_TWENTY[remainder];
        }

    } else if (number < NumberConstants.ONE_THOUSAND) {
        remainder = number % NumberConstants.ONE_HUNDRED;
        word = generateWords(Math.floor(number / NumberConstants.ONE_HUNDRED)) + LastWord.HUNDRED;
    } else if (number < NumberConstants.ONE_MILLION) {
        remainder = number % NumberConstants.ONE_THOUSAND;
        word = generateWords(Math.floor(number / NumberConstants.ONE_THOUSAND)) + LastWord.THOUSAND;
    } else if (number < NumberConstants.ONE_BILLION) {
        remainder = number % NumberConstants.ONE_MILLION;
        word = generateWords(Math.floor(number / NumberConstants.ONE_MILLION)) + LastWord.MILLION;
    } else if (number < NumberConstants.ONE_TRILLION) {
        remainder = number % NumberConstants.ONE_BILLION;
        word = generateWords(Math.floor(number / NumberConstants.ONE_BILLION)) + LastWord.BILLION;
    } else if (number < NumberConstants.ONE_QUADRILLION) {
        remainder = number % NumberConstants.ONE_TRILLION;
        word = generateWords(Math.floor(number / NumberConstants.ONE_TRILLION)) + LastWord.TRILLION;
    } else if (number <= NumberConstants.MAX) {
        remainder = number % NumberConstants.ONE_QUADRILLION;
        word = generateWords(Math.floor(number / NumberConstants.ONE_QUADRILLION)) + LastWord.QUADRILLION;
    } else {
        throw new RangeError('Число больше MAX');
    }

    words.push(word);

    return generateWords(remainder, words);
}

