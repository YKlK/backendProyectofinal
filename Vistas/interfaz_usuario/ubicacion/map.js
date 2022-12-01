
var map = L.map('map-template').setView([51.505, -0.09], 3);
console.log(map)
const tileURL = 'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png' 
const tileURL2 = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';
const room = document.title
const tile = L.tileLayer(tileURL2);
console.log(document.title)
// Socket Io
const socket = io.connect();
// socket.emit("joinRoom",document.title)
// Marker


// Geolocation

  
map.locate({enableHighAccuracy: true})
map.on('locationfound', (e) => {
  const userIcon = L.icon({
    iconUrl: './../../img/logo.png',
    iconSize: [38, 42],
    iconAnchor:   [22, 94]
  })
  const coords = [e.latlng.lat, e.latlng.lng];
  const newMarker = L.marker(coords,{icon:userIcon});
  newMarker.bindPopup('HERE!');
 
  map.addLayer(newMarker);
  socket.emit('userCoordinates', e.latlng,room);
});

// socket new User connected

  socket.on('newUserCoordinates', (coords) => {
   
    console.log(coords);
    const userIcon = L.icon({
      iconUrl: './../../img/ummmpatas.png',
      iconSize: [38, 42],
      iconAnchor:   [22, 94]
    })
    const newUserMarker = L.marker([coords.lat, coords.lng], {
      icon: userIcon
    });
    newUserMarker.bindPopup('New User!');
    map.addLayer(newUserMarker);

    console.log(map)
  });


  

  
 

map.addLayer(tile);


setTimeout("location.reload()",60000);