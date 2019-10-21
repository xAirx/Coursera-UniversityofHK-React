import React from 'react';

import {
	Card, CardImg, CardText, CardBody,
	CardTitle
} from 'reactstrap';


const formatter = new Intl.DateTimeFormat('en-GB');


	// Grab the stuff from the object.
	function RenderDish({dish}) {

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

	function RenderComments({comments}) {
		return (comments && comments.comments.map((comment, key) =>

			<li class="list-unstyled" key={key}>
				{comment.comment}<br /><br />
				{"--" + comment.author + " ," + formatter.format(Date.parse(comment.date))}<br /><br />
{/* 				{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
 */}				{console.log(typeof comment.date)}
				{console.log(comment.date)}

			</li>
		)) || (<div />);

	}

	const  DishDetail = (props) => {

		return (
			<div className="container">
				<div className="row">
					<div className="col-12 col-md-5 m-1">
						<RenderDish dish={props.dish} />
					</div>
					<div className="col-12 col-md-5 m-1">
					{props.dish && (<>
							<h4>Comments</h4>
						<RenderComments comments={props.dish} />
						</>
					)}
					</div>
				</div>
			</div>
		);
	}

export default DishDetail
