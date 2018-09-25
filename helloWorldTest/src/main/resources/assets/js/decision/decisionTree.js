(function (w) {
    var tree = {
        paper:null,
        graph:null,
        cellMsg:[],     //这个是真正的节点信息
        links:[],       //连接线条信息
        dataCell:[],    //数据节点
        chartID:null,
        tempOperate:null,
        removeCellMsg:[],
        scale:1
    };


    //初始化
    tree.init = function (opt) {
        tree.paper = null;
        tree.graph = null;
        tree.cellMsg = [];
        tree.links = [];
        tree.dataCell = [];
        tree.chartID = null;
        tree.tempOperate = null;
        tree.removeCellMsg = [];


        tree.graph = new joint.dia.Graph;
        tree.paper = new joint.dia.Paper({
            el: document.getElementById(opt.id),
            model: tree.graph,
            width: opt.width,
            height: opt.height,
            gridSize: opt.gridSize,
            drawGrid: true,
            background: {
                color: opt.color
            }
        });
        tree.chartID = opt.id;
        //鼠标点击元素事件
        tree.paper.on('cell:pointerdown',function (e, d) {
            // judgingPosition(e.model);   //判断节点关于父节点的位置
            $('.treeOperate').remove();
            $('.linkOperate').remove();
        });
        //鼠标离开元素事件，判断当前元素与父元素位置关系，改变当前元素位置
        tree.paper.on('cell:pointerup',function (e, d) {
            // judgingPosition(e.model);   //判断节点关于父节点的位置
            tree.adjustPaper(e.model);
        });
        //元素变换位置事件，
        tree.graph.on('change:source change:target',function (link) {
            //新建的线条连接到元素时，判断源节点和目标节点之间是否存在线条，若存在，删除当前新建的
            if(link.get('source').id && link.get('target').id){
                var linkText = link.attr().text.text;

                //如果存在，删除，也可以改为如果存在，不增加当前线
                //更新linkMsg
                tree.links = tree.graph.getLinks();
                //在linkMsg中去掉本身
                for(var i=tree.links.length-1;i>=0;i--){
                    if(tree.links[i] == link){
                        tree.links.splice(tree.links.indexOf(link),1);
                    }
                }
                //已存在线段 就删除
                for(var j=0;j<tree.links.length;j++){
                    if((tree.links[j].attributes.source.id == link.attributes.source.id)&&(tree.links[j].attributes.target.id == link.attributes.target.id)){
                        link.remove();
                        $('.tree_map_left .hint').show();
                        $('.tree_map_left .hint .text').text('此规则已存在');
                        return;
                    }
                    if((tree.links[j].attributes.source.id == link.attributes.target.id)&&(tree.links[j].attributes.target.id == link.attributes.source.id)){
                        link.remove();
                        $('.tree_map_left .hint').show();
                        $('.tree_map_left .hint .text').text('此规则已存在');
                        return;
                    }
                }
                //还有就是目标节点的子辈中规则如果有和当前节点父辈规则相同，删除

                //找打源节点和目标节点
                var sourceId = link.get('source').id;
                if(sourceId){
                    var source = tree.graph.getCell(sourceId);
                    console.log(source);
                }
                var targetId = link.get('target').id;
                if(targetId){
                    var target = tree.graph.getCell(targetId);
                    console.log(target);
                }
                //找到源节点和目标节点的数据节点
                var dataSource = null,
                    dataTarget = null;
                tree.dataCell.forEach(function (value) {
                    if(value.decisionID == source.decisionID){
                        dataSource = value;
                    }
                    if(value.decisionID == target.decisionID){
                        dataTarget = value;
                    }
                });

                //当子节点是自己祖先节点，那么自己就是子节点（不能搞乱辈分）
                //遍历自己的父亲节点，判断目标节点是不是自己的祖先节点
                var targetIsParent = false;
                dataSource.parentID
                function searchFn(sour) {

                    var tempParentID = sour.parentID;

                    tempParentID.forEach(function (value) {
                        tree.dataCell.forEach(function(value2){
                            if(value2.decisionID == value){
                                if(value2.decisionID == dataTarget.decisionID){
                                    targetIsParent = true;
                                    return;
                                }
                                searchFn(value2);
                            }
                        })
                    });
                }
                searchFn(dataSource);
                //如果目标节点是祖先节点，自己是后辈
                //还要判断源节点的祖先和目标节点的后代是否有数据相同，没有相同才能相连

                var parentRules = [];
                var childRules = [];
                var hasEqualRule = false;
                function searchParent(cur) {
                    parentRules.push(cur.text);
                    cur.parentID.forEach(function (value) {
                        tree.dataCell.forEach(function (value2) {
                            if(value == value2.decisionID){
                                searchParent(value2);
                            }
                        })
                    })
                }
                function searchChild(cur) {
                    childRules.push(cur.text);
                    cur.children.forEach(function (value) {
                        tree.dataCell.forEach(function (value2) {
                            if(value == value2.decisionID){
                                searchChild(value2);
                            }
                        })
                    })
                }
                function hasEquealRule(arr1,arr2) {
                    arr1.forEach(function (value) {
                        arr2.forEach(function (value2) {
                            if(value == value2){
                                hasEqualRule = true;
                            }
                        })
                    })
                }

                if(targetIsParent){
                    parentRules = [];
                    childRules = [];
                    hasEqualRule = false;
                    searchParent(dataTarget);
                    searchChild(dataSource);
                    hasEquealRule(parentRules,childRules);

                    if(hasEqualRule){
                        link.remove();
                        $('.tree_map_left .hint').show();
                        $('.tree_map_left .hint .text').text('此规则已存在');
                        return;
                    }else{
                        link.attr('.marker-source', { fill: '#4b4a67', stroke: '#4b4a67', d: 'M 6 0 L 0 3 L 6 6 z' });
                        link.attr('.marker-target', { fill: '#4b4a67', stroke: '#4b4a67', d: '' });
                        dataTarget.children.push(dataTarget.decisionID);
                        console.log(linkText);
                        if(linkText != ''){
                            dataTarget.links.push(linkText);
                            switch (linkText){
                                case '通过':
                                    dataTarget.linksID.push(0);
                                    break;
                            }
                        }else{
                            link.attr('text/fill','#666');
                            link.attr('text/text','请选择策略');
                            link.attr({'.connection': { stroke: '#666'}});

                            dataTarget.links.push('请选择策略');
                            dataTarget.linksID.push(0);
                        }
                        dataSource.parentID.push(dataTarget.decisionID);
                    }
                }else{
                    parentRules = [];
                    childRules = [];
                    hasEqualRule = false;
                    searchParent(dataSource);
                    searchChild(dataTarget);
                    hasEquealRule(parentRules,childRules);

                    if(hasEqualRule){
                        link.remove();
                        $('.tree_map_left .hint').show();
                        $('.tree_map_left .hint .text').text('此规则已存在');
                        return;
                    }else{
                        link.attr('.marker-source', { fill: '#4b4a67', stroke: '#4b4a67', d: '' });
                        link.attr('.marker-target', { fill: '#4b4a67', stroke: '#4b4a67', d: 'M 6 0 L 0 3 L 6 6 z' });
                        dataSource.children.push(dataTarget.decisionID);
                        if(linkText != ''){
                            dataSource.links.push(linkText);
                            //判断目标节点是不是源节点的不带线的子元素
                            switch (linkText){
                                case '通过':
                                    dataTarget.linksID.push(0);
                                    break;
                            }
                        }else{
                            link.attr('text/fill','#666');
                            link.attr('text/text','请选择策略');
                            link.attr({'.connection': { stroke: '#666'}});

                            dataSource.links.push('请选择策略');
                            dataSource.linksID.push(0);
                        }
                        dataTarget.parentID.push(dataSource.decisionID);
                    }
                }
            }
        });
        //页面元素点击事件，包括线，在里面判断是点击的节点还是线
        tree.paper.on('cell:pointerclick',function (e,d) {
            if(e.model.attributes.type == 'standard.Rectangle'){
                //e.model也等于createEle()的返回值
                tree.tempOperate = e.model;
                tree.opereteCell(e.model);
                $('.tree_tabControl li').eq(0).click();

                $('.down_menu_btn span').addClass('menu_title_color').text('请选择');
                //如果点击的元素时未选择的，规则设置下面显示暂无信息图标，编辑是灰色不能点击

                if($('.treeOperate').hasClass('can')){
                    $('.hasRuleMsg').addClass('active');
                    $('.noRuleMsg').removeClass('active');
                    $('.rule_edit .edit').addClass('active');
                }else{
                    $('.hasRuleMsg').removeClass('active');
                    $('.noRuleMsg').addClass('active');
                    $('.rule_edit .edit').removeClass('active');
                }

            }else if(e.model.attributes.type == 'examples.CustomLink'){
                tree.tempOperate = e.model;
                // $('.nav .to_decision_fruit').click();
                $('.tree_tabControl li').eq(1).click();
                $('.selection ul li').removeClass('selected');
                // changeRuleFruit(e.model);
                // console.log(e);
                // console.log(e.$el.find('.label').width());
                // $(e.el).find('rect').addClass('active');

                tree.newLinkOperate(e);

                //清空select
                // clearSelect();
            }
            d.stopPropagation();
        });
    };


    //生成节点,obj = {left,top,text}
    tree.createEle = function (obj) {
        var rect = new joint.shapes.standard.Rectangle();
        rect.position(obj.left, obj.top); //位置
        rect.resize(160, 48);   //大小
        rect.attr({
            body: {
                strokeWidth:1,
                stroke:'#D9D9D9',
                fill: '#5E97F0',
                rx:8,  //rx,ry设置圆角
                ry:8,
            },
            label: {
                text: obj.text || '请选择规则',
                fill: 'white'
            }
        });
        return rect;
    };

    //生成线 根据位置
    // custom link definition
    var CustomLink = joint.dia.Link.define('examples.CustomLink', {
        defaultLabel: {
            // attrs: { text: { text: '*' } }
        },
        smooth: true
    });

    //obj = {x1,y1,x2,y2}  obj ={source,x2,y2}
    tree.createLink = function (obj) {
        var link = new CustomLink({
            // source: { x: obj.x1, y: obj.y1 },
            source: { id: obj.source.id },
            target: { x: obj.x2, y: obj.y2 },
            // router: { name: 'manhattan' },
            labels: [
                {
                    position: 0.5,
                    attrs: {
                        text: {
                            text: '请选择策略\n请选择策略\n请选择策略',
                            fill:'red'
                            // 'font-weight': 'bold',
                        },
                        rect:{
                            stroke: 'rgba(0,0,0,0.3)',
                            // strokeWidth: 20,
                            rx: 5,
                            ry: 5
                        }
                    }
                }
            ],
        });
        return link;
    };

    //根据起始元素生成的线
    tree.createLinkEle = function (source, target, text) {
        var link = new CustomLink({
            source: { id: source.id },
            target: { id: target.id },
            // router: { name: 'manhattan' },
            labels: [
                {
                    position: 0.5,
                    attrs: {
                        text: {
                            text: text || '',
                            fill:'red'
                            // 'font-weight': 'bold',
                        },
                        rect:{
                            stroke: 'rgba(0,0,0,0.3)',
                            // strokeWidth: 20,
                            width:100,
                            height:50,
                            rx: 5,
                            ry: 5
                        }
                    }
                }
            ],

        });
        return link;
    };


    //初始画布大小
    tree.initPaper = function (opt) {
        var paperW = tree.paper.$el[0].clientWidth,
            paperH = tree.paper.$el[0].clientHeight;

        var minLayer = 999,
            maxLayer = 0,
            minSign = 999,
            maxSign = 0;
        opt.forEach(function(value){
            if(minLayer>value.layer){
                minLayer = value.layer;
            }
            if(maxLayer<value.layer){
                maxLayer = value.layer;
            }
            if(minSign>value.sign){
                minSign = value.sign;
            }
            if(maxSign<value.sign){
                maxSign = value.sign;
            }
        });

        //如果需要的画布大小大于当前大小，调整画布大小
        var nowW = (maxSign-minSign+1)*217+150;
        var nowH = (maxLayer-minLayer+1)*110+300;
        if(nowW>paperW){
            tree.paper.$el.css({
                width:nowW,
                height:tree.paper.$el[0].clientHeight,
            })
        }
        if(nowH>paperH){
            tree.paper.$el.css({
                width:tree.paper.$el[0].clientWidth,
                height:nowH
            })
        }

        //返回最小layer和sign作为其它元素的判断点
        return {
            minSign:minSign,
            minLayer:minLayer
        }
    };



    //根据数据生成树图
    tree.createFromData = function (decisionMsg) {
        var originMsg = tree.initPaper(decisionMsg);
        tree.dataCell = decisionMsg;

        //开始画图
        var minLayer = originMsg.minLayer,
            minSign = originMsg.minSign;
        //生成节点
        decisionMsg.forEach(function(value){
            var left = (value.sign - minSign)*217 + 100;
            var top = (value.layer - minLayer)*150 + 100;
            var cell = tree.createEle({
                left:left,
                top:top,
                text:value.text
            });
            cell.decisionID = value.decisionID;
            tree.cellMsg.push(cell);
            tree.graph.addCell(cell);
        });

        //生成线
        decisionMsg.forEach(function(value){
            //找到source
            var source = null;
            tree.cellMsg.forEach(function (value2) {
                if(value2.decisionID == value.decisionID){
                    source = value2;
                }
            });
            //找到target
            var target = null;
            value.children.forEach(function (value2,index2) {
                tree.cellMsg.forEach(function (value3) {
                    if(value3.decisionID == value2){
                        target = value3;
                        var text = value.links[index2];

                        var link = tree.createLinkEle(source,target);
                        if(text == '通过'){
                            link.attr('text/text','通过');
                            link.attr('text/fill','#87D068');
                            link.attr({'.connection': { stroke: '#87D068'}});
                        }else if(text == '拒绝'){
                            link.attr('text/text','拒绝');
                            link.attr('text/fill','#F6C244');
                            link.attr({'.connection': { stroke: '#F6C244'}});
                        }else if(text == '通过拒绝'){
                            link.attr('text/text','通过拒绝');
                            link.attr('text/fill','#F6C244');
                            link.attr({'.connection': { stroke: '#F6C244'}});
                        }else if(text == '人工复核'){
                            link.attr('text/text','人工复核');
                            link.attr('text/fill','#1890FF');
                            link.attr({'.connection': { stroke: '#1890FF'}});
                        }else if(text == '通过拒绝'){
                            link.attr('text/text','通过\n拒绝');
                            link.attr('text/fill','#666');
                            link.attr({'.connection': { stroke: '#666'}});
                        }else if(text == '通过人工复核'){
                            link.attr('text/text','通过\n人工复核');
                            link.attr('text/fill','#666');
                            link.attr({'.connection': { stroke: '#666'}});
                        }else if(text == '拒绝人工复核'){
                            link.attr('text/text','拒绝\n人工复核');
                            link.attr('text/fill','#666');
                            link.attr({'.connection': { stroke: '#666'}});
                        }else if(text == '通过拒绝人工复核'){
                            link.attr('text/text','通过\n拒绝\n人工复核');
                            link.attr('text/fill','#666');
                            link.attr({'.connection': { stroke: '#666'}});
                        }else{
                            link.attr('text/text','请选择策略');
                            link.attr('text/fill','#666');
                            link.attr({'.connection': { stroke: '#666'}});
                        }
                        tree.graph.addCell(link);
                    }
                })
            });
        })

    };

    //没有数据时，只生成一个根节点
    tree.initCreate = function(opt){
        var cell = tree.createEle(opt);
        cell.attr('text/fill','black');
        cell.attr('rect/fill','#fff');
        cell.decisionID = 1;    //这个是数据和真正节点之间的通道，唯一标识符

        tree.cellMsg.push(cell);

        var tempMsg = {
            decisionID:1,
            parentID:[],
            text:'请选择规则',
            ruleID:0,
            layer:1,
            sign:1,
            children:[],
            links:[],
            linksID:[]
        };
        tree.dataCell.push(tempMsg);
        tree.graph.addCell(cell);
    };


    //新建带线节点
    tree.newLinkAndCell = function (cell) {
        console.log(cell);
        //生成节点位置调整
        var dataSource = null;
        var tempMsg = {
            left:cell.attributes.position.x,
            top:cell.attributes.position.y + 137,
            text:'请选择规则'
        };
        //1.找到数据节点
        tree.dataCell.forEach(function (value) {
            if(value.decisionID == cell.decisionID){
                dataSource = value;
            }
        });
        if(dataSource.links.length == 1){
            tempMsg.left = tempMsg.left -200;
        }else if(dataSource.links.length == 2){
            tempMsg.left = tempMsg.left + 200;
        }



        var newCell = tree.createEle(tempMsg);
        newCell.attr('text/fill','#000');
        newCell.attr('rect/fill','#fff');
        tree.graph.addCell(newCell);

        //调整新生成节点的属性,是根据源头节点来的
        var tempMsg2 = {
            decisionID:1,
            parentID:[],
            text:'请选择规则',
            ruleID:0,
            layer:1,
            sign:1,
            children:[],
            links:[],
            linksID:[]
        };
        if(tree.removeCellMsg.length){
            tempMsg2.decisionID = tree.removeCellMsg.pop();
        }else{
            tempMsg2.decisionID = tree.dataCell.length + 1;
        }
        tree.dataCell.forEach(function(item){
            if(item.decisionID == cell.decisionID){
                tempMsg2.layer = item.layer + 1;
                tempMsg2.parentID.push(item.decisionID);
                item.children.push(tempMsg2.decisionID);
                item.links.push('请选择策略');
                item.linksID.push(0);
                tempMsg2.sign = item.sign;

                //给新增节点设置sign，并且改变要改变的节点的sign，
                if(item.children.length>1){
                    //按先中间，后两边，先左后右排列，按基数偶数来确定sign，偶数找父节点及其子节点最小sign，基数相反
                    //插入新节点时，把插入点右侧的元素的sign都加1
                    //找到当前父节点位的数据节点
                    var dataParent = null;
                    tree.dataCell.forEach(function (value) {
                        if(value.decisionID == cell.decisionID){
                            dataParent = value;
                        }
                    });

                    //偶数插入左边
                    if(item.children.length%2==0){
                        //利用回调函数，找到最小sign
                        var minSign = 1/0;
                        function callBack(ele) {
                            if(ele.sign<minSign){
                                minSign = ele.sign;
                            }
                            if(ele.children.length>1){
                                ele.children.forEach(function (value) {
                                    tree.dataCell.forEach(function (value2) {
                                        if(value == value2.decisionID){
                                            callBack(value2);
                                        }
                                    })
                                })
                            }
                        }
                        callBack(dataParent);
                        console.log(minSign);


                        //将大于等于minSign的sign都加1，minSign留给插入节点
                        tree.dataCell.forEach(function (value) {
                            if(value.sign>=minSign){
                                value.sign++;
                            }
                        });
                        tempMsg2.sign = minSign;
                    }else{
                        console.log('右边');
                        //利用回调函数，找到最大sign
                        var maxSign = 0;
                        function callBack2(ele) {
                            if(ele.sign>maxSign){
                                maxSign = ele.sign;
                            }
                            if(ele.children.length>1){
                                ele.children.forEach(function (value) {
                                    tree.dataCell.forEach(function (value2) {
                                        if(value == value2.decisionID){
                                            callBack2(value2);
                                        }
                                    })
                                })
                            }
                        }
                        callBack2(dataParent);
                        console.log(maxSign);


                        //将大于maxSign的sign都加1，maxSign+1留给插入节点
                        tree.dataCell.forEach(function (value) {
                            if(value.sign>maxSign){
                                value.sign++;
                            }
                        });
                        tempMsg2.sign = maxSign+1;
                    }
                }
            }
        });
        //
        var newLink = tree.createLinkEle(cell,newCell,'请选择策略\n请选择策略\n请选择策略');
        newLink.attr('text/text','请选择策略');
        newLink.attr('text/fill','#666');
        newLink.attr({'.connection': { stroke: '#666'}});
        newLink.attr('.marker-target', { fill: '#666', stroke: '#666', d: 'M 6 0 L 0 3 L 6 6 z' });
        tree.graph.addCell(newLink);
        newCell.decisionID = tempMsg2.decisionID;
        tree.cellMsg.push(newCell);
        tree.links.push(newLink);
        tree.dataCell.push(tempMsg2);

        tree.adjustPaper(newCell);
    };

    //删除点及其子元素
    tree.removeLinkAndCell = function (cell) {
        //1.将将要删除的数据节点放入一个数组
        var current = null;
        tree.dataCell.forEach(function(item){
            if(cell.decisionID == item.decisionID){
                current = item;
            }
        });
        var willDel = [];
        function fn(ele) {
            console.log(typeof ele);
            willDel.push(ele);
            ele.children.forEach(function (value) {
                tree.dataCell.forEach(function (value2) {
                    if(value == value2.decisionID){
                        fn(value2);
                    }
                })
            })
        }
        fn(current);
        //2.将每个数据节点相关父节点中的相关信息删除，删除相应children和links，linksID
        willDel.forEach(function (value) {
            value.parentID.forEach(function (value2) {
                tree.dataCell.forEach(function (value3) {
                    if(value2 == value3.decisionID){
                        var tempIndex = value3.children.indexOf(value.decisionID);
                        value3.children.splice(tempIndex,1);
                        value3.links.splice(tempIndex,1);
                        value3.linksID.splice(tempIndex,1);
                    }
                })
            })
        });
        //3.删除数据节点和真正的节点
        for(var i=tree.dataCell.length-1;i>=0;i--){
            for(j=willDel.length-1;j>=0;j--){
                if(willDel[j].decisionID == tree.dataCell[i].decisionID){
                    tree.removeCellMsg.push(willDel[j].decisionID);
                    tree.dataCell.splice(i,1);
                    break;
                }
            }
        }
        willDel.forEach(function (value) {
            console.log(333344)
            for(var i=tree.cellMsg.length-1;i>=0;i--){
                console.log(333)
                if(tree.cellMsg[i].decisionID == value.decisionID){
                    tree.cellMsg[i].remove();
                }
            }
        });
        //4.删除元素并删除操作框
        $('.treeOperate').remove();
        //5.更新节点，连线等数组
        tree.cellMsg = tree.graph.getElements();
        tree.links = tree.graph.getLinks();
        //如果现在没有节点了，新创建一个
        if(tree.dataCell.length == 0){
            tree.initCreate({
                left:$('.tree_map_paernt').width()/2 - 80,
                top:100,
                text:'请选择规则'
            });
            tree.removeCellMsg = [];
        }
    };


    //调整画布大小，传进来当前移动节点或者新增节点，根据数据渲染树图时不用参数
    tree.adjustPaper = function (cell) {
        if(cell){
            if(cell.attributes.type == 'standard.Rectangle'){
                //纸张信息，clientWidth,clientHeight,clientTop,clientLeft
                //当新增加元素时，如果超出纸张底部，纵向扩大纸张
                if(cell.attributes.position.y>tree.paper.$el[0].clientHeight-100){
                    tree.paper.$el.css({
                        width:tree.paper.$el[0].clientWidth,
                        height:cell.attributes.position.y + 100
                    })
                }
                //当节点点超过左边界时(太靠近)，横向扩大纸张，并且改变每一个节点位置
                //先要判断树图是不是超过了纸张，根据最大最小sign，如果超过在来扩大纸张，没超过就只要移动元素位置
                if(cell.attributes.position.x<100){
                    var distance = 100 - cell.attributes.position.x;
                    // var tempOpt = tree.gainPosition();
                    tree.paper.$el.css({
                        width:tree.paper.$el[0].clientWidth + distance,
                        height:tree.paper.$el[0].clientHeight
                    });
                    //改变每个节点位置
                    tree.cellMsg.forEach(function (value) {
                        value.position(value.attributes.position.x+distance,value.attributes.position.y);
                    })
                }
                //当节点超过右边界时，横向扩大纸张
                if(cell.attributes.position.x>tree.paper.$el[0].clientWidth-260){
                    tree.paper.$el.css({
                        width:cell.attributes.position.x + 260,
                        height:tree.paper.$el[0].clientHeight
                    })
                }
            }
        }
    };

    //取minSign,maxSign,minLayer,maxLayer函数
    tree.gainPosition = function () {
        var minSign = 1000,
            maxSign = 0,
            minLayer = 1,
            maxLayer = 0;
        tree.dataCell.forEach(function(value){
            if(value.sign<minSign){
                minSign = value.sign;
            }
            if(value.sign>maxSign){
                maxSign = value.sign;
            }
            if(value.layer<minLayer){
                minLayer = value.layer;
            }
            if(value.layer>maxLayer){
                maxLayer = value.layer;
            }
        });
        return {
            minSign:minSign,
            maxSign:maxSign,
            minLayer:minLayer,
            maxLayer:maxLayer
        }
    };

    //改变线条函数
    tree.changeLink = function (opt) {
        if(tree.tempOperate){
            //判断是否是连起来的线，不是的话不要改变
            var source = null,
                target = null,
                dataSource = null,
                dataTarget = null;
            //先找到真正的源和目标
            tree.cellMsg.forEach(function (value) {
                if(value.id == tree.tempOperate.get('source').id){
                    source = value;
                }
                if(value.id == tree.tempOperate.get('target').id){
                    target = value;
                }
            });
            //找到数据节点源和目标
            tree.dataCell.forEach(function (value) {
                if(value.decisionID == source.decisionID){
                    dataSource = value;
                }
                if(target){
                    if(value.decisionID == target.decisionID){
                        dataTarget = value;
                    }
                }
            });

            var finalMsg = '';
            var finalLinkID = 0;
            if(opt){
                if(opt == '通过'){
                    tree.tempOperate.attr('text/fill','#87D068');
                    tree.tempOperate.attr('text/text','通过');
                    tree.tempOperate.attr({'.connection': { stroke: '#87D068'}});
                    finalMsg = '通过';
                    finalLinkID = 1;
                }else if(opt == '拒绝'){
                    tree.tempOperate.attr('text/fill','#F6C244');
                    tree.tempOperate.attr('text/text','拒绝');
                    tree.tempOperate.attr({'.connection': { stroke: '#F6C244'}});
                    finalMsg = '拒绝';
                    finalLinkID = 2;
                }else if(opt == '人工复核'){
                    tree.tempOperate.attr('text/fill','#1890FF');
                    tree.tempOperate.attr('text/text','人工复核');
                    tree.tempOperate.attr({'.connection': { stroke: '#1890FF'}});
                    finalMsg = '人工复核';
                    finalLinkID = 3;
                }else if(opt == '通过拒绝'){
                    tree.tempOperate.attr('text/fill','#666');
                    tree.tempOperate.attr('text/text','通过\n拒绝');
                    tree.tempOperate.attr({'.connection': { stroke: '#666'}});
                    finalMsg = '通过拒绝';
                    finalLinkID = 6;
                }else if(opt == '通过人工复核'){
                    tree.tempOperate.attr('text/fill','#666');
                    tree.tempOperate.attr('text/text','通过\n人工复核');
                    tree.tempOperate.attr({'.connection': { stroke: '#666'}});
                    finalMsg = '通过人工复核';
                    finalLinkID = 4;
                }else if(opt == '拒绝人工复核'){
                    tree.tempOperate.attr('text/fill','#666');
                    tree.tempOperate.attr('text/text','拒绝\n人工复核');
                    tree.tempOperate.attr({'.connection': { stroke: '#666'}});
                    finalMsg = '拒绝人工复核';
                    finalLinkID = 5;
                }else if(opt == '通过拒绝人工复核'){
                    tree.tempOperate.attr('text/fill','#666');
                    tree.tempOperate.attr('text/text','通过\n拒绝\n人工复核');
                    tree.tempOperate.attr({'.connection': { stroke: '#666'}});
                    finalMsg = '通过拒绝人工复核';
                    finalLinkID = 7;
                }
            }else{
                tree.tempOperate.attr('text/fill','#666');
                tree.tempOperate.attr('text/text','请选择策略');
                tree.tempOperate.attr({'.connection': { stroke: '#666'}});
                finalMsg = '请选择策略';
                finalLinkID = 0;
            }
            if(target){
                //根据数据目标decisionID在数据源children中位置，改变links相应位置数据
                dataSource.children.forEach(function (value) {
                    if(value == dataTarget.decisionID){
                        var index = dataSource.children.indexOf(value);
                        dataSource.links.splice(index,1,finalMsg);
                        dataSource.linksID.splice(index,1,finalLinkID);
                    }
                });
            }
        }
    };
    
    //查找节点父节点斌并返回函数
    tree.dataParent = function () {
        
    };
    //查找节点子节点斌并返回函数
    tree.dataChild = function () {
        
    };

    //这里之后都要改动，耦合,不能用下拉列表来判断，要用父子节点根据规则总数比较来判断
    tree.ruleMenu = function (opt) {
        //遍历父节点，如果父节点和自身节点等于规则节点，返回1
        //1.先找到该节点
        var curDataCell = null;
        tree.dataCell.forEach(function (value) {
            if(value.decisionID == opt.decisionID){
                curDataCell = value;
            }
        });
        //2.回调遍历节点，找到节点个数
        var parentNun = 0;
        function searchParens(cur) {
            parentNun++;
            cur.parentID.forEach(function (value) {
                tree.dataCell.forEach(function (value2) {
                    if(value == value2.decisionID){
                        searchParens(value2);
                    }
                })
            })
        }
        searchParens(curDataCell);
        var lis = $('.tree_data_right .down_menu_list li');
        if(lis.length == parentNun){
            return 1;
        }
    };

    //点击几点出来的弹窗的操作
    tree.opereteCell = function (opt) {
        $('.linkOperate').remove();
        $('.treeOperate').remove();
        var html = '<div class="treeOperate">\n' +
            '    <a href="javascript:;" class="deleteEle"></a>\n' +
            '    <a href="javascript:;" class="addEle">&#xe63e;</a>\n' +
            '    <a href="javascript:;" class="addLink">&#xe640;</a>\n' +
            '</div>';
        $('#'+tree.chartID).append(html);

        $('.treeOperate').css({
            //因为操作弹窗的直接父元素是body，$("body").append()所以位置要微调。
            //因为操作弹窗的直接父元素是body，$("body").append()所以位置要微调。
            left:(opt.attributes.position.x - 23)*tree.scale,
            top:(opt.attributes.position.y - 23)*tree.scale,
            transform:'scale('+tree.scale+')'
        });

        //如果点击元素有已经选中规则，加can类名
        var curDataCell = null;
        tree.dataCell.forEach(function (value) {
            if(opt.decisionID == value.decisionID){
                curDataCell = value;
            }
        });
        if(curDataCell.text != '请选择规则' ){
            $('.treeOperate').addClass('can');
        }


        $('.addEle').click(function () {
            //如果没有选择规则，先选择规则
            if($(this).parent().hasClass('can')){
                if(tree.ruleMenu (opt) == 1){
                    $('.tree_map_left .hint').show();
                    $('.tree_map_left .hint .text').text('没有规则可以添加了');
                }else{
                    //如果已经存在三个子节点，不能增加，如果已存在三个规则，不能增加
                    var ruleFruits = 0;
                    //1.先找到该数据节点
                    var curDataCell = null;
                    tree.dataCell.forEach(function (value) {
                        if(value.decisionID == opt.decisionID){
                            curDataCell = value;
                        }
                    });
                    //2.子节点数就是children长度
                    var linksArr = curDataCell.links || [];
                    linksArr.forEach(function (value) {
                        if(value == '通过人工复核' || value == '拒绝人工复核' || value == '通过拒绝'){
                            ruleFruits+=2;
                        }else if(value == '通过拒绝人工复核'){
                            ruleFruits+=3;
                        }else{
                            ruleFruits++
                        }
                    });
                    console.log(ruleFruits);

                    if(ruleFruits == 3){
                        $('.tree_map_left .hint').show();
                        $('.tree_map_left .hint .text').text('没有策略可选了');
                    }else{
                        tree.newLinkAndCell(opt);
                        $('.treeOperate').remove();
                    }
                }
            }else{
                console.log('请选择规则');
                $('.tree_map_left p.hint').show();
                $('.tree_map_left p.hint .text').text('请选择规则');
            }
            //若果没有规则可添加，删除新建的节点||不让新建节点
            // tree.removeLinkAndCell(opt);

        });

        $('.onlyAddEle').click(function () {

        });

        $('.addLink').click(function () {
            //如果没有选择规则，先选择规则
            if($(this).parent().hasClass('can')){
                var tempObj = {
                    source:opt,
                    x2:opt.attributes.position.x + 230,
                    y2:opt.attributes.position.y + 50
                };
                var link = tree.createLink(tempObj);
                link.attr('text/text','');
                link.attr('.marker-target', { fill: '#666', stroke: '#666', d: 'M 10 0 L 0 5 L 10 10 z' });
                tree.graph.addCell(link);
                $('.treeOperate').remove();
            }else{
                console.log('请选择规则');
                $('.tree_map_left p.hint').show();
                $('.tree_map_left p.hint .text').text('请选择规则');
            }
        });

        $('.deleteEle').click(function(){
            tree.removeLinkAndCell(opt);
            $('.treeOperate').remove();
        });
    };

    //操作线条弹窗
    tree.newLinkOperate = function (opt) {
        $('.linkOperate').remove();
        $('.treeOperate').remove();
        var link = opt.model;
        var html = '<div class="linkOperate">\n' +
            '    <a href="javascript:;" class="deleteLink"></a>\n' +
            '</div>';
        $('#'+tree.chartID).append(html);



        //根据label所在的位置来确定操作框的位置
        var tempStr = opt.$el.find('.label').attr('transForm');
        tempStr = tempStr.slice(tempStr.indexOf('('));
        tempStr = tempStr.slice(1,tempStr.length-1);
        var labelPosition = tempStr.split(',');

        //线条操作框位置
        $('.linkOperate').css({
            left:(labelPosition[0] - 70)*tree.scale + 'px',
            top:(labelPosition[1] -45)*tree.scale + 'px',
            'transform':'scale('+tree.scale+')'
        });

        $('.deleteLink').click(function () {
            link.remove();
            $('.linkOperate').remove();
            //找出数据里的相关父子，改变信息
            var source = null,
                target = null,
                dataSource = null,
                dataTarget = null;
            //找到来源节点
            tree.cellMsg.forEach(function(value){
                if(value.id == link.get('source').id){
                    source = value;
                }
            });
            //找到来源数据节点
            tree.dataCell.forEach(function(value){
                if(source.decisionID == value.decisionID){
                    dataSource = value;
                }
            });
            //如果有目标节点，找到目标节点相应数据节点，删除原数据节点中她两相关数据
            if(link.get('target').id){
                //找到目标节点
                tree.cellMsg.forEach(function(value){
                    if(value.id == link.get('target').id){
                        target = value;
                    }
                });
                //找到目标数据节点
                tree.dataCell.forEach(function(value){
                    if(target.decisionID == value.decisionID){
                        dataTarget = value;
                    }
                });
                //在原数据节点中删除目标数据节点的信息children,links 目标节点中删除父亲
                var tempIndex = dataSource.children.indexOf(dataTarget.decisionID);
                dataSource.children.splice(tempIndex,1);
                dataSource.links.splice(tempIndex,1);
                dataSource.linksID.splice(tempIndex,1);

                var tempIndex2 = dataTarget.parentID.indexOf(dataSource.decisionID);
                dataTarget.parentID.splice(tempIndex2,1);
                console.log(dataTarget.parentID)
            }
        })
    };



    w.tree = tree;
})(window);
