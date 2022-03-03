/* Licence:
*   Use this however/wherever you like, just don't blame me if it breaks anything.
*
* Credit:
*   If you're nice, you'll leave this bit:
*
*   Class by Pierre-Alexandre Losson -- http://www.telio.be/blog
*   email : plosson@users.sourceforge.net
*/
var identifier;

function refreshProgress(nobar) {
    jQuery.ajax({url: "/fileAction.do",
        data: "process=getUploadInfo",
        type: "POST",
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        dataType: 'text',
        success: function(msg) {
            if (nobar) {
                updateProgressNoBar (msg);
            } else {
                updateProgress (msg);
            }
        }
    });
}

function updateProgress(request){
    res = eval('(' + request + ')');

    if (res.inProgress == 1) {
        var progressPercent = Math.ceil((res.pBytesRead / res.pContentLength) * 100);
        document.getElementById('progressBarText').innerHTML = progressPercent;
        document.getElementById('progressBarBoxContent').style.width = parseInt(progressPercent) + '%';
        window.setTimeout('refreshProgress()', 1000);
    } else {
        var progressPercent = Math.ceil((res.pBytesRead / res.pContentLength) * 100);
        document.getElementById('progressBarText').innerHTML = progressPercent;
        document.getElementById('progressBarBoxContent').style.width = parseInt(progressPercent) + '%';

        uploadCompleted();
    }
}

function updateProgressNoBar(request) {
    res = eval('(' + request + ')');

    if (res.inProgress == 1) {
        window.setTimeout('refreshProgress(1)', 1000);
    } else {
        var img = frmUpload.NewFile.value;
        var url = "/fileAction.do?process=downloadFile&fileid=" + res.ids.substring(0, res.ids.length - 1);

        setImage("<img src='" + url + "'>");
    }
}

function startProgress(nobar, apid) {
    identifier = apid;

    if (nobar == 1) {
        window.setTimeout("refreshProgress(1)", 1500);
    } else {
        document.getElementById('progressBar').style.display = 'block';
        window.setTimeout("refreshProgress()", 1500);
    }
    return true;
}
