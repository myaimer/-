
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad () {
        //创建一个子弹的对象池
        this.bulletPool = new cc.NodePool();
    },


    init(id) {
        this.node.id = id;
    },


    start() {
        // this.node.on("touchmove",this.onClick,this);
        this.node.on("touchstart", this.touchBegin, this);
        this.node.on("touchmove", this.touchMove, this);
        this.node.on("touchend", this.touchEnd, this);
        this.node.on("touchcancel", this.touchEnd, this);
        // this.schedule(this.shootBullet,0.1);
    },
    touchBegin(touch) {
        let target = touch.target;
        target.rotation = 0;
        let position = touch.getLocation();
        target.oldParent = target.parent;
        target.parent = cc.vv.MAIN.moveBg;
        position = cc.v2(position.x - cc.winSize.width / 2, position.y - cc.winSize.height / 2);
        target.position = position;
    },

    touchMove(touch) {
        this.unschedule(this.canShootBullet);
        let target = touch.target;
        let position = touch.getLocation();
        position = cc.v2(position.x - cc.winSize.width / 2, position.y - cc.winSize.height / 2);
        target.position = position;
    },

    touchEnd(touch) {
        let bl = false;
        let target = touch.target;
        let pos = touch.getLocation();
        let arr = [cc.vv.MAIN.rectPar, cc.vv.MAIN.fightPar];
        for (let i = 0; i < arr.length; i++) {
            arr[i].children.forEach(p => {
                let pos_c = p.convertToWorldSpaceAR(cc.v2(0, 0));
                let length = pos.sub(pos_c).mag();
                if (length <= 83) {
                    let num = this.canCompound(p, target);
                    switch (num) {
                        case 1:
                            this.levelUP(p, target);
                            this.canLaunch(p);
                            break;
                        case 2:
                            console.log(target.oldParent)
                            this.changePos(p, target);
                            this.canLaunch(p);
                            break;
                        case 3:
                            target.parent = p;
                            target.position = cc.v2(0, 0);
                            this.canLaunch(p);
                            break;
                    }
                    bl = true;
                }
            })
        }
        if (!bl) {
            target.parent = target.oldParent;
            target.position = cc.v2(0, 0);
            this.canLaunch(this.node);
        }
    },
    // hero升级
    levelUP(node1, node2) {
        let id = node1.gn("hero").id;
        id++;
        node1.gn("hero").id = id
        let sprite = node1.gn("hero").gc(cc.Sprite);
        let type = id >= 10 ? '' + id : '0' + id;
        node1.gn("hero").id = type;
        sprite.spriteFrame = cc.vv.res.heroList.getSpriteFrame(type);
        node2.destroy();
    },
    // 两个英雄交换位置
    changePos(node1, node2) {
        console.log(node1)
        let hero1 = node1.children[0];
        [hero1.parent, node2.parent] = [node2.oldParent, node1];
        hero1.position = cc.v2(0, 0);
        node2.position = cc.v2(0, 0);
        console.log(hero1.parent,node2.parent)
    },
    // 判断是否可以合成
    canCompound(node1, node2) {
        if (node1.children.length > 0) {
            let id = node1.gn("hero").id;
            let id2 = node2.id;
            if (id == id2) {
                return 1;
            } else {
                return 2;
            }
        } else {
            return 3;
        }
    },

    //发射子弹
    shootBullet(node){
        let bullet = this.bulletPool.get();
        if(!bullet){
            bullet = cc.instantiate(cc.vv.res.bullet);
        }
        let  way = cc.v2(0,3000).rotate((-this.node.rotation)/180*Math.PI)
        bullet.gc(cc.RigidBody).linearVelocity = way;
        let atk = cc.vv.configData.battery[~~node.id].atk;
        bullet.gc('Bullet').init(this.bulletPool,atk);
        bullet.position = cc.v2(0,0);
        node.addChild(bullet);
    },
    // 判断是否可以发射子弹a
    canLaunch(node){
        // this.unschedule(this.canShootBullet)
        let name = node.parent.name;
        console.log(name)
        if(name == "fightPar"){
            this.schedule(this.canShootBullet,0.5)
        }else if(name== "p"){
            this.schedule(this.canShootBullet,0.5)
        }
    },
    canShootBullet(){
        this.shootBullet(this.node)
    }
    // update (dt) {},
});
