let campus3 = document.getElementById("campus3");
let campus4 = document.getElementById("campus4");
let campus5 = document.getElementById("campus5");

//==========================1.評價系統================================
let isClicked = false;
let RankCount = 0;
let RankTotal = 0;

$("#picStars img").hover(ranked, unRanked)
.click(function (){
    if (isClicked) return;
    let i = $(this).index()+1;
    RankCount++;
    RankTotal += i;
    ranked();
    changeRankHistory(i);
    isClicked = true;
})
.dblclick(function () {
    if (!isClicked) return;
    unRanked();
    isClicked = false;
});

// $("#picStars img").on({
//     hover:function(){ranked(), unRanked()},
//     click:function(){
//         if (isClicked) return;
//     let i = $(this).index()+1;
//     RankCount++;
//     RankTotal += i;
//     ranked();
//     changeRankHistory(i);
//     isClicked = true;
//     },
//     dblclick:function(){
//         if (!isClicked) return;
//         unRanked();
//         isClicked = false;
//     }
// });

function ranked() {
    if (isClicked) return;
    $(this).css({ borderColor: "aqua", borderRadius: "50%" }).attr("src", "images/dalala.gif")
        .prevAll().css({ borderColor: "aqua", borderRadius: "50%" }).attr("src", "images/dalala.gif")
        .end().nextAll().css({ borderColor: "red", borderRadius: "0" }).attr("src", "images/bulala.gif");
};

function unRanked() {
    if (isClicked) return;
    $(this).parent().children().css({ borderColor: "gray", borderRadius: "20px" }).attr("src", "images/wzs.gif");;
};

function changeRankHistory(i) {
    $("#preStars1").text(`您本次評價： ${i} 星。`);
    $("#preStars2").text(`評價次數： ${RankCount} 次。`);
    var f = Math.round(RankTotal * 10 / RankCount) / 10;
    $("#preStars3").text(`平均星數： ${f} 星。`);
};
//==========================2.廣告輪播================================
let divM = document.getElementById("divMainImg");
let divS = document.getElementById("divSubImg");
let arrayUrl = ["https://twitter.com/fromsoftware_pr","https://twitter.com/Pesoguin1?lang=ja", "https://twitter.com/Zanmyo?lang=ja", "https://twitter.com/pesoguin", "https://mobile.twitter.com/95rn16"];
let len = arrayUrl.length;
let frameIndex = 2;
let dx = 0;
let isStop = false;
// let moveDirection = [false, false, true];
// for (let i = 0; i < len; i++) {
//     if (i == 1)
//         divM.innerHTML += `<a id="url${i}" href="${arrayUrl[i + 1]}" target="_blank"><img id="imgM${i}" class="imgM" src="images/cm0${i + 1}.jpg"/></a>`;
//     else if (i < 3) {
//         divM.innerHTML += `<img id="imgM${i}" class="imgM" src="images/cm0${i + 1}.jpg" onclick="moveImg(${moveDirection[i]})" />`;
//     }
//     divS.innerHTML += `<img id="imgS${i}" class="imgS" src="images/cm0${i}.jpg" onmouseover="mouseOverImg(${i})"/>`;
// }

function movingAnime(i, direction) {
    setTimeout(resetClass, 300, i);
    if(direction) $(".imgM").addClass("moveAnimeN")
    else $(".imgM").addClass("moveAnimeP")

    // let pics = document.querySelectorAll(".imgM");
    // if (direction) pics.forEach(x => x.classList.add("moveAnimeN"))
    // else pics.forEach(x => x.classList.add("moveAnimeP"))
}

function resetClass(i) {
    $(".imgM").attr("class","imgM");
    mouseOverImg(i)
    
    // let pics = document.querySelectorAll(".imgM");
    // pics.forEach(x => x.className = "imgM");
}

function mouseOverImg(i) {

    $(".imgM").each(function(j,ele){
        let index=i+j+dx;
    if (index >= len) index -= len; 
    else if (index < 0) index += len;  

    $(ele).attr("src",`images/cm0${index}.jpg`)
    if (j == 1) $("#url2").attr("href",`${arrayUrl[index]}`)
    })

    // let index=i+dx-1;
    // for (let j = 0; j < 3; j++) {
    //     let index = i + j +dx - 1;
    //     if (index >= len) index -= len;
    //     else if (index < 0) index += len;
    //     document.getElementById("imgM" + j).src = "images/cm0" + index + ".jpg";
    //     if (j == 1)     document.getElementById("url2").href = arrayUrl[index];  
    // }
    changeFrame(i);
}
mouseOverImg(frameIndex);

function changeFrame(index) {
    for (let i = 0; i < len; i++) {
        document.getElementById("imgS" + i).className = "imgS";
        if (i==index) {
            document.getElementById("imgS" + i).classList.add("imgFrame");
        }
    }
    frameIndex = index;
}

function interval() {
    imgTimer = setInterval(moveImg, 2800,true)
}
interval();

function moveImg(direction) {
    setDx(direction);
    for (let i = 0; i < len; i++) {
        let index = i + dx;
        if (index >= len) index -= len;
        document.getElementById("imgS" + i).src = "images/cm0" + index + ".jpg";
    }
    movingAnime(frameIndex,direction);
}

function setDx(direction) {
    if (direction) dx = dx == 4 ? 0 : dx + 1;
    else dx = dx == 0 ? 4 : dx - 1 ;
}

document.getElementById("nextImg").onclick = () => forBtnMove(true);
document.getElementById("preImg").onclick = () => forBtnMove(false);

function forBtnMove(RL) {
    moveImg(RL);
    if (isStop) return;
    clearInterval(imgTimer);
    interval();
}

document.getElementById("resetFrame").onclick = () => {
    frameIndex = parseInt(len / 2);
    mouseOverImg(frameIndex);
}

document.getElementById("stopMove").onclick = function(){
    if (isStop) {
        stopOrRun(isStop);
        this.textContent = "暫停輪播"
    } else {
        stopOrRun(isStop);
        this.textContent = "繼續輪播"
    }
    isStop = !isStop;
}

document.getElementById("divMainImg").onmouseout = () => {
    if (isStop) return;
    stopOrRun(true);
}

document.getElementById("divMainImg").onmouseover = () => {
    if (isStop) return;
    stopOrRun(false);
}

function stopOrRun(sOR) {
    if (sOR) {
        interval();
        document.getElementById("bookMark4").innerText = "2、廣告輪播"
    }
    else {
        clearInterval(imgTimer);
        document.getElementById("bookMark4").innerText = "2、廣告輪播(暫停中)"
    }
}
//=========================================================














