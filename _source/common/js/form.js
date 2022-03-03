/**
 * @(#)form.js
 *
 * Copyright 	Copyright (c) 2011
 * Company   	Inwoo Tech Inc.
 *
 * @author      Lee Changhee
 * @version		1.0
 * @date		2011/07/14
 */

/**
 * $.validator.setDefaults
 * validator defautl 설정
 *
 * @param 	: options.
 * @return 	: 없음.
 * @author	: 이창희
 * @date 	: 2011/07/14
 */
$.validator.setDefaults({
    onsubmit: false,
    onkeyup: false,
    onclick: false,
    onfocusout: false,
    showErrors:function(errorMap, errorList){
        if (errorList.length > 0) {
            alert(errorList[0].message);
            $(errorList[0].element).trigger("focus");
        }
    }
});

jQuery.validator.addMethod("minByteLength", function(value, element,param) {return this.optional(element) || value.replace(/[^\x00-\xff]/g,"**").length >= param;});
jQuery.validator.addMethod("maxByteLength", function(value, element,param) {return this.optional(element) || value.replace(/[^\x00-\xff]/g,"**").length <= param;});

/**
 * appendTable
 * list_create에서 호출하는 table 추가 함수
 *
 * @param 	: 출력대상 div명, 클래스명
 * @return 	: 생성한 테이블객체.
 * @author	: 이창희
 * @date 	: 2011/07/19
 */
appendTable = function(resDivName, classnm) {
   var obj = document.createElement("table");
   obj.width = "100%";
   obj.className = typeof(classnm) == "undefined" ? "tbl_m_grid" : classnm;

    $("#" + resDivName).empty().append(obj);

    try {
        return obj;
    } finally {
        obj = null;
    }
};

/**
 * appendTr
 * list_create에서 호출하는 tr 추가 함수
 *
 * @param 	: 테이블객체, tr_id, 클래스명
 * @return 	: 생성한 tr객체.
 * @author	: 이창희
 * @date 	: 2011/07/19
 */
appendTr = function(objTable, i, classnm) {
   var obj = document.createElement("tr");
   obj.id = "tr_" + i;
   obj.style.cursor = "pointer";

   $(objTable).append(obj);

   try {
       return obj;
   } finally {
       obj = null;
   }
};

/**
 * appendTd
 * list_create에서 호출하는 td 추가 함수
 *
 * @param 	: tr_obj, id, 출력값, 정렬플래그, 헤더ID, 헤더ID, 스크롤 컬럼 여부
 * @return 	: 생성한 td객체.
 * @author	: 이창희
 * @date 	: 2011/07/19
 */
appendTd = function(objTr, id, value, aglignfg, headerId, scrollfg) {
    var obj = document.createElement("td");

    if ($(objTr).parent().children().index($(objTr)) == 0) {
        var thObj = null;
        var headerTrObj = null;

        if (typeof(headerId) != "undefined") {
            thObj = $("#" + headerId).find("#" + id);
            headerTrObj = $("#" + headerId + " tr");
        } else {
            thObj = $("#" + id);
            headerTrObj = $(".tbl_m_grid tr");
        }

        var width = thObj.attr("width");

        if (objTr.cells.length == 0) width = width - 1;
        if (scrollfg) width = width - 18;

        $(obj).width(width);
   }

   if(aglignfg == 0) {
       obj.style.textAlign = "left";
   } else if(aglignfg == 1) {
       obj.style.textAlign = "center";
   } else if(aglignfg == 2) {
       obj.style.textAlign = "right";
   } else {
       obj.style.textAlign = "";
   }
   obj.innerHTML = value;

   $(objTr).append(obj);

   try {
       return obj;
   } finally {
       obj = null;
   }
};

/**
 * appendTd2
 * list_create에서 호출하는 td 추가 함수(test by lch75 : 진행중)
 *
 * @param 	: loopcnt, firstfg, id, 출력값, 정렬플래그, 헤더ID, 헤더ID, 스크롤 컬럼 여부
 * @return 	: 생성한 td string.
 * @author	: 이창희
 * @date 	: 2012/08/02
 */
appendTd2 = function(loopcnt, firstfg, id, value, aglignfg, headerId, scrollfg) {
   var obj = "<td ";
   var style = "";
   var align = "";
   var width = "";

   if (loopcnt == "0") {
       var thObj = null;
       var headerTrObj = null;

       if (typeof(headerId) != "undefined") {
           thObj = $("#" + headerId).find("#" + id);
           headerTrObj = $("#" + headerId + " tr");
       } else {
           thObj = $("#" + id);
           headerTrObj = $(".tbl_m_grid tr");
       }

       var width = thObj.attr("width");

       if (firstfg == true) width = width - 1;
       if (scrollfg) width = width - 18;
       style += "width:" + width + "px;";
   }

   if(aglignfg == 0) {
       align = "left";
   } else if(aglignfg == 1) {
       align = "center";
   } else if(aglignfg == 2) {
       align = "right";
   }
   style += "text-align:" + align + ";";

   obj += "style='" + style + "'>" + value + "</td>";

   return obj;
};

/**
 * clearTable
 * list_create에서 호출하는 테이블 초기화 함수(스크롤바 없는 테이블만들때)
 *
 * @param 	: 테이블객체
 * @return 	: 없음.
 * @author	: 이창희
 * @date 	: 2011/07/19
 */
clearTable = function(objTable) {
    var trItem = $(objTable).find("tr:gt(0)");
    trItem.remove();
};

/**
 * appendTrNoScr
 * list_create에서 호출하는 tr 추가 함수(스크롤바 없는 테이블만들때)
 *
 * @param 	: 테이블객체, tr_id, 클래스명
 * @return 	: 생성한 tr객체.
 * @author	: 이창희
 * @date 	: 2011/07/19
 */
appendTrNoScr = function(objTable, i, classnm) {
   var obj = document.createElement("tr");
   obj.id = "tr_" + i;
   obj.style.cursor = "pointer";

   $(objTable).append(obj);

   try {
       return obj;
   } finally {
       obj = null;
   }
};

/**
 * appendTdNoScr
 * list_create에서 호출하는 td 추가 함수(스크롤바 없는 테이블만들때)
 *
 * @param 	: tr_obj, 출력값, 정렬플래그
 * @return 	: 생성한 td객체.
 * @author	: 이창희
 * @date 	: 2011/07/19
 */
appendTdNoScr = function(objTr, value, aglignfg) {
   var obj = document.createElement("td");

   if(aglignfg == 0) {
       obj.style.textAlign = "left";
   } else if(aglignfg == 1) {
       obj.style.textAlign = "center";
   } else if(aglignfg == 2) {
       obj.style.textAlign = "right";
   } else {
       obj.style.textAlign = "";
   }

   obj.innerHTML = value;

   $(objTr).append(obj);

   try {
       return obj;
   } finally {
       obj = null;
   }
};

/**
 * toggleClassName
 * list_create에서 list_click시 호출되는 함수
 *
 * @param 	: 출력되는 table명, tr id
 * @return 	: 생성한 td객체.
 * @author	: 이창희
 * @date 	: 2011/07/19
 */
toggleClassName = function(listName, trVal) {
    $("#" + listName + " .tbl_m_grid_on").toggleClass("tbl_m_grid_on");
    $("#" + listName).find("#" + trVal).toggleClass("tbl_m_grid_on");
};

/**
 * configSet
 * 검색조건 입력시 해당하는 체크박스 선택/해제 처리, 엔터키 입력시 검색
 *
 * @param 	: 검색항목 obj
 * @return  : 없음.
 * @author	: 한숙향
 * @date 	: 2011/07/26
 */
configSet = function(obj) {
    var targetObj = $("input[name=" + obj.name + "Chk]");

    if (obj.value == "") {
        $(targetObj).prop("checked", false);
    } else {
        $(targetObj).prop("checked", true);
    }

    if (event.keyCode == 13) {
        search_go();
    } else {
        return;
    }
};

/**
 * make_param
 * 검색시 ajax에 사용되는 parameter를 serialize함
 *
 * @param   : 폼명, 프로세스명
 * @return  : serialize 된 폼 파라미터
 * @author	: 이창희
 * @date 	: 2011/07/19
 */
make_param = function(formName, processName) {
    eval("document." + formName + ".process").value = processName;
    var pars = $("form[name=" + formName + "]").serialize();

    return pars;
};

/**
 * getObject
 * Form 항목 jQuery 오브젝트를 리턴함
 *
 * @param   : 폼명, 오브젝트명
 * @return  : 해당 오브젝트의 값
 * @author	: 이창희
 * @date 	: 2011/08/05
 */
getObject = function(formName, objName) {
    var obj = $("form[name=" + formName + "] :input[name=" + objName + "]");
    return obj;
};

/**
 * setValue
 * Form 항목의 값을 설정함
 *
 * @param   : 폼명, 오브젝트명, 값
 * @return  : 없음
 * @author	: 한숙향
 * @date 	: 2011/07/28
 */
setValue = function(formName, objName, value) {
    var obj = getObject(formName, objName);
    var objType = obj.attr("type");

    if (objType == "radio" || objType == "checkbox") {
        obj.filter("input[value=" + value + "]").prop("checked", "checked");
    } else if (objType == "select-one"){
        obj.find("option[value=" + value + "]").attr("selected", "selected");

        if (getValue(formName, objName) == "") {
            obj.find("option:first").attr("selected", "selected");
        }
    } else {
        obj.val(value);
    }
};

/**
 * setFirstValue
 * 첫번째값을 선택(select)
 *
 * @param   : 폼명, 오브젝트명
 * @return  : 없음
 * @author	: 이창희
 * @date 	: 2011/08/11
 */
setFirstValue = function(formName, objName) {
     var obj = getObject(formName, objName);
     obj.children("option:first").attr("selected", "selected");
};

/**
 * setLastValue
 * 마지막값을 선택(select)
 *
 * @param   : 폼명, 오브젝트명
 * @return  : 없음
 * @author	: 한숙향
 * @date 	: 2011/11/04
 */
setLastValue = function(formName, objName) {
     var obj = getObject(formName, objName);
     obj.children("option:last").prop("selected", true);
};

/**
 * setText
 * Form 항목의 Text값을 설정함
 *
 * @param   : 폼명, 오브젝트명, 값
 * @return  : 없음
 * @author	: 한숙향
 * @date 	: 2011/07/28
 */
setText = function(formName, objName, value) {
    var obj = getObject(formName, objName);

    obj.find("option").filter(function () {
        return $(this).text() == value;
    }).prop("selected", true);
};

/**
 * getValue
 * Form 항목의 값을 리턴함
 *
 * @param   : 폼명, 오브젝트명
 * @return  : 해당 오브젝트의 값
 * @author	: 이창희
 * @date 	: 2011/08/05
 */
getValue = function(formName, objName) {
    var obj = getObject(formName, objName);
    var objType = obj.attr("type");
    var value;

    if (objType == "radio") {
        value = obj.filter(":checked").val();
    } else {
        value = obj.val();
    }
    return value;
};

/**
 * getText
 * Form 항목의 text을 리턴함
 *
 * @param   : 폼명, 오브젝트명
 * @return  : 해당 오브젝트의 값
 * @author	: 이창희
 * @date 	: 2011/08/05
 */
getText = function(formName, objName) {
    var obj = getObject(formName, objName);
    var objType = obj[0].type;
    var ret = "";

    if (objType == "select-one") {
        ret = obj.find("option:selected").text();
    } else {
        ret = obj.text();
    }

    return ret;
};

/**
 * addFileTd
 * 파일아이콘을 TD에 입력해줌
 *
 * @param   : TD 오브젝트, 파일아이디, 파일이름
 * @return  : 없음
 * @author	: 한숙향
 * @date 	: 2011/08/05
 */
addFileTd = function(objTd, fileid, filenm, param) {
    if (typeof(param) == "undefined") {
        param = "";
    }

    if (fileid != "") {
        var aObj = document.createElement("a");
        aObj.href = "/fileAction.do?process=downloadFile&fileid=" + fileid + param;
        aObj.target = "downFrame";
        aObj.style.cursor = "pointer";
        aObj.innerHTML = "<img src='/common/images/ico/img_attach.gif' alt='" + filenm + "' align='absmiddle'>";

        $(objTd).append(aObj);
    }
};

/**
 * getEditorContents
 * 에디터내용 셋팅, 조회. Form Submit전에 호출해야함.
 *
 * @param   : 에디터 textarea name
 * @return  : 에디터 내용
 * @author	: 한숙향
 * @date 	: 2011/08/31
 */
var oEditors = [];
var cnt = 0;

getEditorContents = function(identifier) {
    var rtn = "";

    //oEditors.getById[identifier].exec("UPDATE_IR_FIELD", []);
    oEditors.getById[identifier].exec("UPDATE_CONTENTS_FIELD", []);

    var sIR = document.getElementById(identifier).value;
    sIR = sIR.replaceAll(unescape("%uFEFF"), "");
    document.getElementById(identifier).value = sIR;

    rtn = document.getElementById(identifier).value;

    return rtn;
};

/**
 * setEditorContents
 * 에디터내용 셋팅
 *
 * @param   : 에디터 textarea name, 내용
 * @return  : 없음
 * @author	: 한숙향
 * @date 	: 2011/08/31
 */
setEditorContents = function(identifier, contents) {
    document.getElementById(identifier).value = contents;
    /*
    if (typeof(oEditors.getById) == "undefined") {
        if (cnt < 3) {
            cnt++;
            setTimeout("setEditorContents('" + identifier + "','" + contents + "')", 500);
        } else {
            cnt = 0;
            alert("페이지 로딩에 실패했습니다. 다시 시도해 주세요.");
        }
    } else if (contents != null) {
        cnt = 0;
        //oEditors.getById[identifier].exec("SET_IR", ['']);

        //oEditors.getById[identifier].exec("FOCUS", []);
        //oEditors.getById[identifier].exec("PASTE_HTML", [contents]);
        oEditors.getById[identifier].exec("SET_IR", []);
    }
    */
};

/**
 * configSet_other
 * 검색조건 입력시 해당하는 체크박스 선택/해제 처리, 엔터키 입력시 검색 (name과 Chk의 매핑이 다를때)
 *
 * @param 	: 검색항목 obj, 체크박스 선택/해제 text
 * @return  : 없음.
 * @author	: 김장미
 * @date 	: 2012/04/09
 */
configSet_other = function(obj, text) {
    var targetObj = $("input[name=" + text + "]");

    if (obj.value == "") {
        $(targetObj).prop("checked", false);
    } else {
        $(targetObj).prop("checked", true);
    }

    if (event.keyCode == 13) {
        search_go();
    } else {
        return;
    }
};

/**
 * addOption
 * selectbox 에 option을 추가
 *
 * @param 	: obj, option value, option text
 * @return  : 없음.
 * @author	: 이창희
 * @date 	: 2012/06/19
 */
addOption = function(obj, option_text, option_value) {
    var opt = new Option(option_text, option_value);
    $(opt).html(option_text);
    $(obj).append(opt);
};

/**
 * removeOption
 * selectbox 에 option을 제거
 *
 * @param 	: obj, 남겨야할 option 카운트 (ex: removeOption(obj, 1) -> 제일 위에 1개만 남기고 다 지우기)
 * @return  : 없음.
 * @author	: 이창희
 * @date 	: 2012/06/19
 */
removeOption = function(obj, cnt) {
    $(obj).find('option').each(function(i) {
        if ($(this).index() + 1 > cnt) $(this).remove();
    });
};

/**
 * form.reset() / hidden 필드까지 reset 하는 방안
 *
 * @param 	: formname
 * @return  : 없음.
 * @author	: 이창희
 * @date 	: 2012/07/20
 */
resetForm = function(formName) {
    $("form[name=" + formName + "]")[0].reset();
}