$(function () {
    let box=$('.box');
    let blank={};
    for (let i=0;i<15;i++){
        for (let j=0;j<15;j++){
            $('<div>')
                .addClass('chess')
                .attr('id',i+'_'+j)
                .appendTo($('.box'));
            blank[i+'_'+j]=true;
        }
    }
    let black={},white={};
    box.on('click','.chess',function () {
        console.log(isSuccess(black, '1_1'));
        let pos= $(this).attr('id');
        if ($(this).hasClass('black')||$(this).hasClass('white')){
            return;
        }
        black[pos]=true;
        console.log(pos);
        $(this).addClass('black');
        delete blank[pos];
        isSuccess(black,pos);
        if (isSuccess(black,pos)>=5){
            box.off('click');
            window.setTimeout("alert('黑棋获胜!')",100);
            return;
        }
        ai(pos);
    });
    function ai(pos) {
        if($('.white').length==0){
            let [i,j]=pos.split('_');
            let id;
            if (j>13){
                id=i+'_'+(j*1-1);
            }
            else {
                id=i+'_'+(j*1+1);
            }
            let aa=$('.chess').filter(function (index,value) {
                return value.id==id;
            });
            white[id]=true;
            window.setTimeout(function () {
                aa.addClass('white');},100);
            delete blank[id];
        }
        else{
            let blankF=0;
            let pos1='';
            let fraction=0;
            let pos2='';
            for (let i in blank){
                let nB=isSuccess(black, i);
                if (nB>fraction){
                    fraction=nB;
                    pos2=i;
                }
                let nW=isSuccess(white,i);
                if (nW>blankF){
                    blankF=nW;
                    pos1=i;
                }
            }
            if (blankF>=fraction){
                let aa=$('.chess').filter(function (index,value) {
                    return value.id==pos1;
                });
                console.log(aa);
                white[pos1]=true;
                window.setTimeout(function () {
                    aa.addClass('white');},100);
                delete blank[pos1];
                if (isSuccess(white,pos1)>=5){
                    window.setTimeout("alert('电脑都玩不过,菜逼!')",200);
                    box.off('click');
                }
            }
            else{
                let aa=$('.chess').filter(function (index,value) {
                    return value.id==pos2;
                });
                white[pos2]=true;
                window.setTimeout(function () {
                    aa.addClass('white');},100);
                delete blank[pos2];
                if (isSuccess(white,pos2)>=5){
                    window.setTimeout("alert('电脑都玩不过,菜逼!')",200);
                    box.off('click');
                }
            }
        }
    }



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
        return Math.max(sp,cz,zx,yx)
    }
});