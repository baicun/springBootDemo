/*data=[
    {'type':'1','name':'姓名','index':'0','value':'55','state':'2','count':'6'},
    {'type':'2','name':'or','value':'1'},
    {'type':'1','name':'年龄','index':'1','value':'10','state':'2','count':'6'},
    {'type':'2','name':'and','value':'0'},
    {'type':'1','name':'居住地','index':'2','value':'33','state':'2','count':'6'},
    {'type':'2','name':'or','value':'1'},
    {'type':'1','name':'年龄1','index':'3','value':'66','state':'2','count':'6'},
    {'type':'2','name':'and','value':'0'},
    {'type':'1','name':'工作所在地','index':'4','value':'22','state':'2','count':'6'},
    {'type':'2','name':'or','value':'1'},
    {'type':'1','name':'姓名1','index':'5','value':'44','state':'2','count':'6'},
    {'type':'2','name':'and','value':'0'},
    {'type':'1','name':'居住地1','index':'6','value':'80','state':'2','count':'6'},
    {'type':'2','name':'and','value':'0'},
    {'type':'1','name':'工作所在地1','index':'7','value':'100','state':'2','count':'6'},
];
line=[
    {'start':'0','end':'2','left':'0','top':'60','width':'318'},
    {'start':'4','end':'6','left':'440','top':'90','width':'318'},
    {'start':'8','end':'10','left':'880','top':'120','width':'318'},
    {'start':'12','end':'14','left':'1320','top':'150','width':'318'},
    {'start':'0','end':'6','left':'0','top':'180','width':'758'},
    {'start':'8','end':'14','left':'880','top':'210','width':'758'},
    {'start':'0','end':'14','left':'0','top':'240','width':'1638'}
];*/
function lineToLogicRelation(data,line){
    var order=1;
    var hasRelation=new Array();
    var relationLogin=new Array();
    var map=new Map();
    //遍历每条线，根据下标将序号存入map集合中
    $.each(line,function(index,item){
        console.log(JSON.stringify(item));
        console.log(item.start); console.log(item.end);console.log(i);
        for(var i=parseInt(item.start)+1;i<parseInt(item.end);i+=2){
            console.log(i);
            if($.inArray(i, hasRelation)<0){
                hasRelation.push(i);
                map[i]=order;
                order++;
            }
        }
    })
    //遍历整条逻辑链为没有用的逻辑符号，增加逻辑执行序号
    $.each(data,function(index,item){
        if(index%2!=0&&$.inArray(index, hasRelation)<0){
            hasRelation.push(index);
            map[index]=order;
            order++;
        }
    })
    //将下标排序
    var newHasRelation = hasRelation.sort(compare);
    $.each(newHasRelation,function(index,item){
        relationLogin.push(map[item]);
    })
    console.log(relationLogin);
    return relationLogin;
}

//定义排序规则
function compare(a,b){
    return a-b;  //如果a>b,返回值大于0，交换a b，升序排列
    //return b-a; 如果b-a大于0，即b大于a则交换，较大的b 在前，降序排列
}


