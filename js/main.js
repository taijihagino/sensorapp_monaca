// This is a JavaScript file

// デバイスの情報を取得
var deviceInfo = function() {
    document.getElementById("platform").innerHTML = device.platform;
    document.getElementById("version").innerHTML = device.version;
    document.getElementById("uuid").innerHTML = device.uuid;
    document.getElementById("name").innerHTML = device.name;
    document.getElementById("width").innerHTML = screen.width;
    document.getElementById("height").innerHTML = screen.height;
    document.getElementById("colorDepth").innerHTML = screen.colorDepth;
};

// 位置（緯度経度）を取得
var getLocation = function() {
    var suc = function(p) {
        alert(p.coords.latitude + " " + p.coords.longitude);
    };
    var locFail = function() {
    };
    navigator.geolocation.getCurrentPosition(suc, locFail);
};

// バイブレーターを起動
var vibrate = function() {
    navigator.notification.vibrate(500);
};

// 加速度用の値を３桁に丸める
function roundNumber(num) {
    var dec = 3;
    var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    return result;
}

// 加速度取得時に使う変数
var accelerationWatch = null;

// 加速度を取得
function updateAcceleration(a) {
    document.getElementById('x').innerHTML = roundNumber(a.x);
    document.getElementById('y').innerHTML = roundNumber(a.y);
    document.getElementById('z').innerHTML = roundNumber(a.z);
}

// 加速度を取得し値を都度更新
var toggleAccel = function() {
    if (accelerationWatch !== null) {
        navigator.accelerometer.clearWatch(accelerationWatch);
        updateAcceleration({
            x : "",
            y : "",
            z : ""
        });
        accelerationWatch = null;
    } else {
        var options = {};
        options.frequency = 1000;
        accelerationWatch = navigator.accelerometer.watchAcceleration(
                updateAcceleration, function(ex) {
                    alert("accel fail (" + ex.name + ": " + ex.message + ")");
                }, options);
    }
};

// カメラを起動
function snapPicture () {
        navigator.camera.getPicture (onSuccess, onFail, 
            { quality: 50, destinationType: Camera.DestinationType.DATA_URL});

        // 撮影が成功した時のコールバック関数
        function onSuccess (imageData) {
            var image = document.getElementById ('picture');
            image.src = "data:image/jpeg;base64," + imageData;
        }

        // 撮影が失敗した時のコールバック関数
        function onFail (message) {
            alert ('Error occured: ' + message);
        }
    }

// ネットワークの種類を判断
function check_network() {
    var networkState = navigator.network.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';

    confirm('Connection type:\n ' + states[networkState]);
}

// 画面が読み込まれた時に呼び出される処理
function init() {
    document.addEventListener("deviceready", deviceInfo, true);
}