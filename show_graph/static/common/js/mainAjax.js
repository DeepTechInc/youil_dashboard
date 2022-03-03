/**
 * @(#)ajax.js
 *
 * Copyright 	Copyright (c) 2011
 * Company   	Inwoo Tech Inc.
 *
 * @author      Lee Changhee
 * @version		1.0
 * @date		2011/08/09
 */

// 전역변수
var ajaxDebugFlag = true; 		// ajax debug 메시지 출력 여부
var ajax_message = null;

Maps = function(){
    this.maps = new Array();
    this.currPos = 0;

    Maps.prototype.addMap = function(saveUrl, param, callback) {
        var map = new Map();

        map.put("saveurl", saveUrl);
        map.put("param", param);
        map.put("callback", callback);

        this.maps[this.currPos] = map;

        return this.currPos++;
    };

    Maps.prototype.delMap = function(pos) {
        this.maps[pos] = null;
    };

    Maps.prototype.getMap = function(pos) {
        return this.maps[pos];
    }
};

Map = function(){
    this.map = new Object();
};

Map.prototype = {
    put : function(key, value){
        this.map[key] = value;
    },
    get : function(key){
        return this.map[key];
    },
    containsKey : function(key){
        return key in this.map;
    },
    containsValue : function(value){
        for(var prop in this.map){
            if(this.map[prop] == value) return true;
        }
        return false;
    },
    isEmpty : function(key){
        return (this.size() == 0);
    },
    clear : function(){
        for(var prop in this.map){
            delete this.map[prop];
         }
    },
    remove : function(key){
        delete this.map[key];
    },
    keys : function(){
        var keys = new Array();
        for(var prop in this.map){
            keys.push(prop);
        }
        return keys;
    },
    values : function(){
        var values = new Array();
        for(var prop in this.map){
            values.push(this.map[prop]);
        }
        return values;
    },
    size : function(){
      var count = 0;
      for (var prop in this.map) {
        count++;
      }
      return count;
    }
};

var arr = new Array();
var maps = new Maps();

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
    dataType: 'text',
    cache: false
});

/**
 * formAction_Jquery
 * 싱크정보 생성 후 콜백프로세스로 이동(저장, 삭제)
 *
 * @param	: 콜백함수명, 저장페이지 URL, ajax에 사용될 param.
 * @return  : 없음.
 * @author	: 한숙향
 * @date 	: 2011/07/26
 */
formAction_Jquery = function(saveUrl, param, callback) {
    var currPos = maps.addMap(saveUrl, param, callback);

    $.ajax({url: "/syncAction.do",
            data: param + "&syncProcess=insertSync",
            success: function(rtn) {
                ajax_message = rtn;
                try {
                    eval("commonAjaxBypos_Jquery('" + currPos + "', '" + ajax_message + "');");
                } catch(e) {alert("쿼리 실행에 오류가 발생 하였습니다. 관리자에게 문의하세요.")}
                rtn = null;
            },
            error: function(xhr,textStatus) {
                logslog("formAction_Jquery 함수 호출에 실패 하였습니다.\n오류내용 : url = " + saveUrl + ", pars = " + param + ", textStatus = " + textStatus + "/" + xhr.status);
                if (ajaxDebugFlag) {
                    alert("formAction_Jquery 함수 호출에 실패 하였습니다.\n오류내용 : url = " + saveUrl + ", pars = " + param + ", textStatus = " + textStatus + "/" + xhr.status);
                    alert("명령 실행중에 오류가 발생하였습니다.\n관리자에게 문의하세요 - 오류코드(0001)");
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
 * @author	: 김은지
 * @date 	: 2011/08/04
 */
commonAjaxBypos_Jquery = function (pos, syncValue) {
    var map = new Map();
    map = maps.getMap(pos);
    var url = map.get("saveurl");
    var pars = map.get("param");
    var callback = map.get("callback");

    maps.delMap(pos);

    $.ajax({url: url,
            data: pars + "&syncValue=" + syncValue,
            success: function(msg) {
                ajax_message = msg;
                try {
                    eval(callback + "('" + ajax_message + "')");
                } catch(e) {alert("쿼리 실행에 오류가 발생 하였습니다. 관리자에게 문의하세요.")}
                msg = null;
            },
            error: function(xhr,textStatus) {
                logslog("commonAjaxBypos_Jquery 함수 호출에 실패 하였습니다.\n오류내용 : url = " + url + ", pars = " + pars + ", textStatus = " + textStatus + "/" + xhr.status);
                if (ajaxDebugFlag) {
                    alert("commonAjaxBypos_Jquery 함수 호출에 실패 하였습니다.\n오류내용 : url = " + url + ", pars = " + pars + ", textStatus = " + textStatus + "/" + xhr.status);
                    alert("명령 실행중에 오류가 발생하였습니다.\n관리자에게 문의하세요 - 오류코드(0002)");
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
                ajax_message = msg;
                try {
                    eval(callback + "('" + ajax_message + "')");
                } catch(e) {alert("쿼리 실행에 오류가 발생 하였습니다. 관리자에게 문의하세요.")}
                msg = null;
            }
        },
        error: function(xhr,textStatus) {
            logslog("commonAjax_Jquery 함수 호출에 실패 하였습니다.\n오류내용 : url = " + url + ", pars = " + pars + ", textStatus = " + textStatus + "/" + xhr.status);
            if (ajaxDebugFlag) {
                alert("commonAjax_Jquery 함수 호출에 실패 하였습니다.\n오류내용 : url = " + url + ", pars = " + pars + ", textStatus = " + textStatus + "/" + xhr.status);
                alert("명령 실행중에 오류가 발생하였습니다.\n관리자에게 문의하세요 - 오류코드(0003)");
            }
        }
    });
};

