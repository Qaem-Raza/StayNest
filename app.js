const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Listing = require("./Models/listings.js");

MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
main()
    .then(() =>{
        console.log("Connected to DB");
    })
    .catch((err) =>{
        console.log(err);
    });

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));

app.get("/" , (req,res) => {
    res.send("Hi, I am at root");
});

// index Route
app.get("/listings",async (req,res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
});

// Create Route
app.get("/listings/new",(req,res) =>{
    res.render("listings/new.ejs");
});

// Show Route. Which show individual listing
app.get("/listings/:id", async (req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});

// Create Route
app.post("/listings",async (req,res) =>{
    let newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});


// app.get("/testlisting",async (req,res) => {
//     let sampleListing = new Listing({
//         title: "My new Villa",
//         description: "By the beach",
//         price: 1200,
//         loaction: "Goa",
//         country: "India",
//     });

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("Successful testing");
// })

app.listen(8080 , () =>{
    console.log("Server is started at port number 8080");
});