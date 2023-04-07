require('dotenv').config()
const express = require('express');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/user');
const { db } = require('./db/db')

const app = express();

const PORT = process.env.PORT

const shopAddress = '124 Eastwood Old Rd, Leigh-on-Sea, Southend-on-Sea, Leigh-on-Sea SS9 4RY';
const mapsApiKey = process.env.GOOGLE_MAPS_API_KEY;

app.use(express.json())
app.use(cors())
app.use(express.static('public'))

app.use('/api/user', userRoutes);







// -------------------------------------------------------------------------------------------------------------------

// Menu PDF 
app.get('/pdf', function(req, res) {
  const filePath = path.join(__dirname, 'public', 'menu.pdf');
  res.sendFile(filePath);
});

// Google Maps API 
app.get('/api/map', (req, res) => {
    // Construct the Google Maps Embed API URL with your shop's address and API key
    const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${mapsApiKey}&q=${encodeURIComponent(shopAddress)}`;
    console.log(mapUrl)
  
    // Send the map URL as a response to the client
    res.send(mapUrl);
  });

const server = () => {
  db()  
  app.listen(PORT, function() {
    console.log('Server listening on port 8000');
  });
}

server()