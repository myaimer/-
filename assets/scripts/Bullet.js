

cc.Class({
    extends: cc.Component,

    properties: {
    
    },


    // onLoad () {},
    // start () {   
    // },
    init(pool,atk){
        this.pool = pool;
        this.node.atk = atk;
    },
    update (dt) {
        this.endPos = cc.vv.UTIL.convertToWorldSpaceAR(this.node);
        if(this.endPos.y < 620 || this.endPos.y > 1640){
            this.pool.put(this.node);
        }
    },
});
