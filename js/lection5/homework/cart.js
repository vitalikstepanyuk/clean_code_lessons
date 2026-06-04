class Product {
    #name;
    #description;
    #price;
    #category;
    constructor(name, description, price, category = 0)  {
        this.#name = name;
        this.#description = description;
        this.#price = price;
        this.#category = category;
    }
    get name() { return this.#name; }
    get description() { return this.#description; }
    get price() { return this.#price; }
    get category() { return this.#category; }
};

class Cart {
    #products;
    constructor() {
        this.#products = [];
    }
    add(product, quantity) {
        this.#products.push([product, quantity]);
    }
    remove(name) {
        this.#products = this.#products.filter(([product, _]) => product.name() != name);
    }
    get total() { 
        let total = 0;
        this.#products.forEach(([product, quantity]) => {
            let discountPercent = 0;
            if (quantity >= 100) {
                discountPercent = 15;
            } else if (quantity >= 10) {
                discountPercent = 10;
            } else if (quantity >= 5) {
                discountPercent = 5;
            }
            let taxRate = 5;
            switch (product.category) {
                case 1: taxRate += 0; break;
                case 2: taxRate += 7; break;
                case 3: taxRate += 14; break;
                default: taxRate += 20; break;
            }
            let base = product.price * quantity;
            let tax = Math.ceil(base * taxRate / 100);
            let discount = Math.round(base * discountPercent / 100);
            total += base - discount + tax;
        });
        return total; 
    }
};

module.exports = { Product, Cart };
