let Shopping = require('Shopping');
cc.Class({
    extends: cc.Component,

    properties: {
        rectPar: cc.Node,
        levelUpBtn: cc.Node,
        buyCanon: cc.Label,
        goldHave: cc.Label,
        starHave: cc.Label,
        moveBg: cc.Node,
        fightPar:cc.Node,
        aimer:cc.Node,
    },
    onLoad(){
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_shapeBit;
        this.node.gn("UI_bg").on("touchstart",this.touchStart,this);
        this.node.gn("UI_bg").on("touchmove",this.touchMove,this);
        this.node.gn("UI_bg").on("touchend",this.touchEnd,this);
    },
    start() {
        cc.vv.MAIN = this;
        this.creatDomain();
        this.init();
    },
    touchStart(touch){
        this.aimer.active  = true;
        let pos = this.node.convertToNodeSpaceAR(touch.getLocation())
        console.log(pos)
        this.aimer.position = pos;
        if(this.aimer.y <= -220){
            this.aimer.y = -220;
        }
        this.RotatingTurret(this.aimer)
    },
    touchMove(touch){
        let pos = this.node.convertToNodeSpaceAR(touch.getLocation())
        this.aimer.position = pos;
        if(this.aimer.y <= -220){
            this.aimer.y = -220;
        }
        this.RotatingTurret(this.aimer)
    },
    touchEnd(){
        this.aimer.active  = false ;
    },
    // 炮台的旋转
    RotatingTurret(touchNode){
        this.fightPar.children.forEach(p => {
            let Pos = p.convertToWorldSpaceAR(cc.v2(0,0));
            let Pos2 = touchNode.convertToWorldSpaceAR(cc.v2(0,0));
            let rotation = cc.vv.UTIL.getDegree(Pos,Pos2)
            if(p.children.length >0){
                if(rotation < -90 ){
                    rotation = -90;
                }else if(rotation > 90){
                    rotation = 90;
                }
                p.children[0].rotation = rotation;
           }
       });
    },
    //生成放置的地盘
    creatDomain() {
        for (let i = 0; i < cc.vv.rectCount; i++) {
            let rect = cc.instantiate(cc.vv.res.rect);
            rect.parent = this.rectPar;
            rect.gc('Rect').init(i);
            cc.vv.rectList.push(rect);
        }

    },

    //初始化用户数据
    init() {
        //todo 这里需要数据的本地保存和读取
        this.refreshLabel();
    },

    windowManager(event, customData) {
        this.node.gn(customData).active = true;
    },

    //刷新显示
    refreshLabel() {
        this.goldHave.string = cc.vv.goldCount;
        this.starHave.string = cc.vv.starCount;
        this.buyCanon.string = cc.vv.currentBuyCanon;
    },

    //购买英雄炮塔
    buyHero() {
        let skin = cc.vv.res.heroList.getSpriteFrame(cc.vv.currentHeroType);
        let id = cc.vv.configData.battery[Number(cc.vv.currentHeroType)].id;
        cc.vv.goldCount = Shopping.buyTurret(cc.vv.goldCount, cc.vv.currentBuyCanon, cc.vv.rectList, skin,id);
        this.refreshLabel();
    },

    //段位提升
    levelUP() {
        console.log('段位提升');
        this.levelUpBtn.getComponent(cc.Animation).play();
    },

    test() {
        cc.director.loadScene('Main_2');
    },   
    // update (dt) {

    // },
});
