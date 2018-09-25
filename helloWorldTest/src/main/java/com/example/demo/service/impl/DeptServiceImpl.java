package com.example.demo.service.impl;

import com.example.demo.bean.Dept;
import com.example.demo.dao.DeptMapper;
import com.example.demo.service.DeptService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Service
public class DeptServiceImpl implements DeptService{

    @Resource
    private DeptMapper deptMapper;

    /**
     * 返回表统计数目
     * @return int
     */
    @Override
    public int statistics() {
        return deptMapper.getSum();
    }

    /**
     * 新增一个部门
     * @param dept
     * @return boolean
     */
    @Override
    public boolean toAdd(Dept dept) {
        return deptMapper.doInsert(dept);
    }

    /**
     * 查询全表信息
     * @return List<Dept>
     */
    @Override
    public List<Dept> getDeptInfo() {
        List<Dept> deptList = new ArrayList<>();
        deptList = deptMapper.findAll();
        return deptList;
    }



}
