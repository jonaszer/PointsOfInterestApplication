document.getElementById('loginButton').addEventListener('click', () => {
    let un = document.getElementById('username').value
    let pw = document.getElementById('password').value
    let user = {
        username: un,
        password: pw
    }
    loginAuthentication(user)
});

async function loginAuthentication(user) {
    try {
        const response = await fetch('http://localhost:3000/pointsofinterest/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        const res = await response.json()
        if (response.status == 200) {
            document.getElementById('loginStatus').innerHTML = `${Object.values(res)}`
            document.getElementById('loginBlock').style.display = 'none';
        } else if (response.status == 404) {
            document.getElementById('errorStatus').innerHTML = `${Object.values(res)}`
        } else if (response.status == 400) {
            document.getElementById('errorStatus').innerHTML = `${Object.values(res)}`
        }
    } catch (e) {
        console.log(JSON.stringify(user));
    }
}

document.getElementById('loginMenuButton').addEventListener('click', () => {
    document.getElementById('loginBlock').style.display = 'block';
});

document.getElementById('loginCancelButton').addEventListener('click', () => {
    document.getElementById('loginBlock').style.display = 'none';
});