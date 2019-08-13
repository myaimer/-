module.exports = {

    //购物
    buyTurret(savings, canon, arr, skin,id) {
        if (savings < canon) return savings;
        savings -= canon;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].children.length <= 0) {
                let hero = cc.instantiate(cc.vv.res.hero);
                hero.gc(cc.Sprite).spriteFrame = skin;
                hero.gc('Hero').init(id);
                hero.parent = arr[i];
                return savings;
            }
        }
    },

};