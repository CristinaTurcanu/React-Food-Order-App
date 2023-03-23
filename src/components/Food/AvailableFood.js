import React, {useEffect, useState} from "react";
import classes from './AvailableFood.module.css';
import Card from "../UI/Card";
import FoodItem from "./FoodItem";


const AvailableFood = () => {
    const [foods, setFoods] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [httpError, setHttpError] = useState()

    useEffect(() => {
        const fetchFoods = async () => {
            setIsLoading(true)
            const loadedFoods = []
            const response = await fetch("https://food-a890b-default-rtdb.europe-west1.firebasedatabase.app/foods.json")

            if(!response.ok) {
                throw new Error('Something went wrong!')
            }

            const responseData = await response.json()

            for(const key in responseData) {
                loadedFoods.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price
                })
            }

            setFoods(loadedFoods)
            setIsLoading(false)
        }
        fetchFoods().catch(error => {
            setIsLoading(false)
            setHttpError(error.message)
        })
    }, [])

    if (isLoading) {
        return <section><p className={classes.loading}>Loading...</p></section>
    }

    if (httpError) {
        return <section><p className={classes.error}>{httpError}</p></section>
    }

    const list = foods.map(item =>
        <FoodItem
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            description={item.description}
        />
    )
    return (<section className={classes.items}>
        <Card>
            <ul>
                {list}
            </ul>
        </Card>
    </section>)
}
export default AvailableFood