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
        yearSuffix:'년',
    });

    // Popup Layer
    $('.layerStockEnter').fancybox({
        toolbar:false,
        smallBtn:false,
        iframe:{
            preload:true,
            css:{
                width:'1064px'
            }
        }
    });
    $('.layerSetAdd').fancybox({
        toolbar:false,
        smallBtn:false,
        iframe:{
            preload:true,
            css:{
                width:'1064px'
            }
        }
    });
    $('.layerEnteringDetail').fancybox({
        toolbar:false,
        smallBtn:false,
        iframe:{
            preload:true,
            css:{
                width:'1064px'
            }
        }
    });
    $('.layerLocation').fancybox({
        toolbar:false,
        smallBtn:false,
        iframe:{
            preload:true,
            css:{
                width:'1064px'
            }
        }
    });
    $('.layerPackingDetail').fancybox({
        toolbar:false,
        smallBtn:false,
        iframe:{
            preload:true,
            css:{
                width:'1064px'
            }
        }
    });
    $('.layerPackingAdd').fancybox({
        toolbar:false,
        smallBtn:false,
        iframe:{
            preload:true,
            css:{
                width:'1572px'
            }
        }
    });
    $('.layerOutDetail').fancybox({
        toolbar:false,
        smallBtn:false,
        iframe:{
            preload:true,
            css:{
                width:'1064px'
            }
        }
    });
    $('.layerCodeDetail').fancybox({
        toolbar:false,
        smallBtn:false,
        iframe:{
            preload:true,
            css:{
                width:'1064px'
            }
        }
    });
    $('.layerCodeAdd').fancybox({
        toolbar:false,
        smallBtn:false,
        iframe:{
            preload:true,
            css:{
                width:'1064px'
            }
        }
    });
});

function displayDetail(tThis) {
    if($(tThis).is(':checked')==true) {
        $('.m-register .form .bg').removeClass('none');
    } else {
        $('.m-register .form .bg').addClass('none');
    }
}

