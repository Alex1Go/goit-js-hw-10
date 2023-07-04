import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import Notiflix from 'notiflix';

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
             loader.style.display = 'block'; 
            setTimeout(() => {
                const img = data.url;
                const description = data.breeds[0].description;
                const name = data.breeds[0].name;
                const temperament = data.breeds[0].temperament;
                const pageCatInfo = `<img src=${data.url} alt = 'Foto cat' width="400"><div><h2>${data.breeds[0].name}</h2><p>${data.breeds[0].description}</p><p>Temperament: ${data.breeds[0].temperament}</p></div>`;
                catInfo.innerHTML = pageCatInfo;
                loader.style.display = 'none'; 
                select.style.marginBottom = '10px'
            }, 1500);            
        }).catch(() => {
            Notiflix.Notify.failure('Ой, щось пішло не так!');
        //    error.style.display = 'block';
    })
};
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


// import SlimSelect from 'slim-select';
// new SlimSelect({
//   select: '.breed-select'
// })
