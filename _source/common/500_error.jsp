<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" type="text/css" href="<c:url value='/css/egovframework/error.css?v=1.1'/>" />
<title>PowerLOGisCloud</title>
</head>

<body style="width: 100%;">
    <div class="error-wrap">
        <div class="error-wrap-top">
            <img src="/common/images/warning.png"/>
        </div>
        <div class="error-wrap-botm">
            <p class="error-msg-sub sub-1" style="padding: 25px 0px 10px 0px; font-size:30px;">500</p>
            <p class="error-msg-sub sub-1">요청하신 페이지가 작동하지 않습니다.</p>
            <p class="error-msg-sub sub-2">요청 처리 과정에서 에러가 발생하였습니다.</p>
       </div>
       <div><a href="#" class="go-home" onclick="moveCloud();">PowerLOGisCloud</a><div>
<!--         <div>Icons made by <a href="https://www.flaticon.com/authors/gregor-cresnar" title="Gregor Cresnar">Gregor Cresnar</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> -->
    </div>

<script>

    function moveCloud(){
        parent.window.location.href = "/";
    }
</script>
</body>
</html>