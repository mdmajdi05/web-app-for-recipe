const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const div1 = document.querySelector('.content')
const popdiv = document.querySelector('.popdiv')


//fetching api=-------------------------------------------------
const fetchRecepie = async (query) => {

   div1.innerHTML=`<h1 class="bh"> fetching recipes </h1>`
   try {
      
   
   const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
   const reusult = await data.json();


   // creating card html---------------------------------------------------------------------------
   div1.innerHTML="";
   reusult.meals.forEach(meal => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
          <img id="img1" src="${meal.strMealThumb}">
          <h3>${meal.strMeal}</h3>
           <p>${meal.strInstructions}</p>`
           const CardBtn = document.createElement('button')
              CardBtn.classList.add('CardBtn')
              CardBtn.textContent = "View Recepie";
              card.appendChild(CardBtn);

      // popup btn ----------------------------------------------------
     
      CardBtn.addEventListener('click', (e) => {
         e.preventDefault();
         popdiv.style.display="block";
         popupfun(meal);
         
      });

      // fetching ingreadients---------------------------------
          function fetchIngredient(meal) {
           let ingredients = "";
         for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            

            if (ingredient) {
             const measure = meal[`strMeasure${i}`];
              ingredients += `<li>${ingredient}, ${measure}</li>` 
            } 
            else {
               break;
            };
            
            };
            return ingredients;
          };
          //end fetching ingredient-----------------------------------------

      const popupfun = (meal) => {
         
         
         popdiv.innerHTML = `
         <button class="closebtn">
                <i class="fa-solid fa-square-xmark fa-beat fa-2xl" style="color: #050505;"></i>
                
            </button>
        <div class="mainpop"> 
       <h3>Ingredient</h3>
       <ul>
       ${fetchIngredient(meal)}
       </ul>
       
       
       <h3>Instruction:</h3>
       <p>${meal.strInstructions}</p>
       </div>
       `
       
       div1.appendChild(popdiv);
       
       

         const closebtn = document.querySelector('.closebtn')
         
            closebtn.addEventListener('click', () => {
            popdiv.style.display = 'none';
         });
      };
      // end popup-----------------------------------------------------------------------------------
      


      div1.appendChild(card);
      console.log(reusult);
      

   }); //end card
  } 
catch (error) {
   div1.innerHTML=`<h1 class="bh"> Please check your spelling... </h1>` 
   } 
}; //end fetch api



// search button and search input-----------------------------------------------------------------------
searchBtn.addEventListener('click', (e) => {
   e.preventDefault();
   
   const SerchInput = searchBox.value.trim();
   if (!SerchInput) {
      div1.innerHTML=`<h1 class="bh" > Please enter recipe...</h1>`
   return;
}
   
   fetchRecepie(SerchInput);
   
   // return;
});

