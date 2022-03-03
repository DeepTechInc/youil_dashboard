/** 공통 사용 ajax  */

/**
 * fileUpload
 * 파일 업로드
 * @param formId : 폼 아이디
 *      , uploadUrl : url
 *      , atchTypCd : 첨부파일 유형 코드
 *      , fileDelList : 파일 삭제 리스트
 *      , data : 저장 데이터
 *      , url : 데이터 저장 url
 *      , moveUrl : 저장 후 이동 url
 */
function fileUpload(UploadObj){
    if(UploadObj.mode != "portal"){
        if(!getSession()){
            return;
        }
    }

    var form = $('#'+UploadObj.formId)[0]

    var uploadData = new FormData(form);
    uploadData.append("atch_typ_cd", UploadObj.atchTypCd);
    uploadData.append("fileDelList", UploadObj.delList);

      //fileId가 있다면 해당 데이터에 file전부 삭제후 다시 저장

      $.ajax({
          type: "POST",
          enctype: 'multipart/form-data',
          url: UploadObj.uploadUrl,
          data: uploadData,
          processData: false,
          contentType: false,
          cache: false,
          timeout: 600000,
          success: function (result) {
             if(result.length == 0){
                  alert("파일확장자를 확인하세요.");
                  return;
              }else{
                  if(UploadObj.mode == "portal"){
                      uploadSave(UploadObj.data, UploadObj.sendType, UploadObj.url, UploadObj.moveUrl, result);
                  }else{
                      UploadObj.data.file_id = result;
                      basSave(UploadObj.data, UploadObj.sendType, UploadObj.url, UploadObj.moveUrl);
                  }
              }
          },
          error: function (e) {
              alert('fail');
                  }
       });
}

/* uploadSave
 * 파일 업로드 성공 후 데이터 저장 ajax
 * */
function uploadSave(data, sendType, url, moveUrl, fileIdList) {
    $.ajax({
        type : sendType,
        url : url,
        async : false,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data:  {data: JSON.stringify(data), fileIdList : JSON.stringify(fileIdList)},
        success : function(result) {
               if(result.flag == "save") {
                   saveAfter(result.ancm_id);
               } else {
                   alert(result);
               }
        },
        error : function(error) {
            alert(error.status + " " + error.statusText);
        }
    });
}

/**
 * getFileList
 * 저장된 파일리스트 조회
 * @param fileIdx : 파일 인덱스
 */
function getFileList(param){
    var url = param.url == null && param.url == undefined ? "/file/list" : param.url;
    $.ajax({
        type : "post",
        url : url,
        data : param,
        dataType : "json",
        async:false,
        success : function(data) {
            if(data.list.length > 0){
                /* param.mode
                 * ancm : portal
                 * 없음 : wms 파일 목록
                 * */
                if(param.mode == "portal"){
                    callback_fileList2(data.list,"admin");
                }else if(param.mode == "ask"){
                    callback_fileList2(data.list,"portal");
                } else{
                    callback_fileList(data.list);
                }
            }else{
                $(".file-down-list").css("display","none");
            }
        },
        error : function(error) {
            alert(error.status + " " + error.statusText);
        }
    });
}

/**
 * callback_fileList
 * 조회된 파일리스트 표출
 * @param fileDataList : 파일 리스트
 */
function callback_fileList(fileDataList){

    var file_obj = {
              key : 0
            , file_id : fileDataList[0].file_id
        };
        fileList.push(file_obj);

        $(".file-list").append("<div><span>"+fileDataList[0].file_nm+"</span><button type='button' class='f-del-btn' onclick=\"setfileDeleteOne('"+fileDataList[0].file_id+"')\"> X </button><div>");
}

function callback_fileList2(fileDataList,mode){

    if(mode == "admin"){
        for(var i=0; i<fileDataList.length; i++){
            $(".file-down-list").append("<a href='/file/admin-download?file_id="+fileDataList[i].file_id+"'>"+fileDataList[i].file_nm+"</a>")
            $(".file-list").append("<a href='/file/admin-download?file_id="+fileDataList[i].file_id+">"+fileDataList[i].file_nm+"</a>")
        }
    }else{
        for(var i=0; i<fileDataList.length; i++){
            $(".file-down-list").append("<a href='/file/download?file_id="+fileDataList[i].file_id+"'>"+fileDataList[i].file_nm+"</a>")
            $(".file-list").append("<a href='/file/download?file_id="+fileDataList[i].file_id+">"+fileDataList[i].file_nm+"</a>")
        }
    }

}

/** 기준정보 저장 */
function basSave(data, sendType, url, moveUrl, fileDataDel) {
    if(!getSession()){
        return;
     }
    $.ajax({
        type : sendType,
        url : url,
        async : false,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
       data:  data,
        success : function(result) {
               if(result == "save") {
                   alert("저장되었습니다.");
                   movePage(moveUrl);
               } else {
                   alert(result);
               }
        },
        error : function(error) {
            alert(error.status + " " + error.statusText);
        }
    });
}

/** 마스터, 디테일 리스트 저장 */
function ajaxInsertMethod(url, data, sendType){
    if(!getSession()){
        return;
     }
    $.ajax({
        type : sendType,
        url : url,
        data : data,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        success : function(result) {

            if(result.saveKey == "save"){
                callback_Dtlinsert(result.value); // 상세정보 저장
            }else{
                alert(result.saveKey);
            }

        },
        error : function(request, status, error) {
            alert("code = "+ request.status + " message = " + request.responseText + " error = " + error);
        }

    });
}


/** 단일 데이터 조회
 * mode : dashboard화면 데이터 표출 구분을 위한 param*/
function dataSearch (url, data, sendType, mode, flag) {
    if(flag != "portal"){
        if(!getSession()){
            return;
        }
    }
    $.ajax({
        url       : url,
        data    : data,
        dataType:"JSON",
        cache   : false,
        async   : true,
        type    : sendType,
        success : function(obj) {
            if(typeof obj.error != "undefined"){
                alert("시스템 오류가 발생하였습니다. 관리자에게 문의하세요. " + obj.error.message);
                return;
            }

            //단일 데이터 표출
            callback_tableList(obj.list, obj.cnt, mode);
        },
        error: function(xhr, status, error) {
            alert(xhr + status + error);
        }
     });
}

/** 리스트 데이터 조회 */
var pageObj = {};
var btnList = [];
var sttBtn = 0;
var endBtn = 0;
var p_mode = "";
function listSearch (url, data, sendType, pageLength, currentPage, call,mode) {
    p_mode = mode;
    if(p_mode != "portal"){
        if(!getSession()){
            return;
         }
    }
    //리스트 페이징
    data.page = currentPage == undefined ? 1 : currentPage;
    data.pageSize = pageLength;

    //메인화면 조회 시 조회 가능범위chk
    if(!call){
        var end_date = new Date($("#end_dt").val());
        var min_date = new Date($("#end_dt").val());
        min_date.setMonth(end_date.getMonth() - 3);

        var stt_date = new Date($("#stt_dt").val());
        if(min_date > stt_date){
            alert("최대 조회 가능기간은 3개월 입니다.");
            return;
        }
    }

    $.ajax({
        url     : url,
        data    : data,
        dataType:"JSON",
        cache   : false,
        async   : true,
        type    : sendType,
        success : function(obj) {
            if(typeof obj.error != "undefined"){
                alert("시스템 오류가 발생하였습니다. 관리자에게 문의하세요. " + obj.error.message);
                return;
            }
            pageObj = {
                      allList : obj.list
                    , url:  url
                    , cnt : obj.cnt
                    , perPage : pageLength //한페이지당 리스트 수
                    , currentPage : data.page //현재 페이지
                    , totlBtnCnt : Math.ceil(obj.cnt/pageLength) //총 버튼리스트 수
            };

            //페이징 버튼 클릭 X
            if(!call){
                sttBtn = 0;
                endBtn = pageObj.totlBtnCnt < 5 ? pageObj.totlBtnCnt : 5;
            }

            if(obj.cnt > 0){
                //페이지 리스트 표출
                $('.paging').css("display","block");
                pageBtnList(pageObj.allList,pageObj.cnt);
            }else{
                createTable(0,0);
                $('#totalCnt').text(0);
                $('.paging').css("display","none");
            }
        },
        error: function(xhr, status, error) {
            alert(xhr + status + error);
        }
     });
}
/** 리스트 데이터 조회- 페이징 none
 * mode : call => 마스터 테이블에서 상세테이블을 조회 할 경우
 *        srch => 상세테이블 내에 검색조건으로 조회 할 경우
 * 	      (두가지 경우 외 생략 가능)
 *
 * */
function scrollListSearch (url, data, sendType, mode, flag) {

    if(flag != "portal"){
        if(!getSession()){
            return;
        }
    }
    $.ajax({
        url     : url,
        data    : data,
        dataType:"JSON",
        cache   : false,
        async   : true,
        type    : sendType,
        success : function(obj) {
            if(typeof obj.error != "undefined"){
                alert("시스템 오류가 발생하였습니다. 관리자에게 문의하세요. " + obj.error.message);
                return;
            }
            subCreateTable(obj.list,obj.cnt,mode);
        },
        error: function(xhr, status, error) {
            alert(xhr + status + error);
        }
     });
}

/*
 * ====================================================
 * 페이징 처리 start
 * ====================================================
 * */
/**
 * pageBtnList
 * 페이징 버튼 리스트 set
 * */
function pageBtnList(allList,cnt){
    //table show
    createTable(allList,cnt);

    var html = "";
    btnList = [];
    for (var i=sttBtn; i<endBtn; i++) {
        btnList.push({
            btn_num : i+1
        });
    }

    for(var i=0; i<btnList.length; i++){
        html += '<a class="btn_num" id="page-btn' + btnList[i].btn_num + '" onclick=\'onChangePagingBtn(this,"'+btnList[i].btn_num+'")\'>'+ btnList[i].btn_num + '</a>';
    }

    //wms :id & portal : class
    $("#page-num,.page-num").empty();
    $("#page-num,.page-num").append(html);

    // 현재 페이지 버튼에 클래스 추가
    $("a[id=page-btn" + pageObj.currentPage + "]").addClass("current");

    if($('#page-num').hasClass('hstr')){
        $('.btn_num').not('.current').css('display', 'none');
        if(selecInfo.page == pageObj.currentPage) $('#hstr_main_tbody tr').eq(selecInfo.indx).addClass('bg');
    }
}

/**
 * onChangePagingBtn
 * 페이징 리스트 버튼 클릭
 * */
function onChangePagingBtn(obj, indx){
    var Id = obj.getAttribute("class");

    if (Id == 'next') {
        //페이지 버튼 수 까지
        if(pageObj.currentPage < pageObj.totlBtnCnt){
            //버튼 리스트 표출 범위 변경 => 리스트의 마지막 버튼일 경우
            if(pageObj.currentPage % 5 == 0){
                sttBtn = Number(pageObj.currentPage);
                endBtn = Number(pageObj.totlBtnCnt) < (sttBtn + 5) ? Number(pageObj.totlBtnCnt) : (sttBtn + 5); //총 버튼 리스트 수 비교
            }
            pageObj.currentPage = Number(pageObj.currentPage) + 1;
        }else{
            return;
        }
    } else if (Id == 'prev') {
        //페이지 버튼 수 까지
        if(pageObj.currentPage > 1){
            //버튼 리스트 표출 범위 변경 => 리스트의 첫번째 버튼일 경우
            if((pageObj.currentPage-1) % 5 == 0){
                sttBtn = Number(pageObj.currentPage)-6;
                endBtn = Number(pageObj.currentPage)-1;
            }
            pageObj.currentPage = Number(pageObj.currentPage) - 1;
        }else{
            return;
        }
    } else if (Id == 'first') {
        pageObj.currentPage = 1;
        sttBtn = 0;
        endBtn = endBtn = Number(pageObj.totlBtnCnt) < 5 ? Number(pageObj.totlBtnCnt) : 5;
    } else if (Id == 'last') {
        pageObj.currentPage = Number(pageObj.totlBtnCnt);
        sttBtn = Math.ceil(Number(pageObj.totlBtnCnt)/5)*5 - 5;
        endBtn = Number(pageObj.totlBtnCnt);
    } else {
        pageObj.currentPage = indx;
    }
    //dataSrch
    listSearch(pageObj.url, data, "POST", pageObj.perPage, pageObj.currentPage,"btnClick",p_mode);
}
/*
 * ====================================================
 * 페이징 처리 end
 * ====================================================
 * */
/**
 * xlsDataSave
 * 엑셀업로드 데이터 저장
 * */
function xlsDataSave(excelDataList,url,paramType){
    if(!getSession()){
        return;
     }
    var saveData = paramType == "map" ? excelDataList : {dataList : JSON.stringify(excelDataList)};

    $.ajax({
        type : "post",
        url : url,
        async : true,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        dataType: "JSON",
        data:  saveData,
        success : function(result) {
               if(result == "save") {
                   //로딩 done
                   $(".loader").css("display","none");
                   alert("저장되었습니다.");
                   movePage();
               } else {
                   alert(result);
               }
        },
        error : function(error) {
            alert(error.status + " " + error.statusText);
        }
    });
}
/**
 * xlsDataMstSave
 * 엑셀업로드 마스터 데이터 저장
 * */
function xlsDataMstSave(excelDataList,url){
    if(!getSession()){
        return;
     }
    $.ajax({
        type : "post",
        url : url,
        async : true,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        dataType: "JSON",
        data:  {dataList : JSON.stringify(excelDataList)},
        success : function(result) {
            saveMstList = result.slice();
            dtlDataSet();
        },
        error : function(error) {
            alert(error.status + " " + error.statusText);
        }
    });
}

/**
 * xlsDataDtlSave
 * 엑셀업로드 상세 데이터 저장
 * */
function xlsDataDtlSave(excelDataList,url){
    $.ajax({
        type : "post",
        url : url,
        async : true,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        dataType: "JSON",
        data:  {dataList : JSON.stringify(excelDataList)},
        success : function(result) {
            if(result == "save"){
                 //로딩 done
                $(".loader").css("display","none");
                alert("저장되었습니다.");
                movePage();
            }else{
                alert(result);
            }
        },
        error : function(error) {
            alert(error.status + " " + error.statusText);
        }
    });
}


/**
 * cd_set콤보박스 cd리스트 조회
 * param : cd_set_cd
 */
function getDoprDownList(param){
    var url_p = param.url || "/syst-admn/cd-drop-list";
    $.ajax({
        type : "post",
        url : url_p,
        data : param,
        dataType : "json",
        async:false,
        success : function(data) {

            var selectEl = document.querySelector("#"+param.id);

            $("#"+param.id).empty();

            if(param.page == "main"){
                var objOption = document.createElement("option");
                objOption.value = "";
                objOption.text = "전체";
                selectEl.options.add(objOption);
            } else if(param.page =="input") {
                var objOption = document.createElement("option");
                objOption.value = "";
                objOption.text = "선택";
                selectEl.options.add(objOption);
            }

            for(var i=0; i< data.list.length; i++){
                var objOption = document.createElement("option");
                objOption.value = data.list[i].cd;
                objOption.text = data.list[i].cd_nm;
                selectEl.options.add(objOption);
            }
        },
        error : function(error) {
            alert(error.status + " " + error.statusText);
        }
    });
}

/**
 * getSession
 * 세션조회
 */
function getSession(){
    var session = true;
    $.ajax({
        type : "POST",
        url : "/lgn/get-session",
        async : false,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
       data:  {},
        success : function(result) {
            if(result == null || result == ""){
                alert("세션이 만료되었습니다.");
                movePage("/login");
                session = false;
            }
        },
        error : function(error) {
            alert(error.status + " " + error.statusText);
        }
    });
    return session;
}
/**
 * openPopup
 * 팝업 오픈
 */
function openPopup(src_p,width_p,height_p){
    if(!getSession()){
        return;
     }

     $.fancybox.open({
         src  : src_p,
         type : 'iframe',
         opts : {
             iframe : {
                 css : {
                     width : width_p
                     ,height : height_p
                 }
             }
         }
     });
}