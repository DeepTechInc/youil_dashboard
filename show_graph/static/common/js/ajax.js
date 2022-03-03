/**
 * @(#)ajax.js
 *
 * Copyright 	Copyright (c) 2011
 * Company   	Inwoo Tech Inc.
 *
 * @author      Lee Changhee
 * @version		1.0
 * @date		2011/07/14
 */

// 전역변수
var ajaxDebugFlag = true; 		// ajax debug 메시지 출력 여부

/**
 * ajaxSetup
 * ajax 공통 셋팅
 *
 * @param 	: 없음.
 * @return 	: 없음.
 * @author	: 한숙향
 * @date 	: 2011/09/06
*/
$.ajaxSetup({
    type: "POST",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    dataType: 'text'
});

/**
 * getRequestString_Jquery
 * jquery.ajax로 서버에 요청후 결과를 jsp 페이지의 list_create 함수로 콜백
 *
 * @param 	: 호출해야할 ajax 페이지 url, ajax에 사용될 param.
 * @return 	: 없음.
 * @author	: 이창희
 * @date 	: 2011/07/14
*/
getRequestList_Jquery = function (url, pars) {
    $.ajax({url: url,
            data: pars,
            success: function(msg) {
                list_create(msg);
            },
            error: function(xhr,textStatus) {
                logslog("getRequestList_Jquery 함수 호출에 실패 하였습니다.\n오류내용 : url = " + url + ", pars = " + pars + ", textStatus = " + textStatus + "/" + xhr.status);
                if (ajaxDebugFlag) {
                    alert("getRequestList_Jquery 함수 호출에 실패 하였습니다.\n오류내용 : url = " + url + ", pars = " + pars + ", textStatus = " + textStatus + "/" + xhr.status);
                    alert("명령 실행중에 오류가 발생하였습니다.\n관리자에게 문의하세요 - 오류코드(0004)");
                }
            }
    });
};

/**
 * getTotalCount_Jquery
 * jquery.ajax로 서버에 요청후 카운트 리턴후 페이징에 정보 인계(성공시 콜백함수에서 실행)
 *
 * @param 	: 호출해야할 ajax 페이지 url, ajax에 사용될 param, mode(스크롤유무).
 * @return 	: 없음.
 * @author	: 이창희
 * @date 	: 2011/07/14
 */
getTotalCount_Jquery = function (url, pars, mode) {
    gf_setBlock(true);
    orderObj = null;

    if ( mode == undefined ) {
        mode = false;
    }

    $.ajax({url: url,
            data: pars,
            success: function(msg) {
                document.getElementById("totalcnt").innerHTML = msg;
                if (mode == true) list_order("1","");
                else setPaging(msg);
            },
            error: function(xhr,textStatus) {
                logslog("getTotalCount 함수 호출에 실패 하였습니다.\n오류내용 : url = " + url + ", pars = " + pars + ", textStatus = " + textStatus + "/" + xhr.status);
                if (ajaxDebugFlag) {
                    alert("getTotalCount 함수 호출에 실패 하였습니다.\n오류내용 : url = " + url + ", pars = " + pars + ", textStatus = " + textStatus + "/" + xhr.status);
                    alert("명령 실행중에 오류가 발생하였습니다.\n관리자에게 문의하세요 - 오류코드(0005)");
                }
            }
    });
};

/**
 * getAjaxList_Jquery
 * order와 페이징정보를 정리하여 getRequestList_Jquery 를 호출한다.
 *
 * @param 	: 호출해야할 ajax 페이지 url, ajax에 사용될 param.
 * @return 	: 없음.
 * @author	: 이창희
 *  @date 	: 2011/07/14
 */
getAjaxList_Jquery = function(url, param, orderObj, startIndex, endIndex) {
    gf_setBlock(true); // 처리중 시작

    // 시작,끝 페이지 설정
    startLine = startIndex == "" ? "1" : startIndex;
    endLine = endIndex == "" ? parseInt(startLine) + parseInt(listperPage) : endIndex;

    // 요청시 넘길 파라미터 설정
    var data = param;

    if (endIndex != "0") {	// 스크롤 리스트에는 페이징 파라미터 안붙임
        data += "&startLine=" + startLine + "&endLine=" + endLine;
    }

    $("#" + tempSort + "_sp").removeClass();

    // 소팅 필드 여부처리
    if (tempSort != null && orderObj != null) {
        if (tempSort != orderObj.id) {
            $("#" + tempSort + "_sp").addClass("sort_base_arrow");
        }
    }

    // 조회후 검색버튼 클릭후 소팅처리
    if (tempSort != null && orderObj == null) {
            $("#" + tempSort + "_sp").addClass("sort_base_arrow");
    }

    if (orderObj != null) {	// 헤더 클릭 시 정렬기호 추가 (▼ / ▲)
        var orderId = orderObj.id;
        var orderType = orderObj.type;

        if (endIndex == "" || endIndex == "0") {
            orderType = orderType == "DESC" ? "ASC" : "DESC";
        }
        data += "&orderBy=" + orderObj.id + "&orderDirection=" + orderType;

        orderObj.type = orderType;
        if (orderType == "DESC") {
            $("#" + orderId + "_sp").addClass("sort_desc_arrow");
        } else {
            $("#" + orderId + "_sp").addClass("sort_asc_arrow");
        }
        tempSort = orderId;
    }
    getRequestList_Jquery(url, data);

    if (startIndex == "1" && endIndex != "0") {
        redrawPageDivision(1);
        applyStyleSelectedIndex(1);
    }
};

/**
 * formAction_Jquery
 * 싱크정보 생성 후 콜백프로세스로 이동(저장, 삭제)
 *
 * @param	: 콜백함수명, 저장페이지 URL, ajax에 사용될 param.
 * @return  : 없음.
 * @author	: 한숙향
 * @date 	: 2011/07/26
 */
var tempParam = "";
var tempCallback = "";

formAction_Jquery = function(saveUrl, param, callback) {
    $.ajax({url: "/syncAction.do",
            data: param + "&syncProcess=insertSync",
            success: function(rtn) {
                tempParam = param + "&syncValue=" + rtn;
                tempCallback = callback;

                eval("saveForm_Jquery('" + saveUrl + "');");
            },
            error: function(xhr,textStatus) {
                logslog("formAction_Jquery 함수 호출에 실패 하였습니다.\n오류내용 : url = " + saveUrl + ", pars = " + param + ", textStatus = " + textStatus + "/" + xhr.status);
                if (ajaxDebugFlag) {
                    alert("formAction_Jquery 함수 호출에 실패 하였습니다.\n오류내용 : url = " + saveUrl + ", pars = " + param + ", textStatus = " + textStatus + "/" + xhr.status);
                    alert("명령 실행중에 오류가 발생하였습니다.\n관리자에게 문의하세요 - 오류코드(0006)");
                }
            }
    });
};

/**
 * saveForm_Jquery
 * 폼의 파라미터를 저장하고 목록갱신함수를 호출.
 *
 * @param 	: 호출해야할 ajax 페이지 url, ajax에 사용될 param.
 * @return 	: 없음.
 * @author	: 이창희
 * @date 	: 2011/07/21
 */
saveForm_Jquery = function(url) {
    $.ajax({url: url,
        data: tempParam,
        success: function(msg) {
            if (msg.length > 64) {
                alert("저장에 실패하였습니다.\n관리자에게 문의하세요\n\nmsg = " + msg);
            } else if (typeof(tempCallback) == "undefined") {
                // insert나 delete시는 search_go로 가고
                // update 시에는 list_order(sidex, eidx)를 호출
                search_go();
                //list_order(sidx, eidx);
            } else {
                eval(tempCallback + "('" + msg + "');");
            }
        },
        error: function(xhr,textStatus) {
            logslog("saveForm_Jquery 함수 호출에 실패 하였습니다.\n오류내용 : url = " + url + ", pars = " + tempParam + ", textStatus = " + textStatus + "/" + xhr.status);
            if (ajaxDebugFlag) {
                alert("saveForm_Jquery 함수 호출에 실패 하였습니다.\n오류내용 : url = " + url + ", pars = " + tempParam + ", textStatus = " + textStatus + "/" + xhr.status);
                alert("명령 실행중에 오류가 발생하였습니다.\n관리자에게 문의하세요 - 오류코드(0007)");
            }
        }
    });
};

/**
 * commonAjax_Jquery
 * 공통 ajax 실행함수
 * ajax 실행 후 param으로 받은 callback함수를 호출
 *
 * @param 	: 호출해야할 ajax 페이지 url, ajax에 사용될 param.
 * @return  : 없음.
 * @author	: 한숙향
 * @date 	: 2011/08/04
 */
commonAjax_Jquery = function (url, pars, callback) {
    $.ajax({url: url,
            data: pars,
            success: function(msg) {
                if (typeof(callback) != "undefined") {
                    try {
                        eval(callback + "('" + msg + "')");
                    } catch(e) {alert("쿼리 실행에 오류가 발생 하였습니다. 관리자에게 문의하세요.");}
                }
            },
            error: function(xhr,textStatus) {
                logslog("commonAjax_Jquery 함수 호출에 실패 하였습니다.\n오류내용 : url = " + url + ", pars = " + pars + ", textStatus = " + textStatus + "/" + xhr.status);
                if (ajaxDebugFlag) {
                    alert("commonAjax_Jquery 함수 호출에 실패 하였습니다.\n오류내용 : url = " + url + ", pars = " + pars + ", textStatus = " + textStatus + "/" + xhr.status);
                    alert("명령 실행중에 오류가 발생하였습니다.\n관리자에게 문의하세요 - 오류코드(0008)");
                }
            }
    });
};
