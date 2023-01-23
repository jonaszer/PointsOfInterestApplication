export async function poiSearchByRegion(region) {
    try {
        const searchResponse = await fetch(`http://localhost:3000/pointsofinterest/${region}`);
        const location = await searchResponse.json();
        return location;
    } catch (e) {
        console.log(e);
    }
}