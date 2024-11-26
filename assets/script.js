const API_KEY = "24d87a45b537485a8c63a669d40f731a";
const url = "https://newsapi.org/v2/everything?q="

window.addEventListener("load",()=>fetchNews("India"));

function reload(){
    window.location.reload();
}

async function fetchNews(query){
  const res = await  fetch(`${url}${query}&apiKey=${API_KEY}`);
  console.log(res);
  const data = await res.json();
  console.log(data);
  bindData(data.articles);

}
function bindData(articles){
    const cardsContainer = document.getElementById("cards-container")
    const cardTemplate = document.getElementById("template-news-card")

    cardsContainer.innerHTML="";
    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const cardClone = cardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article)
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone,article){
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSrc = cardClone.querySelector("#new-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    })

    newsSrc.innerHTML = `${article.source.name} . ${date}`

    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank")
    })
}
let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

searchButton.addEventListener("click",()=>{
    const query = searchInput.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active")
    curSelectedNav = null;
})