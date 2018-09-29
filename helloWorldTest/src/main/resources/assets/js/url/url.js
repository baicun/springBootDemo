	var host = document.domain;       //获取域名
	var port = window.location.port   //获取端口号
	var pathname = window.location.pathname; //文件路径
	var pathnameArr = pathname.split('/');
	var url = 'http://' + host + ':' + port + '/' + pathnameArr[1];

    /**
     *用户登录
     */
    //获取图形验证码
    var loginGetImgCode = url + '/validateCode/getVerifyCodeImage';
    //短信验证码
    var msgCode = url + '/validateCode/getCode';
    //退出登录
    var loginout = url + '/loginout';

	/* 数据引擎接口*/
	//导入excel
	var excelImport = url+'/excel/field';
	//列表页
	//列表获取信息接口
	var fieldFindAll =url+'/field/findAll';
	//查验字段是否被占用
    var fieldCheckFieldUser=url+'/field/ckeckFieldUsed';
    //跳转到编辑页
    var fieldJumpToEdit=url+"/field/edit";
	//删除页
    var fieldDel =url+'/field/del';

	//新增页
	//获取接口列表信息
    var fieldInterList=url+"/field/getInterInfo";
	//获取添加接口弹窗中参数
    var fieldZDropInfo =url+"/field/findFieldZDropInfo";
	//保存字段数据信息
    var fieldSave=url+"/field/save";
    //跳转到字段列表首页
	var fieldIndex=url+"/field/index";
	//编辑校验页
    var fieldEditValidate= url+"/field/ckeckFieldUsed";
    //编辑页
    var fieldEdit= url+"/field/edit";

    //保存编辑信息
    var fieldEditSave=url+"/field/saveEdit";

    /*
	 * 校验
	 */
    //验证字段英文名称
    var fieldCheckValue=url+"/field/checkValue";

    //验证字段名称
    var fieldCheckName=url+"/field/checkName";




    /**决策引擎接口**/
    //列表页
    //跳转到决策引擎列表页
    var sceneIndex=url+"/scene/index";
    //查看场景详情信息
    var sceneDetail=url+"/scene/detail";
    //获取决策引擎列表信息
    var sceneFindAll=url+"/scene/findAll";
    //修改场景api启动状态
    var sceneUpdateStatus=url+"/scene/updateStatus";
    //删除场景
    var sceneDel=url+"/scene/del";
    //场景配置
    //校验场景名称是否存在
    var sceneStep1CheckName=url+"/scene/checkName";
    //查询场景详细信息
    var sceneStep1FindDetail=url+"/scene/findDetail";
    //保存场景详细信息
    var sceneStep1Save=url+"/scene/save";
    //更新场景详细信息
    var sceneStep1Edit=url+"/scene/edit";
    //跳转到第二部场景信息
    var sceneStep1FieldConfig =url+"/scene/fieldConfig";
    //数据配置
    //获取可用的字段信息
    var sceneStep2FindSelect =url+"/field/findSelect";
    //根据字段信息获取关联的规则
    var sceneStep2FindDynRule=url+"/sceneFields/findDynRule";
    //保存场景字段
    var sceneStep2Insert=url+"/sceneFields/insert";
    //更新场景字段
    var sceneStep2Update=url+"/sceneFields/update";
    //获取场景规则使用的字段信息
    var sceneStep2GetFieldBySceneUse=url+"/sceneFields/getFieldBySceneUse";
    //获取场景中选择的字段信息
    var sceneStep2GetFieldByScene=url+"/sceneFields/getFieldByScene";
    //跳转到第三部场景信息
    var sceneStep2RuleConfig=url+"/scene/ruleConfig?id=";
    //获取场景通过字段关联的规则
    var sceneStep3GetSceneRulesDetail=url+"/sceneRules/getSceneRulesDetail";
    //通过场景规则id获取规则详情
    var sceneStep3GetSceneRulesDetailByRuleId=url+"/sceneRules/getSceneRulesDetailByRuleId";
    //保存新增场景决策树信息
    var sceneStep3SaveTree=url+"/sceneRules/saveTree";
    //获取决策树数据
    var sceneStep3FindTree=url+"/sceneRules/findTree";
    //决策模式跳转到第四步--新增--决策
    var sceneStep3DecisionConfig=url+"/scene/decisionConfig?id=";
    //决策模式跳转到第四步--编辑--决策
    var sceneStep3UpdateDecisionConfig=url+"/scene/updateDecisionConfig?id=";
    //决策模式跳转到第四步--评分卡
    var sceneStep3ToScoreDecisionConfig=url+"/scene/toScoreDecisionConfig";
    //保存规则配置数据——评分卡
    var sceneStep3UpdateAtomAndDecision=url+"/sceneRules/updateAtomAndDecision";
    //保存规则配置数据——策略
    var sceneStep3UpdateAtomAndDecision_Dec=url+"/sceneRules/updateAtomAndDecision_Dec";
    //更新决策信息——评分卡
    var sceneStep3UpdateDecision=url+"/decision/updateDecision";
    //保存决策信息——评分卡
    var sceneStep3SaveScoreDecision=url+"/decision/saveScoreDecision";
    //决策配置
    //保存决策配置信息——策略
    var sceneStep4SaveDecision=url+"/decision/saveDecision";
    //获取决策配置详情——策略
    var sceneStep4FindDecisionBySceneId=url+"/decision/findDecisionBySceneId";
    //获取决策配置详情——评分卡
    var sceneStep4FindBySceneId=url+"/decision/findBySceneId";
    //获取决策配置中已经执行的规则——评分卡
    var sceneStep4GetExcuteRuleBySceneId=url+"/sceneRules/getExcuteRuleBySceneId";
    //获取决策树链
    var sceneStep4FindDecisionLine=url+"/decision/findDecisionLine";
    //查询决策类型
    var sceneStep4FindTypeBySceneId=url+"/scene/findTypeBySceneId";
    //将场景设置成删除状态——编辑
    var sceneStep4DelOldScene=url+"/scene/delOldScene";

    //编辑
    //复制场景信息
    var sceneEditUpdateBackUp=url+"/scene/updateBackUp";
    //编辑跳转到场景配置
    var sceneEditUpdate=url+"/scene/update?id=";
    //编辑从场景配置阶段跳转到数据配置阶段
    var sceneStep1UpdateFieldConfig=url+"/scene/updateFieldConfig?id=";
    //编辑从数据配置阶段跳转到规则配置阶段
    var sceneStep2UpdateRuleConfig=url+"/scene/updateRuleConfig?id=";
    //下载API文档
    var createPdfFile=url+"/scene/createPdfFile";
    //查看详情页面跳转
    var sceneDetail=url+"/scene/detail";
    //查看详情
    var getSenceInfo=url+"/scene/findDetail";


	/*
	 * 用户管理
	 */
	//用户列表
	var userList = url + '/userManager/queryUserInfo';
	//添加用户
	var addUser = url + '/userManager/save';
    //用户详细信息
    var userInfo = url + '/userManager/selectById';
    //更新用户信息
    var updateUserInfo = url + '/userManager/updateUser';
    //修改密码
    var updatePwd = url + '/userManager/updatePwd';
    //冻结用户
    var freezeUser = url + '/userManager/freezeUser';
    //解冻用户
    var unFreezeUser = url + '/userManager/unFreezeUser';
    //注销用户
    var logoutUser = url + '/userManager/logoutUser';
    //删除用户
    var delUser = url + '/userManager/delUser';
    //检测用户唯一
    var checkAccount = url + '/userManager/checkAccount';
    //获取角色
    var findAllRoleInfo = url + '/userManager/findAllRoleInfo'
    /**
     * 角色权限管理
     */
    //角色列表
    var roleList = url + '/roleManager/queryRole';
    //角色修改页面
    var updateRolePage = url + '/roleManager/updateRole';
    //删除角色
    var delRole = url + '/roleManager/delRole';
    //添加角色
    var addRoleInfo = url + '/roleManager/addRoleInfo';
    //修改角色
    var editRoleInfo = url + '/roleManager/editRoleInfo';
    //判断角色名称唯一
    var checkRoleName = url + '/roleManager/checkName';
    /**
     * 进件中心
     */
    //初始化场景名称列表(有进件记录的场景)
    var getSenceList = url+"/entry/getSenceList";
    //初始化操作人列表
    var getCreatorList = url+"/entry/getCreatorList";
    //初始化场景列表(用户对应的所有场景)
    var getSceneInfo = url+"/entry/getSceneInfo";
    //下载excel模板
    var downExcel = url+"/entry/downExcel";
    //查询历史记录
    var findBatchList = url+"/entry/findBatchList";
    //提交录入
    var newBatchExamine = url+"/entry/newBatchExamine";
    // 获取进件结果和进件状态，场景关联字段
    var queryStatusAndResult = url+"/entry/queryStatusResult";
    // 初始化进件结果列表
    var check = url+"/entry/check";
    /**
     * 智能报表
     */
    //初始化场景信息
    var getAllSceneInfo = url+"/statement/getAllSceneInfo";
    //获取决策结果统计
    var getApplyDecisionResult = url+"/statement/getApplyDecisionResult";
    //获取规则统计
    var getRuleStatistics = url+"/statement/getRuleStatistics";
    //获取策略统计结果
    var getApplyDecision = url+"/statement/getApplyDecision";

    /**
     * 接口管理
     */
    //校验接口名称
    var interCheckName = url+"/inter/checkName";
    //校验接口地址
    var interCheckAddress = url+"/inter/checkAddress";
    //修改接口信息
    var edit = url+"/inter/edit";
    var checkInter = url+"/inter/check";

    /**
     * 规则引擎
     */
    //规则查询
    var ruleFindAll = url+"/rule/findAll";
    //删除规则
    var delRule= url+"/rule/del";
    //修改规则状态
    var updateStatusUrl = url+"/rule/updateStatus";
    //校验规则是否使用
    var validRule = url+"/rule/checkRuleUsed";
    //初始化字段列表
    var initRuleFieldList = url+"/field/findSelect";
    //编辑规则
    var editRuel = url+"/rule/indexEdit";
    //新增规则
    var addRules = url+"/rule/addRules";
    //编辑规则
    var editRules = url+"/rule/update";
    //规则首页
    var ruleIndex=url+"/rule/index";
    //校验规则名称是否存在
    var ruleCheckName=url+"/rule/checkName";
    //校验规则编号是否存在
    var ruleCheckNo=url+"/rule/checkNo";



