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
        }).addTo(map);

        const currentPosition = L.marker(this.coordinates).addTo(this.map);
    },

    busMarkers() {
        forEach(businesses =>
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