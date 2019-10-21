import React from 'react';

import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

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

	const  DishDetail = (props) => {

		return (
			<div className="container">
			<div className="row">
				<Breadcrumb>
					<BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
					<BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
				</Breadcrumb>
				<div className="col-12">
					<h3>{props.dish.name}</h3>
					<hr />
				</div>
			</div>
			<div className="row">
				<div className="col-12 col-md-5 m-1">
					<RenderDish dish={props.dish} />
				</div>
				<div className="col-12 col-md-5 m-1">
					<RenderComments comments={props.comments} />
				</div>
			</div>
			</div>
		);
	}

export default DishDetail
