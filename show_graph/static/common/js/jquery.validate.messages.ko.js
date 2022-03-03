/**
 * @(#)jquery.validate.messages.ko.js
 *
 * Copyright 	Copyright (c) 2011
 * Company   	Inwoo Tech Inc.
 *
 * @author      Lee Changhee
 * @version		1.0
 * @date		2012/10/12
 */

/**
 * validate 플러그인 한글 메시지
 */
jQuery.extend(jQuery.validator.messages, {
   required: "반드시 입력해야 합니다.",
   remote: "수정 바랍니다.",
   email: "이메일 주소를 올바로 입력하세요.",
   url: "URL을 올바로 입력하세요.",
   date: "날짜가 잘못 입력됐습니다.",
   dateISO: "ISO 형식에 맞는 날짜로 입력하세요.",
   number: "숫자만 입력하세요.",
   digits: "숫자(digits)만 입력하세요.",
   creditcard: "올바른 신용카드 번호를 입력하세요.",
   equalTo: "값이 서로 다릅니다.",
   accept: "승낙해 주세요.",
   maxlength: $.validator.format("{0} 바이트 이상은 입력할 수 없습니다.\r\n(영문숫자:1바이트, 한글:2바이트)"),
   minlength: $.validator.format("적어도 {0} 바이트는 입력해야 합니다.\r\n(영문숫자:1바이트, 한글:2바이트)"),
   rangelength: $.validator.format("{0} 바이트 이상 {1} 바이트 이하로 입력해 주세요.\r\n(영문숫자:1바이트, 한글:2바이트)"),
   range: $.validator.format("{0} 에서 {1} 사이의 값을 입력하세요."),
   max: $.validator.format("{0} 이하로 입력해 주세요."),
   min: $.validator.format("{0} 이상으로 입력해 주세요.")
});