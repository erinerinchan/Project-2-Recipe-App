const axios = require("axios")

const recipes = [
    "https://www.allrecipes.com/recipe/240400/skillet-chicken-bulgogi/",
    "https://www.allrecipes.com/recipe/219164/the-best-parmesan-chicken-bake/",
    // "https://www.allrecipes.com/recipe/266796/greek-chicken-couscous-bowl/",
    // "https://www.allrecipes.com/recipe/241559/honey-mustard-chicken-with-roasted-vegetables/",
    // "https://www.allrecipes.com/recipe/212721/indian-chicken-curry-murgh-kari/",
    // "https://www.allrecipes.com/recipe/238844/korean-fried-chicken/",
    // "https://www.allrecipes.com/recipe/233983/mamaws-chicken-and-rice-casserole/",
    // "https://www.allrecipes.com/recipe/273664/chicken-alfredo-bake/",
    // "https://www.allrecipes.com/recipe/255038/sheet-pan-chicken-fajitas/",
    // "https://www.allrecipes.com/recipe/220751/quick-chicken-piccata/",
    // "https://www.allrecipes.com/recipe/244951/amazingly-tasty-and-crispy-chicken-schnitzel/",
    // "https://www.allrecipes.com/recipe/257938/spicy-thai-basil-chicken-pad-krapow-gai/",
    // "https://www.allrecipes.com/recipe/272544/baked-lemon-butter-chicken-thighs/",
    // "https://www.allrecipes.com/recipe/25184/slow-cooker-chicken-creole/",
    // "https://www.allrecipes.com/recipe/233983/mamaws-chicken-and-rice-casserole/",
    // "https://www.allrecipes.com/recipe/241890/grilled-chicken-marinade/",
    // "https://www.allrecipes.com/recipe/213666/best-city-chicken/",
    // "https://www.allrecipes.com/recipe/231644/chicken-souvlaki-with-tzatziki-sauce/",
    // "https://www.allrecipes.com/recipe/236609/honey-garlic-slow-cooker-chicken-thighs/",
    // "https://www.allrecipes.com/recipe/72068/chicken-katsu/",
    // "https://www.allrecipes.com/recipe/54202/greek-style-garlic-chicken-breast/",
    // "https://www.allrecipes.com/recipe/216159/perfect-chicken/",
    // "https://www.allrecipes.com/recipe/257568/grilled-greek-chicken/",
    // "https://www.allrecipes.com/recipe/8626/yummy-honey-chicken-kabobs/",
    // "https://www.allrecipes.com/recipe/244951/amazingly-tasty-and-crispy-chicken-schnitzel/",
    // "https://www.allrecipes.com/recipe/8887/chicken-marsala/",
    // "https://www.allrecipes.com/recipe/240208/simple-baked-chicken-breasts/",
    // "https://www.allrecipes.com/recipe/61024/asian-orange-chicken/",
    // "https://www.allrecipes.com/recipe/9023/baked-teriyaki-chicken/",
    // "https://www.allrecipes.com/recipe/235151/crispy-and-tender-baked-chicken-thighs/",
    // "https://www.allrecipes.com/recipe/230620/mayo-chicken/",
    // "https://www.allrecipes.com/recipe/64513/rosemary-ranch-chicken-kabobs/",
    // "https://www.allrecipes.com/recipe/279903/garlic-brown-sugar-chicken-thighs/",
    // "https://www.allrecipes.com/recipe/18350/baked-spaghetti-with-chicken/",
    // "https://www.allrecipes.com/recipe/242352/greek-lemon-chicken-and-potatoes/",
    // "https://www.allrecipes.com/recipe/55860/baked-garlic-parmesan-chicken/"
]

recipes.forEach((link) => {
  axios({
    method: 'POST',
    url: 'https://mycookbook-io1.p.rapidapi.com/recipes/rapidapi',
    headers: {
      'content-type': 'text/plain',
      'X-RapidAPI-Key': 'c40f28eed7msh4f7bf990d9b3cdcp1834e8jsn2e899f166837',
      'X-RapidAPI-Host': 'mycookbook-io1.p.rapidapi.com'
    },
    data: link
  }).then((response) => {
    console.log(response.data)
  }).catch((error) => {
    console.error(error)
  })
})
