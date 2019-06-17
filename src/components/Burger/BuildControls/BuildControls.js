import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  {label: 'Lettuce', type: 'lettuce', price: "$0.20"},
  {label: 'Fakin-Bacon', type: 'bacon', price: "$1.70"},
  {label: 'Diya-Cheese', type: 'cheese', price: "$0.70"},
  {label: 'Veggie Burger', type: 'meat', price: "$2.00"}
]

const buildControls = props => (
  <div className={classes.BuildControls}>
    <p>Current price: <strong>${props.price.toFixed(2)}</strong></p>
    {controls.map(control => (
      <BuildControl
          key={control.label}
          label={control.label}
          price={control.price}
          added={() => props.ingredientAdded(control.type)}
          removed={() => props.ingredientRemoved(control.type)}
          disabled={props.disabled[control.type]} />
    ))}
    <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}>ORDER NOW</button>
  </div>
);

export default buildControls;
