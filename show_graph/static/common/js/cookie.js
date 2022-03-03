/**
 * 쿠키값 설정하기
 *
 * @param 키, 값
 */
function setCookie(psKey, psValue) {
    var dToday = new Date(); // 오늘 날짜

    // 만료시점 : 오늘날짜 + 30일 설정
    var nValidity = 30;
    dToday.setDate(dToday.getDate() + nValidity);

    // 쿠키 저장
    document.cookie = psKey + "=" + escape(psValue) + ";expires=" + dToday.toGMTString();
}

/**
 * 쿠키 삭제
 *
 * @param psKey
 */
function delCookie(psKey) {
    // 동일한 키(name)값으로
    // 1. 만료날짜를 과거로 쿠키저장
    // 2. 값을 설정 않는다.
    //    브라우저가 닫힐 때 제명이 된다
    var dToday = new Date(); // 오늘 날짜
    var nValidity = -1;

    dToday.setDate(dToday.getDate() + nValidity);
    document.cookie = psKey + "=;expires=" + dToday.toGMTString();
}

/**
 * 쿠키값 가져오기
 *
 * @param psKey
 * @returns 쿠키값
 */
function getCookie(psKey) {
    var sCookieList = document.cookie.split("; ");
    for (var i = 0; i < sCookieList.length; i++) {
        var sCookieArray = sCookieList[i].split("=");
        if (sCookieArray[0] == psKey) {
            return unescape(sCookieArray[1]);
        }
    }
    return "";
}
