import { reactive } from "vue";
//baseUrl
export const store = reactive({
  baseUrl: "http://127.0.0.1:8000",
});

export function clear() {
  localStorage.clear();
}

export function addToTotal(storageMeal) {
  let totPrice = 0;
  console.log("aggiorno il prezzo");
  storageMeal.forEach((meal) => {
    totPrice += meal.price * meal.quantity;
  });
  return totPrice;
}

export function removeMeal(meal) {
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
          /* restaurant:
            meal.restaurant_id == this.curRestaurant.id
              ? this.curRestaurant.name
              : "", */
        })
      );
      /*  this.showStorage(); */
    }
    //Altrimenti elimino il piatto
    else {
      console.log("secondo else");
      localStorage.removeItem(meal.name);
      /* this.showStorage(); */
    }
  } else {
    console.log("non c'è");
  }
}

export function showStorage(storageMeal) {
  storageMeal = [];
  console.log(storageMeal);
  Object.keys(localStorage).forEach((key) => {
    storageMeal.push(JSON.parse(localStorage.getItem(key)));
  });
  console.log(storageMeal);
  return storageMeal;
  /* this.totPrice = 0;
  this.addToTotal(); */
  /* return storageMeal; */
}
