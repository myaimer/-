cc.vv = cc.vv || {};

//引入模块
cc.vv.UTIL = require('Util');
cc.vv.configData = require('ConfigData');

cc.vv.SHOP = null;
cc.vv.MAIN = null;

//放置炮台的方块数组
cc.vv.rectList = [];

//位置方格的数量
cc.vv.rectCount = 10;
//当前金币数量
cc.vv.goldCount = 1000;
//当前星星数量
cc.vv.starCount = 5;
//当前英雄的购买标准
cc.vv.currentBuyCanon = 150;
//当前的英雄类型
cc.vv.currentHeroType = '01';
//当前已解锁英雄
cc.vv.unlockedHero = 5;//最大值50
//其他道具的解锁数量
cc.vv.unlockedProp = 2;//最大值18
//英雄道具的列表
cc.vv.shopItemList = [];
//其他道具的列表
cc.vv.otherItemList = [];
//背包
cc.vv.bagList = [];



cc.vv.res = {
    //商城道具预制件
    'rect': { url: 'prefabs/rect', type: cc.Prefab },
    //英雄
    'hero': { url: 'prefabs/hero', type: cc.Prefab },
    //商店英雄预制件
    'shopItem': { url: 'prefabs/shopItem', type: cc.Prefab },
    //商店其他道具预制件
    'otherItem': { url: 'prefabs/otherItem', type: cc.Prefab },
    // 怪物的图片
    'monster_1': { url: 'MonsterPicture/monster_1', type: cc.SpriteFrame },
    'monster_2': { url: 'MonsterPicture/monster_2', type: cc.SpriteFrame },
    'monster_3': { url: 'MonsterPicture/monster_3', type: cc.SpriteFrame },
    'monster_4': { url: 'MonsterPicture/monster_4', type: cc.SpriteFrame },
    // 怪物的预制件
    'monster': { url: 'prefabs/monster', type: cc.Prefab },
    //子弹预制件
    'bullet': { url: 'prefabs/bullet', type: cc.Prefab },
    //英雄的图集
    'heroList': { url: 'picture/sprites', type: cc.SpriteAtlas },
    //子弹的图集
    'bulletList': { url: 'picture/bullet', type: cc.SpriteAtlas },
};

cc.Node.prototype.gn = cc.Node.prototype.getChildByName;
cc.Node.prototype.gc = cc.Node.prototype.getComponent;