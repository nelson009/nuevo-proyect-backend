const calculoRandom = (cant) => {
    let randoms = {};
    for (let i = 0; i < cant; i++) {
        let randomsNumber = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
        if (randoms[randomsNumber]) {
            randoms[randomsNumber]++;
        } else {
            randoms[randomsNumber] = 1;
        }
    }
    return randoms;
};

// process.on("message", (data) => {
//   console.log("CANTDAD :", data);
//   const ramdomData = calculoRandom(data);
//   process.send(ramdomData);
// });

module.exports = calculoRandom;