$(function () {
    let box=$('.box');
    let flag=true;
    for (let i=0;i<15;i++){
        for (let j=0;j<15;j++){
            $('<div>')
                .addClass('chess')
                .attr('id',i+'_'+j)
                .appendTo($('.box'));
        }
    }
    let black={},white={};
    box.on('click','.chess',function () {
        let pos= $(this).attr('id');
        if ($(this).hasClass('black')||$(this).hasClass('white')){
            return;
        }
        if (flag){
            black[pos]=true;
            $(this).addClass('black');
            isSuccess(black,pos);
            if (isSuccess(black,pos)){
                window.setTimeout("alert('黑棋获胜!')",10);
                box.off('click');
            }
        }
        else{
            white[pos]=true;
            $(this).addClass('white');
            isSuccess(white,pos);
            if (isSuccess(white,pos)){
                window.setTimeout("alert('白棋获胜')",10);
                box.off('click');
            }
        }
        flag=!flag;
    });
    function isSuccess(obj,pos){
        let sp = 1,cz = 1,zx = 1,yx = 1;
        let  [x,y] =pos.split('_');
        let i=x*1,j=y*1;
        // 水平
        while (obj[i+'_'+(++j)]) {
            sp++;
        }
        j=y*1;
        while (obj[i+'_'+(--j)]) {
            sp++;
        }

        // 竖直
        j=y*1;
        while (obj[(++i)+'_'+j]) {
            cz++;
        }
        i=x*1;j=y*1;
        while (obj[(--i)+'_'+j]) {
            cz++;
        }

        // 左斜
        i=x*1;j=y*1;
        while (obj[(++i)+'_'+(--j)]) {
            zx++;
        }
        i=x*1;j=y*1;
        while (obj[(--i)+'_'+(++j)]) {
            zx++;
        }

        // 右斜
        i=x*1;j=y*1;
        while (obj[(++i)+'_'+(++j)]) {
            yx++;
        }
        i=x*1;j=y*1;
        while (obj[(--i)+'_'+(--j)]) {
            yx++;
        }
        if (sp>=5||cz>=5||zx>=5||yx>=5){
            return true;
            // alert('游戏结束')
        }
    }
});