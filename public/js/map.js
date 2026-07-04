
const map = new mapboxgl.Map({

    accessToken: mapToken,
    container: 'map', // container ID
    center: coordinate, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9 // starting zoom
});



const marker = new mapboxgl.Marker({color:'red'})
.setLngLat(coordinate)
.setPopup(new mapboxgl.Popup({offset : 25}))
.addTo(map)
