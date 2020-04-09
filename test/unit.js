const expect = require('chai').expect;
const R = require('ramda');
const fs = require('fs');
const chunkTokenizer = require("../app/controllers/helpers/text.tokenizer");
const textProcessor = require("../app/controllers/helpers/text.processor");

describe('Unit tests', () => {

    let tokenizedArray;

    it('should tokenize entire string', (done) => {
        let string = `Project Gutenberg-tm depends upon and cannot survive without wide
      spread public support and donations to carry out its mission of
      increasing the number of public domain and licensed works that can be
      freely distributed in machine readable form accessible by the widest
      array of equipment including outdated equipment.  Many small donations
      ($1 to $5,000) are particularly important to maintaining tax exempt
      status with the IRS !@#$`;

        chunkTokenizer(string).then(
            result => {
                expect(result).to.be.a('Array').with.lengthOf.above(1);
                expect(R.includes('5,000', result)).to.be.false;
                expect(R.includes('$5,000', result)).to.be.false;
                expect(R.includes('!@#$', result)).to.be.false;
                expect(R.includes('tm', result)).to.be.true;
                tokenizedArray = result;
                done();
            }).catch(error => console.error(error));

    });

    it('should generate data file with words count', (done) => {

        textProcessor(tokenizedArray, 'testTextProcessor.txt').then(
            setTimeout(() => {
                fs.readFile(__dirname + '/../files/testTextProcessor.txt.json', (err, data) => {
                    if (err) {
                        return done(err);
                    }

                    let json = JSON.parse(data);
                    expect(json).to.be.a('Array').with.lengthOf.above(1);
                    done();
                })
            }, 3000)
        ).catch(error => console.error(error));

    }).timeout(5000);

});