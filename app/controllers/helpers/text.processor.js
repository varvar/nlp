const fs = require('fs');
const {promisify} = require('util');
const writeFileAsync = promisify(fs.writeFile)
const R = require('ramda');

const processWordsArray = async (array) => {

    let counts = {};
    array.forEach(function (x) {
        counts[x] = (counts[x] || 0) + 1;
    });

    let wordsAr = [];

    const beautifyOutput = (value, key) => {
        wordsAr[wordsAr.length] = {
            "word": key,
            "repetitions": value
        };
    };
    R.forEachObjIndexed(beautifyOutput, counts);

    return wordsAr;
};

const generateDataFile = async (array, fileName) => {
    let json = JSON.stringify(array);
    await writeFileAsync(__dirname + '/../../../files/' + fileName + '.json', json);
    return true;
};

module.exports = async function (mergedChunks, fileName) {

    try {
        let wordsProcessed = await processWordsArray(mergedChunks);
        await generateDataFile(wordsProcessed, fileName);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
};
