import {React, useCallback, useState, useEffect, Fragment} from 'react';
import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';



const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(null);

   // using promise which uses then syntax or use async/await

  const fetchMeals = useCallback(async () => {
    setIsLoading(true);
    setHttpError(null);
    try {
      const response = await fetch('https://react-foodorder-339ba-default-rtdb.firebaseio.com/meals.json');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for(const key in responseData){
        loadedMeals.push({
          id : key,
          name : responseData[key].name,
          description : responseData[key].description,
          price : responseData[key].price
        })
      }
      setMeals(loadedMeals)
      setIsLoading(false)

    } catch (error) {
      setIsLoading(false)
      setHttpError(error.message);
    }
    setIsLoading(false);
  }, []);

  // calls the function when ever the APP component is re-evaluated and on page load
  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);
  
  if(isLoading){
    return <section className={classes.loading}>
      <p> Loading... </p>
    </section>
  }
  
  if(httpError){
    return <section className={classes.error}>
      <p> {httpError} </p>
    </section>
  }

    const mealsList = meals.map(meal => 
        <MealItem id = {meal.id} key = {meal.id} name = {meal.name} description = {meal.description} price = {meal.price}/>
        );
    return (
      <Fragment>
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
      </Fragment>
    )
}

export default AvailableMeals;