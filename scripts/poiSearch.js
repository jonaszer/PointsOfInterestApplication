import { poiSearchByRegion } from "./ajaxMap.js";
const map = L.map('map');

const attrib = "Map data copyright OpenStreetMap contributors, Open Database Licence";

L.tileLayer
    ("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        { attribution: attrib }).addTo(map);

const myIcon = L.icon({
    iconUrl: "../images/orangepin.png",
    iconSize: [37, 45],
    popupAnchor: [-5, -15]
});

const position = [52.47624984628407, -1.898795972220033]
map.setView(position, 17)
let marker = L.marker([52.47624984628407, -1.898795972220033], { icon: myIcon })
marker.addTo(map).bindPopup("<h3><b>QAHE Ltd</b></h3>\nThis is where I am studying.").openPopup();

async function poiResults() {
    let region = document.getElementById('poiRegion').value
    let poi = poiSearchByRegion(region)
    poi.then(function (results) {
        results.forEach(resultPoi => {
            const position = [resultPoi.lat, resultPoi.lon]
            map.setView(position, 11)
            let marker = L.marker([resultPoi.lat, resultPoi.lon], { icon: myIcon })
            marker.addTo(map).bindPopup(`<h3><b>${resultPoi.name}</b></h3>` + "\n" + resultPoi.description);
        });
    })
}

document.getElementById('ajaxButton').addEventListener('click', () => {
    poiResults()
});