class Product {
    constructor(name, price, quantity, description) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.description = description;
    }

    static suitableProducts(queryStr, productsArray) {
        let outputArray = productsArray;
        const queryKind = queryStr.split('&'); // разделяю единый запрос на несколько (по name, price и тд)
        for (let query of queryKind) {
            if ( query.includes("name") || query.includes("description") ) { // ключ - название или описание
                
                const [key, operator, str] = query.split("-");
                if (operator === 'contains') {
                    outputArray = outputArray.filter(el => el[key].toLowerCase().includes(str.toLowerCase()));
                } else if (operator === 'starts') {
                    outputArray = outputArray.filter(el => el[key].toLowerCase().startsWith(str.toLowerCase()));
                } else if (operator === 'ends') {
                    outputArray = outputArray.filter(el => el[key].toLowerCase().endsWith(str.toLowerCase()));
                }
            } else if ( query.includes("price") || query.includes("quantity") ) { // ключ - цена или количество
                const [key, operWithNumber] = query.split("-");
                let operator = '';
                let number = 0;
                
                if ( operWithNumber.includes("<=") || operWithNumber.includes(">=") ) { // длина оператора равна 2
                    operator = operWithNumber.slice(0, 2);
                    number = +operWithNumber.slice(2); // строку-число преобразуем в число
                } else if ( operWithNumber.includes("<") || operWithNumber.includes("=") || operWithNumber.includes(">") ) {
                    operator = operWithNumber.slice(0, 1);
                    number = +operWithNumber.slice(1); // строку-число преобразуем в число
                }

                if (operator === '<=') outputArray = outputArray.filter(el => el[key] <= number);
                if (operator === '>=') outputArray = outputArray.filter(el => el[key] >= number);
                if (operator === '<') outputArray = outputArray.filter(el => el[key] < number);
                if (operator === '=') outputArray = outputArray.filter(el => el[key] === number);
                if (operator === '>') outputArray = outputArray.filter(el => el[key] > number);
            }
        }

        return outputArray;
    }
}

const product1 = new Product("Банан", 100, 5, "Жёлтый сладкий фрукт");
const product2 = new Product("Ананас", 200, 8, "Жёлтый кислый фрукт");
const product3 = new Product("Огурец", 200, 7, "Зелёный длинный овощ");
const product4 = new Product("Киви", 300, 7, "Зелёный кислый фрукт");
const product5 = new Product("Помидор", 100, 9, "Красный круглый овощ");
const product6 = new Product("Яблоко", 50, 5, "Красный сладкий фрукт");

const products = [product1, product2, product3, product4, product5, product6];

console.log(Product.suitableProducts("quantity->=5&description-contains-й", products));