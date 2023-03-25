var express=require('express')
var mysql=require('mysql')
var app=express()
var body=require("body-parser")
var cors=require('cors')
app.use(body.json())
app.use(cors())
app.use(body.urlencoded({extended:true}))

var conn=mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"",
    database:'todo'
})

app.get('/data',(req,res)=>{
    conn.query("SELECT * FROM todos",(err,data)=>{
        if(err) throw err
        
        res.send(data)
    })
})
app.post('/add',(req,res)=>{
    var task=req.body.name
    var dates=req.body.date
    var roll=req.body.roll
    var val=[[roll,task,dates]]
    var sql="INSERT INTO todos(Rollno,tasks,date) VALUES ?"
    conn.query(sql,[val],(err,data)=>{
        if(err) throw err
        res.send(data)
    })

})
app.get('/delete/:id',(req,res)=>{
    const id=req.params.id
    const value=[[id]]
    conn.query("DELETE FROM todos WHERE ID=?",[value],(err,data)=>{
        if(err) throw err
        res.send("Data Deleted Sucessfully")
    })
})
app.post('/update/:id',(req,res)=>{
    const id=req.params.id
    const task=req.body.task
    const dates=req.body.dates
    var val=[[task,dates,id]]
    var sql="UPDATE todos SET tasks=?,date=? WHERE ID=?"
    conn.query(sql,[task,dates,id],(err,data)=>{
        if(err) throw err
        res.send("Updated")
    })


})
app.get('/get/:id',(req,res)=>{
    const id=req.params.id
    conn.query("SELECT * FROM todos WHERE ID=?",[id],(err,data)=>{
        if(err) throw err
        res.send(data)
    })
})
app.post('/addregi',(req,res)=>{
    const name=req.body.name
    const roll=req.body.roll
    const gender=req.body.gender
    const area=req.body.area
    const adress=req.body.address
    const phone=req.body.phone
    const password=req.body.password
    const val=[[roll,name,adress,area,gender,phone,password]]
    const sql="INSERT INTO registration(Rollno,name,address,area,gender,phone,password) VALUES ?"
    conn.query(sql,[val],(err,data)=>{
        if(err) throw err
        res.send("Data Added Sucessfully")
    })
})
app.post("/login",(req,res)=>{
    var roll=req.body.roll
    var password=req.body.password
    var sql="SELECT * FROM registration WHERE Rollno=? AND PASSWORD=?"
    conn.query(sql,[roll,password],(err,data)=>{
        if(err) throw err
        res.send(data)
    })
})
app.post("/getid",(req,res)=>{
    var id=req.body.uid
    var sql="SELECT * FROM todos WHERE Rollno=?"
    conn.query(sql,[id],(err,data)=>{
        if(err) throw err
        res.send(data)
    })
})



app.listen(8000,()=>{
    console.log('Server started')
})