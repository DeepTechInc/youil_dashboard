/**
 * @(#)date.js
 *
 * Copyright 	Copyright (c) 2011
 * Company   	Inwoo Tech Inc.
 *
 * @author      Lee Changhee
 * @version		1.0
 * @date		2011/07/18
 */

/**
 * getDateString
 * 날짜를 포맷에 맞게 변환하여 리턴한다. 날짜가 없으면 오늘날짜 반환
 * getDateString("YYYY/MM/DD hh:mm:ss")
 * getDateString("YYYY/MM/DD hh:mm:ss", "20110907093000")
 *
 * @param 	: 포맷
 * @return 	: 변환된 날짜
 * @author	: 한숙향
 * @date 	: 2011/08/19
 */
Date.MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
Date.DAYS   = ["Sun", "Mon", "Tue", "Wed", "Tur", "Fri", "Sat"];

getDateString = function(dateFormat, date) {
    var now = new Date();
    var result = "";
    var SdateY = 0;
    var SdateM = 0;
    var SdateD = 0;
    var SdateH = 0;
    var Sdatem = 0;
    var SdateS = 0;

    if (typeof(date) != "undefined") {
        if (date.length == 4) {	// hhmm
            SdateH = date.substring(0,2);
            Sdatem = date.substring(2,4);
            now.setHours(SdateH, Sdatem);
        } else if (date.length == 6) {	// hhmmss
            SdateH = date.substring(0,2);
            Sdatem = date.substring(2,4);
            SdateS = date.substring(4,6);
            now.setHours(SdateH, Sdatem, SdateS);
        } else if (date.length >= 8) {	// yyyymmdd
            SdateY = date.substring(0,4);
            SdateM = date.substring(4,6);
            SdateD = date.substring(6,8);

            if (date.length >= 12) {	// yyyymmddhhmmss
                SdateH = date.substring(8,10);
                Sdatem = date.substring(10,12);
            }

            if (date.length >= 14) {
                SdateS = date.substring(12,14);
            }
            now = new Date(SdateY, Number(SdateM) - 1, SdateD, SdateH, Sdatem, SdateS);
        } else {
            return date;
        }
    }
    dateFormat = dateFormat == 8 && "YYYY.MM.DD" ||
                 dateFormat == 6 && "hh:mm:ss" ||
                 dateFormat || "YYYY.MM.DD hh:mm:ss";

    for (var i = 0; i < dateFormat.length; i++) {
        result += dateFormat.indexOf("YYYY", i) == i ? (i += 3, now.getFullYear()                     ) :
                  dateFormat.indexOf("YY",   i) == i ? (i += 1, String(now.getFullYear()).substring(2)) :
                  dateFormat.indexOf("MMM",  i) == i ? (i += 2, Date.MONTHS[now.getMonth()]           ) :
                  dateFormat.indexOf("MM",   i) == i ? (i += 1, (now.getMonth()+1).to2()              ) :
                  dateFormat.indexOf("M",    i) == i ? (        now.getMonth()+1                      ) :
                  dateFormat.indexOf("DDD",  i) == i ? (i += 2, Date.DAYS[now.getDay()]               ) :
                  dateFormat.indexOf("DD",   i) == i ? (i += 1, now.getDate().to2()                   ) :
                  dateFormat.indexOf("D"   , i) == i ? (        now.getDate()                         ) :
                  dateFormat.indexOf("hh",   i) == i ? (i += 1, now.getHours().to2()                  ) :
                  dateFormat.indexOf("h",    i) == i ? (        now.getHours()                        ) :
                  dateFormat.indexOf("mm",   i) == i ? (i += 1, now.getMinutes().to2()                ) :
                  dateFormat.indexOf("m",    i) == i ? (        now.getMinutes()                      ) :
                  dateFormat.indexOf("ss",   i) == i ? (i += 1, now.getSeconds().to2()                ) :
                  dateFormat.indexOf("s",    i) == i ? (        now.getSeconds()                      ) :
                                                       (dateFormat.charAt(i)                          ) ;
    }
    return result;
};

Number.prototype.to2 = function() {
    return (this > 9 ? "" : "0") + this;
};

/**
 * removeNoneNumDate
 * 숫자 이외의 문자 제거(getYMDFormat에서 사용)
 *
 * @param 	: 문자열
 * @return 	: 숫자를 제외한 나머지를 지운 문자열
 * @author	: 이창희
 * @date 	: 2011/07/18
 */
removeNoneNumDate = function(val) {
    var reg=/[^\d]/;

    while (reg.test(val)) {
        val = val.replace(reg, "");
    }
    return val;
};

/**
 * getDateFormat
 * 오늘일자를 구해서 형태에 맞게 리턴함.
 * 사용법 : getDateFormat() or getDateFormat("YMDHMS");
 *
 * @param 	: 없음.
 * @return 	: 오늘일자를 리턴함 (형태:년/월/일) 예)2007/07/12
 * @author	: 이창희
 * @date 	: 2011/07/18
 */
getDateFormat = function(format) {
    var date = "";

    if (format == "YMDHMS") {
        date = getYMDFormat() + " " + getHMSFormat();
    } else {
        date = getYMDFormat();
    }
    return date;
};

/**
 * getYMDFormat
 * 년 월 일이 붙어있는 문자열을 구분자를 붙여 리턴함. 날짜가 없으면 오늘날짜를 리턴함.
 * 사용법 : getYMDFormat(); or getYMDFormat("20110811"); or getYMDFormat("20110811", "/");
 *
 * @param 	: yyyymmdd
 * @return 	: 년 월 일이 붙어있는 문자열을 구분자를 붙여 리턴함
 * @author	: 이창희
 * @date 	: 2011/07/18
 */
getYMDFormat = function(yyyymmdd, gubun) {
    if (typeof(yyyymmdd) != "undefined") {
        yyyymmdd = removeNoneNumDate(yyyymmdd);

        if (yyyymmdd.length < 8) return yyyymmdd;
    }

    if (typeof(gubun) == "undefined") {
        gubun = "-";
    }

    return getDateString("YYYY" + gubun + "MM" + gubun + "DD", yyyymmdd);
};

/**
 * getHMSFormat
 * 시 분 초가 붙어있는 문자열을 구분자를 붙여 리턴함. 시분초가 없으면 현재 시간으로 리턴.
 * 사용법 : getHMSFormat(); or getHMSFormat("153014");
 *
 * @param 	: hh24miss
 * @return 	: 시 분 초가 붙어있는 문자열을 구분자를 붙여 리턴함
 * @author	: 한숙향
 * @date 	: 2011/08/11
 */
getHMSFormat = function(hhmmss) {
    if (typeof(hhmmss) != "undefined") {
        if (hhmmss.length != 6) return hhmmss;
    }
    return getDateString("hh:mm:ss", hhmmss);
};

/**
 * getHMFormat
 * 시 분가 붙어있는 문자열을 구분자를 붙여 리턴함. 시분가 없으면 입력값으로 리턴.
 * 사용법 : getHMFormat(); or getHMFormat("1530");
 *
 * @param 	: hh24miss
 * @return 	: 시 분가 붙어있는 문자열을 구분자를 붙여 리턴함
 * @author	: 정재동
 * @date 	: 2011/09/06
 */
getHMFormat = function(hhmm) {
    if (typeof(hhmm) != "undefined") {
        if (hhmm.length != 4) return hhmm;
    }
    return getDateString("hh:mm", hhmm);
};

/**
 * getYMDHMSFormat
 * 년 월 일 시 분 초가 붙어있는 문자열을 구분자를 붙여 리턴함
 * 사용법 : getYMDHMSFormat("20110811153014", "/");
 *
 * @param 	: date
 * @return 	: 년 월 일 시 분 초가 붙어있는 문자열을 구분자를 붙여 리턴함
 * @author	: 김장미
 * @date 	: 2011/07/20
 */
getYMDHMSFormat = function(date, gubun) {
    date = removeNoneNumDate(date);

    if (date.length != 14) return date;

    if (typeof(gubun) == "undefined") {
        gubun = "-";
    }
    return getDateString("YYYY" + gubun + "MM" + gubun + "DD hh:mm:ss", date);
};

/**
 * addDay
 * 오늘날짜에서 입력받은 날수만큼 더하거나 빼서 리턴함
 * 사용법 : addDay(7); or addDay(-30);
 *
 * @param 	: days
 * @return 	: 연산된 날짜
 * @author	: 한숙향
 * @date 	: 2011/08/12
 */
addDay = function(days) {
    var now = new Date();
    var dName = now.getDate();

    now.setDate(dName + days);

    var yr = now.getFullYear();
    var mName = now.getMonth() + 1;
    dName = now.getDate() ;

    if (yr < 100) {
        year = ("19" + yr).toString();
    } else {
        year = yr.toString();
    }
    month = lpad(mName, 2, "0");
    day = lpad(dName, 2, "0");

    var days = getYMDFormat(year + month + day);

    return days;
};

/**
 * dateSet
 * 당일, 1주일 등 라디오 박스 체크
 * 사용법 : 당일 - dateSet(0, 'startd', 'endd'), 1주일 - dateSet(-7, 'startd', 'endd')
 *
 * @param 	: 기간, 시작일obj, 종료일obj
 * @return 	: 없음
 * @author	: 한숙향
 * @date 	: 2011/08/24
 */
dateSet = function(day, startObjNm, endObjNm) {
    var sdate = addDay(parseInt(day));
    var edate = getDateString("YYYY-MM-DD");

    $("input[name=" + startObjNm + "]").val(sdate);
    $("input[name=" + endObjNm + "]").val(edate);
};

/**
 * getWeek
 * 주어진 날자의 요일을 리턴함.
 * 사용법 : getWeek(20110905);
 *
 * @param 	: YYYYMMDD
 * @return 	: 요일(0,1,2,3,4,5,6)
 * @author	: 정재동
 * @date 	: 2011/09/05
 */
getWeek = function(YYYYMMDD) {
    var vYear = YYYYMMDD.substr(0,4);
    var vMonth = YYYYMMDD.substr(4,2);
    var vDay = YYYYMMDD.substr(6,2);

    var week = new Date(vYear,(Number(vMonth)-1),vDay);

    var day = week.getDay();
    return day;
};


/**
 * getTimeFormat
 * 초단위 시간을 받아서 시간:분:초 형태로 반환
 * 사용법 : getTimeFormat(sec)
 *
 * @param 	: sec
 * @return 	: HH:MM:SS
 * @author	: 정재동
 * @date 	: 2011/10/05
 */
getTimeFormat = function(sec) {
    var str_Hour;
    var str_Min;
    var str_Sec;

    if (sec <= 0) {
        str_Hour=0;
        str_Min=0;
        str_Sec=0;
    } else {
        str_Hour = parseInt(sec / 3600);
        str_Min  = parseInt(sec / 60 % 60);
        str_Sec  = parseInt(sec % 60);
    }

    if (str_Hour < 10) {
        str_Hour = "0"+str_Hour;
    }

    if (str_Min < 10) {
        str_Min = "0"+str_Min;
    }

    if (str_Sec < 10) {
        str_Sec = "0"+str_Sec;
    }

    return str_Hour+":"+str_Min+":"+str_Sec;
};

/**
 * getLastDay
 * 해당날자의 말일을 계산한다.
 * 사용법 : getLastDay('20111001')
 *
 * @param 	: YYYYMMDD
 * @return 	: DD
 * @author	: 정재동
 * @date 	: 2011/10/05
 */
getLastDay = function(yyyymmdd) {
    if (yyyymmdd.length > 8) return "00";

    var SdateY = eval( yyyymmdd.substring(0,4) );
    var SdateM = eval( yyyymmdd.substring(4,6) );
    var SdateD = eval( yyyymmdd.substring(6,8) );

    var date_Of_Month = new Array( 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 );        // 해당 달에 대한 일 수..

    // 윤달체크
    if( Number(SdateY)%4 ==0 && Number(SdateY)%100 !=0 || Number(SdateY)%400==0 ) date_Of_Month[1] = 29;
    else date_Of_Month[1] = 28;
    return date_Of_Month[SdateM - 1];
};

/**
 * getTimeDateFormat
 * "5시간전" 등의 포맷으로 변경
 *
 * @param 	: 일차이, 비교시간
 * @return 	: 변경된포맷
 * @author	: 한숙향
 * @date 	: 2011/10/14
 */
function getTimeDateFormat(diffdate, datetime) {
    var rtn = "";

    if (diffdate < 1) {
        diffdate = diffdate * 24;

        if (diffdate < 1) {
            diffdate = diffdate * 60;

            if (diffdate < 1) {
                diffdate = diffdate * 60;

                if (diffdate < 1) {
                    rtn = "방금";
                } else {
                    rtn = parseInt(diffdate) + "초 전";
                }
            } else {
                rtn = parseInt(diffdate) + "분 전";
            }
        } else {
            rtn = parseInt(diffdate) + "시간 전";
        }
    } else {
        rtn = getYMDFormat(datetime);
    }

    return rtn;
}


/**
 * getTimeDateFormat
 * "5시간전" 등의 포맷으로 변경
 *
 * @param 	: 일차이, 비교시간
 * @return 	: 변경된포맷
 * @author	: 한숙향
 * @date 	: 2011/10/14
 */
function getTimeDateFormat(diffdate, datetime) {
    var rtn = "";

    if (diffdate < 1) {
        diffdate = diffdate * 24;

        if (diffdate < 1) {
            diffdate = diffdate * 60;

            if (diffdate < 1) {
                diffdate = diffdate * 60;

                if (diffdate < 1) {
                    rtn = "방금";
                } else {
                    rtn = parseInt(diffdate) + "초 전";
                }
            } else {
                rtn = parseInt(diffdate) + "분 전";
            }
        } else {
            rtn = parseInt(diffdate) + "시간 전";
        }
    } else {
        rtn = getYMDFormat(datetime);
    }

    return rtn;
}



/**
 * DateDiff
 * 일/주/월/년 단위로 diff하는 함수
 *
 * @param 	: 시작일, 종료일 (둘다 달력 input 그대로 전송)
 * @return 	: diff 값
 * @author	: 이창희
 * @date 	: 2011/10/31
 */
DateDiff = {
    inDays: function(d1, d2) {
        d1 = new Date(getDateString("MMM, DD, YYYY", d1.replaceAll("-", "")));
        d2 = new Date(getDateString("MMM, DD, YYYY", d2.replaceAll("-", "")));

        var t2 = d2.getTime();
        var t1 = d1.getTime();
        return parseInt((t2-t1)/(24*3600*1000));
    }, inWeeks: function(d1, d2) {
        d1 = new Date(getDateString("MMM, DD, YYYY", d1.replaceAll("-", "")));
        d2 = new Date(getDateString("MMM, DD, YYYY", d2.replaceAll("-", "")));

        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2-t1)/(24*3600*1000*7));
    }, inMonths: function(d1, d2) {
        d1 = new Date(getDateString("MMM, DD, YYYY", d1.replaceAll("-", "")));
        d2 = new Date(getDateString("MMM, DD, YYYY", d2.replaceAll("-", "")));

        var d1Y = d1.getFullYear();
        var d2Y = d2.getFullYear();
        var d1M = d1.getMonth();
        var d2M = d2.getMonth();

        return (d2M+12*d2Y)-(d1M+12*d1Y);
    }, inYears: function(d1, d2) {
        d1 = new Date(getDateString("MMM, DD, YYYY", d1.replaceAll("-", "")));
        d2 = new Date(getDateString("MMM, DD, YYYY", d2.replaceAll("-", "")));

        return d2.getFullYear()-d1.getFullYear();
    }
}

/**
 * setNoneNumDate
 * 날짜 INPUT 포커스 시 포맷을 제거한 숫자만 셋팅
 * 사용법 : onfocus="setNoneNumDate(this);"
 *
 * @param 	: 날짜 INPUT 객체
 * @return 	: 날짜 포맷을 제거한 숫자만 셋팅
 * @author	: 이희철
 * @date 	: 2012/08/02
 */
setNoneNumDate = function(obj) {
    obj.value = removeNoneNumDate(obj.value);
};

/**
 * setYMDFormat
 * 날짜 INPUT 포커스 아웃 시 날짜 포맷 셋팅
 * 사용법 : onblur="setYMDFormat(this);"
 *
 * @param 	: 날짜 INPUT 객체
 * @return 	: 날짜 포맷 셋팅
 * @author	: 이희철
 * @date 	: 2012/08/02
 */
setYMDFormat = function(obj) {
    obj.value = getYMDFormat(obj.value);
    if (obj.value.length != 10) {
        obj.value = "";
    }
};

/**
 * getYear
 *
 * @param 	: 없음.
 * @return 	: 현재년도(2012)
 * @author	: 이창희
 * @date 	: 2012/08/09
 */
getYear = function() {
    var now = new Date();
    var year = now.getFullYear();

    return Number(year);
};

/**
 * getMonth
 *
 * @param 	: 없음.
 * @return 	: 현재월(8)
 * @author	: 이창희
 * @date 	: 2012/08/09
 */
getMonth = function() {
    var now = new Date();
    var month = now.getMonth() + 1;

    return month;
};

/**
 * checkCalDate(startd 가 endd 보다 크면 두개를 바꿔주는 기능)
 *
 * @param 	: formname, startd, endd.
 * @return 	: 없음
 * @author	: 이창희
 * @date 	: 2012/08/17
 */
checkCalDate = function(formname, startd, endd) {
    var obj1 = getObject(formname, startd);
    var obj2 = getObject(formname, endd);
    var tempval = obj1.val();

    // 날자선택시 2개 다 값이 있고 startd가 endd보다 클 경우
    if ( obj1.val() != "" && obj2.val() != "" && obj1.val() > obj2.val()) {
        obj1.val(obj2.val());
        obj2.val(tempval);
    }
};