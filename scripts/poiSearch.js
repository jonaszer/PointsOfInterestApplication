document.getElementById('ajaxButton').addEventListener('click', () => {
    document.getElementsByClassName('tableOfPoints')[0].style.display = 'flex';
    let region = document.getElementById('poiRegion').value
    poiSearchByRegion(region)
});

async function poiSearchByRegion(region) {
    const searchResponse = await fetch(`http://localhost:3000/pointsofinterest/${region}`);
    const locations = await searchResponse.json();

    document.getElementById('results').innerHTML = "";

    locations.forEach(location => {

        const tr = document.createElement('tr');
        const loc = document.createElement('td');
        const cntry = document.createElement('td');
        const reg = document.createElement('td');
        const recom = document.createElement('td');

        const text = document.createTextNode(`${location.name}`);
        loc.appendChild(text);
        const text2 = document.createTextNode(`${location.country}`);
        cntry.appendChild(text2);
        const text3 = document.createTextNode(`${location.region}`);
        reg.appendChild(text3);
        const text4 = document.createTextNode(`${location.recommendations}`);
        recom.appendChild(text4);

        tr.appendChild(loc);
        tr.appendChild(cntry);
        tr.appendChild(reg);
        tr.appendChild(recom);

        const btn = document.createElement('input');
        btn.setAttribute('type', 'button');
        btn.setAttribute('class', 'recommend btn');
        btn.setAttribute('value', 'Recommend');

        btn.addEventListener('click', async (e) => {

            const recommendResponse = await fetch(`http://localhost:3000/pointsofinterest/${location.ID}`, {
                method: 'POST'
            });

            if (recommendResponse.status == 200) {
                alert('Successfully Recommended');
            } else {
                const json = await response.json();
                alert(`Error recommending this location: details ${json.error}`);
            }
        });

        document.getElementById('results').appendChild(tr);
        document.getElementById('results').appendChild(btn);
    });
}