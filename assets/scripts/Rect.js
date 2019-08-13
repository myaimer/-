
cc.Class({
    extends: cc.Component,

    properties: {
       
    },


    // onLoad () {},

    init(idx){
        this.node.index = idx;
    },

    start () {

    },

    onClick(){
        console.log(this.node.index);
    },

    // update (dt) {},
});
