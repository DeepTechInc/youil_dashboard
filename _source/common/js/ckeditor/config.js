/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
    // Define changes to default configuration here. For example:
    // config.language = 'fr';
    // config.uiColor = '#AADC6E';

    // 1. 툴바 변경
    // 1-1. 설정 가이드 화면 : /ckeditor/samples/toolbarconfigurator/index.html#basic
    config.toolbarGroups = [
        { name: 'styles', groups: [ 'styles' ] },
        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
        { name: 'paragraph', groups: [ 'align', 'indent', 'list', 'blocks', 'bidi', 'paragraph' ] },
        { name: 'insert', groups: [ 'insert' ] },
        { name: 'colors', groups: [ 'colors' ] },
        { name: 'links', groups: [ 'links' ] },
        { name: 'clipboard', groups: [ 'undo', 'clipboard' ] },
        { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
        { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
        { name: 'tools', groups: [ 'tools' ] },
        { name: 'others', groups: [ 'others' ] },
        { name: 'about', groups: [ 'about' ] },
        { name: 'forms', groups: [ 'forms' ] }
    ];
    config.removeButtons = 'Save,NewPage,Templates,Scayt,HiddenField,ImageButton,Button,Select,Textarea,TextField,Radio,Checkbox,Form,Language,Flash,Iframe,Styles,BidiRtl,BidiLtr,About,Preview,Print,Cut,Copy,Paste,PasteText,PasteFromWord,Replace,SelectAll,Anchor,Blockquote,CreateDiv,Maximize,ShowBlocks,Smiley,SpecialChar,Subscript,Superscript,NumberedList,BulletedList';

    // 2. 삭제 플러그인 설정
    // 2-1. elementspath: 하단 태그 표시 바
    config.removePlugins = "elementspath";

    // 3. 추가 플러그인 설정
    // 3-1. tableresize : 테이블 사이즈 조정
    // 3-2. image2 : 이미지 사이즈 조정
    // 3-3. lineheight : 줄간격 조정
//    config.extraPlugins = "tableresize,image2,lineheight";

    // 4. 폰트 리스트 변경
    config.font_names = "굴림/gulim;굴림체/gulimche;돋움/dotum;돋움체/dotumche;바탕/batang;바탕체/batangche;궁서/gungsuh;궁서체/gungsuhche;Arial/arial;Tahoma/tahoma;Verdana/verdana;Sans Serif/sans serif;MS Gothic/ms gothic;";

    // 5. 기본 폰트 스타일 변경
    config.font_defaultLabel = "돋움";
    config.fontSize_defaultLabel = "12";

    // 6. 기본 스타일 리스트 설정
    config.format_tags = "p;h1;h2;h3;h4;h5";

    // 7. 기본 줄간격 리스트 설정
    config.line_height="1.2;1.5;1.8;2;2.5;3";

    // 8. 커스텀 태그 필터링 해제 - 형식 : <span name="customtag">&lt;...&gt;</span>
    config.extraAllowedContent = "span[name]";

    // 이미지 삽입 시 파일 업로드 경로
//    config.filebrowserUploadUrl      = '/edit/upload.do',
//    config.filebrowserImageUploadUrl = '/file/imagebrowser/ckinsert.do',
    config.filebrowserUploadMethod='form'; //파일 오류났을때 alert띄워줌

};

CKEDITOR.on('dialogDefinition', function( ev ){
    var dialog = ev.data.definition.dialog;
    var dialogName = ev.data.name;
    var dialogDefinition = ev.data.definition;

    switch (dialogName) {
    case 'image': // 이미지 속성창이 보일때 안보이게 하기 위해서 .

        //dialogDefinition.removeContents('info'); // 정보 탭 있어야 업로드 가능
        // 링크, 자세히 탭 제거
        dialogDefinition.removeContents('Link');
        dialogDefinition.removeContents('advanced');

        dialog.on('show', function (obj) {
            this.selectPage('Upload'); //업로드텝으로 시작
        });
        break;
    }
});
