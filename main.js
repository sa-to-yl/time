(function(){
    'use strict';

    let timer = document.getElementById('timer');
    let start = document.getElementById('start');
    let stop = document.getElementById('stop');
    let reset = document.getElementById('reset');
    //クリック時の時間を保持
    let startTime;
    //経過時刻を更新
    let elapsedTime = 0;
    //タイマーを止めるclearTimeoutに渡すID
    let timeId;
    //タイマーをストップ、再開させたら0になるのを避けるための変数
    let timeToadd = 0;
    //分秒に直す関数
    function updateTimetText(){
        let m = Math.floor(elapsedTime / 60000);
        let s = Math.floor(elapsedTime % 60000 / 1000);
        m = ('0' + m).slice(-2); 
        s = ('0' + s).slice(-2);
        timer.textContent = m + ':' + s ;
    }
    function countUp(){
        timeId = setTimeout(function(){
            elapsedTime = Date.now() - startTime + timeToadd;
            updateTimetText()
            countUp();
        },1000);
    }
  function setButtonStateInitial() {
    start.disabled = false;
    stop.disabled = true;
    reset.disabled = true;
  }
  function setButtonStateRunning() {
    start.disabled = true;
    stop.disabled = false;
    reset.disabled = true;
  }
  function setButtonStateStopped() {
    start.disabled = false;
    stop.disabled = true;
    reset.disabled = false;
  }
  setButtonStateInitial();
    start.addEventListener('click',function(){
　　　　setButtonStateRunning();
        startTime = Date.now();
        countUp();
    });
    stop.addEventListener('click',function(){
　　　setButtonStateStopped();
       clearTimeout(timeId);
       timeToadd += Date.now() - startTime;
    });
    reset.addEventListener('click',function(){
　　　　setButtonStateInitial(); 
        elapsedTime = 0;
        //リセット時に0に初期化
        timeToadd = 0;
        updateTimetText();
    });
})();