import axios from 'axios';
import readline from 'readline';

let idk = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askCurrencyConversion() {
    idk.question('Введи исходную валюту: ', test => {
        idk.question('Введи целевую валюту: ', lol => {
            idk.question('Введи сумму для конвертации: ', idkvm => {
                convertCurrency(parseFloat(idkvm), test.toUpperCase(), lol.toUpperCase())
                    .then(convertedAmount => {
                        console.log(`${idkvm} ${test.toUpperCase()} равно ${convertedAmount} ${lol.toUpperCase()}`);
                        askContinue();
                    })
                    .catch(error => {
                        console.error(error);
                        askContinue();
                    });
            });
        });
    });
}

function askContinue() {
    idk.question('Хочешь ли ты еще что-то посмотреть? (да/нет): ', answer => {
        if (answer.toLowerCase() === 'да') {
            askCurrencyConversion();
        } else {
            idk.close();
        }
    });
}

askCurrencyConversion();

async function convertCurrency(amount: number, fromCurrency: string, toCurrency: string) {
    try {
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const rate = response.data.rates[toCurrency];
        return amount * rate;
    } catch (error) {
        console.error(`Ошибка при конвертации валюты: ${error}`);
    }
}
