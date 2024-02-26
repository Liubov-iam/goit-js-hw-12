import{a as S,S as q,i}from"./assets/vendor-527658dd.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function t(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=t(e);fetch(e.href,s)}})();const v="42510436-747a3ee758966b4b69f3c3ec4",w="https://pixabay.com/api/",y=async(a,r)=>{try{return(await S.get(w,{params:{key:v,q:a,image_type:"photo",orientation:"horizontal",safesearch:"true",page:r,per_page:15}})).data}catch(t){throw console.error("Error in fetchImages:",t),t}},g=document.querySelector(".gallery"),h=document.querySelector(".search-form"),L={captions:!0,captionSelector:"img",captionType:"attr",captionsData:"alt",captionPosition:"bottom",animation:250},b=new q(".gallery a",L);function E(a){const r=a.map(({largeImageURL:t,webformatURL:o,tags:e,likes:s,views:n,comments:m,downloads:p})=>`
          <div class="gallery">
            <a href="${t}">
              <img src="${o}" alt="${e}" title="${e}" width="380" height="220" />
              <ul class="info-cards-container">
                <li class="info-cards-elements">likes<span>${s}</span></li>
                <li class="info-cards-elements">views<span>${n}</span></li>
                <li class="info-cards-elements">comments<span>${m}</span></li>
                <li class="info-cards-elements">downloads<span>${p}</span></li>
              </ul>
            </a>
          </div>
        `).join("");g.innerHTML=r,b.refresh(),h.reset()}function P(a){const t=a.hits.map(({largeImageURL:o,webformatURL:e,tags:s,likes:n,views:m,comments:p,downloads:$})=>`
          <div class="photo-card">
            <a href="${o}" target="_blank">
              <img src="${e}" alt="${s}" loading="lazy" />
            </a>
            <div class="info">
              <p><i class="img-text">Likes </i><span>${n}</span></p>
              <p><i class="img-text">Views </i><span>${m}</span></p>
              <p><i class="img-text">Comments </i><span>${p}</span></p>
              <p><i class="img-text">Downloads </i><span>${$}</span></p>
            </div>
          </div>
        `).join("");g.insertAdjacentHTML("beforeend",t),b.refresh(),h.reset()}const I=document.querySelector("#search-form"),k=document.querySelector("#search-input"),l=document.querySelector(".loader"),u=document.querySelector(".loader2"),c=document.querySelector(".load-more"),f=document.querySelector(".end-message");let d=1;I.addEventListener("submit",async a=>{a.preventDefault();const r=k.value.trim();if(!r){i.warning({title:"Warning",message:"Please enter a search query"});return}try{l.style.display="block",u.style.display="block";const t=await y(r,d);t.hits.length===0?i.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again!"}):(E(t.hits),c.style.display="block",f.style.display="none",c.addEventListener("click",async()=>{try{l.style.display="block",d++;const o=await y(r,d);o.hits.length===0?i.info({title:"Info",message:"No more images to load."}):P(o)}catch(o){console.error("Error fetching more images:",o),i.error({title:"Error",message:"Failed to load more images. Please try again later."})}finally{l.style.display="none",u.style.display="none"}}),t.totalHits>d*15?c.style.display="block":(c.style.display="none",f.style.display="block"))}catch(t){console.error("Error fetching images:",t),i.error({title:"Error",message:"Failed to fetch images. Please try again later."})}finally{l.style.display="none"}});
//# sourceMappingURL=commonHelpers.js.map
