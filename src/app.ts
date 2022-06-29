fetch('https://pokeapi.co/docs/v2')
    .then(res => res.json())
    .then(data => console.log(data));