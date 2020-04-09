const processText = async (str) => {
    const patternNewLine = /\n/g,
        patternNewRow = /\r/g,
        patternSpecChars = /[[\].,\/#!@$%\^&\*;:{}=_`\"~()?]/g,
        patternNumbers = /[0-9]/g;


    // replace new lines with spaces, replace special chars with nothing,
    // and split the string into an array of words
    return str.toLowerCase().replace(patternNewLine, ' ').replace(patternNewRow, ' ').replace('-', ' ').replace(patternNumbers, '').replace(patternSpecChars, '').split(' ');
};


module.exports = async function (processData) {

    try {
        let tokenizedData = await processText(processData);
        return tokenizedData.filter(Boolean);
    } catch (e) {
        console.log(e);
        return false;
    }
};
