
var main = document.getElementById("main");
var play = document.getElementById("play");
var score = document.getElementById("score");
var speedbox = document.getElementById("speed");
var speedUp = document.getElementById("speedUp");
var slowDown = document.getElementById("slowDown");
var pause = document.getElementById("pause");

// 计时器
var timer;
// 初始速度
var startspeed = 1;
// 速度
var speed = startspeed;
// 积分
var num = 0;

// 每行创建一个大div，再在里面创建4个小div，调用一次函数只创建一行div
function createNewDiv(classname) {

    var newrow = document.createElement("div");
    newrow.className = classname;
    for (var i = 0; i < 4; i++) {
        var blocks = document.createElement("div");
        newrow.appendChild(blocks);
    }

    // 如果游戏区域是空的，newrow应该放在后面;
    // 如果游戏区域不是空的，newrow应该插入到第一个之前去
    if (main.children.length == 0) {
        main.appendChild(newrow);
    }
    else {
        main.insertBefore(newrow, main.children[0]);
    }

    //给随机一个block加颜色
    index = Math.floor(Math.random() * 4)
    ind = Math.floor(Math.random() * 7)
    for (var i = 0; i < 4; i++) {
        if (i == index) {
            newrow.children[i].style.backgroundImage = "url('" + ind + ".png')";
            newrow.children[i].className = "i";
        }
        /*  else {
             newrow.children[i].style.backgroundColor = " rgb(34, 222, 209, 0.1)";
         } */
    }

}

function move(obj) {
    // 初始化 速度 和 分数
    // var startspeed = 1;
    // var speed = startspeed;
    // var num = 0;
    // 每20ms执行一次
    timer = setInterval(
        function () {
            // 获取对象top属性
            var y = parseInt(getComputedStyle(obj, null)['top']) + 0.01 * speed;
            obj.style.top = y + "px";
            if (parseInt(getComputedStyle(obj, null)['top']) >= 0) {
                createNewDiv("newrow");
                obj.style.top = -90 + "px";
            }

            // 进行判定
            if (obj.children.length >= 7) {
                for (var i = 0; i < 4; i++) {
                    if (obj.children[obj.children.length - 1].children[i].className == 'i') {
                        //游戏结束
                        obj.style.top = '-90px';
                        //关闭定时器
                        clearInterval(timer);
                        confirm("游戏结束，最高分：" + num);
                    }
                }
                //移除最下面一行
                obj.removeChild(obj.children[obj.children.length - 1]);
            }

            //点击和积分

            obj.onclick = function (event) {
                if (((event.target ? event.target : event.srcElement).className == 'i')
                    ||
                    ((event.target ? event.target : event.srcElement).className == 'k')) {
                    if ((event.target ? event.target : event.srcElement).className == 'i') {
                        //点击后的盒子颜色
                        (event.target ? event.target : event.srcElement).style.backgroundImage = "none";;
                        //清除盒子标记
                        (event.target ? event.target : event.srcElement).className = 'k';
                        //计分
                        num++;
                    }
                } else {
                    obj.style.top = '-90px';
                    clearInterval(timer);
                    confirm("游戏结束，最高分：" + num);
                }
                // 每积10分速度增加一次;
                if (num != 0 && num % 10 == 0) {
                    speed++;
                }
            }

            // 实时显示分数和速度
            score.children[1].innerHTML = num;
            speedbox.children[1].innerHTML = speed;
        }, 5);
}

speedUp.onclick = function () {
    speed++;
}
slowDown.onclick = function () {
    if (speed > 1) {
        speed--;
    }
}
var prespeed;
pause.statics = 0;
pause.onclick = function () {
    if (speed != 0) {
        prespeed = speed;
    }
    if (pause.statics == 0) {
        pause.statics = 1;
        speed = 0;
        pause.innerHTML = "go on";
    } else {
        pause.statics = 0;
        speed = prespeed;
        pause.innerHTML = "pause";
    }
}

play.onclick = function () {
    clearInterval(timer);
    startspeed = 1;
    speed = startspeed;
    if (main.children.length != 0) {
        // 游戏开始的时候清空main
        main.innerHTML = '';
    }
    //清空计分
    score.children[1].innerHTML = 0;
    num = 0;
    speed = 1;
    speedbox.children[1].innerHTML = 1;
    move(main);
}

