import React, { Component } from 'react';
import DishDetail from './DishdetailComponent'
import {
	Card, CardImg, CardImgOverlay, CardText, CardBody,
	CardTitle
} from 'reactstrap';

class Menu extends Component {

	constructor(props) {
		super(props);

		this.state = {
			selectedDish: null
		}
	}

	/* SELECTING A DISH AND ADDING THAT TO THE STATE */
	onDishSelect(dish) {
		this.setState({ selectedDish: dish });
		console.log("Sending state to DishdetailComponent");
		/* 	console.log("This is the set state in menucomponent: " + JSON.stringify(this.state.selectedDish)) */
	}


	render() {
		// Shows the top images, that we click on to see details.
		const menu = this.props.dishes.map((dish) => {
			return (
				<div className="col-12 col-md-5 m-1">

					{/* Make sure we can click on dish */}
					<Card key={dish.id} onClick={() => this.onDishSelect(dish)}>

						{/* Show dish name and image */}
						<CardImg width="100%" src={dish.image} alt={dish.name} />
						<CardImgOverlay>
							<CardTitle>{dish.name}</CardTitle>
						</CardImgOverlay>
					</Card>
				</div>
			);
		});

		return (
			<div className="container">
				<div className="row">
					{/* SHOWS MENU FROM PROPS MAP ABOVE Show dish name and image */}
					{menu}
				</div>
				<DishDetail selectedDish={this.state.selectedDish} />
			</div>
		);
	}
}

export default Menu