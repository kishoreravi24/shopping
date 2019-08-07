var express = require('express');
var app = express();
var fs = require('fs');
var cors = require('cors');
app.use(cors());//File:// extension bug cleared
//require

//db connectivity
'use strict';
var bodyparser=require('body-parser');
app.use(bodyparser.urlencoded({extended:true}));
var mysql = require('mysql');
var con = mysql.createConnection({
    localAddress:"localhost",
    user:"kishore",
    password:"kishore",
    database:"shopping"
});

var script=fs.readFileSync('/media/kishore/Drive F/shopping/Login/index1.js','utf-8');
app.get('/script',(req,res)=>{
    res.send(script);
});

var x1='',x2='',x3='',x4='';
var buy=fs.readFileSync('/media/kishore/Drive F/shopping/Login/buy.html','utf-8');
app.get('/buy/:name/:fruitname/:quantity/:price',(req,res)=>{
     x1=x1+req.params.name;
     x2=x2+req.params.fruitname;
     x3=x3+req.params.quantity;
     x4=x4+req.params.price;
   console.log(x1+" "+x2+" "+x3+" "+x4);
   //sending_to_script1(x1,x2,x3);
    res.send(buy);
});

app.get('/gettingAllname',(req,res)=>{
   res.send(x1); 
   x1='';
});

app.get('/gettingAllfruitname',(req,res)=>{
    res.send(x2);
    x2='';
});

app.get('/gettingAllquantity',(req,res)=>{
    res.send(x3);
    x3='';
});

app.get('/gettingAllprice',(req,res)=>{
    res.send(x4);
    x4='';
});


var cart_count_of_productname='',cart_count_of_price=0;
app.get('/cart/:fruitname/:total',(req,res)=>{
    
    cart_count_of_productname=cart_count_of_productname+req.params.fruitname+',';
    cart_count_of_price=cart_count_of_price+Number(req.params.total);
    console.log(cart_count_of_productname+" "+cart_count_of_price);
    res.writeHead(200,{'Content-Type':'text/html'});
    var myreadstream = fs.createReadStream(__dirname+'/index1.html','utf8');
    myreadstream.pipe(res);
});

var end=fs.readFileSync('/media/kishore/Drive F/shopping/Login/end.html','utf-8');
var helper=0;
app.get('/cart1/:fruitname/:total',(req,res)=>{
    cart_count_of_productname=cart_count_of_productname+req.params.fruitname;
    cart_count_of_price=cart_count_of_price+Number(req.params.total);
    helper=cart_count_of_price;
    console.log(cart_count_of_productname+" "+cart_count_of_price);
    res.send(end);
})

var endjsFile=fs.readFileSync('/media/kishore/Drive F/shopping/Login/end.js','utf-8');
app.get('/endjs',(req,res)=>{
    res.send(endjsFile);
});

app.get('/getFinalname',(req,res)=>{
    res.send(cart_count_of_productname);
})

app.get('/getFinalprice',(req,res)=>{
    console.log(helper);
    res.send(helper.toString());
})
var script1=fs.readFileSync('/media/kishore/Drive F/shopping/Login/script1.js','utf-8');
app.get('/script1',(req,res)=>{
    res.send(script1);
});

var global_variable_for_username;
app.post('/login',(req,res)=>{
    var post={username:req.body.loginusername,password:req.body.loginpassword};
    global_variable_for_username=post.username;
    var sql=`select * from signup where username="${post.username}" and password="${post.password}"`;
    con.query(sql,(err,result)=>{
      res.writeHead(200,{'Content-Type':'text/html'});
    var myreadstream = fs.createReadStream(__dirname+'/index1.html','utf8');
    myreadstream.pipe(res);
    })
})

app.get('/gettingUsername',(req,res)=>{
    console.log("calling");
    res.send(global_variable_for_username);
})

app.post('/signup',(req,res)=>{
    var sql=`insert into signup (username,password) values('${req.body.searchsignupusername}','${req.body.searchsignuppassword}')`;
   con.query(sql,(err,result)=>{
       if(err) throw err;
       console.log(`${req.body.searchsignupusername}`+" "+`${req.body.searchsignuppassword}`);
   }) 
})
app.listen(7002,'127.0.0.1');