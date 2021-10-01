const elForm=selectElem('#form');
let elInput=selectElem('.search__input',elForm);
const elSearchSelect=selectElem('#search__select',elForm);
const elPriceSelect=selectElem('#price__select',elForm);


let elListHouse=selectElem('.house__list')
let elSetList=selectElem('.set__list')
let elModal=selectElem('.modal');
let elModalWrapper=selectElem('.modal__wrapper')

const elTemplate=selectElem('#template').content
const elSetTemplate=selectElem('#set__template').content






function renderHouses(housesArr,element){
    element.innerHTML = null;
    housesArr.forEach(house => {
       const cloneTemplate=elTemplate.cloneNode(true)

       selectElem('.house__img', cloneTemplate).src = house.imgSrc;

       selectElem('.house__title', cloneTemplate).textContent=house.name;

       selectElem('.house__region', cloneTemplate).textContent= 'Region: '+house.region;   
       
       selectElem('.house__list-style', cloneTemplate).textContent='Style: '  

       let elHouseListStyle=selectElem('.house__list-style', cloneTemplate);

       house.style.forEach((type)=>{
           let newLi=createElem('li');
           newLi.textContent = type;
           newLi.setAttribute('class', 'house__item-style')

       elHouseListStyle.appendChild(newLi)
       })
      

      selectElem('.house__area', cloneTemplate).textContent='Area: '+house.area;   

      selectElem('.house__price', cloneTemplate).textContent='Price: '+ house.price;  

        
        let elHouseItem=selectElem('.house__item', cloneTemplate);
        let elOrderBtn=selectElem('.order__btn');
        let elOrderBtnSecond=selectElem('.order__btn-second');
        let elHouseBottom= selectElem('.house__bottom', cloneTemplate);  
        let elHouseImg= selectElem('.house__img', cloneTemplate); 
        let elHouseBtn=selectElem('.house__btn', cloneTemplate);  
        let elHouseBtnImg=selectElem('.house__btn-img', cloneTemplate); 

        
        
    elOrderBtn.addEventListener('click', function(e){     
      elHouseItem.classList.add('house__item-change')
      elHouseBottom.classList.add('house__bottom-change')
      elHouseImg.classList.add('house__img-change');
      elHouseBtn.classList.add('house__btn-change')
      elHouseBtnImg.classList.add('house__btn-img-change')
    })

    elOrderBtnSecond.addEventListener('click', function(e){
          
      elHouseItem.classList.remove('house__item-change')
      elHouseBottom.classList.remove('house__bottom-change')
      elHouseImg.classList.remove('house__img-change');
      elHouseBtn.classList.remove('house__btn-change')
      elHouseBtnImg.classList.remove('house__btn-img-change')
    })
      


    elHouseBtn.addEventListener('click', function(e){

       const cloneSetTemplate=elSetTemplate.cloneNode(true)

      let elHouseImg= selectElem('.house__img', cloneSetTemplate);
      elHouseImg.setAttribute('src', house.imgSrc);

       selectElem('.house__title', cloneSetTemplate).textContent=house.name;

       selectElem('.house__region', cloneSetTemplate).textContent= 'Region: '+house.region;   
       
      selectElem('.house__list-style', cloneSetTemplate).textContent='Style: '

          let elHouseListStyle=selectElem('.house__list-style', cloneSetTemplate);

       house.style.forEach((type)=>{
           let newLi=createElem('li');
           newLi.textContent = type;
           newLi.setAttribute('class', 'house__item-style')

           elHouseListStyle.appendChild(newLi)
       })

       selectElem('.house__area', cloneSetTemplate).textContent='Area: '+house.area;   

        selectElem('.house__price', cloneSetTemplate).textContent='Price: '+house.price;  

    
       let elSetItem=selectElem('.house__item', cloneSetTemplate)

       let elCloseSetBtn=selectElem('.close__set-btn', cloneSetTemplate)
        

        elCloseSetBtn.addEventListener('click',function(e){
        
          elSetItem.innerHTML=null
          elSetItem.setAttribute('class', 'null')

        })


        elSetList.appendChild(cloneSetTemplate)


    })
    
           element.appendChild(cloneTemplate)

    });

    

}

 
renderHouses(houses,elListHouse)


 
let elOpenBtn=selectElem('.Open__big-btn')

 elOpenBtn.addEventListener('click', function(e){
     elModal.classList.add('modal-active');
     elModalWrapper.classList.add('modal__wrapper-active')
     
   let elCloseBtn=selectElem('.close__btn', elModalWrapper);

   elCloseBtn.addEventListener('click', function(e){
      elModal.classList.remove('modal-active');
     elModalWrapper.classList.remove('modal__wrapper-active')
   })
})


 
function renderStyles(housesArr,element){
    let result =[];


    housesArr.forEach((house)=>{
      house.style.forEach((stylePart)=>{
       if(!result.includes(stylePart)){
         result.push(stylePart)
       }
      })
    })


    result.forEach((stylePart)=>{
      let newOption = createElem('option')
      newOption.textContent = stylePart;
      newOption.value = stylePart;

      element.appendChild(newOption)
    })

}
renderStyles(houses,elSearchSelect);



elForm.addEventListener('submit', function(e){
   e.preventDefault();

   const inputValue=elInput.value.trim()
   const searchValue=elSearchSelect.value.trim();
   const priceValue=elPriceSelect.value.trim();

   const regex = new RegExp(inputValue, 'gi')

   let filteredHouses = houses.filter((house)=>house.name.match(regex));

   let foundHouses=[];

   if(searchValue==='All'){
     foundHouses=filteredHouses;
   }else {
       foundHouses = filteredHouses.filter((house)=>house.style.includes
       (searchValue))
   }

  if(priceValue==='Expensive-cheap'){
     foundHouses.sort((a,b)=>{
       if(a.price>b.price){
         return -1
       }else if(a.price<b.price){
         return 1
       }else{
         return 0
        }
      })
    }else if(priceValue==='Cheap-expensive'){
     foundHouses.sort((a,b)=>{
       if(a.price>b.price){
         return 1
        }else if(a.price<b.price){
          return -1
        }else{
          return 0
        }
      })
    }else if(priceValue ==='near-far'){
      foundHouses.sort((a,b)=>{
        if(a.area>b.area){
          return -1
        }else if(a.area<b.area){
          return 1
        }else{
          return 0
        }
      })
    }else if(priceValue==='far-near'){
      foundHouses.sort((a,b)=>{
        if(a.area>b.area){
          return 1
        }else if(a.area<b.area){
          return -1
        }else{
          return 0
        }
      })
    }
   
   renderHouses(foundHouses,elListHouse)
})
