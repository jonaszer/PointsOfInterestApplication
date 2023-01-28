document.getElementById("submit").addEventListener('click', () => {

    let name = document.getElementById("lname").value
    let type = document.getElementById("ltype").value
    let country = document.getElementById("lcountry").value
    let region = document.getElementById("lregion").value
    let lon = document.getElementById("lon").value
    let lat = document.getElementById("lat").value
    let description = document.getElementById("description").value
    let newPoi = {
        lname: name,
        ltype: type,
        lcountry: country,
        lregion: region,
        l_lon: lon,
        l_lat: lat,
        desc: description
    }
    console.log(newPoi)
    newPoiSave(newPoi)
});

async function newPoiSave(newPoi) {
    try {
        const response = await fetch('http://localhost:3000/pointsofinterest/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPoi)
        });
        const res = await response.json();
        document.getElementById('results').innerHTML = `${Object.values(res)}`
    }
    catch (e) {
        console.log(e)
    }
}