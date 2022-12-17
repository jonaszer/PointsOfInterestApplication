async function poiSearchByRegion(region) {
    try {
        const response = await fetch(`http://localhost:3000/pointsofinterest/${region}`);
        const products = await response.json();

        let resultHTML = ""
        products.forEach(location => {
            resultHTML +=
                `<tbody>
                        <tr>
                            <td>${location.name}</td>
                            <td>${location.country}</td>
                            <td>${location.region}</td>
                        </tr>
                    </tbody>`
        });
        document.getElementById('results').innerHTML = resultHTML
    }
    catch (e) {
        alert(`There is an error ${e}`)
    }
}
document.getElementById('ajaxButton').addEventListener('click', () => {
    let region = document.getElementById('poiRegion').value
    poiSearchByRegion(region)
});