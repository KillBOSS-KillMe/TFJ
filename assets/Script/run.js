cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // 手机点击事件
        this.node.on('touchstart', function ( event ) {
            // 场景切换--进入关卡选择场景
            cc.director.loadScene("LevelList");
        });

    },
// backgroundColor: '#ff0000',
    start () {
        // 获取用户信息按钮生成
        this.getUserInfoButton();
        // this.getcode();
        // this.sendHttpGet();
        // this.sendHttpPost();
    },

    // update (dt) {},
    getUserInfoButton() {
        var button = wx.createUserInfoButton({
            type: 'text',
            text: '获取用户信息',
            // image: 'https://images0.cnblogs.com/blog2015/340216/201505/051947109386654.png',
            style: {
                left: this.node.width / 2,
                top: 600,
                width: 200,
                height: 40,
                lineHeight: 40,
                color: '#ffffff',
                backgroundColor: '#ff0000',
                textAlign: 'center',
                fontSize: 16,
                borderRadius: 4,
            }
        })
        button.show();
        button.onTap( res => {
            console.log(res)
            var userInfo = res.userInfo;
            wx.login({
                success: res2 => {
                    var code = res2.code;
                    this.updateUserInfo(userInfo, code, button);
                }
            })
        })
    },
    // 获取code
    // getcode(){
    //     wx.login({
    //         success(res){
    //             console.log('-----------------')
    //             console.log(res)
    //         }
    //     })
    // },
    // 提交用户信息
    updateUserInfo(userInfo, code, button) {
        // 隐藏授权/获取用户信息按钮
        button.hide();
        var self = this;
        var request = cc.loader.getXMLHttpRequest();
        var url = `http://hongbao?code=${code}&nickName=${userInfo.nickName}&avatarUrl=${userInfo.avatarUrl}`;
        console.log(url)
        request.open("POST", url, true);
        // header设置
        request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        request.onreadystatechange = () => {
            if (request.readyState == 4 && (request.status >= 200 && request.status < 300)) {
                var response = request.responseText;
                console.log('POST');
                console.log(response);
                var responseJson = JSON.parse(response);
                // 获取关卡数据信息
                window.levelList = responseJson["data"];
                window.userInfo = responseJson["data"];
                // 隐藏授权/获取用户信息按钮
                button.hide();
                // 进入关卡选择场景
                cc.director.loadScene("LevelList");
            }
        }
        request.send();
    },
    // GET实例(不参与调用执行)
    sendHttpGet() {
        var self = this;
        var request = cc.loader.getXMLHttpRequest();
        var url = 'https://hongbao.test/api/activity/store';
        // var formData = new FormData();
        // formData.append("serialnumber", 111111);
        request.open("GET", url, true);
        // header设置
        request.setRequestHeader('mingzi0', '111');
        request.setRequestHeader('mingzi1', '222');
        request.setRequestHeader('mingzi2', '333');
        request.onreadystatechange = () => {
            if (request.readyState == 4 && (request.status >= 200 && request.status < 300)) {
                var response = request.responseText;
                console.log('get');
                console.log(response);
                var responseJson = JSON.parse(response);
                self.httpGetRes.String = responseJson["headers"]["Accept-Encoding"]
            }
        }
        request.send();
    },
    // POST实例(不参与调用执行)
    sendHttpPost() {
        var self = this;
        var request = cc.loader.getXMLHttpRequest();
        var url = 'http://hongbao.test/api/activity/store';
        request.open("POST", url, true);
        
        // header设置
        // request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        request.setRequestHeader('mingzi0', '111');
        request.setRequestHeader('mingzi1', '222');
        request.setRequestHeader('mingzi2', '333');
        request.onreadystatechange = () => {
            if (request.readyState == 4 && (request.status >= 200 && request.status < 300)) {
                var response = request.responseText;
                console.log('POST');
                console.log(response);
                var responseJson = JSON.parse(response);
                self.httpGetRes.String = responseJson["data"];
            }
        }
        request.send(new Uint8Array(1,2,3));
    },
});
