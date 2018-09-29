//命名空间
var statementMap = {};
statementMap.colorArr = ['#87D068','#F6C244','#1890FF','#5E97F0'];
statementMap.barWidth20 = 20;
statementMap.barWidth24 = 24;
statementMap.legend1 = {
    right:22,
    top:18,
    itemWidth:8,
    itemHeight:8,
    data:['通过','拒绝','人工复核','进件量'],
    textStyle:{
        color:"#666"
    }
};
statementMap.tootip = {
    trigger: 'axis',
    backgroundColor:'#fff',
    textStyle:{
        color:'#666',
        fontSize:12
    },
    axisPointer : {         
        type : 'shadow',
        shadowStyle:{
            color:'rgba(94,151,240,0.1)',
            width:200
        }
    },
    formatter:function (value) {
        var html ='<div class="decision_fruit_tooltip">';
        html += '<h2>'+value[0].axisValue+'</h2>';
        for(var i=0;i<value.length;i++){
            html += '<div class="item">'+value[i].marker+'<span class="name">'+value[i].seriesName+'</span><span class="value">'+value[i].value+'</span></div>'
        }
        html += '</div>';
        return html;
    },
    extraCssText:'box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);'
};
statementMap.tootip_pie = {
    trigger: 'item',
    backgroundColor:'#fff',
    textStyle:{
        color:'#666',
        fontSize:12
    },
    axisPointer : {
        type : 'shadow',
        shadowStyle:{
            width:200
        }
    },
    formatter:function (value) {
        console.log(value);
        var html ='<div class="decision_fruit_tooltip">';
        html += '<h2>'+value.seriesName+'</h2>';
        html += '<div class="item">'+value.marker+'<span class="name">'+value.name+'</span><span class="value">'+value.value+'</span></div>'
        html += '</div>';
        return html;
    },
    extraCssText:'box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);'
};
statementMap.tootip_2 = {
    trigger: 'axis',
    backgroundColor:'#fff',
    textStyle:{
        color:'#666',
        fontSize:12
    },
    axisPointer : {
        type : 'shadow',
        shadowStyle:{
            color:'rgba(94,151,240,0.1)',
            width:200
        }
    },
    extraCssText:'box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);'
};
statementMap.label={
    show:true,
    color: '#fff',
    fontWeight:'bold',
    position:'insideRight',
    formatter:function (msg) {
        return msg.data + '%';
    }
}
statementMap.labe2={
    show:true,
    color: '#000',
    position:'insideRight',
    formatter:function (msg) {
        console.log(msg);
        if(msg.data == 0){
            return '';
        }
        return msg.data + '件';
    }
}
statementMap.myLabel=function (max,width) {
    return{
        show:true,
        color: '#fff',
        fontWeight:'bold',
        position:'insideRight',
        formatter:function (msg) {
            //根据字段个数判断长度
            var textWidth = ((msg.data+'').length+2)*7;
            var boxWidth = msg.data/max*width;
            console.log(textWidth);
            console.log(boxWidth);
            if(textWidth>boxWidth){
                return ''
            }
            return msg.data;
        }
    }
};
statementMap.labe3={
    show:true,
    color: '#000',
    position:'insideRight',
    formatter:function (msg) {
        return msg.data + '分';
    }
}
statementMap.label_3=function (max,width) {
    return {
        show:true,
        color: '#fff',
        fontWeight:'bold',
        position:'insideRight',
        formatter:function (msg) {
            //根据字段个数判断长度
            var textWidth = ((msg.data+'').length+2)*7;
            var boxWidth = msg.data/max*width;
            return msg.data + '分';
        }
    }
};
//决策结果统计
statementMap.echartsMap1 = function(ApplyResult,xDate){
    var myChart = echarts.init(document.getElementById('echarts_line_bar1'));
    var option = {
        title: {
        	left:22,
			top:18,
            text:'决策结果统计',
			textStyle:{
        		fontSize:14
			}
        },
        tooltip:statementMap.tootip,
        legend:statementMap.legend1,
		grid:{
        	top:80,
			left:68,
			right:22
		},
        xAxis: {
        	axisLine:{
        		lineStyle:{
        			color:'#D9D9D9'
				}
			},
            axisTick:{
                lineStyle:{
                    color:'#D9D9D9'
                }
            },
			axisLabel:{
        		textStyle:{
        			color:'#000'
				}
			},
            splitLine:{
                show:false
            },
            data: xDate
        },
        yAxis: {
        	axisLine:{
        		show:false,
			},
			axisTick:{
        		show:false
			},
            axisLabel:{
                textStyle:{
                    color:'rgba(0,0,0,0.65)'
                },
                formatter:'{value}件'
            },
			splitLine:{
        		lineStyle:{
        			type:'dotted',
        			color:'#e8e8e8'
				}
			}
		},
        color:statementMap.colorArr,
        series : ApplyResult
    };
    myChart.setOption(option);

    $(window).resize(function() {
        myChart.resize();
    });
};
//规则统计
statementMap.echartsMap2 = function (dataRes,ruleNo,flag) {
    var axisValue;
    if (flag == 1) {
        axisValue = '{value}件';
    }else {
        axisValue = '{value}%';
    }
    //如果只有一条数据，label中文本放中间

    var myChart = echarts.init(document.getElementById('echarts_bar1'));
    myChart.clear();

    var option = {
        title: {
            left:22,
            top:18,
            text:'规则统计',
            textStyle:{
                fontSize:14
            }
        },
        tooltip:statementMap.tootip,
        legend: statementMap.legend1,
        grid: {
            left:52,
            top:100,
            right:30
        },
        color:statementMap.colorArr,
        xAxis : {
            axisLine:{
                lineStyle:{
                    color:'#D9D9D9'
                }
            },
            axisTick:{
                lineStyle:{
                    color:'#D9D9D9'
                }
            },
            axisLabel:{
                textStyle:{
                    color:'#000'
                },
                formatter:axisValue
            },
            splitLine:{
                show:false
            },
            type : 'value'
        },
        yAxis : {
            data: ruleNo,
            axisLine:{
                lineStyle:{
                    color:'#D9D9D9'
                }
            },
            splitLine:{
                show:true,
                lineStyle:{
                    type:'dotted',
                    color:'#e8e8e8'
                }
            },
            axisLabel:{ 
                textStyle:{
                    color:'rgba(0,0,0,0.65)'
                },
                formatter:function (value) {
                    if (value != undefined) {
                        value = value.toString();
                        var maxlength=5;
                        if (value.length>maxlength) {
                            return value.substring(0, maxlength-1)+'...';
                        } else{
                            return value;
                        }
                    }
                }
            },
            interval:7,
            inverse:true,
            triggerEvent:true
        },
        dataZoom: [
            {
                type:'inside',
                yAxisIndex:[0],
                startValue:0,
                endValue:6,
                minValueSpan :6,
                maxValueSpan:6
            },{
                fillerColor:'#E9E9E9',  
                handleSize: 0,  
                type: 'slider',
                show: true,
                yAxisIndex: [0],
                right: '10',
                zoomLock:true,
                borderColor: '#fff',
                dataBackground:{
                    lineStyle:{
                        opacity:0
                    },
                    areaStyle:{
                        opacity:0
                    }
                },  
                width:6,
                labelFormatter: function (value) {
                    return '';
                }

            }
        ],
        series :dataRes

    };
    //根据所占最大值比例，如果文本长度超出图形大小，隐藏字体  dataRes
    //1.找到最大数据
    var max = 0;
    dataRes[0].data.forEach(function (value,index) {
        console.log(value);
        console.log(index);
        if((value + dataRes[1].data[index] + dataRes[2].data[index])>max){
            max = value + dataRes[1].data[index] + dataRes[2].data[index];
        }
    });
    //返回最大宽度
    var w = $(myChart._dom).width()-option.grid.left-option.grid.right;
    //函数根据最大数值和最大宽度判断
    var nowLabel = statementMap.myLabel(max,w);
    //将label放入数据
    option.series.forEach(function (value) {
        value.label = nowLabel;
    });
    //如果数据小于7条，改变option.dataZoom[0] 里面的endValue:6,
    if(dataRes[0].data.length<7){
        option.dataZoom[0].endValue = dataRes[0].data.length-1;
        option.dataZoom[0].minValueSpan = dataRes[0].data.length-1;
    }

    myChart.setOption(option);
    statementMap.echartsEvent(myChart);

    $(window).resize(function() {
        myChart.resize();
    });

};
//策略统计
statementMap.echartsMap3 = function (pass,refuse,recheck) {
    var myChart = echarts.init(document.getElementById('echarts_pie1'));
    myChart.clear();
    var option = {
        title: {
            left:22,
            top:18,
            text:'策略统计',
            textStyle:{
                fontSize:14
            }
        },
        tooltip: statementMap.tootip_pie,
        legend: statementMap.legend1,
        color:statementMap.colorArr,
        series: [
            {
                type:'pie',
                name:'策略统计',
                radius: ['30%', '45%'],
                data:[
                    {
                        value:pass,
                        name:'通过'
                    },
                    {
                        value:refuse,
                        name:'拒绝'
                    },
                    {
                        value:recheck,
                        name:'人工复核'
                    }
                ],
                labelLine:{
                    normal:{
                        length2:40
                    }
                },
                label:{
                    formatter: '{b}: {a|{c}}',
                    rich:{
                        a:{
                            color: '#000',
                            align: 'left',
                            lineHeight:25
                        }
                    }
                }
            }
        ]
    };
    myChart.setOption(option);

    $(window).resize(function() {
        myChart.resize();
    });
};
//策略对比
statementMap.echartsMap4 = function(pass,refuse,recheck,sceneName){
    console.log(pass);
    console.log(refuse);
    console.log(recheck);
    console.log(sceneName);
    var myChart = echarts.init(document.getElementById('echarts_bar2'));
    var option = {
        title: {
            left:22,
            top: 18,
            text:'策略对比',
            textStyle:{
                fontSize:14
            }
        },
        legend: statementMap.legend1,
        tooltip:statementMap.tootip,
        grid: {
            left:92,
            top:60,
            bottom:20,
            right:40
        },
        calculable : true,
        color:statementMap.colorArr,
        xAxis : [
            {
                axisLine:{
                    lineStyle:{
                        color:'#D9D9D9'
                    }
                },
                axisTick:{
                    lineStyle:{
                        color:'#D9D9D9'
                    }
                },
                axisLabel:{
                    textStyle:{
                        color:'#000'
                    },
                    formatter:'{value}件'
                },
                splitLine:{
                    show:false
                },
                type : 'value'
            }
        ],
        yAxis : [
            {
                type : 'category',
                data : sceneName,
                axisLine:{
                    lineStyle:{
                        color:'#D9D9D9'
                    }
                },
                axisLabel:{
                    textStyle:{
                        color:'rgba(0,0,0,0.65)'
                    },
                    formatter:function (value) {
                        if (value != undefined) {
                            value = value.toString();
                            var maxlength=5;
                            if (value.length>maxlength) {
                                return value.substring(0, maxlength-1)+'...';
                            } else{
                                return value;
                            }
                        }
                    }
                },
                splitLine:{
                    show:true,
                    lineStyle:{
                        type:'dotted',
                        color:'#e8e8e8'
                    }
                },
                inverse:true,
                triggerEvent:true
            }
        ],
        dataZoom: [
            {
                type:'inside',
                yAxisIndex:[0],
                startValue:0,
                endValue:6,
                minValueSpan :6,
                maxValueSpan:6
            },{
                fillerColor:'#E9E9E9',
                handleSize: 0,
                type: 'slider',
                show: false,
                yAxisIndex: [0],
                right: '10',
                zoomLock:true,
                borderColor: '#fff',
                dataBackground:{
                    lineStyle:{
                        opacity:0
                    },
                    areaStyle:{
                        opacity:0
                    }
                },
                width:6,
                labelFormatter: function (value) {
                    return '';
                }

            }
        ],
        series : [
            {
                name:'通过',
                type:'bar',
                barWidth: statementMap.barWidth20,
                stack: '总量',
                label:statementMap.labe2,
                data:pass,
            },
            {
                name:'拒绝',
                type:'bar',
                barWidth: statementMap.barWidth20,
                stack: '总量',
                label:statementMap.labe2,
                data:refuse,
            },
            {
                name:'人工复核',
                type:'bar',
                barWidth: statementMap.barWidth20,
                stack: '总量',
                label:statementMap.labe2,
                data:recheck,
            }
        ]
    };
    var max = 0;
    pass.forEach(function (value,index) {
        if((pass[index]+refuse[index]+recheck[index])>max){
            max = pass[index]+refuse[index]+recheck[index];
        }
    });
    //返回最大宽度
    var w = $(myChart._dom).width()-option.grid.left-option.grid.right;
    var nowLabel = statementMap.myLabel(max,w);
    option.series.forEach(function (value) {
        value.label = nowLabel;
    });
    //如果数据小于7条，改变option.dataZoom[0] 里面的endValue:6,
    if(pass.length<7){
        option.dataZoom[0].endValue = pass.length-1;
        option.dataZoom[0].minValueSpan = pass.length-1;
    }

    myChart.setOption(option);
    statementMap.echartsEvent(myChart);

    $(window).resize(function() {
        myChart.resize();
    });
};
//规则统计-评分模式
statementMap.echartsMap5 = function (data,ruleNo) {
    var myChart = echarts.init(document.getElementById('echarts_bar1'));
    myChart.clear();
    var option = {
        title: {
            left:22,
            top: 18,
            text: '规则统计',
            textStyle:{
                fontSize:14
            }
        },
        legend: {
            right: 22,
            top: 18,
            itemWidth:8,
            itemHeight:8,
            data:['平均分'],
            textStyle: {
                color: "#666"
            }
        },
        tooltip:statementMap.tootip,
        grid: {
            left: 92,
            top: 100,
            right:30
        },
        color:'#1890FF',
        xAxis : {
            axisLine:{
                lineStyle:{
                    color:'#D9D9D9'
                }
            },
            axisTick:{
                lineStyle:{
                    color:'#D9D9D9'
                }
            },
            axisLabel:{
                textStyle:{
                    color:'#000'
                },
                formatter:'{value}分'
            },
            splitLine:{
                show:false
            },
            type : 'value'
        },
        yAxis : {
            data : ruleNo,
            axisLine:{
                lineStyle:{
                    color:'#D9D9D9'
                }
            },
            axisLabel:{
                textStyle:{
                    color:'rgba(0,0,0,0.65)'
                },
                formatter:function (value) {
                    if (value != undefined) {
                        value = value.toString();
                        var maxlength=5;
                        if (value.length>maxlength) {
                            return value.substring(0, maxlength-1)+'...';
                        } else{
                            return value;
                        }
                    }
                }
            },
            inverse:true,
            triggerEvent:true
        },
        series : [
            {
                name:'平均分',
                type:'bar',
                barWidth:statementMap.barWidth20,
                label:statementMap.labe3,
                data:data,
            }
        ]
    };
    myChart.setOption(option);
    statementMap.echartsEvent(myChart);

    $(window).resize(function() {
        myChart.resize();
    });
};
//策略统计-评分模式
statementMap.echartsMap6 = function (score,num) {
    var myChart = echarts.init(document.getElementById('echarts_pie1'));
    myChart.clear();
    var option = {
        title: {
            left:22,
            top:18,
            text:'策略统计',
            textStyle:{
                fontSize:14
            }
        },
        tooltip: statementMap.tootip,
        legend: {
            right: 21,
            top: 17,
            itemWidth:8,
            itemHeight:8,
            data:['策略执行结果'],
            textStyle: {
                color: "#666"
            }
        },
        grid: {
            left: 70,
            top: 100,
            right:30
        },
        color:'#1890FF',
        xAxis : {
            data: score,
            axisLine:{
                lineStyle:{
                    color:'#D9D9D9'
                }
            },
            axisTick:{
                lineStyle:{
                    color:'#D9D9D9'
                }
            },
            axisLabel:{
                textStyle:{
                    color:'#000'
                },
                formatter:function (value) {
                    if (value != undefined) {
                        value = value.toString();
                        var maxlength=5;
                        if (value.length>maxlength) {
                            return value.substring(0, maxlength-1)+'...'+'分';
                        } else{
                            if (value == "null") {
                                return '异常';
                            } else {
                                return value + '分';
                            }
                        }
                    }
                }
            },
            splitLine:{
                show:false
            }
        },
        yAxis : {
            axisLine:{ 
                show:false,
            },
            axisTick:{ 
                show:false
            },
            axisLabel:{ 
                textStyle:{
                    color:'rgba(0,0,0,0.65)'
                },
                formatter:function (value) {
                    if (value != undefined) {
                        value = value.toString();
                        var maxlength=5;
                        if (value.length>maxlength) {
                            return value.substring(0, maxlength-1)+'...'+'件';
                        } else{
                            return value + '件';
                        }
                    }
                }
            },
            splitLine:{
                show:true,
                lineStyle:{
                    type:'dotted',
                    color:'#e8e8e8'
                }
            }
        },
        series : [
            {
                name: '策略执行结果',
                type: 'bar',
                barWidth: statementMap.barWidth20,
                data: num
            }
        ]
    };
    myChart.setOption(option);

    $(window).resize(function() {
        myChart.resize();
    });
};
//标题提示框
statementMap.echartsEvent = function(myChart){
	myChart.on('mouseover',function (params) {
        if(params.componentType == "yAxis"){
            var obj = {
                str:params.value,
                left:params.event.event.clientX + 10,
                top:params.event.event.pageY + 20
            }
            statementMap.echartsTitle(obj)
        }
    });
    myChart.on('mousemove',function (params) {
        $('.echarts_title').css({
            left:params.event.event.clientX + 10,
            top:params.event.event.pageY + 20
        })
    });
    myChart.on('mouseout',function (params) {
        if(params.componentType == "yAxis"){
            $('.echarts_title').remove();
        }
    })
}
statementMap.echartsTitle = function(opt){
    var html = '<div class="echarts_title">'+opt.str+'</div>';
    $('body').append(html);
    $('.echarts_title').css({
        left:opt.left,
        top:opt.top
    })
};













