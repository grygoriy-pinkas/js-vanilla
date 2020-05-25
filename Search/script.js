let page = 1;
let htmlCollection = [];
let collection = [];
let searchValue = '';
let observable = '';
let instance;

const input = document.getElementsByName('query')[0];
const list = document.getElementById('list');
const iconClose = document.getElementById('icon-close');


const closeModal = () => {
    instance.close();
    iconClose.style.visibility = 'hidden';
}

list.addEventListener('click', (event) => {
    const { target } = event;
    const url = collection[target.dataset.key].largeImageURL;

    instance = basicLightbox.create(`
        <div class="modal">        
            <p>            
                <img src="${url}">
            </p>
        </div>
    `)
    instance.show()
    iconClose.style.visibility = 'visible';
})

const form = document.getElementById('search-form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
});

const loadNewPage = async (value) => {
    const res = await fetch(`https://pixabay.com/api/?key=16716565-3eeba43c94ca347ba3988ae10&q=${value}&image_type=photo&page=${page}&per_page=10`);
    const result = await res.json();
    page++;
    return result;
}


const mapImagesToListElements = (arr) => {
    return arr.map((el, i) => {
        return `<li>           
                    <img src="${el.webformatURL}" data-source="${el.largeImageURL}" data-key="${i}"
                    alt="описание"/>        
                </li>`
    });
}

let scrollOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.05
}

const handleIntersect = async (entries) => {

    const firstEntry = entries[0];
    if (firstEntry.isIntersecting) {
        const apiResponse = await loadNewPage(searchValue)
        collection = [...collection, ...apiResponse.hits]
        const mapList = mapImagesToListElements(apiResponse.hits);
        htmlCollection = [...htmlCollection, mapList];
        list.innerHTML = htmlCollection;
        setTimeout(() => {
            observe();
        }, 2000)
    }
}

let observer = new IntersectionObserver(handleIntersect, scrollOptions);

const observe = () => {
    if (observable) observer.unobserve(observable)
    const currentObs = list.lastChild;
    observer.observe(currentObs);
    observable = currentObs;
}

input.addEventListener('change', async (event) => {
    page = 1;
    const { value } = event.target;
    searchValue = value;
    const apiResponse = await loadNewPage(value)
    collection = [...apiResponse.hits]
    const mapList = mapImagesToListElements(apiResponse.hits);
    htmlCollection = mapList;

    list.innerHTML = htmlCollection;

    setTimeout(() => {
        observe();
    }, 2000)
})

