/* ======================================================================
// 파  일  명 : working.js
// 기      능 : 처리중 화면
// 최초작성일 : 2006.07.26
// 작  성  자 :
// 버젼  정보 : 1.0
// 설      명 : 처리중 화면에 관련된 기능
//
// 수정사항 :
====================================================================== */
var bIsBlock = false;

//페이지에 처리중 페이지 설정
function gf_setWorking(){
    var divObj1 = document.createElement("div");
    divObj1.className = "ly_loading";
    divObj1.id = "if_Working";

    var divObj2 = document.createElement("div");
    divObj2.className = "ly_cont";

    var imgObj = new Image();
    imgObj.src = "/common/images/main/img_loading.gif";
    imgObj.alt = "로딩중";

    $(divObj1).append($(divObj2).append(imgObj))
              .hide()
              .appendTo("body");

    divObj1 = null;
    divObj2 = null;
    imgObj = null;
}

//처리중 화면 활성/비활성 ..
// bIsBlock = true(활성),false(비활성)
function gf_setBlock(bIsBlock){
    this.bIsBlock = bIsBlock;

    if (bIsBlock) {
        $("#if_Working").show();
    } else {
        $("#if_Working").hide();
    }
}

//처리중 활성/비활성 여부 리턴
function gf_isWorking(){
    return this.bIsBlock;
}
