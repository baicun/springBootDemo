CREATE TABLE dept(
deptno BIGINT AUTO_INCREMENT ,
dname VARCHAR(50),
CONSTRAINT pk_deptno PRIMARY KEY(deptno)
);
INSERT INTO dept(dname) VALUES('开发部');
INSERT INTO dept(dname) VALUES('人力部');
INSERT INTO dept(dname) VALUES('财务部');