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
let arrayUrl = ["https://twitter.com/fromsoftware_pr","https://twitter.com/Pesoguin1?lang=ja", "https://twitter.com/Zanmyo?lang=ja", "https://twitter.com/pesoguin", "https://mobile.twitter.com/95rn16"];
let len = arrayUrl.length;
let frameIndex = 2;
let dx = 0;
let isStopped = false;

function movingAnime(i, direction) {
    setTimeout(resetClass, 300, i);
    if(direction) $(".imgM").addClass("moveAnimeN")
    else $(".imgM").addClass("moveAnimeP")
}

function resetClass(i) {
    $(".imgM").attr("class","imgM");
    mouseOverImg(i)
}

function mouseOverImg(i) {

    $(".imgM").each(function(j,ele){
        let index=i+j+dx-1;
    if (index >= len) index -= len; 
    else if (index < 0) index += len;  

    $(ele).attr("src",`images/cm0${index}.jpg`)
    if (j == 1) $("#url2").attr("href",`${arrayUrl[index]}`)
    })

    changeFrame(i);
}
mouseOverImg(frameIndex);

function changeFrame(index) {
    $(".imgS").attr("class", "imgS").each(function (i, ele) {
        if (i == index)
            $(ele).addClass("imgFrame");
    })

    frameIndex = index;
}

function interval() {
    imgTimer = setInterval(moveImg, 2800,true)
}
interval();

function moveImg(direction) {
    setDx(direction);
    $(".imgS").each(function (i, ele) {
        let index = i + dx;
        if (index >= len) index -= len;
        $(ele).prop("src", `images/cm0${index}.jpg`)
    })

    movingAnime(frameIndex,direction);
}

function setDx(direction) {
    if (direction) dx = dx == 4 ? 0 : dx + 1;
    else dx = dx == 0 ? 4 : dx - 1 ;
}

$("#nextImg").click(function () { forBtnMove(true) })
$("#preImg").click(function () { forBtnMove(false) })

function forBtnMove(RL) {
    moveImg(RL);
    if (isStopped) return;
    clearInterval(imgTimer);
    interval();
}

$("#resetFrame").click(function () {
    frameIndex = parseInt(len / 2);
    mouseOverImg(frameIndex);
})

$("#stopMove").click(function () {
    if (isStopped) {
        stopOrRun(isStopped);
        $(this).text("暫停輪播");
    } else {
        stopOrRun(isStopped);
        $(this).text("繼續輪播");
    }
    isStopped = !isStopped;
})

$("#divMainImg").mouseout(function () {
    if (isStopped) return;
    stopOrRun(true);
})
.mouseover(function () {
    if (isStopped) return;
    stopOrRun(false);
});

function stopOrRun(sOR) {
    if (sOR) {
        interval();
        $("#bookMark4").text("2、廣告輪播");
    }
    else {
        clearInterval(imgTimer);
        $("#bookMark4").text("2、廣告輪播(暫停中)");
    }
}
//=====================4.郵遞區號====================================
let selC=$("#selCity");
let selD=$("#selDistrict")
let divT=$("#divTable");

let isFirst=true;
selC.append("<option>選擇縣市</option>")

$(data).each(function(){
    $(this).each(function(i,c){
        //console.log(this.districts);
        selC.append(`<option>${c.name}</option>`)
        divT.append(`<div id=${i}>${c.name}</div>`)
        console.log(divT);
    })
})



selC.change(function(){
    if(isFirst){$("#selCity option:first").remove(); isFirst=false;}
    let index=selC.get(0).selectedIndex; 
    generatDis(index);
});

function generatDis(index){
    $.each(data,function(i,c){
        if(i==index){
            selD.text("");
            $(c.districts).each(function(i,d){
                console.log(d);
                selD.append(`<option>${d.name}</option>`)
            })
        }  
    })
};






















