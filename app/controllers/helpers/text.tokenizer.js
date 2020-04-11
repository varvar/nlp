const processText = async (str) => {
    const patternNewLine = /\n/g,
        patternNewRow = /\r/g,
        patternSpecChars = /[[\].,\/#!@$%\^&\*;:{}=_`\"~()?]/g,
        patternNumbers = /[0-9]/g;

    return str.toLowerCase().replace(patternNewLine, ' ').replace(patternNewRow, ' ').replace('-', ' ').replace(patternNumbers, '').replace(patternSpecChars, '').split(' ');
};


module.exports = async (processData) => {

    try {
        let tokenizedData = await processText(processData);
        return tokenizedData.filter(Boolean);
    } catch (e) {
        throw Error(e);
    }
};
