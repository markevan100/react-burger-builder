import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import Modal from '../../components/UI/Modal/Modal';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  lettuce: 0.2,
  cheese: 0.7,
  meat: 2.0,
  bacon: 1.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      bacon: 0,
      lettuce: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  }

  updatePurchaseState (ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      }).reduce((sum, el) => {
        return sum + el;
      }, 0);
      this.setState({purchasable: sum > 0})
  };

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
    alert('You are buying this burger!');
  };

  addIngredientHandler = (type) => {
    const count = this.state.ingredients[type] + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = count;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const count = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = count;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    this.updatePurchaseState(updatedIngredients);
  };

  render () {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary
            modalClosed={this.purchaseCancelHandler}
            bought={this.purchaseContinueHandler}
            ingredients={this.state.ingredients}
            price={this.state.totalPrice} />
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            disabled={disabledInfo}
            ordered={this.purchaseHandler} />
      </Aux>
    );
  }
}

export default BurgerBuilder;
