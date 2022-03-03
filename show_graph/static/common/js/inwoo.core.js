/*
 * ====================================================
 * upload start
 * ====================================================
 * */

var mode = null;//다중,단일 파일 첨부여부
var athc_typ = null; //파일첨부 확장자

/*
 * 변수명 fileDivcnt : [첨부파일] 라벨 이름을 변경하기 위해 사용하는 변수임. 첨부파일 추가할 때마다 +1된다.
 * (상세설명) 파일 업로드시 fileController에서 name=file이고 type=file인 input박스의 file 정보를 불러온다.(fileController > line 104)
 * 첨부파일 여러번 재추가할 경우, name=file이고 type=file인 input박스를 추가하여 [첨부파일] 버튼 누를 때마다 새로운 input에 파일정보가 꽂히도록 한다.
 * */
var fileDivcnt = 0;
/*
 * 변수명 fileCnt : 파일 리스트의 key값을 1,2,3... 순서대로 겹치지않도록 함.
 * (상세설명) name=file인 input박스의 파일정보 리스트와 사용자가 만든 리스트(fileList)를 비교하여 파일 인서트할 리스트를 뽑아낼 때
 * remove하는 인덱스 값이 정렬되어 있어야 제대로 가능함.(fileController > line 108)
 * */
var fileCnt = 0;

/**
 * uploadFormCreate
 * 파일 업로드 폼 생성
 * @param mode
 */
function uploadFormCreate(flag){
       mode = flag.multiple == true ? "multiple" : "";
       athc_typ = flag.athc_typ;

       '<a class="btn btn-primary text-light" role="button" aria-disabled="false">파일선택</a>' +

       $("#file-div").append(
                '<form name="fileForm2" method="post" enctype="multipart/form-data" id="mutipleUploadForm">' +
                    '<div class="file-list"></div>' +
                    '<div class="form-group">' +
                        '<label for="mutipleUpload" class="upload-label">' +
                            '<a class="m-btn sm upload-btn"  role="button" aria-disabled="false"><span>첨부파일</span></a>' +
                        '</label>' +
                        '<input name="file" type="file" id="mutipleUpload" style="margin: 10px 0px; display: none;" onchange="addFileList(this.id)"'+ mode +'>' +
                    '</div>' +
                '</form>'
        );
};

/**
 * uploadFormCreate
 * 파일 업로드 폼 생성
 * @param mode
 */
function uploadXlsFormCreate(flag){
       mode = flag.multiple == true ? "multiple" : "";
       athc_typ = flag.athc_typ;

       '<a class="btn btn-primary text-light" role="button" aria-disabled="false">파일선택</a>' +

       $("#xls-div").append(
                '<form name="fileForm2" method="post" enctype="multipart/form-data" id="xlsUploadForm">' +
                    '<div class="xls-file-list"></div>' +
                    '<div class="form-group">' +
                        '<label for="xlsUpload" class="upload-label">' +
                            '<a class="m-btn sm"  role="button" aria-disabled="false"><span>첨부파일</span></a>' +
                        '</label>' +
                        '<input name="file" type="file" id="xlsUpload" style="margin: 10px 0px; display: none;" onchange="addFileList(this.id)">' +
                    '</div>' +
                '</form>'
        );
};
/**
 * addFileList
 * 파일 업로드 리스트 조회
 */
function addFileList (id){
    var files= $("#"+id)[0].files;

      //첨부파일 개수
      if(mode != true && fileList.length == 1){
          alert("최대 1개의 파일을 첨부할 수 있습니다.");
          return;
      }

      //첨부파일 확장자
      var ext = $('#'+id).val().split('.').pop().toLowerCase();
      var atchArray = [];

      if(athc_typ == "img"){
          atchArray = ["bmp", "gif", "jpeg", "jpg", "png"];
      }else if(athc_typ == "xls"){
          atchArray = ["xls", "xlsx"];
      }else if(athc_typ == "imgxlstxt"){
          atchArray = ["bmp", "gif", "jpeg", "jpg", "png",
                       "doc", "docx", "ppt", "pptx", "xls", "xlsx",
                       "hwp", "html", "pdf", "txt"];
      }

      if($.inArray(ext, atchArray) == -1) {
          alert('첨부할 수 없는 파일형식입니다.');
          return;
       }

      for(var i= 0; i<files.length; i++){

          var file_obj = {
                key : fileCnt
              , data : files[i]
              , file_id : null
          };
          fileList.push(file_obj);
          fileCnt ++ ;
      }

      $(".xls-file-list").empty();
      $(".file-list").empty();

      for(var i=0; i<fileList.length; i++){
          if(id == "xlsUpload"){
              $(".xls-file-list").append("<div><span>"+fileList[i].data.name+"</span><button type='button' class='f-del-btn' onclick=\"fileDelete('"+i+"')\"> X </button><div>");
          }else{
              $(".file-list").append("<div><span>"+fileList[i].data.name+"</span><button type='button' class='f-del-btn' onclick=\"fileDelete('"+i+"')\"> X </button><div>");
          }
      }

      $("label[for=mutipleUpload"+fileDivcnt+"]").attr("for", "mutipleUpload"+(fileDivcnt+1)+"");

      fileDivcnt ++;

      $("#add-input").append('<input name="file" type="file" id="mutipleUpload'+fileDivcnt+'" style="margin: 10px 0px; display:none;" onchange="addFileList(this.id)"'+ mode +'>');

}
/**
 * fileDelete
 * 파일 리스트 삭제 (신규등록 시)
 * @param fileIdx : 파일 인덱스
 */
function fileDelete(fileIdx){

    if(mode != "multiple"){
        $("#mutipleUpload").val(null);
        $("#xlsUpload").val(null);
    }
    if(fileDelList){
        fileDelList += "," + fileList[fileIdx].key
    }else{
        fileDelList = 	fileList[fileIdx].key
    }

    fileList.splice(fileIdx,1);

    $(".file-list").empty();
    $(".xls-file-list").empty();

    for(var i= 0; i<fileList.length; i++){
        var file = fileList[i].data;
        $(".file-list").append("<div><span>"+file.name+"</span><button type='button' class='f-del-btn' onclick=\"fileDelete('"+i+"')\"> X </button><div>");
        $(".xls-file-list").append("<div><span>"+file.name+"</span><button type='button' class='f-del-btn' onclick=\"fileDelete('"+i+"')\"> X </button><div>");
    }
}

/**
 * setfileDeleteOne
 * 파일 한건 삭제 (데이터 수정 시)
 * @param fileId : 파일 아이디
 */
function setfileDeleteOne(fileId){

   fileDataDel = fileId
   fileList.splice(0,1);
   $(".file-list").empty();
}
/**
 * setfileDeleteList
 * 파일 리스트 삭제 (데이터 수정 시)
 * @param fileId : 파일 아이디
 */
function setfileDeleteList(fileIdx, fileId){
    if(fileDataDel){
        fileDataDel += "," + fileList[fileIdx].file_id;
    }else{
        fileDataDel = fileList[fileIdx].file_id;
    }

    fileList.splice(fileIdx,1);
    $(".file-list").empty();

    for(var i= 0; i<fileList.length; i++){
        var file = fileList[i].data;
        $(".file-list").append("<div><span>"+file.file_nm+"</span><button type='button' class='f-del-btn' onclick=\"setfileDeleteList('"+i + "','"+fileList[i].file_id+"')\"> X </button><div>");
    }
}
/**
 * deleteFileOne
 * 파일 한건 삭제
 * @param fileDataDel : 파일 아이디
 */
function deleteFileOne(fileDataDel){
    $.ajax({
        type : "post",
        url : "/file/delete-one",
        data : {file_id : fileDataDel},
        dataType : "json",
        async:false
    });
}
/**
 * deleteFileList
 * 파일 리스트 삭제
 * @param fileDataDel : 파일 아이디
 */
function deleteFileList(fileDataDel, compCd){

    $.ajax({
        type : "post",
        url : "/file/delete-list",
        data : {comp_cd: compCd, fileDataDel : fileDataDel},
        dataType : "json",
        async:false
    });
}
/*
 * ====================================================
 * upload end
 * ====================================================
 * */

/**
 * authMail
 * 인증메일
 * @param pEmail : 이메일 주소
 */
function sendAuthMail(param){
      $.ajax({
          type : "post",
          url : "/mail/ask-send-email",
          data : param,
          dataType : "json",
          async:false,
          success : function(data) {
              //로딩 done
              $(".loader").css("display","none");
              alert("등록되었습니다.");
              window.location.href = "/";
          },
          error : function(error) {
              alert(error.status + " " + error.statusText);
          }
      });
  }

/**
 * daumPostcode
 * 다음 주소 API
 * @param zpcd : 우편번호, addr : 주소, dtpt_addr : 상세주소
 */
function daumPostcode(zpcd, addr, dtpt_addr) {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var fullRoadAddr = data.roadAddress; // 도로명 주소 변수
            var extraRoadAddr = ''; // 도로명 조합형 주소 변수

            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                extraRoadAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if(data.buildingName !== '' && data.apartment === 'Y'){
               extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if(extraRoadAddr !== ''){
                extraRoadAddr = ' (' + extraRoadAddr + ')';
            }
            // 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
            if(fullRoadAddr !== ''){
                fullRoadAddr += extraRoadAddr;
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById(zpcd).value = data.zonecode; //5자리 새우편번호 사용
            document.getElementById(addr).value = fullRoadAddr;
            document.getElementById(dtpt_addr).focus();
        }
    }).open();
}

/**
 * eventKeyup
 * 숫자만 입력 이벤트
 * @param id : id
 */
function eventKeyup(id) {
    regexp = /[^0-9]/gi;
    value = $(id).val();
    if (regexp.test(value)) {
        alert("숫자만 입력가능 합니다.\n-(하이픈)을 제외한 숫자만 입력하여 주세요.");
        $(id).val(value.replace(regexp, ''));
    }
}

/**
 * nextFocus
 * 다음 input box로 이동
 * @param tagObj
 */
function nextFocus(tagObj) {
    var indx = $('input').index(tagObj);

    $('input').eq(indx).blur();
    $('input').eq(indx+1).focus();
};

/**
 * inputValChkClass
 * 입력값 확인 후 메세지 추가
 * @param remove : 삭제 클래스
 *        add : 추가 클래스
 *        msg : 벨리데이션 체크 메세지
 *        indx : 메세지가 표출될 태그 순번
 *        dlList : 메세지가 표출 시 라인style 추가 (미표출 태그 순번)
 */
function inputValChkClass(remove,add,msg,indx,dlList){
    //메세지 style
    $(".chk_msg").eq(indx).removeClass(remove);
    $(".chk_msg").eq(indx).addClass(add);

    //알림 메세지
    if(msg){
        $(".chk_msg").eq(indx).text(msg);
        $(".chk_msg").eq(indx).css("display","inline-block");

        //메세지 미 출력 style
        if(dlList.length != 0){
            for(var i=0; i<dlList.length; i++){
                $(".form dl").eq(dlList[i]).addClass("no-msg-dl");
            }
            $(".form dl").eq(indx).addClass("msg-dl");
        }
    }else{
        $(".chk_msg").eq(indx).css("display","none");

        if(dlList.length != 0){
            for(var i=0; i<dlList.length; i++){
                $(".form dl").eq(dlList[i]).removeClass("no-msg-dl");
            }
            $(".form dl").eq(indx).removeClass("msg-dl");
        }
    }

    //입력란 style
    if(add == "stat_chk"){
        $(".m-input").eq(indx).addClass("required");
    }else{
        $(".m-input").eq(indx).removeClass("required");
    }
}

/**
 * commaCheck
 * 숫자만 입력, 금액 천차리 콤마
 * @param id
 */
function commaCheck(id){
     $(id).val( $(id).val().replace(/[^-\.0-9]/gi,"") );
     $(id).val( $(id).val().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") );
}

/**
 * downloadExcelTemp
 * 해당 템플릿 파일을 다운로드 한다.
 *
 * @param  파일명
 */
function downloadExcelTemp(psFileNm, mode) {
    location.href = "/file/download-template?file_nm=" + encodeURIComponent(psFileNm)+"&mode="+encodeURIComponent(mode);
}

/**
 * datePickerSet
 * 달력초기화 후 다시 설정을 세팅한다
 *
 */
function datePickerSet(){
    $('.datepicker').datepicker({
        dateFormat:"yy-mm-dd",
        prevText:'이전 달',
        nextText:'다음 달',
        monthNames:['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort:['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNames:['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort:['일', '월', '화', '수', '목', '금', '토'],
        dayNamesMin:['일', '월', '화', '수', '목', '금', '토'],
        showMonthAfterYear:true,
        yearSuffix:'년'
    });
}

/**
 * dateChange
 * 조회조건 날짜 선택 함수
 * stat_cd : 금일/전일/일주일/일개월/삼개월/육개월
 * stt_dt : 시작일자 id
 * end_dt: 종료일자 id
 */
function dateChange(stat_cd, stt_dt, end_dt) {
    // 날짜셋팅
    var dtStat = $("#"+stat_cd).val();
    var date = new Date();

    if(dtStat == "00") { // 전체
        $("#"+stt_dt).datepicker().datepicker("setDate", "");
        $("#"+end_dt).datepicker().datepicker("setDate", "");
    } else if(dtStat == "10"){ // 금일
        $("#"+stt_dt).datepicker().datepicker("setDate", new Date());
        $("#"+end_dt).datepicker().datepicker("setDate", new Date());
    } else if(dtStat == "20") { // 전일
         date.setDate(date.getDate() - 1);
         $("#"+stt_dt).datepicker().datepicker("setDate", date);
         $("#"+end_dt).datepicker().datepicker("setDate", new Date());
    } else if(dtStat == "30") { // 일주일
         date.setDate(date.getDate() - 6);
        $("#"+stt_dt).datepicker().datepicker("setDate", date);
        $("#"+end_dt).datepicker().datepicker("setDate", new Date());
    }  else if(dtStat == "40") { // 1개월
        date.setMonth(date.getMonth() - 1);
        $("#"+stt_dt).datepicker().datepicker("setDate", date);
        $("#"+end_dt).datepicker().datepicker("setDate", new Date());
    } else if(dtStat == "50") { // 3개월
         date.setMonth(date.getMonth() - 3);
         $("#"+stt_dt).datepicker().datepicker("setDate", date);
         $("#"+end_dt).datepicker().datepicker("setDate", new Date());
    } else if(dtStat == "60") { // 6개월
         date.setMonth(date.getMonth() - 6);
         $("#"+stt_dt).datepicker().datepicker("setDate", date);
         $("#"+end_dt).datepicker().datepicker("setDate", new Date());
    }
}

/**
 * xlsUploadMsg
 * 엑셀업로드 팝업 경고메세지
 * idx : 경고 라인 인덱스
 * msg : 경고 메세지
 * tdIdx: 경고 '<tb>'테그 순번
 */
function xlsUploadMsg(idx,msg,tdIdx){
    //로딩done
    $(".loader").css("display","none");

    //경고라인 표출
    var class_line = idx-1;
    $("."+class_line+"line").css("background","#ffeded");

    if(tdIdx){
        $("."+class_line+"line td").eq(tdIdx).css({color:"red", fontWeight : "bold"});
    }

    //메세지set
    var Massage = idx == null ? msg : idx+msg;
    alert(Massage);

    //첨부파일 비움
    $("#xlsUpload").val("");
    $(".xls-file-list").empty();
    fileList = [];
}
/**
 * commaSplit
 * 숫자와  콤마 추가
 * 사용법 : commaSplit(value)
 */
function commaSplit(peTarget) {
    var txtNumber = '' + peTarget;
    var rxSplit = new RegExp('([0-9])([0-9][0-9][0-9][,.])');
    var arrNumber = txtNumber.split('.');
    arrNumber[0] += '.';
    do {
        arrNumber[0] = arrNumber[0].replace(rxSplit, '$1,$2');
    }
    while (rxSplit.test(arrNumber[0]));
    if(arrNumber.length > 1) {
        return arrNumber.join('');
    } else {
        return arrNumber[0].split('.')[0];
    }
}
/**
 * reset
 * 입력란 초기화
 */
function reset() {
    window.location.reload();
}
/**
 * resetSearch
 * 검색 입력란 초기화
 */
function resetSearch() {
    window.location.reload();
}
/**
 * movePage
 * 페이지 이동
 */
function movePage(url) {
    window.location.href = url;
}
/**
 * rowspan
 * 같은 값이 있는 열 병합
 * 사용법 : $('#테이블 ID').rowspan(열index);
 */
// $.fn.rowspan = function(colIdx) {
  function rowspan(colIdx) {
   return this.each(function(){
       var that;
       $('tr', this).each(function(row) {
               $('td:eq('+colIdx+')', this).each(function(col) {
                   if ($(this).html() == $(that).html()) {
                           rowspan = $(that).attr("rowSpan");

                           if (rowspan == undefined) {
                               $(that).attr("rowSpan",1);

                               rowspan = $(that).attr("rowSpan");
                           }

                           rowspan = Number(rowspan)+1;
                           $(that).attr("rowSpan",rowspan);

                           $(this).hide();
                       } else {
                           that = this;
                       }
                       that = (that == null) ? this : that;
                       });
               });
   });
};
/**
 * endDateChange
 * 기간조회 시 최대 3개월 선택 가능
 */
function endDateChange(){
    var minDate = new Date($("#end_dt").val());
    minDate.setMonth(minDate.getMonth() - 3);

    var maxDate = new Date($("#end_dt").val());
    jQuery("#stt_dt").datepicker("option", "minDate", minDate);
    jQuery("#stt_dt").datepicker("option", "maxDate", maxDate);
}

/**
 * overflowInfo
 * 말줄임으로 정보가 다 안보일경우 hover시 표출
 */
function overflowInfo(){
    $('.info-full-wrap').hover(function() {
        if(this.offsetWidth < this.scrollWidth){
            $(this).find(".info-full").css("display","inline-block");
        }
     }, function(){
        $(this).find(".info-full").css("display","none");
     });

//    $('.info-full-wrap2').hover(function() {
//        if(this.offsetWidth < this.scrollWidth){
//            $(this).find(".info-full2").css("display","inline-block");
//        }
//     }, function(){
//        $(this).find(".info-full2").css("display","none");
//     });
}