const theMap = {
    businesses: [],
    coordinates: [],

    buildMap() {
        this.map = L.map('map', {
            center: this.coordinates, 
            zoom: 10
        })
            
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);

        L.marker(this.coordinates).addTo(this.map);
    },

    busMarkers() {
        businesses.forEach(element =>
            this.markers = L.marker([
                this.business.lat,
                this.business.long,
            ])
        .bindPopup(`<p1>${this.businesses.name}</p1>`)
        .addTo(this.map)
    )}
}

async function getCoord(){
	const pos = await new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject)
	});
	return [pos.coords.latitude, pos.coords.longitude]
}


async function FourSquare(business) {
    const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: 'fsq302lS2YIIRlUKgMOXKx6N9kBkz/AqQUkW0qtFbGgpjIE='
        }
    };
    
    let lat = theMap.coordinates[0]
	let long = theMap.coordinates[1]
    let response = await fetch(`https://api.foursquare.com/v3/places/search?=${business}&limit=5&ll=${lat}%2C${long}`, options)
        .catch(err => console.error(err));
    let data = await response.text()
	let parsedData = JSON.parse(data)
	let businesses = parsedData.results
	return businesses 

} 

async function makeBusinessesArray(data) {
    let businesses = await data.map((element) => {
		let location = {
			name: element.name,
			lat: element.geocodes.main.latitude,
			long: element.geocodes.main.longitude
		};
		return location
	})
	return businesses
}

document.getElementById('search').addEventListener('click', async (event) => {
	let business = document.getElementById('business').value
	let data = await FourSquare(business)
	theMap.businesses = makeBusinessesArray(data)
})
