import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import Shop from './Shop.js';
import routes from "./routes.js"
dotenv.config(); // Load environment variables
const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL in production
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  }));

app.use(routes)

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI) //syntax to connect to DB
.then(()=>{
    console.log("DB connected successfully")
    //since i want to run my app only when its conncted to DB ⁂ write listen code here
    app.listen(PORT, () =>{
        console.log(`App is running on port : ${PORT}`)
    })
})
.catch((err)=>{
    console.log(err);;
})

// ################################################################################################################
//                                         this was used to populate floors initially

// const populateShops = async (floorNumber) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const floorDetails = [
//         { floorNumber: 1, prefix: 'F' },
//         { floorNumber: 2, prefix: 'S' },
//         { floorNumber: 3, prefix: 'G' },
//         { floorNumber: 4, prefix: 'B' }
//       ];

//       // Find the floor details based on the floorNumber
//       const floor = floorDetails.find(f => f.floorNumber === floorNumber);

//       if (!floor) {
//         return reject(`Floor ${floorNumber} not found!`);  // Reject the promise if the floor is invalid
//       }

//       const { prefix } = floor;

//       // Loop through each shop on the floor and populate the database
//       for (let shopNumber = 1; shopNumber <= 100; shopNumber++) {
//         const shopNumberWithPrefix = `${prefix}${shopNumber}`; // Prefix added to shop number
//         const shopName = "Empty"; // Set shop name as "Empty"
        
//         // Check if the shop already exists for this floor to avoid duplicates
//         const existingShop = await Shop.findOne({ shopNumber: shopNumberWithPrefix, floorNumber });
//         if (!existingShop) {
//           const newShop = new Shop({
//             shopNumber: shopNumberWithPrefix, // Prefixed shop number
//             shopName, // "Empty"
//             floorNumber,
//             amountDue: 0,
//             amountPaid: 0,
//             totalAmount: 0,
//             owner: {
//               name: "Vacant",
//               number: "0000",
//               address: "Vacant",
//               email: "null@gmail.com",
//               shopsOwned: [],
//             },
//           });
//           await newShop.save();
//         }
//       }

//       resolve(`Shops populated successfully for Floor ${floorNumber}!`); // Resolve the promise after operation
//     } catch (error) {
//       reject(`Error populating shops: ${error.message}`); // Reject the promise on error
//     }
//   });
// };



// app.post('/populate-shops/:floorNumber', async (req, res) => {
//   const { floorNumber } = req.params;  // Extract floor number from the URL

//   // Check if the floor number is valid
//   if (isNaN(floorNumber) || floorNumber < 1 || floorNumber > 4) {
//     return res.status(400).send("Invalid floor number. Please provide a floor number between 1 and 4.");
//   }

//   try {
//     // Wait for the populateShops function to complete
//     const message = await populateShops(Number(floorNumber));  // Wait for the promise to resolve
//     res.status(200).send(message);  // Send success message when the promise resolves
//   } catch (error) {
//     res.status(500).send(error);  // Send error message if the promise rejects
//   }
// });

// ################################################################################################################

