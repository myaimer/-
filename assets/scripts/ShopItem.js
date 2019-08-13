let Shopping = require('Shopping');
cc.Class({
    extends: cc.Component,

    properties: {

    },


    // onLoad () {},

    init(idx, type, price, id) {
        this.node.index = idx;
        this.heroSkinType = type;
        this.price = price;
        this.id = id;
    },

    start() {

    },

    buyHero() {
        let skin = cc.vv.res.heroList.getSpriteFrame(this.heroSkinType);
        cc.vv.goldCount = Shopping.buyTurret(cc.vv.goldCount, this.price, cc.vv.rectList, skin, this.id);
        cc.vv.SHOP.refreshLabel();
        cc.vv.MAIN.refreshLabel();
    },

    // update (dt) {},
});
