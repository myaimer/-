
cc.Class({
    extends: cc.Component,

    properties: {

    },

    start() {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getPhysicsManager().enabled = true;
        //怪物的对象池
        this.monsterPool = new cc.NodePool("monster"); 
        this.square = [];
        this.init(1);
        window.Main_2 = this;
    },
    init(index) {
        // 读取地图数据
        cc.loader.loadRes("CSV/level" + index, function (err, mapCsv) {
            // var mapArr = mapCsv
            let mapCsv_1 = mapCsv + "";
            let mapdataArray = mapCsv_1.split("\n")
            this.decodeMap(mapdataArray);
            this.creatorMonster();
        }.bind(this))
    },
    // 通关或者死亡
    // 生成下落的小方块
    creatorMonster(){
        console.log(this.levelArray);
        for (let i = 0; i < this.gameHeight; i++) {
            let posX = this.gamesX;
            for (let j = 0; j < this.levelArray[i].length; j++) {
                let target = this.levelArray[i][j];
                if(target){
                    let monster = this.monsterPool.get();
                    if(!monster){
                        monster = cc.instantiate(cc.vv.res.monster);
                    }
                    this.square.push(monster);
                    monster.getComponent("Monster").init(this.monsterPool,target[1][0],target[0][0],this.gameHeight);
                    monster.x = posX+ this.ww * j ;
                    monster.y = this.gamesY + this.hh*i;
                    this.node.addChild(monster);
                }
            }
        }
    },
    clearMonster(){
        for (let i = 0; i < this.square.length; i++) {
            this.monsterPool.put(this.square[i])         
        }
    },
    // 解析关卡数据
    decodeMap(mapDataArray){
        let lvMap =  [];
        this.addValue = 0;  //怪物总系数
        this.oneGridNum = 0;  //一格怪的总数
        for (let i = 0; i < mapDataArray.length; i++) {
            lvMap[i] =  [];
            const element = mapDataArray[i];
            let horArrNumber = element.split(",");
            // console.log(horArrNumber)
            if(horArrNumber.length > 0 ){
                for (let j = 0; j < horArrNumber.length; j++) {
                    let value =  horArrNumber[j];
                    let info = this.makeSquareInfo(value);
                    lvMap[i][j] =info;
                }
                this.gameWidth = horArrNumber.length;
            }
        }
        this.levelArray = lvMap;
        this.backArray = JSON.parse(JSON.stringify(lvMap));
        this.gameHeight = this.levelArray.length;
        this.createGameMap();

    },
    createGameMap(){
        this.node.removeAllChildren();
        // 移除怪物节点下所有的子节点，进行初始化
        this.monsterArray = [];   
        let winH = cc.winSize.height;
        this.ww = 126;
        this.hh = 126; 
        // 格子的大小
        let startX = -cc.winSize.width/2 +20; //计算起始x
        let startY = winH / 2 + 200;            //计算起始y

        this.gamesX = startX;
        this.gamesY = startY;

        this.squareMaxSizeX = 0;    //当前关卡中最大方块的x
        this.squareMaxSizeY = 0;    //当前关卡中最大方块的y

        this.createId = 0;
        this.bCreateMonster = true;
        this.bMove = true;
    },

    makeSquareInfo(str){
        let nlen = str.length;
        if (nlen < 4)
        return null;
        let strArray = str.split(";");
        let infoarray = [];
        for (let i = 0; i < strArray.length; i++) {
            let sinfo = strArray[i];
            let dt = sinfo.split("x");
            infoarray.push(dt);
        }
        return infoarray;
    },
    // 获取敌人的地点
    getMonster(){
       return this.node.children ;
    },
    update (dt) {
        let arr = this.getMonster();
        let num = arr.length <= 8 ? arr.length : 8 ;
        for (let i = 0; i < num ; i++) {
            const element = arr[i];
            cc.vv.MAIN.RotatingTurret(element);
        }
    },
});
