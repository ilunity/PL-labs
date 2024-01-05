const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const generatePassword = (symbols, length) => {
    let password = [];

    for (let i = 0; i < length; i++) {
        const symbolIndex = randomIntFromInterval(0, symbols.length - 1);
        password.push(symbols[symbolIndex]);
    }

    return password.join('');
}

module.exports = generatePassword;
