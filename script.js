var ipc;

$(function () {
    ipc = require('electron').ipcRenderer;
});

function Close() {
    ipc.send("main-window-close");
}

function Next() {
    var Name = $("#ProjectName").val();
    var Identity = $("#ProjectIdentity").val();
    var Stage = $("#ProjectStage").val();
    var Content = $("#Content").val();
    if (Name == "" || Identity == 0 || Stage == 0 || Content == "") {
        new $.zui.Messager("请先将所有内容填写完整", {
            type: "warning",
            placement: 'bottom',
            close: false
        }).show();
        return false;
    }
    var ModelObj = $("#DataArea");
    ModelObj.val("");
    ModelObj.val(ModelObj.val() + "今日工作主要涉及" + Name + "内的" + (Content.split("\n").length) + "个功能模块, ");
    setIdentity(Identity);
    setStage(Stage);
    $("#Model-A").hide();
    $("#Model-B").show();
}

function setIdentity(Level) {
    $.getJSON("gt-config.json", (Data) => {
        var Txt = "";
        if (Level == 1)
            Txt = Data.L1[RndNum(1)];
        else if (Level == 2)
            Txt = Data.L2[RndNum(1)];
        else if (Level == 3)
            Txt = Data.L3[RndNum(1)];
        $("#DataArea").val($("#DataArea").val() + Txt);
        $("#Size").text($("#DataArea").val().length);
    });
}

function setStage(Level) {
    $.getJSON("gt-config.json", (Data) => {
        var Txt = "";
        if (Level == 1)
            Txt = Data.V1[RndNum(1)];
        else if (Level == 2)
            Txt = Data.V2[RndNum(1)];
        else if (Level == 3)
            Txt = Data.V3[RndNum(1)];
        $("#DataArea").val($("#DataArea").val() + Txt);
        $("#Size").text($("#DataArea").val().length);
    });
}

function RndNum(n) {
    var rnd = "";
    for (var i = 0; i < n; i++)
        rnd += Math.floor(Math.random() * 10);
    return rnd;
}

function Last() {
    $("#Model-A").show();
    $("#Model-B").hide();
}