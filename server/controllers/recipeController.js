require('../models/database');
const category = require('../models/category');
const recipe = require('../models/recipe');

/**
 * GET /
 * Homepage
 */
exports.homepage = async (req, res) => {
  try {
    const limitNumber = 5;
    const categories = await category.find({}).limit(limitNumber);
    const latest = await recipe.find({}).sort({ _id: -1 }).limit(limitNumber);

    const food = { latest };

    res.render('index', { title: 'Cooking Blog - Home', categories, food });
  } catch (error) {
    res.satus(500).send({ message: error.message || "Error occured" });
  }
}

/**
 * GET /categories
 * Categories
 */
exports.exploreCategories = async (req, res) => {
  try {
    const limitNumber = 20;
    const categories = await category.find({}).limit(limitNumber);

    res.render('categories', { title: 'Cooking Blog - Categories', categories });
  } catch (error) {
    res.satus(500).send({ message: error.message || "Error occured" });
  }
}



// async function insertDymmyRecipeData() {
//   try {
//     await recipe.insertMany([
//       {
//         "name": "Jollof rice",
//         "description": `
// Put the passata, tomato purée, chillies, onions, peppers, garlic, rosemary, thyme, ground coriander and paprika in a blender or food processor and blend until smooth.
// Heat the olive oil in a large saucepan over a medium heat. Add the cherry tomatoes and the blended tomato sauce. Bring to the boil, then reduce the heat slightly and simmer for 5 minutes, stirring occasionally.
// Add the stock, bay leaves, rice, 1½ teaspoons salt and a large pinch of black pepper. Stir to combine and bring to the boil. Reduce the heat and simmer for 10–12 minutes, stirring frequently to prevent the rice from sticking, until the rice is cooked through. Turn off the heat, cover with the lid and leave to steam for 15 minutes without removing the lid.
// Meanwhile, heat the sunflower oil in a frying pan over a medium heat. Fry the plantain for a few minutes on each side until golden and tender.
// Spoon the jollof rice onto warmed plates and add the plantain on the side. Garnish with the chopped coriander and serve with a green salad alongside.`,
//         "email": "erinchanyh@gmail.com",
//         "ingredients": [
//           "400ml/14fl oz passata",
//           "3 tbsp tomato purée",
//           "2 fresh red Scotch bonnet chillies, seeds removed",
//           "2 onions, chopped",
//           "2 red peppers, seeds removed and roughly chopped",
//           "8 garlic cloves, peeled",
//           "3 tbsp fresh rosemary leaves",
//           "1 tbsp fresh thyme leaves",
//           "2 tsp ground coriander",
//           "1½ tsp sweet smoked paprika",
//           "50ml/2fl oz olive oil",
//           "150g/5½oz cherry tomatoes, halved",
//           "800ml/1½ pints chicken stock or vegetable stock",
//           "2 bay leaves"
//         ],
//         "category": "African",
//         "image": "jollof-rice.jpeg"
//       },
//       {
//         "name": "Chinese five-spice spare ribs",
//         "description": `
// Have your butcher separate the spareribs into individual ribs and then into chunks which are approximately 7.5cm/3in long. Alternatively do this yourself using a heavy sharp cleaver that can cut through the bones.
// Mix the marinade ingredients together in a bowl and steep the spare ribs in the marinade for about 25 minutes at room temperature. Remove the spareribs from the marinade with a slotted spoon.
// Heat the oil in a deep-fat fryer or large wok. When the oil is very hot and slightly smoking, slowly brown the marinated spareribs in several batches until they are brown. Drain each cooked batch on kitchen paper. (Leave the cooking oil to cool. Strain it through a filter if you want to re-use it when cooking pork.)
// Put the sauce ingredients into a clean wok or frying pan.
// Bring the sauce to the boil and then reduce the heat. Add the spare ribs, cover and simmer gently for about 40 minutes, stirring occasionally.
// If necessary, add a little water to the sauce to prevent the spareribs from drying up. Skim off any surface fat, turn onto a warm serving plate and serve at once.`,
//         "email": "erinchanyh@gmail.com",
//         "ingredients": [
//           "750g/1½lb pork spareribs",
//           "600ml/1 pint groundnut (peanut) oil",
//           "1 tbsp light soy sauce",
//           "1 tbsp Chinese black rice vinegar or cider vinegar",
//           "2 tsp sesame oil",
//           "1 tbsp cornflour",
//           "2 tbsp finely chopped garlic",
//           "2 tsp five-spice powder",
//           "3 tbsp finely chopped spring onions",
//           "3 tbsp Chinese rock sugar or granulated sugar",
//           "3 tbsp Shaoxing rice wine or dry sherry",
//           "150ml/5fl oz chicken stock",
//           "1½ tbsp light soy sauce",
//           "2 tbsp dried grated orange peel",
//           "85ml/3fl oz Chinese black rice vinegar or cider vinegar"
//         ],
//         "category": "Asian",
//         "image": "chinese-five-spice-spare-ribs.jpeg"
//       },
//       {
//         "name": "Freekeh Salad",
//         "description": `
// Bring a large saucepan of water to the boil and cook the freekeh according to the packet instructions (about 15–20 minutes). Drain, rinse thoroughly until cold and place in a large mixing bowl.
// Add the remaining ingredients to the bowl with the freekeh and give everything a thoroughly good mix. Cover with cling film and allow to rest for an hour before serving.`,
//         "email": "erinchanyh@gmail.com",
//         "ingredients": [
//           "500g/1lb 2oz freekeh",
//           "1 small red onion, very finely chopped",
//           "250g/9oz dried cranberries",
//           "200g/9oz blanched almonds",
//           "20g/¾oz dill, fronds and stems finely chopped",
//           "400g/14oz pomegranate seeds",
//           "150ml/¼ pint pomegranate molasses",
//           "generous glug of olive oil"
//         ],
//         "category": "Middle Eastern",
//         "image": "freekeh-salad.jpeg"
//       },
//       {
//         "name": "Slow cooker Bolognese",
//         "description": `
// Heat the oil and butter in a large saucepan. Add the onion, celery, carrot and pancetta and cook on a gentle heat for 10 minutes, or until the onion has softened. Add the mince and brown all over. Increase the heat, add the wine and cook until evaporated. Dilute the tomato purée in the stock and stir into the meat. Bring to the boil.
// Transfer the mixture to a medium slow-cooker pot. Cover and cook on a low setting for 8–9 hours. Stir in the milk and cook for 10 minutes before serving. For a large slow-cooker pot, you can make double the quantity, but cooking times remain the same.
// If cooking on the hob, instead of transferring to a slow cooker, reduce the heat to low, cover with a lid and cook on a gentle heat for 2 hours, checking and adding a little extra stock from time to time to prevent the sauce from drying out. You will need an extra 150ml/5fl oz of stock. About 10 minutes before the end of the cooking time, stir in the milk.
// Serve the Bolognese with freshly cooked tagliatelle, sprinkled with Parmesan.`,
//         "email": "erinchanyh@gmail.com",
//         "ingredients": [
//           "3 tbsp olive oil",
//           "30g/1oz butter",
//           "1 onion, finely chopped",
//           "1 celery stalk, finely chopped",
//           "1 carrot, finely chopped",
//           "150g/5½oz pancetta, cubed",
//           "200g/7oz beef mince",
//           "200g/7oz pork mince",
//           "200ml/7fl oz red wine",
//           "1½ tbsp tomato purée",
//           "200ml/7fl oz beef stock",
//           "100ml/3½fl oz whole milk",
//           "400g/14oz tagliatelle, cooked according to packet instructions",
//           "a little Parmesan, finely grated, to serve"
//         ],
//         "category": "European",
//         "image": "slow-cooker-bolognese.jpeg"
//       },
//       {
//         "name": "Black and blue burger",
//         "description": `
// 1. Mince the rib steak and short rib steak using a mincer (or place in a food processor and pulse together). Transfer to a bowl and season with salt and pepper. Shape into two burger patties, pressing down a little to flatten. Put on a plate, cover and transfer to the fridge for at least 1 hour to firm up.

// 2. To make the dope sauce, mix all the ingredients together in a small bowl until well combined. Set aside.

// 3. Heat a little oil over a medium-high heat in a non-stick frying pan. Add the bacon slices and cook for a minute or two on either side until starting to crisp. Add the sugar, maple syrup and treacle to the pan, reduce the heat and allow to caramelise, turning the bacon slices in the syrup to coat for 1–2 minutes. Remove from the heat and reserve any syrup leftover in the pan.

// 4. To cook the burgers, heat a griddle pan over a medium-high heat. Once hot, brush with a little oil and add the burgers. Cook for around 5–6 minutes on each side, or until cooked through.

// 5. Top each burger with a slice of cheddar, some blue cheese and 2 slices of bacon. Add a little water to the griddle pan and cover with a cloche or lid. Cook for 1–2 minutes until the cheese has melted.

// 6. To assemble, arrange the burgers and bacon on the bottom halves of the buns. Top with the sliced pickle and onion. Drizzle with the dope sauce and any reserved syrup. Top with other halves of the buns and serve with fries.
// `,
//         "email": "erinchanyh@gmail.com",
//         "ingredients": [
//           "200g/7oz deboned rib steak, cut into chunks",
//           "200g/7oz deboned short rib steak, cut into chunks",
//           "2 tsp vegetable oil, for frying",
//           "salt and freshly ground black pepper",
//           "4 tbsp mayonnaise",
//           "¼ tsp garlic powder",
//           "¼ tsp onion powder",
//           "½ tsp smoked paprika",
//           "4 slices smoked streaky bacon",
//           "1 tsp soft brown sugar",
//           "2 tsp maple syrup",
//           "1 tsp treacle",
//           "2 slices mild cheddar",
//           "50g/1¾oz blue cheese, grated",
//           "2 seeded brioche buns, split and toasted",
//           "2 dill pickles, sliced lengthways",
//           "½ small red onion, sliced",
//           "French fries, to serve"
//         ],
//         "category": "Western",
//         "image": "black-and-blue-burger.jpeg"
//       }

//     ]);
//   } catch (error) {
//     console.log('err', + error)
//   }
// }

// insertDymmyRecipeData();
