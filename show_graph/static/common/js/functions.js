var $=jQuery.noConflict();

$(function() {
    $('.header .gnb').mouseover(function() {
        if($('body').hasClass('gnb-over')==false){
            $('body').addClass('gnb-over');
        }
    });
    $('.header .gnb').mouseout(function() {
        if($('body').hasClass('gnb-over')==true){
            $('body').removeClass('gnb-over');

        }
    });

    $('.header .gnb dl dt em').click(function() {
        var idx = $(this).closest('dl').index();

        if($(this).closest('dl').hasClass('gnb-on')==true) {
            $(this).closest('dl').removeClass('gnb-on');
            $('dd').eq(idx).slideUp(300);
        } else {
            $(this).closest('dl').addClass('gnb-on');
            $('dd').eq(idx).slideDown(300);
        }
    });

    $('.header .links .link div p a').click(function() {
        $(this).closest('div').toggleClass('lang-open');
    });
    $('.header .menu-mo a').click(function() {
        $('body').addClass('gnb-open');
    });
    $('.header .close-mo a').click(function() {
        $('body').removeClass('gnb-open');
    });

    $('.navigation dl dt a').click(function() {
        $(this).closest('dl').toggleClass('navi-open');
    });

    //기간날짜 선택 시 최대 3개월
    var maxDate = new Date();
    var minDate = new Date();
    minDate.setMonth(minDate.getMonth() - 3);
    $('.stt-datepicker').datepicker({
        dateFormat:"yy-mm-dd",
        prevText:'이전 달',
        nextText:'다음 달',
        monthNames:['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort:['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNames:['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort:['일', '월', '화', '수', '목', '금', '토'],
        dayNamesMin:['일', '월', '화', '수', '목', '금', '토'],
        showMonthAfterYear:true,
        yearSuffix:'년',
        minDate: minDate,
        maxDate: maxDate,
    });

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

    $('.customer-faq .list dl dt a').click(function() {
        if($(this).closest('dl').hasClass('open')==false) {
            $('.customer-faq .list dl').each(function() {
                $(this).removeClass('open');
            });
            $(this).closest('dl').addClass('open');
        } else {
            $(this).closest('dl').removeClass('open');
        }
    });

});

function addKeywords(tThis, type) {
    var keyword=$(tThis).text();
    srch_keyword = keyword == "전체" ? "" : keyword;

    var typeEq=type-1;
    $('.customer-faq .search-form .keywords .type'+type).removeClass('none');
    $('.customer-faq .search-form .keywords .type'+type).text(keyword);
    $('.customer-faq .search-keywords div:eq('+typeEq+') dl dd a').removeClass('on');
    $(tThis).addClass('on');
    var count=$('.customer-faq .search-form .keywords .none').length;
    if(count==2) {
        $('.customer-faq .search-form').addClass('count1');
    } else if(count==1){
        $('.customer-faq .search-form').addClass('has-keywords');
        $('.customer-faq .search-form').addClass('count1');
    } else{
        $('.customer-faq .search-form').removeClass('count1');
    }

    searchList()
}