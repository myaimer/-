import PanelBase from 'PanelBase';
cc.Class({
    extends: PanelBase,

    properties: {
        shopScrollView: cc.ScrollView,
        shopContent: cc.Node,
        otherScrollView: cc.ScrollView,
        otherContent: cc.Node,
        goldHave: cc.Label,
        starHave: cc.Label,
    },

    onLoad() {
        this._super();
        this.creatItem();
    },


    onEnable() {
        this.node.stopAllActions();
        this.node.setScale(0);
        let layout = this.shopContent.gc(cc.Layout);
        layout.enabled = false;
        this.node.parent.gn('mask').active = true;
        this.node.runAction(
            cc.sequence(
                cc.spawn(
                    cc.fadeTo(this.alertAnimSpeed, 255),
                    cc.scaleTo(this.alertAnimSpeed, 1).easing(cc.easeBackOut(1))
                ), cc.callFunc(() => {
                    layout.enabled = true;
                    this.shopScrollView.scrollToTop(0);
                })
            )
        );
        this.init();
    },


    start() {
        // this.schedule(function(){
        //     console.log(cc.vv.shopItemList[0].parent.getPosition().y)
        // },1);
        cc.vv.SHOP = this;
    },

    init() {
        this.refreshLabel();
        this.shopToggle(this.node.gn('btnShopToggle'));
    },

    //刷新显示
    refreshLabel() {
        this.goldHave.string = cc.vv.goldCount;
        this.starHave.string = cc.vv.starCount;
    },

    //生成英雄商品的预制件
    creatItem() {
        for (let i = 0, len = Object.keys(cc.vv.configData.battery).length; i < len; i++) {
            let shopItem = cc.instantiate(cc.vv.res.shopItem);
            let id = cc.vv.configData.battery[i + 1].id;
            let type = id >= 10 ? '' + id : '0' + id;
            let price = cc.vv.configData.battery[id].firstcoin;
            shopItem.gc('ShopItem').init(i,type,price,id);
            shopItem.parent = this.shopContent;
            cc.vv.shopItemList.push(shopItem);
        }
        for (let i = 0, len = Object.keys(cc.vv.configData.shop).length; i < len; i++) {
            let otherItem = cc.instantiate(cc.vv.res.otherItem);
            let id = cc.vv.configData.shop[i + 1].id;
            let type = cc.vv.configData.shop[id].type;
            otherItem.gn('card' + type).active = true;
            let text1 = cc.vv.configData.shop[id].text1;
            let text2 = cc.vv.configData.shop[id].text2;
            otherItem.gn('nameLabel').gc(cc.Label).string = cc.vv.configData.txt[text1].Chinese;
            otherItem.gn('hintLabel').gc(cc.Label).string = cc.vv.configData.txt[text2].Chinese;
            otherItem.parent = this.otherContent;
            cc.vv.otherItemList.push(otherItem);
        }
    },

    //显示已解锁的英雄信息
    unlockedHero() {
        for (let i = 0; i < cc.vv.unlockedHero; i++) {
            let n = i + 1;
            let id = cc.vv.configData.battery[n].id;
            let type = id >= 10 ? '' + id : '0' + id;
            cc.vv.shopItemList[i].gn('hero').gc(cc.Sprite).spriteFrame = cc.vv.res.heroList.getSpriteFrame(type);
            cc.vv.shopItemList[i].gn('nameLabel').gc(cc.Label).string = cc.vv.configData.txt[cc.vv.configData.battery[id].name].Chinese;
            cc.vv.shopItemList[i].gn('speedProgressBg').gn('p').gc(cc.Sprite).fillRange = cc.vv.configData.battery[id].rateShow;
            cc.vv.shopItemList[i].gn('ATKProgressBg').gn('p').gc(cc.Sprite).fillRange = cc.vv.configData.battery[id].atkShow;
            cc.vv.shopItemList[i].gn('btnLayout').gn('btn_lock').active = false;
            cc.vv.shopItemList[i].gn('btnLayout').gn('btn_price').active = true;
            let price = cc.vv.UTIL.number2formatString(cc.vv.configData.battery[id].firstcoin);
            cc.vv.shopItemList[i].gn('btnLayout').gn('btn_price').gn('label').gc(cc.Label).string = price;

        }
    },

    //显示已解锁的道具信息
    unlockedProp() {
        for (let i = 0; i < cc.vv.unlockedProp; i++) {
            let n = i + 1;
            let id = cc.vv.configData.shop[n].id;
            cc.vv.otherItemList[i].gn('btnLayout').gn('btn_lock').active = false;
            cc.vv.otherItemList[i].gn('btnLayout').gn('btn_price').active = true;
            let price = cc.vv.UTIL.number2formatString(cc.vv.configData.shop[id].coin);
            cc.vv.otherItemList[i].gn('btnLayout').gn('btn_price').gn('label').gc(cc.Label).string = price;
        }
    },

    //按钮的集合管理
    onButtonClick(event, customData) {
        this[customData](event.currentTarget);
    },

    //炮台按钮的回调
    shopToggle(nodeP) {
        nodeP.gn('bg').active = true;
        nodeP.gc(cc.Button).interactable = !nodeP.gn('bg').active;
        nodeP.parent.gn('btnOtherToggle').gn('bg').active = false;
        nodeP.parent.gn('btnOtherToggle').gc(cc.Button).interactable = !nodeP.parent.gn('btnOtherToggle').gn('bg').active;
        nodeP.parent.gn('shopScrollView').active = true;
        nodeP.parent.gn('otherScrollView').active = !nodeP.parent.gn('shopScrollView').active;
        this.unlockedHero();
    },
    //特权按钮的回调
    otherToggle(nodeP) {
        nodeP.gn('bg').active = true;
        nodeP.gc(cc.Button).interactable = !nodeP.gn('bg').active;
        nodeP.parent.gn('btnShopToggle').gn('bg').active = false;
        nodeP.parent.gn('btnShopToggle').gc(cc.Button).interactable = !nodeP.parent.gn('btnShopToggle').gn('bg').active;
        nodeP.parent.gn('otherScrollView').active = true;
        nodeP.parent.gn('shopScrollView').active = !nodeP.parent.gn('otherScrollView').active;
        this.unlockedProp();
    },


});
