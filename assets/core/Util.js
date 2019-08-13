module.exports = {
    /**动态替换精灵贴图 */
    setSpriteFrame(path, sprite, cb = null) {
        cc.loader.loadRes(path, cc.SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.error(path + 'setSpriteFrame error');
                return;
            }
            sprite.spriteFrame = spriteFrame;
            if (cb) {
                cb();
            }
        });
    },

    //动态创建预制
    createPrefab(path, parentNode, cb) { 
        cc.loader.loadRes(path, (err, prefab) => {
            let node = cc.instantiate(prefab);
            parentNode.addChild(node);
            if (cb) {
                cb(node);
            }
        });
    },

    //删除预制件
    closePrefab(node, cb) {
        node.destroy();
        if (cb) {
            cb();
        }
    },

    //初始化本地数据
    initLocalData(str, data) {
        let localData = cc.sys.localStorage.getItem(str);
        if (localData === null) {
            localData = data;
            cc.sys.localStorage.setItem(str, JSON.stringify(data));
            return data;
        } else {
            let localDataObj = JSON.parse(localData);
            if (Object.keys(data).length > Object.keys(localDataObj).length) {
                for (const key in localDataObj) {
                    if (localDataObj.hasOwnProperty(key)) {
                        data[key] = localDataObj[key];
                    }
                }
                cc.sys.localStorage.setItem(str, JSON.stringify(data));
                return data;
            } else {
                return localDataObj;
            }
        }
    },
    //保存本地数据
    saveLocalData(key, value, jsonFlag = false) {
        if (jsonFlag === false) {
            cc.sys.localStorage.setItem(key, value);
        } else {
            cc.sys.localStorage.setItem(key, JSON.stringify(value));
        }
    },
    getLocalData(key, jsonFlag) { //TODO 完善本地暂无key的值的情况
        if (jsonFlag === false) {
            if (cc.sys.localStorage.getItem(key) === null) return null;
            return cc.sys.localStorage.getItem(key);
        } else {
            if (cc.sys.localStorage.getItem(key) === null) return null;
            return JSON.parse(cc.sys.localStorage.getItem(key));
        }
    },

    /**Alert Msg */
    createAlert(alertMsg, type = 0) { //alert 字符串，所表达的文字
        cc.loader.loadRes("prefabs/alert/AlertPrefab", (err, prefab) => {
            let prfNode = cc.instantiate(prefab);
            let canvasNode = cc.find("Canvas");
            canvasNode.addChild(prfNode, 1000);
            prfNode.getComponent("Alert").initView(alertMsg, type);
        });
    },

    setButtonCall(btn, callBack, cdTime = 0.1) {
        let inCD = false;

        function btnCall() {
            if (!inCD) {
                cc.quxun.gameSound.playUIclick();
                if (callBack)
                    callBack();
                inCD = true;

                cc.quxun.util.delayCall(btn, cdTime, () => {
                    inCD = false;
                });
            } else {
                console.log("CD中")
            }
        }

        btn.on(cc.Node.EventType.TOUCH_END, btnCall);
    },

    delayCall(nd, time, callBack) {

        nd.stopAllActions();

        nd.runAction(
            cc.sequence(
                cc.delayTime(time),
                cc.callFunc(function () {
                    if (callBack)
                        callBack();
                })
            )
        );
    },

    ///得到时间 (秒)
    getcurtime() {
        return Math.floor(Date.now() / 1000);
    },

    ///得到时间 (毫秒)
    getmillisecond() {
        return Date.now();
    },

    //两点距离
    twoPosDis(_pos1, _pos2) {
        let tarV = cc.v2(_pos1.x - _pos2.x, _pos1.y - _pos2.y);
        return tarV.mag();
    },

    //数值字符串+数值字符串
    addStringNumber(formStr, addStr) {

        formStr = formStr + "";
        addStr = addStr + "";
        let maxlength = formStr.length;
        if (addStr.length > maxlength) {
            maxlength = addStr.length;
            for (let i = 0; formStr.length < maxlength; i++) {
                formStr = "0" + formStr;
            }
        } else {
            for (let i = 0; addStr.length < maxlength; i++) {
                addStr = "0" + addStr;
            }
        }

        let todata = [];
        let addto = 0;
        for (let i = 0; i < maxlength; i++) {
            let index = maxlength - i - 1;
            let fstr = formStr[index] ? formStr[index] : "0";
            let astr = addStr[index] ? addStr[index] : "0";

            let resultnum = parseInt(fstr) + parseInt(astr) + addto;
            addto = 0;
            if (resultnum > 9) {
                resultnum = resultnum % 10;
                addto = 1;
            }

            todata.push(resultnum);
        }

        if (addto == 1) {
            todata.push(addto);
        }

        let toStr = "";
        for (let i = 0; i < todata.length; i++) {
            let index = todata.length - i - 1;
            toStr = toStr + (todata[index] + "");
        }

        return toStr;
    },

    //时间格式化
    getFormatTimeArr(seconds) { //seconds:秒
        const perHour = 60 * 60;
        const perMin = 60;
        let hour = Math.floor(seconds / perHour);
        let min = Math.floor(seconds % perHour / perMin);
        let sec = Math.floor(seconds % perMin);
        hour = hour > 9 ? hour : "0" + hour;
        min = min > 9 ? min : "0" + min;
        sec = sec > 9 ? sec : "0" + sec;
        return [hour, min, sec];
    },

    //获取范围内的随机值
    getRandInRage(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },


    /**big number计算 */
    toInt(arr) {
        for (var i = 0; i < arr.length; i++) {
            arr[i] = parseInt(arr[i]);
        }
        return arr;
    },
    
    // 从数组末尾起移除0，直到非0停止
    removeZero(arr) {
        var flag = true,
            len = arr.length;
        for (var i = len - 1; i >= 0; i--) {
            if (arr[i] != 0) {
                flag = false;
            }
            if (flag && arr[i] == 0) {
                arr.splice(i, 1);
            }
        }
        return arr;
    },
    // 在数组末尾添加n个0
    addZero(arr, n) {
        for (var i = 0; i < n; i++) {
            arr.push('0');
        }
        return arr;
    },

    // 加
    add(a, b) {
        var ax = this.toInt(String(a).split('').reverse());
        var bx = this.toInt(String(b).split('').reverse());
        var len = (ax.length > bx.length) ? ax.length : bx.length;
        var rx = [0],
            slen, x;

        if (ax.length > bx.length) {
            slen = ax.length - bx.length;
            for (x = 0; x < slen; x++) {
                bx.push(0);
            }
        } else {
            slen = bx.length - ax.length;
            for (x = 0; x < slen; x++) {
                ax.push(0);
            }
        }

        for (var i = 0; i < len; i++) {
            var r = ax[i] + bx[i] + rx[i];
            var s = parseInt(r / 10);
            r = r % 10;
            rx[i] = r;
            rx[i + 1] = s;
        }

        rx = this.removeZero(rx).reverse().join('');
        return rx;
    },

    // var a = '976';
    // var b = '27';

    // console.log(add(a, b));

    // 比较大小
    compare(a, b) {
        var ax = this.toInt(String(a).split('').reverse());
        var bx = this.toInt(String(b).split('').reverse());
        var len = (ax.length > bx.length) ? ax.length : bx.length;
        var slen, x;

        if (ax.length > bx.length) {
            slen = ax.length - bx.length;
            for (x = 0; x < slen; x++) {
                bx.push(0);
            }
        } else {
            slen = bx.length - ax.length;
            for (x = 0; x < slen; x++) {
                ax.push(0);
            }
        }

        if (ax.length > bx.length) {
            return 1;
        } else if (ax.length < bx.length) {
            return -1;
        } else {
            for (var i = len - 1; i >= 0; i--) {
                if (ax[i] > bx[i]) {
                    return 1;
                } else if (ax[i] < bx[i]) {
                    return -1;
                }
            }
        }

        return 0;
    },

    // var a = '377';
    // var b = '377';

    // console.log(compare(b, a));

    // 减
    sub(a, b) {
        var ax = this.toInt(String(a).split('').reverse());
        var bx = this.toInt(String(b).split('').reverse());
        var len = (ax.length > bx.length) ? ax.length : bx.length;
        var rx = [0],
            slen, x;

        if (ax.length > bx.length) {
            slen = ax.length - bx.length;
            for (x = 0; x < slen; x++) {
                bx.push(0);
            }
        } else {
            slen = bx.length - ax.length;
            for (x = 0; x < slen; x++) {
                ax.push(0);
            }
        }

        if (this.compare(a, b) > 0) {
            for (var i = 0; i < len; i++) {
                var r = ax[i] - bx[i];
                if (r < 0) {
                    r += 10;
                    ax[i + 1] -= 1;
                }
                rx[i] = r;
            }
            rx = this.removeZero(rx).reverse().join('');
        } else if (this.compare(a, b) < 0) {
            for (var i = 0; i < len; i++) {
                var r = bx[i] - ax[i];
                if (r < 0) {
                    r += 10;
                    bx[i + 1] -= 1;
                }
                rx[i] = r;
            }
            rx = '-' + this.removeZero(rx).reverse().join('');
        } else {
            return '0';
        }

        return rx;
    },

    // var a = '386';
    // var b = '4377';

    // console.log(sub(a, b));

    // 乘
    mut(a, b) {
        var ax = this.toInt(String(a).split('').reverse());
        var bx = this.toInt(String(b).split('').reverse());
        var len = (ax.length > bx.length) ? ax.length : bx.length;
        var slen, x, rt = [];

        if (ax.length > bx.length) {
            slen = ax.length - bx.length;
            for (x = 0; x < slen; x++) {
                bx.push(0);
            }
        } else {
            slen = bx.length - ax.length;
            for (x = 0; x < slen; x++) {
                ax.push(0);
            }
        }

        for (var i = 0; i < len; i++) {
            var rx = [0];
            for (var j = 0; j < len; j++) {
                var t = ax[j] * bx[i];
                rx[j] += t % 10;
                rx[j + 1] = parseInt(t / 10);
            }
            rx = this.addZero(this.removeZero(rx).reverse(), i).join('');
            rt.push(rx);
        }

        var rs = '0';
        for (var k = 0; k < rt.length; k++) {
            rs = this.add(rs, rt[k]);
        }
        return rs;
    },

    // var a = '123';
    // var b = '321';

    // console.log(mut(a, b));

    // 除
    div(a, b) {
        if (this.compare(b, a) > 0) {
            return new Error('暂不支持该参数');
        }

        var rt = [];
        var cur = b.length;
        var x, k = {
            s: 0
        };

        for (var idx = 0; idx < a.length; idx++) {
            if (k.s != 0 && idx > a.length - 1) {
                a.concat('0');
            }

            if (k.s != 0) {
                x = k.s + a.slice(idx, idx + 1);
            } else {
                x = a.slice(idx, idx + 1);
            }

            if (this.compare(x, b) < 0) {
                if (k.s != 0) {
                    x = k.s + a.slice(idx, idx + 2);
                } else {
                    x = a.slice(idx, idx + 2);
                }
                idx++;
            }



            k = this.sdiv(x, b);
            console.log(k);
            rt.push(k.t);
        }



        return rt;
    },

    sdiv(c, d) {
        var s, t; // 余数，商
        for (var i = 1; i <= 10; i++) {
            if (this.compare(this.add(this.mut(d, i), d), c) > 0) {
                s = this.sub(c, this.mut(d, i));
                t = String(i);
                break;
            }
        }
        return {
            s: s,
            t: t
        }
    },

    bigMut(big, common) {
        big += "";
        common += "";
        if (big.length < common.length) {
            big = [common, common = big][0];
        }
        big = big.split("").reverse();
        var oneMutManyRes = [];
        var i = 0,
            len = big.length;
        for (; i < len; i++) {
            oneMutManyRes[oneMutManyRes.length] = this.oneMutMany(big[i], common) + this.getLenZero(i);
        }
        var result = oneMutManyRes[0];
        for (i = 1, len = oneMutManyRes.length; i < len; i++) {
            result = this.bigNumAdd(result, oneMutManyRes[i]);
        }
        return result;
    },
    getLenZero(len) {
        len += 1;
        var ary = [];
        ary.length = len;
        return ary.join("0");
    },
    oneMutMany(one, many) {
        one += "";
        many += "";
        if (one.length != 1) {
            one = [many, many = one][0];
        }
        one = parseInt(one, 10);
        var i = 0,
            len = many.length,
            resAry = [],
            addTo = 0,
            curItem,
            curRes,
            toSave;
        many = many.split("").reverse();
        for (; i <= len; i++) {
            curItem = parseInt(many[i] || 0, 10);
            curRes = curItem * one + addTo;
            toSave = curRes % 10;
            addTo = (curRes - curRes % 10) / 10;
            resAry.unshift(toSave);
        }
        if (resAry[0] == 0) {
            resAry.splice(0, 1);
        }
        return resAry.join("");
    },
    bigNumAdd(big, common) {
        big += "";
        common += "";
        var maxLen = Math.max(big.length, common.length),
            bAry = big.split("").reverse(),
            cAry = common.split("").reverse(),
            i = 0,
            addToNext = 0,
            resAry = [],
            fn,
            sn,
            sum;
        for (; i <= maxLen; i++) {
            fn = parseInt(bAry[i] || 0);
            sn = parseInt(cAry[i] || 0);
            sum = fn + sn + addToNext;
            addToNext = (sum - sum % 10) / 10;
            resAry.unshift(sum % 10);
        }
        if (resAry[0] == 0) {
            resAry.splice(0, 1);
        }
        return resAry.join("");
    },

    bigNumPow(big, common, n) { //big是初始被乘数，common是乘的整数，n是幂次数 
        let i = 0
        let a = big;
        while (i < n) {
            a = this.bigMut(a, common);
            i++;
        }
        return a;
    },

    bigNumPow_float_accurate(big, common, n, count) { //big是初始被乘数，common是乘的整数，n是幂次数，count小数点后的位数
        let a = this.bigNumPow(big, common, n);
        let a1 = a.slice(0, a.length - n * count);
        let a2 = a.slice(a.length - n * count);
        a = a1 + '.' + a2;
        return a;
    },

    bigNumPow_float(big, common, n, count) { //big是初始被乘数，common是乘的整数，n是幂次数，count小数点后的位数
        let a = this.bigNumPow(big, common, n);
        let a1 = a.slice(0, a.length - n * count);
        // let a2 = a.slice(a.length - n * count);
        return a1;
    },

    //取数值的字符串
    number2formatString(value) {
        value = value ? value : "";
        value = value + "";

        let arr = value.split(".");
        value = arr[0];

        let len = value.length;
        let startpos = len;
        let jinweishu = 0;
        if (len > 6) {
            jinweishu = Math.ceil(len / 3) - 2;
            startpos = len - jinweishu * 3;
        }

        let a_arr = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y', 'B', 'N', 'D'];
        //确定单位
        let tailstr = a_arr[jinweishu] ? a_arr[jinweishu] : "";
        let inum = 0;
        let resultstr = "";
        for (let i = 0; i < startpos; i++) {
            if (inum == 3) {
                resultstr = ',' + resultstr;
                inum = 0;
            }
            resultstr = value[startpos - i - 1] + resultstr;
            inum = inum + 1;

        }

        return resultstr + tailstr;
    },

    /**向量计算相关 */
    convertVecToRadian(vec) {
        return vec.signAngle(cc.v2(0, 1));
    },
    convertVecToDegree(vec) {
        return 180 / Math.PI * (this.convertVecToRadian(vec));
    },
    // 节点坐标转世界坐标
    convertToWorldSpaceAR(node) {
        return node.parent.convertToWorldSpaceAR(node.position);
    },

    // 节点坐标转画布坐标
    convertToCanvasPosition(node) {
        let pos = this.convertToWorldSpaceAR(node);
        return pos.sub(cc.v2(cc.winSize.width / 2, cc.winSize.height / 2));
    },

    /**
     * 获取弧度
     * @param {cc.v2} p1 目标坐标
     * @param {cc.v2} p2 当前坐标
     * return 当前坐标的弧度
     */
    getDegree(p1, p2) {
        let x = p2.x - p1.x;
        let y = p2.y - p1.y;
        let degree = Math.atan(x / y) * 180 / Math.PI;
        if (y < 0) {
            if (x < 0) {
                degree = 180 + Math.abs(degree);
            } else {
                degree = 180 - Math.abs(degree);
            }
        }
        return degree;
    }
};