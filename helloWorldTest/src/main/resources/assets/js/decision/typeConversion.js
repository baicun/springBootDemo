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



conversionData=function(result){
	var ruleArray=new Array();
    for(var i=0;i<result.length;i++){
    	var ruleData=new Object();
        ruleData.name=result[i].name;
        ruleData.uid=result[i].id;
        ruleData.index=i;
        ruleData.weights=result[i].weights==null||result[i].weights==undefined?"":result[i].weights;
        var list=[];
        var list1=[];
        //获取逻辑组
        var logicKeyAtomMap=new Map();
        var fieldKeyAtomMap=new Map();
        for(var a=0;a<result[i].logicList.length;a++){
            for(var b=0;b<result[i].logicList[a].atomList.length;b++){
                logicKeyAtomMap[result[i].logicList[a].atomList[b].id]=result[i].logicList[a].atomList[b];
                //fieldKeyAtomMap[result[i].logicList[a].atomList[b].fieldId]=result[i].logicList[a].atomList[b];
            }
        }
        for(var f=0;f<result[i].fieldList.length;f++){
            fieldKeyAtomMap[result[i].fieldList[f].id]=result[i].fieldList[f];
        }
        for(var c=0;c<result[i].logicList.length;c++){
            var logicParse=result[i].logicList[c].logic.split("|");
            if(!(logicParse.length==1&&logicKeyAtomMap[logicParse[0]].type==9999)){
                //解析字段逻辑信息
                var field={};
                var fieldLogic=[];
                var line={};
                var lineLogin=[];
                var lineData=[];
                //获取分数
                for(var g=0;g<result[i].logicList[c].decisionList.length;g++){
                    var decisionScoreData=result[i].logicList[c].decisionList[g];
                    if(decisionScoreData.type==3){
                        field.score=decisionScoreData.value;
                    }
                }
                for(var e=0;e<logicParse.length;e++){
                    if(e%2==0){
                        var fieldBase=logicKeyAtomMap[logicParse[e]];
                        if(fieldBase.fieldType==1){
                            fieldLogic.push({
                                'type':'1','name':fieldBase.fieldName,'textType':'整数','value1':fieldBase.dataValue.split(',')[0],'value2':fieldBase.dataValue.split(',')[1]
                                ,'id':fieldBase.fieldId,'logicType':fieldBase.type
                            })
                        }else if(fieldBase.fieldType==2){
                            fieldLogic.push({
                                'type':'2','name':fieldBase.fieldName,'textType':'小数','value1':fieldBase.dataValue.split(',')[0],'value2':fieldBase.dataValue.split(',')[1]
                                ,'id':fieldBase.fieldId,'logicType':fieldBase.type
                            })
                        }else if(fieldBase.fieldType==4){
                            var newLogicRelation='等于';
                            if(fieldBase.type==2){
                                newLogicRelation='不等于';
                            }
                            var dicField={
                                'type':'4','name':fieldBase.fieldName,'textType':'字典','logic':newLogicRelation,'id':fieldBase.fieldId
                            };
                            dicField.data=fieldKeyAtomMap[fieldBase.fieldId].itemsList;
                            dicField.logicType=fieldBase.type;
                            for(var d=0;d<dicField.data.length;d++){
                                if(fieldBase.dataValue==dicField.data[d].code){
                                    dicField.valueIndex=d;
                                    dicField.value=dicField.data[d].name;
                                    dicField.valueCode=dicField.data[d].code;
                                    break;
                                }
                            }
                            fieldLogic.push(dicField);
                        }else if(fieldBase.fieldType==5){
                            var newLogicRelation='包含';
                            if(fieldBase.type==4){
                                newLogicRelation='不包含';
                            }
                            fieldLogic.push({
                                'type':'5','name':fieldBase.fieldName,'textType':'文本','logic':newLogicRelation,'value':fieldBase.dataValue
                                ,'id':fieldBase.fieldId,'logicType':fieldBase.type
                            })
                        }
                        lineLogin.push(
                            {'type':'1','name':logicKeyAtomMap[logicParse[e]].fieldName,'index':e/2,'value':logicKeyAtomMap[logicParse[e]].fieldId,}
                        )
                    }else{
                        if(logicParse[e]==6){
                            lineLogin.push(
                                {'type':'2','name':'and','value':'0'}
                            )
                        }else if(logicParse[e]==7){
                            lineLogin.push(
                                {'type':'2','name':'or','value':'1'}
                            )
                        }
                    }
                }
                lineData=result[i].logicList[c].logicLineList;
                if(lineData==null||lineData.length==0){
                    line.onOff=0;
                }else{
                    line.onOff=1;
                    line.parentH1=82+(lineData.length-1)*30+16;
                    line.parentH2=68+(lineData.length-1)*30+16;
                }
                field.data=fieldLogic;
                list.push(field);
                line.data=lineLogin;
                line.line=lineData;
                list1.push(line);
            }else{
                //获取其他分数
                for(var h=0;h<result[i].logicList[c].decisionList.length;h++){
                    var decisionScoreData=result[i].logicList[c].decisionList[h];
                    if(decisionScoreData.type==3){
                        ruleData.score=decisionScoreData.value;
                    }
                }
            }

        }
        ruleData.list=list;
        ruleData.list1=list1;
        ruleArray.push(ruleData);
    }
    console.log("************************");
    console.log(JSON.stringify(ruleArray));
    return ruleArray;
}

conversionSingleData=function (obj) {
    checkRule.baseInfo.ruleName=obj.name;
    checkRule.baseInfo.description=obj.description;
    checkRule.baseInfo.ruleId=obj.id;
    checkRule.baseInfo.ruleNo=obj.no;
    checkRule.data =[];


    //生成字段列表-数据
    checkRule.arrData = [ //模拟数据-就是接口中数据的长度
        {'name':'姓名','uid':55,'type':'1','typeName':'文本'},
        {'name':'年龄','uid':10,'type':'1','typeName':'文本'},
        {'name':'居住地','uid':33,'type':'2','typeName':'整数'},
        {'name':'工作所在地','uid':22,'type':'3','typeName':'字典'},
        {'name':'姓名1','uid':44,'type':'1','typeName':'文本'},
        {'name':'年龄1','uid':66,'type':'1','typeName':'文本'},
        {'name':'居住地1','uid':80,'type':'2','typeName':'整数'},
        {'name':'工作所在地1','uid':100,'type':'3','typeName':'字典'}
    ];
    checkRule.arrMenu = [
        [],
        [],
        [],
        [{'name':'工作1'},{'name':'工作2'},{'name':'工作3'},{'name':'工作4'},{'name':'工作5'},{'name':'工作6'}],
        [],
        [],
        [],
        [{'name':'工作中1'},{'name':'工作中2'},{'name':'工作中3'},{'name':'工作中4'},{'name':'工作中5'},{'name':'工作中6'}]
    ];

    checkRule.arrData =[];
    checkRule.arrMenu = [];
    //获取逻辑组
    var logicKeyAtomMap=new Map();
    var fieldKeyAtomMap=new Map();
    for(var a=0;a<obj.logicList.length;a++){
        for(var b=0;b<obj.logicList[a].atomList.length;b++){
            logicKeyAtomMap[obj.logicList[a].atomList[b].id]=obj.logicList[a].atomList[b];
        }
    }
    var sort=new Array();
    for(var f=0;f<obj.fieldList.length;f++){
        sort.push(obj.fieldList[f].id);
        fieldKeyAtomMap[obj.fieldList[f].id]=obj.fieldList[f];
        if(obj.fieldList[f].type==1){
            checkRule.arrData.push(
                {'name':obj.fieldList[f].name,'uid':obj.fieldList[f].id,'type':'1','typeName':'整数'}
            )
        }else if(obj.fieldList[f].type==2){
            checkRule.arrData.push(
                {'name':obj.fieldList[f].name,'uid':obj.fieldList[f].id,'type':'2','typeName':'小数'}
            )
            checkRule.arrMenu.push([]);
        }else if(obj.fieldList[f].type==4){
            checkRule.arrData.push(
                {'name':obj.fieldList[f].name,'uid':obj.fieldList[f].id,'type':'4','typeName':'字典'}
            )
            checkRule.arrMenu.push(obj.fieldList[f].itemsList);
        }else if(obj.fieldList[f].type==5){
            checkRule.arrData.push(
                {'name':obj.fieldList[f].name,'uid':obj.fieldList[f].id,'type':'5','typeName':'文本'}
            )
            checkRule.arrMenu.push([]);
        }
    }
    for(var c=0;c<obj.logicList.length;c++){
        var logicParse=obj.logicList[c].logic.split("|");
        var logic={};
        var dataList=[];
        var dataList1=[];
        var line=[];
        var dataList2=[];//记录具体的字段值
        var dataFieldValueMap=new Map();
        var selectMap=new Map();//记录多选框
        if(!(logicParse.length==1&&logicKeyAtomMap[logicParse[0]].type==9999)){
            for(var g=0;g<obj.logicList[c].decisionList.length;g++){
                var decisionData=obj.logicList[c].decisionList[g];
                if(decisionData.type==1){
                    logic.tactics=decisionData.value-1;
                }
                if(decisionData.isPerform!==-1){
                    logic.onOff1=decisionData.isPerform;
                }
            }
            for(var e=0;e<logicParse.length;e++){
                if(e%2==0){
                    var fieldBase=logicKeyAtomMap[logicParse[e]];
                    if(fieldBase.fieldType==1){
                        dataFieldValueMap[fieldBase.fieldId]={
                            'type':'1','name':fieldBase.fieldName,'textType':'整数','value1':fieldBase.dataValue.split(',')[0],'value2':fieldBase.dataValue.split(',')[1]
                            ,'id':fieldBase.fieldId,'logicType':fieldBase.type
                        };
                    }else if(fieldBase.fieldType==2){
                        dataFieldValueMap[fieldBase.fieldId]={
                            'type':'2','name':fieldBase.fieldName,'textType':'小数','value1':fieldBase.dataValue.split(',')[0],'value2':fieldBase.dataValue.split(',')[1]
                                ,'id':fieldBase.fieldId,'logicType':fieldBase.type
                        };
                    }else if(fieldBase.fieldType==4){
                        var logicSelect=[];
                        var newLogicRelation='等于';
                        if(fieldBase.type==2){
                            newLogicRelation='不等于';
                            logicSelect.push({'name':'不等于','value':'1'});
                        }else{
                            logicSelect.push({'name':'等于','value':'0'})
                        }
                        var dicField={
                            'type':'4','name':fieldBase.fieldName,'textType':'字典','logic':newLogicRelation,'id':fieldBase.fieldId
                        };
                        dicField.data=fieldKeyAtomMap[fieldBase.fieldId].itemsList;
                        dicField.logicType=fieldBase.type;
                        for(var d=0;d<dicField.data.length;d++){
                            if(fieldBase.dataValue==dicField.data[d].code){
                                dicField.valueIndex=d;
                                dicField.value=dicField.data[d].name;
                                dicField.valueCode=dicField.data[d].code;
                                logicSelect.push({'name':dicField.value,'value':dicField.valueIndex,'valueCode':dicField.valueCode})
                                break;
                            }
                        }
                        dataFieldValueMap[fieldBase.fieldId]=dicField;
                        selectMap[fieldBase.fieldId]=logicSelect;
                    }else if(fieldBase.fieldType==5){
                        var newLogicRelation='包含';
                        if(fieldBase.type==4){
                            newLogicRelation='不包含';
                            selectMap[fieldBase.fieldId]={'name':'不包含','value':'1'};
                        }else{
                            selectMap[fieldBase.fieldId]={'name':'包含','value':'0'};

                        }
                        dataFieldValueMap[fieldBase.fieldId]={
                            'type':'5','name':fieldBase.fieldName,'textType':'文本','logic':newLogicRelation,'value':fieldBase.dataValue
                            ,'id':fieldBase.fieldId,'logicType':fieldBase.type
                        }
                    }
                    dataList1.push(
                        {'type':'1','name':logicKeyAtomMap[logicParse[e]].fieldName,'index':e/2,'value':logicKeyAtomMap[logicParse[e]].fieldId,}
                    )
                }else{
                    if(logicParse[e]==6){
                        dataList1.push(
                            {'type':'2','name':'and','value':'0'}
                        )
                    }else if(logicParse[e]==7){
                        dataList1.push(
                            {'type':'2','name':'or','value':'1'}
                        )
                    }
                }
            }
            for(var s=0;s<sort.length;s++){
                if(selectMap[sort[s]]!=null){
                    dataList= dataList.concat(selectMap[sort[s]]);
                }
                dataList2.push(dataFieldValueMap[sort[s]]);
            }
            logic.dataList=dataList;
            logic.dataList1=dataList1;
            logic.dataList2=dataList2;
            line=obj.logicList[c].logicLineList;
            if(line==null||line.length==0){
                logic.onOff=0;
            }else{
                logic.onOff=1;
                logic.parentH1=82+(line.length-1)*30+16;
                logic.parentH2=68+(line.length-1)*30+16;
            }
            logic.line=line;
            checkRule.data.push(logic);
        }else{
            //获取其他
            for(var h=0;h<obj.logicList[c].decisionList.length;h++){
                var decisionData=obj.logicList[c].decisionList[h];
                if(decisionData.type==1){
                    checkRule.data.push({
                        'tactics':decisionData.value-1,
                        'onOff1':decisionData.isPerform,
                    });
                }
            }
        }

    }
    console.log("*************checkRule.data***********");
    console.log(JSON.stringify(checkRule.data));
}
