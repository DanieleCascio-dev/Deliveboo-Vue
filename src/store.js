import { reactive } from "vue";
//baseUrl
export const store = reactive({
  baseUrl: "http://127.0.0.1:8000",
  restaurantName: "",
});

/* Use this function to clear localstorage */
export function clear() {
  localStorage.clear();
}

/* Use this function to update the total amount variable (return totPrice) */
export function addToTotal(storageMeal) {
  let totPrice = 0;
  console.log("aggiorno il prezzo");
  storageMeal.forEach((meal) => {
    totPrice += meal.price * meal.quantity;
  });
  return totPrice.toFixed(2);
}

/* function to take the restaurant from meals in localstorage */
/* export function takeRestaurantId(curRestaurant) {
  Object.keys(localStorage).forEach((key) => {
    curRestaurant = JSON.parse(localStorage.getItem(key));
  });
  return curRestaurant;
} */

/* Use this function to remove one meal from the localstoarge */
export function removeMeal(meal, currRestaurant) {
  console.log("funzione removeMeal");
  console.log(meal);
  // meal.name = Diavola       key:Diavola = {name:Diavola, description: .....}
  if (meal.name === JSON.parse(localStorage.getItem(meal.name)).name) {
    // Se il piatto ha una quantità maggiore di 1 allora la diminuisco di 1
    const quantity = JSON.parse(localStorage.getItem(meal.name)).quantity;
    if (quantity > 1) {
      console.log("secondo if");
      console.log(meal.id);
      let dish = JSON.parse(localStorage.getItem(meal.name)).quantity;
      localStorage.setItem(
        meal.name,
        JSON.stringify({
          id: meal.id,
          name: meal.name,
          image: meal.image,
          description: meal.description,
          price: parseFloat(meal.price),
          quantity: dish - 1,
          restaurant_id: meal.restaurant_id,
        })
      );
      /*  this.showStorage(); */
    }

    //Altrimenti elimino il piatto
    else {
      console.log("secondo else");
      localStorage.removeItem(meal.name);
    }
  } else {
    console.log("non c'è");
  }
}
/* Use this function to popolate the array with all the elements inside the localstoare, return array of objects */
export function showStorage(storageMeal) {
  storageMeal = [];
  console.log(storageMeal);
  Object.keys(localStorage).forEach((key) => {
    storageMeal.push(JSON.parse(localStorage.getItem(key)));
  });
  return storageMeal;
}
