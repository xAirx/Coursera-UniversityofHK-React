import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import CommentForm from './CommentForm';

const formatter = new Intl.DateTimeFormat('en-GB');

// Grab the stuff from the object.
function RenderDish({ dish }) {
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
  return <div></div>;
}

RenderDish.propTypes = {
  dish: PropTypes.object.isRequired,
};

// Make into function component

function RenderComments({ comments, addComment, dishId }) {
  /* console.log('THIS IS ADDCOMMENT', props.addComment); */

  /*  const renderStars = count =>
     [...Array(count)].map((_, i) => {
       {
         {
           <FontAwesome
             className="super-crazy-colors"
             name="rocket"
             size="2x"
             spin
             style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
           />;
         }
       }
     }); */

  return (
    comments && (
      <>
        {comments.map((comment, index) => (
          <ul>
            <li className="list-unstyled" key={index}>
              {comment.comment}
              <br />
              <br />
              {`${comment.rating} stars from me!`}
              <br />
              {`--${comment.author} ,${formatter.format(
                Date.parse(comment.date)
              )}`}
              <br />
              <br />
              {/* 				{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
               */}
              {console.log(typeof comment.date)}
              {console.log(comment.date)}
            </li>
          </ul>
        ))}
        <CommentForm dishId={dishId} addComment={addComment} />
      </>
    )
  );
}

RenderComments.propTypes = {
  comments: PropTypes.object.isRequired,
};

// IMPLICIT RETURN WHERE WE DESTRUCTURE ARGUMENTS .

/* const ImplicitRetrun = ({title}) => (
  <>
            <h1>{title}</h1>
          </>
          ); */
/*
if we use {} we have to use return because its explicit return

Just like map and filter and return, they work because of implicit return */

const DishDetail = (/* { dish, comments, dish: { name } } */ props) => (
  <div className="container">
    <div className="row">
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/menu">Menu</Link>
        </BreadcrumbItem>
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
        <RenderComments
          comments={props.comments}
          addComment={props.addComment}
          dishId={props.dish.id}
        />
      </div>
    </div>
  </div>
);

DishDetail.propTypes = {
  dish: PropTypes.object.isRequired,
  comments: PropTypes.object.isRequired,
};

export default DishDetail;
