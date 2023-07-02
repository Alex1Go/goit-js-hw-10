import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
const error = document.querySelector('.error');
error.style.display = 'none';
const select = document.querySelector('.breed-select')
select.addEventListener('change', getCatData);

function getCatData(evt) {
     const catId = evt.target.value;
    fetchCatByBreed(catId)
        .then((data) => {
         const img = data.url;
         const description = data.breeds[0].description;
         const name = data.breeds[0].name;
         const temperament = data.breeds[0].temperament;
            console.log(img);
            console.log(description)
            console.log(name);
            console.log(temperament)   
        }).catch(() => {
           error.style.display = 'block';
    })
}

fetchBreeds()
    .then(cats => {
        cats.map(cat => {        
             const option = `<option value ="${cat.id}">${cat.name}</option>`;
             select.insertAdjacentHTML('beforeend', option);
        })
    })
    .catch(() => {
          error.style.display = 'block';        
});

