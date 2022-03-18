const { fork } = require('child_process');
const path = require('path');

const randomsNumber = (req, res) => {
    const cantidad  = req.query.cant || 100000000
    const processFork = fork(path.resolve(__dirname, './processFork.js'));

    processFork.send(cantidad);
    processFork.on('message', (data) => {

        res.status(200).json(data);
    })
}

module.exports = randomsNumber;