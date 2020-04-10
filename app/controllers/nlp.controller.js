const fs = require('fs');
const request = require('request');
const progress = require('request-progress');
const formatters = require("./helpers/formatters");
const chunkTokenizer = require("./helpers/text.tokenizer");
const textProcessor = require("./helpers/text.processor");

// Process and Pipe a new Data file
exports.process = (req, res) => {
    let hrstart = process.hrtime();

    // Validate request
    if (!req.body || !req.body.file) {
        return res.status(400).send({
            message: "File value can not be empty!"
        });
    }

    let fileName = formatters.getFilename(req.body.file);
    let chunks = [];
    let buffer = '';
    // gather some stats info
    let lastState = {};
    let chunksCounter = 0;

    // Get provided text file and pipe it to fs
    progress(request(req.body.file), {})
        .on('progress', (state) => {
            lastState = state;
        })
        .on('error', (err) => {
            return res.status(500).send({message: err});
        })
        .on('data', (chunk) => {
            chunksCounter++;
            // protect cutted end of chunk by checking if the last char is whitespace
            buffer = buffer + chunk.toString();
            let matches = buffer.match(/(\s+$)/g);
            if (matches && matches.length > 0) {
                // perform tokenization process
                chunkTokenizer(buffer).then(
                    result => {
                        chunks.push(result);
                        // clean the buffer
                        buffer = '';
                    }).catch(error => console.error(error));
            }
        })
        .on('end', () => {
            let mergedChunks = [].concat.apply([], chunks);
            textProcessor(mergedChunks, fileName).then(
                res.send({
                    processStatus: 'Done',
                    fileName,
                    chunksProcessed: chunksCounter,
                    state: {
                        totalProcessingTime: `${process.hrtime(hrstart)[0]} sec`,
                        fileSize: `${formatters.humanFileSize(lastState.size.total)}`,
                        downloadSpeed: `${formatters.humanFileSize(lastState.speed)}/sec`
                    }
                })
            ).catch(
                error => {
                    return res.status(500).send({message: error});
                }
            );
        })
        .pipe(fs.createWriteStream(__dirname + '/../../files/' + fileName));

};

// Retrieve all repetitions from json file.
exports.find = (req, res) => {
    let fileName = req.params.filename;
    fs.readFile(__dirname + '/../../files/' + fileName + '.json', (err, data) => {
        if (err) {
            return res.status(500).send({message: err});
        }

        let json = {};
        try {
            json = JSON.parse(data);
        } catch (e) {
            return res.status(500).send({message: e});
        }

        res.json(json);
    });
};
