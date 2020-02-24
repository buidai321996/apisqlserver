var sql=require('mssql');
var express=require('express');
var body_parser =require('body-parser')


var port=3001;

const app=express();
app.use(body_parser.json());

    var dbConfig = {
    server:'BCDAI\\SQLEXPRESS',
    database:'StudentAPI',
    user:'bcdai1996', // Update it
    password:'Buicongdaihd321996', // Update it
    port:1433,
    options:{
        enableArithAbort:true
    }
    };
    const connect=new sql.ConnectionPool(dbConfig);
    connect.connect(function (err) {
    
        if (err) {console.log(err);}
        else {console.log("connect database success");}


    });
    
    //get all school
    app.get('/',(req,res)=>{
       connect.query('select * from School',function(err,recordset){
         if(err) {console.log(err);}
         else{
             console.log(recordset);
             res.send(recordset);
             connect.close();
         }
       });
    });
    //-------------

    // post add school 
    app.post('/insertSchool',(req,res)=>{
        var data=req.body;
        console.log(data);
         const sql=`EXEC CreateOrUpdateSchool 'NULL','${data.school_nm}','${data.school_address}','${data.school_phone}','${data.school_email}'`;
         console.log(sql);
        connect.query(sql,err=>{
          if(err) console.log(err);
          else{
              res.send({});
          }
        });
    })
    //------------------

    // delete add school 
    app.delete('/deleteSchool/:id',(req,res)=>{
        const sql=`EXEC DeleteSchool '${req.params.id}'`;
        connect.query(sql,err=>{
          if(err) console.log(err);
          else{
              res.send("1 record delete");
          }
        });
    })
    //--------------------

    app.listen(port,function(){
        console.log(`server start at ${port}`);
    })
