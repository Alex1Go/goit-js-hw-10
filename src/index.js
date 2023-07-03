import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import SlimSelect from 'slim-select';

new SlimSelect({
  select: '#selectElement'
})
select.id = 'selectElement';

const error = document.querySelector('.error');
const loader = document.querySelector('.loader');
const select = document.querySelector('.breed-select')
const catInfo = document.querySelector('.cat-info');

select.addEventListener('change', getCatData);
error.style.display = 'none';
loader.style.display = 'none';

function getCatData(evt) {
     const catId = evt.target.value;
    fetchCatByBreed(catId)
        .then((data) => {
         const img = data.url;
         const description = data.breeds[0].description;
         const name = data.breeds[0].name;
         const temperament = data.breeds[0].temperament; 
         const pageCatInfo = `<img src=${data.url} alt = 'Foto cat' width="400"><div><h2>${data.breeds[0].name}</h2><p>${data.breeds[0].description}</p><p>Temperament: ${data.breeds[0].temperament}</p></div>`;
            catInfo.innerHTML = pageCatInfo; 
            loader.style.display = 'block';   
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

document.body.style.padding = '20px'
catInfo.style.display = 'flex';
catInfo.style.gap = '20px';