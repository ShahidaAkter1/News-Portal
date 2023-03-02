let fetchData =[];
const fetchCategories = () =>{
    fetch(' https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data =>showCategories(data.data))
}

const showCategories = data =>{
console.log(data);

//capture categiries-container to opened all the categories link
const categiriesContainer=document.getElementById('categiries-container');
data.news_category.forEach(singleCategory => {
    // console.log(singleCategory);
/*
   const linkContainer= document.createElement('p');
    linkContainer.innerHTML=`<a class="nav-link" href="#">${singleCategory.category_name}</a>`;
    categiriesContainer.appendChild(linkContainer);//or nicher 1 line
*/
categiriesContainer.innerHTML +=`<a class="nav-link" href="#" onclick="fetchCategoryNews('${singleCategory.category_id}','${singleCategory.category_name}')">${singleCategory.category_name}</a>`;//or uporer 3 line

 

});

}

//fetch all news available in a category
const fetchCategoryNews= (category_id,category_name) =>{
    // console.log(category_id);
    const url=`https://openapi.programming-hero.com/api/news/category/${category_id}`
    // console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data =>{
      fetchData = data.data;
      showAllNews(data.data,category_name)
    })
}

const showAllNews = (data,category_name) =>{
console.log(data,category_name);
document.getElementById('news-count').innerText=data.length
document.getElementById('category-name').innerText=category_name;

const newsContainer=document.getElementById('all-news');
newsContainer.innerHTML='';



data.forEach(singleNews =>{
    // console.log(singleNews);
    // newsContainer.innerHTML+=``
    const {_id,image_url,title,details,author,total_view,rating}=singleNews;

    const card=document.createElement('div');
    card.classList.add('card', 'mb-4');
    card.innerHTML = `
    <div class="row g-0">
    <div class="col-md-4">
      <img src="${image_url}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8 d-flex flex-column">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${details.slice(0,200)}...</p>
      
        <div class="card-footer border-0 bg-body">
       <div class="d-flex justify-content-between">
       <div class="d-flex gap-2">
       <div >
       <img src="${author.img}" class="img-fluid rounded-circle" alt="..." height="60px" width="60px">
       </div>
       <div >
          <h5>${author.name ? author.name : "Not Available"}</h5>
          <p>${author.published_date}</p>
       </div>
      </div>
      <div class="d-flex gap-2">
      <div >
      <i class="fas fa-eye"></i>
      </div>
     <div >
      <p>${total_view ? total_view : "Not Available"}</p>
     </div>
     </div>
      <div>
      ${generateStar(rating.number)}
      <p>${rating.number}</p>
      </div>
      <div>
      <i class="fas fa-arrow-right" onclick="fetchNewsDetails('${_id}')"  data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
      </div>
       </div>
        </div>
      </div>
    </div>
  </div>
    `;
    newsContainer.appendChild(card);

})

}

const fetchNewsDetails= (news_id)=>{
    let url=` https://openapi.programming-hero.com/api/news/${news_id}`
    // console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data =>showNewsDetail(data.data[0]))
}

const showNewsDetail = newsDetail =>{
    const {_id,image_url,title,details,author,total_view,others_info,rating
    }=newsDetail;

   document.getElementById('modal-body').innerHTML=`
   <div class="card mb-3">
   <div class="row g-0">
    <div class="col-md-12">
      <img src="${image_url}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-12 d-flex flex-column">
      <div class="card-body">
        <h5 class="card-title">${title} <span class="badge text-bg-warning">${others_info.is_trending ? "Tranding" : "Not Tranding"}</span></h5>
        <p class="card-text">${details}</p>
      
        <div class="card-footer border-0 bg-body">
       <div class="d-flex justify-content-between">
       <div class="d-flex gap-2">
       <div >
       <img src="${author.img}" class="img-fluid rounded-circle" alt="..." height="60px" width="60px">
       </div>
       <div >
          <h5>${author.name ? author.name : "Not Available"}</h5>
          <p>${author.published_date}</p>
       </div>
      </div>
      <div class="d-flex gap-2">
      <div >
      <i class="fas fa-eye"></i>
      </div>
     <div >
      <p>${total_view ? total_view : "Not Available"}</p>
     </div>
     </div>
      <div>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star-half"></i>

      <p>${rating.number}</p>
      </div>
     
       </div>
        </div>
      </div>
    </div>
  </div>
    
   
   </div>
   `;
//    newsContainer.appendChild(card);
    


}

// fetchCategories();

//show tranding news
const showTrending =()=>{
  let trendingNews = fetchData.filter(singleData => singleData.others_info.is_trending === true);
  // console.log(trendingNews);
  const category_name=document.getElementById('category-name').innerText;
  showAllNews(trendingNews, category_name);
}
//show tranding news
const showTodaysPick =()=>{
  let todaysPick = fetchData.filter(singleData => singleData.others_info.is_todays_pick === true);
  // console.log(trendingNews);
  const category_name=document.getElementById('category-name').innerText;
  showAllNews(todaysPick, category_name);
}

//optional: generates stars
const generateStar =rating =>{
  let ratingHTML='';
  for(let i=1; i<= Math.floor(rating); i++){
    ratingHTML += `<i class="fas fa-star"></i>`;
  }if(rating - Math.floor(rating)>0){
    ratingHTML += `<i class="fas fa-star-half"></i>`;
  }
  return ratingHTML;
}