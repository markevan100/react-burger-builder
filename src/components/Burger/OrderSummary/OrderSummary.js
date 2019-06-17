import React, { Component } from 'react';
// import Aux from '../../../hoc/Aux';
import classes from './OrderSummary.module.css';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    componentDidUpdate() {
      console.log('[OrderSummary] DidUpdate')
    }

    render () {
      const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
          return (
              <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
              </li>
          );
        })

      return (
        <div className={classes.OrderSummary}>
          <h3>Your Order</h3>
          <p>A delicious burger with:</p>
          <ul>
            {ingredientSummary}
          </ul>
          <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>
          <p>Continue to checkout?</p>
          <Button btnType="Danger" clicked={this.props.modalClosed}>CANCEL</Button>
          <Button btnType="Success" clicked={this.props.bought}>CONTINUE</Button>
        </div>
      )
    }
};

export default OrderSummary;
