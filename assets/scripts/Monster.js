
cc.Class({
    extends: cc.Component,

    properties: {
        life: {
            default: null,
            type: cc.Label
        }
    },
    start() {
        // cc.director.getPhysicsManager().enabled = true;
    },
    init(poor, lifeHP, type, line) {
        this.poor = poor;
        this.life.string = lifeHP;
        this.changePic(type);
        this.line = line;
        let size =  this.node.getContentSize();
        this.node.getComponent(cc.PhysicsBoxCollider).size = size;   
        //物理碰撞包围盒的设置 设置这个节点的包围盒和节点的大小相同
        this.node.getComponent(cc.PhysicsBoxCollider).offset =cc.v2(size.width/2,size.height/2);
        // 设置包围盒的偏移量，如果节点的锚点为（0.5，0.5）则不需要设置
        this.node.getComponent(cc.BoxCollider).size = size;
        // 碰撞组件设施包围盒
        this.node.getComponent(cc.BoxCollider).size = cc.v2(size.width/2,size.height/2);
        // 碰撞组件的包围盒的偏移量
    },

    onBeginContact(contact, selfCollider, otherCollider) {
        switch (otherCollider.tag) {
            case 0:
                this.life.string = this.life.string - otherCollider.node.atk;
                if (Number(this.life.string) <= 0) {
                    this.poor.put(selfCollider.node);
                }
                break;
        }
    },
    //  
    onCollisionEnter: function (other, self) {
        switch (other.tag) {
            case 1:
                // window.Main_2.clearMonster();
                // window.Main_2.creatorMonster();
                break;
            case 2:
                // console.log("游戏开始")
                break;
        }
    },
    // 怪物图片的动态切换
    changePic(type) {
        let sprite = this.node.getComponent(cc.Sprite);
        sprite.spriteFrame = cc.vv.res["monster_" + type];
    },

    update() {
        this.node.y -= 3;
    },
});
