let mocha = require('mocha');
let chai = require('chai');
let sinon = require('sinon');
let ShoppingCart = require('../src/shoppingCart');

// Use TDD should
chai.should();

describe('ShoppingCart', () => {

    // 每次測試前重新 new ShoppingCart()
    let shoppingCart;
    beforeEach(() => {
        shoppingCart = new ShoppingCart();
    });
    
    // 取得條件參數設定
    describe('#getLevelConfig(level)', () => {
        let dataSets = [
            {
                level: 'Normal',
                expected: {
                    atLeastPay: 1000,
                    moq: 3,
                    rate: 0.85
                }
            },
            {
                level: 'VIP',
                expected: {
                    atLeastPay: 500,
                    moq: 0,
                    rate: 0.8
                }
            }
        ];

        dataSets.forEach((data) => {
            it(`取得 ${data.level} 設定值`, () => {
                // Act
                let actual = shoppingCart.getLevelConfig(data.level);
                
                // Assert
                actual.should.deep.equal(data.expected);
            });
        });
    });

    // 是否滿額
    describe('#checkLeastPay(price, atLeastPay)', () => {
        let dataSets = [
            {
                case: '滿額',
                price: 500,
                atLeastPay: 500,
                expected: true
            },
            {
                case: '沒滿額',
                price: 499,
                atLeastPay: 500,
                expected: false
            }
        ];

        dataSets.forEach((data) => {
            it(`${data.case}`, () => {
                // Act
                let actual = shoppingCart.checkLeastPay(data.price, data.atLeastPay);
                
                // Assert
                actual.should.equal(data.expected);
            });
        });
    });

    // 是否達到最低商品數
    describe('#checkMOQ(quantity, moq)', () => {
        let dataSets = [
            {
                case: '達到最低商品數',
                quantity: 3,
                moq: 3,
                expected: true
            },
            {
                case: '未達最低商品數',
                quantity: 2,
                moq: 3,
                expected: false
            }
        ];

        dataSets.forEach((data) => {
            it(`${data.case}`, () => {
                // Act
                let actual = shoppingCart.checkLeastPay(data.quantity, data.moq);
                
                // Assert
                actual.should.equal(data.expected);
            });
        });
    });

    // 折扣計算
    describe('#discountPay(price, rate)', () => {
        it('折扣計算', () => {
            // Arrange
            let price = 500;
            let rate = 0.8;
            let expected = 400;
        
            // Act
            let actual = shoppingCart.discountPay(price, rate);
        
            // Assert
            actual.should.equal(expected);
        });
    });

    // 購物車結算
    describe('#finalTotal(level, quantity, price)', () => {

        let dataSets = [
            {
                case: 'VIP 會員，購物滿 500 元， 8 折優惠',
                level: 'VIP',
                quantity: 3,
                price: 500,
                expected: 400
            },
            {
                case: 'VIP 會員，購物未滿 500 元',
                level: 'VIP',
                quantity: 3,
                price: 499,
                expected: 499
            },
            {
                case: '一般會員，購物滿 1000 元，購買超過 3 件商品， 85 折優惠',
                level: 'Normal',
                quantity: 3,
                price: 1000,
                expected: 850
            },
            {
                case: '一般會員，購物未滿 1000 元，購買超過 3 件商品',
                level: 'Normal',
                quantity: 3,
                price: 999,
                expected: 999
            },
            {
                case: '一般會員，購物滿 1000 元，購買沒超過 3 件商品',
                level: 'Normal',
                quantity: 2,
                price: 1000,
                expected: 1000
            },
            {
                case: '一般會員，購物未滿 1000 元，購買沒超過 3 件商品',
                level: 'Normal',
                quantity: 2,
                price: 999,
                expected: 999
            }
        ];

        dataSets.forEach((data) => {
            it(`${data.case}`, () => {
                // Act
                let actual = shoppingCart.finalTotal(data.level, data.quantity, data.price);
                
                // Assert
                actual.should.equal(data.expected);
            });
        });
    });
});