import {Fragment} from "react";

import FoodSummary from "./FoodSummary";
import AvailableFood from "./AvailableFood";

const Food = () => {
    return <Fragment>
        <FoodSummary />
        <AvailableFood />
    </Fragment>
}

export default Food;