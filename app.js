var express= require('express');
var bodyParser = require('body-parser');
var mysql=require('mysql');
var con =mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"first",
})
con.connect();
var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.set("view engine","ejs");

app.get('/',function(req,res){
    var query= "select * from student";
    con.query(query,function(error,result,field){
        if(error) throw error;
        res.render("index",{result});
    })
});

app.post("/",function(req,res){
    var rollno=req.body.rollno;
    var name=req.body.name;
    var sub1=req.body.sub1;
    var sub2=req.body.sub2;
    var sub3=req.body.sub3;
    var total=req.body.total;
    var per=req.body.per;
    var min=req.body.min;
    var max=req.body.max;
    var resl=req.body.resl;
    total=parseInt(sub1)+parseInt(sub2)+parseInt(sub3);
    per=total/3;
    min=(Math.min(sub1,sub2,sub3));
    max=(Math.max(sub1,sub2,sub3));
    var cnt=0,resl;
    if(sub1<35)
    {
        cnt++;
    }
    if(sub2<35)
    {
        cnt++;
    }
    if(sub3<35)
    {
        cnt++;
    }
    if(cnt==3)
    {
        resl="Fail";
    }
    else if(cnt>0 && cnt<=2)
    {
        resl="ATKT";
    }
    else if(cnt==0)
    {
    
        resl="Pass";
    }
    var query="insert into student(rollno,name,sub1,sub2,sub3,total,per,min,max,resl)values('"+rollno+"','"+name+"','"+sub1+"','"+sub2+"','"+sub3+"','"+total+"','"+per+"','"+min+"','"+max+"','"+resl+"')";

    con.query(query,function(error,result,field){
        if(error) throw error;
        res.redirect("/");
    })
})
app.get("/delete/:id",function(req,res){
    var id=req.params.id;
    var query="delete from student where id="+id;

    con.query(query,function(error,result,field){
        if(error) throw error;
        res.redirect("/");
    })
});
app.get("/update/:id",function(req,res){
    var id=req.params.id;
    var query= "select * from student where id="+id;
    con.query(query,function(error,result,field){
        if(error) throw error;
        res.render("update",{result});
    })
});
app.post('/update/:id',function(req,res){
    var id=req.params.id;
    var rollno=req.body.rollno;
    var name=req.body.name;
    var sub1=req.body.sub1;
    var sub2=req.body.sub2;
    var sub3=req.body.sub3;
    var total=req.body.total;
    var per=req.body.per;
    var min=req.body.min;
    var max=req.body.max;
    var resl=req.body.resl;
    total=parseInt(sub1)+parseInt(sub2)+parseInt(sub3);
    per=total/3;
    min=(Math.min(sub1,sub2,sub3));
    max=(Math.max(sub1,sub2,sub3));
    var cnt=0,resl;
    if(sub1<35)
    {
        cnt++;
    }
    if(sub2<35)
    {
        cnt++;
    }
    if(sub3<35)
    {
        cnt++;
    }
    if(cnt==3)
    {
        resl="Fail";
    }
    else if(cnt>0 && cnt<=2)
    {
        resl="ATKT";
    }
    else if(cnt==0)
    {
        resl="Pass";
    }
    var query="update student set rollno='"+rollno+"',name='"+name+"',sub1='"+sub1+"',sub2='"+sub2+"',sub3='"+sub3+"',total='"+total+"',per='"+per+"',min='"+min+"',max='"+max+"',resl='"+resl+"' where id="+id;

    con.query(query,function(error,result,field){
        if(error) throw error;
        res.redirect("/");
    })
})
app.listen(2000);