var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


var rooms =[]

/* GET home page. */
router.get('/rooms', function(req, res, next) {
    res.send(rooms);
});


router.post("/creating-rooms",(req,res)=>{
    data={
      roomID:req.body.roomID,
      capacity:req.body.capacity,
      amenities:req.body.amenities,
      price:req.body.price,
      bookedStatus:"Available",
      customerName:"",
      date:"",
      startTime:"",
      endTime:""
    }
    rooms.push(data);
    res.json({
      message:"Room Created Successfully"
    })
})

router.post("/new-booking",(req,res)=>{
    let booked=false;
    rooms.map((e)=>{
      if(e.roomID===req.body.roomID){
        e.bookedStatus="Occupied";
        e.customerName=req.body.customerName;
        e.date=req.body.date;
        e.startTime=req.body.startTime;
        e.endTime=req.body.endTime;
        booked=true;
      }
    })
    if(booked){
      res.json({
        message:"Booking Successful"
      })
    }else{
      res.json({
        message:"Booking Failed" 
      })
    }
})


router.get("/booked-data",(req,res)=>{
    let data=[];
    rooms.map((e)=>{
      if(e.bookedStatus=="Occupied"){
        data.push({
          roomID:e.roomID,
          customerName:e.customerName,
          date:e.date,
          startTime:e.startTime,
          endTime:e.endTime
        })
      }
    })
    res.send(data);
})

router.get("/customer-data",(req,res)=>{
  let data=[];
  rooms.map((e)=>{
    if(e.bookedStatus=="Occupied"){
      data.push({
        customerName:e.customerName,
        roomID:e.roomID,
        date:e.date,
        startTime:e.startTime,
        endTime:e.endTime
      })
    }
  })
  res.send(data);
})

module.exports = router;

