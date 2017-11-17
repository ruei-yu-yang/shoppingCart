function ShoppingCart () {}

// 取得條件參數設定
ShoppingCart.prototype.getLevelConfig = function (level) {
    let config;

    switch (level) {
        case 'VIP':
            config = {
                atLeastPay: 500,
                moq: 0,
                rate: 0.8
            };
            break;
        default:
            config = {
                atLeastPay: 1000,
                moq: 3,
                rate: 0.85
            };
    }

    return config;
};

// 是否滿額
ShoppingCart.prototype.checkLeastPay = function (price, atLeastPay){
    if (atLeastPay <= price) {
        return true;
    }
    return false;
};

// 是否達到最低商品數
ShoppingCart.prototype.checkMOQ = function (quantity, moq){
    if (moq <= quantity) {
        return true;
    }
    return false;
};

// 折扣計算
ShoppingCart.prototype.discountPay = function (price, rate){
    return price * rate;
};

// 購物車結算
ShoppingCart.prototype.finalTotal = function (level, quantity, price){

    // 取得條件參數設定
    let config = this.getLevelConfig(level);

    // 是否滿額
    let checkPay = this.checkLeastPay(price, config.atLeastPay)

    // 是否達到最低商品數
    let checkQuantity = this.checkMOQ(quantity, config.moq);
    
    // 折扣計算
    if (checkPay && checkQuantity) {
        return this.discountPay(price, config.rate);
    }

    return price;
};

module.exports = ShoppingCart;