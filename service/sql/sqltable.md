
create table Users (
    username int NOT NUll;  //用户名（手机号）代替
    userpassword varchar(30) NOT NULL; // 密码
    usertype int DEFAULT 0; // 用户类型 0-普通用户，1-中级会员。2-高级会员，9-业务员，10-业务经理
    userownmoney int DEFAULT 0; //账户余额 默认为0
    PRIMARY KEY (username); //
)

create table userProds (
    upusername int NOT NULL;  //用户名
    upprodid int NOT NULL;  //产品id
    upmoney int NOT NULL;   //购买金额
    upbuytime varchar(50) NOT NULL;     //购买时间点
    FOREIGN KEY (upusername) REFERENCES Users(username);    //
    FOREIGN KEY (upprodid) REFERENCES Products(prodid);     //
)

create table Products (
    prodid int NOT NULL AUTO_INCREMENT;     // 产品id
    prodtype varchar(50);   //产品类型
    prodbuystarttime varchar(50) DEFAULT '0000-00-00';  // 可购买时间开始时间
    prodbuyendtime varchar(50) DEFAULT '9999-99-99';    //可购买时间结束时间
    prodtime int DEFAULT 3;     //需要购买时长
    prodincome int DEFAULT 0;   //预期收益
    proddangertype int DEFAULT 1;   //危险级别 0-风险低，1-风险中，3-风险高
    PRIMARY KEY (prodid); //
)

create table zixun (
    zixuntitle varchar(255) NOT NULL; //资讯名字
    zixuncontent longtext;      //资讯内容
    zixuncreater int NOT NULL;  //资讯撰写人
    FOREIGN KEY (zixuncreater) REFERENCES Users(username);
)