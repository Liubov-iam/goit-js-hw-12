import{a as q,S as E,i}from"./assets/vendor-527658dd.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();const P="42510436-747a3ee758966b4b69f3c3ec4",M="https://pixabay.com/api/",u=async(r,t)=>{try{return(await q.get(M,{params:{key:P,q:r,image_type:"photo",orientation:"horizontal",safesearch:"true",page:t,per_page:15}})).data}catch(o){throw console.error("Error in fetchImages:",o),o}},f=document.querySelector(".gallery"),y=document.querySelector(".search-form"),I={captions:!0,captionSelector:"img",captionType:"attr",captionsData:"alt",captionPosition:"bottom",animation:250},g=new E(".gallery a",I);function x(r){const t=r.map(({largeImageURL:o,webformatURL:n,tags:e,likes:s,views:a,comments:l,downloads:d})=>`
          <div class="gallery">
            <a href="${o}">
              <img src="${n}" alt="${e}" title="${e}" width="380" height="220" />
              <ul class="info-cards-container">
                <li class="info-cards-elements">likes<span>${s}</span></li>
                <li class="info-cards-elements">views<span>${a}</span></li>
                <li class="info-cards-elements">comments<span>${l}</span></li>
                <li class="info-cards-elements">downloads<span>${d}</span></li>
              </ul>
            </a>
          </div>
        `).join("");f.innerHTML=t,g.refresh(),y.reset()}function H(r){const o=r.hits.map(({largeImageURL:n,webformatURL:e,tags:s,likes:a,views:l,comments:d,downloads:$})=>`
          <div class="photo-card">
            <a href="${n}" target="_blank">
              <img src="${e}" alt="${s}" loading="lazy" />
            </a>
            <div class="info">
              <p><i class="img-text">Likes </i><span>${a}</span></p>
              <p><i class="img-text">Views </i><span>${l}</span></p>
              <p><i class="img-text">Comments </i><span>${d}</span></p>
              <p><i class="img-text">Downloads </i><span>${$}</span></p>
            </div>
          </div>
        `).join("");f.insertAdjacentHTML("beforeend",o),g.refresh(),y.reset()}const T=document.querySelector("#search-form"),h=document.querySelector("#search-input"),w=document.querySelector(".loader"),m=document.querySelector(".load-more"),L=document.querySelector(".end-message"),p=document.querySelector(".gallery");let c=1;function b(){m.style.display="block"}function k(){m.style.display="none"}function v(){w.style.display="block"}function S(){w.style.display="none"}async function A(){try{v();const r=h.value.trim(),t=await u(r,c);t.hits.length===0?i.info({title:"Info",message:"No more images to load."}):(H(t),c++)}catch(r){console.error("Error fetching more images:",r),i.error({title:"Error",message:"Failed to load more images. Please try again later."})}finally{S()}}m.addEventListener("click",A);T.addEventListener("submit",async r=>{r.preventDefault();const t=h.value.trim();if(!t){i.warning({title:"Warning",message:"Please enter a search query"});return}try{v();const o=await u(t,c);if(o.hits.length===0)i.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again!"});else{B(o);const n=Math.ceil(o.totalHits/15);c<n?b():(k(),L.style.display="block")}}catch(o){console.error("Error fetching images:",o)}finally{S()}});function B(r,t=!1){p.innerHTML=t?p.innerHTML:"",x(r.hits),t||(b(),L.style.display="none")}window.addEventListener("load",()=>{const r=document.querySelector(".photo-card").getBoundingClientRect().height,t=Math.ceil(window.innerHeight/r)*2;window.scrollBy({behavior:"smooth",top:r*t})});
//# sourceMappingURL=commonHelpers.js.map
