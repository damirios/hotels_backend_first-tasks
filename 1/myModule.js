module.exports = {
    toLowerButFirstUpper(str) {
        return str[0].toUpperCase() + str.slice(1).toLowerCase();
    },

    correctSpaces(str) {
        return str.replace(/\s+/g, ' ').replace(' ,', ',').replace(',', ', ')
            .replace(' .', '.').replace('.', '. ');
    },

    wordsNumberInString(str) {
        return str.split(' ').length;
    },

    uniqueWords(str) {
        const wordsDict = {};
        const wordsWithPunctuation = str.split(' ');
        for (let word of wordsWithPunctuation) {
            let pureWord = word.replace(',', '').replace('.', '').replace('!', '')
                .replace('?', '').replace(':', '').replace(';', '').toLowerCase();
            if ( Object.keys(wordsDict).includes(pureWord) ) {
                wordsDict[pureWord] += 1;
            } else {
                wordsDict[pureWord] = 1;
            }
        }

        return wordsDict;
    },

}

