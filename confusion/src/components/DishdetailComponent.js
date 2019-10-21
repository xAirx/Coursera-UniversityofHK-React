import React, { Component } from 'react';

import {
	Card, CardImg, CardText, CardBody,
	CardTitle
} from 'reactstrap';


const formatter = new Intl.DateTimeFormat('en-GB');

/* const dish = this.props.dish;
console.log(dish) */
class DishDetail extends Component {

	/* constructor(props) {
		super(props);

		this.state = {
			selectedDish: null
		}
	} */

	// Grab the stuff from the object.
	renderDish(dish) {

		if (dish != null)
			return (
				<Card>
					<CardImg top src={dish.image} alt={dish.name} />
					<CardBody>
						<CardTitle>{dish.name}</CardTitle>
						<CardText>{dish.description}</CardText>
					</CardBody>
				</Card>
			);
		else
			return (
				<div></div>
			);
	}


	// Make into function component

	renderComments(comments) {
		return (comments && comments.map((comment, key) =>

			<li class="list-unstyled" key={key}>
				{comment.comment}<br /><br />
				{"--" + comment.author + " ," + formatter.format(Date.parse(comment.date))}<br /><br />
{/* 				{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
 */}				{console.log(typeof comment.date)}
				{console.log(comment.date)}

			</li>
		)) || (<div />);

	}


	render() {


		return (
			<div className="container">
				<div className="row">
					<div className="col-12 col-md-5 m-1">
						{this.renderDish(this.props.dish)}
					</div>
					<div className="col-12 col-md-5 m-1">
						{this.props.dish && (<>
							<h4>Comments</h4>
							{this.renderComments(this.props.dish.comments)}
						</>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default DishDetail
