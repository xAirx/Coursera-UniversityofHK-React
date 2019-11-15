import React from 'react';
import PropTypes from 'prop-types';

import {
  Card,
  CardImg,
  CardImgOverlay,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

function RenderMenuItem({ dish }) {
  return (
    <Card>
      <Link to={`/menu/${dish.id}`}>
        <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
        <CardImgOverlay>
          <CardTitle>{dish.name}</CardTitle>
        </CardImgOverlay>
      </Link>
    </Card>
  );
}

RenderMenuItem.propTypes = {
  dish: PropTypes.object.isRequired,
};

/* const Menu = dishes props => {
  const menu = this.props.map(dish => (
 */

const Menu = ({ dishes }) => {
  const menu = dishes.dishes.map(dish => (
    <div className="col-12 col-md-5 m-1" key={dish.id}>
      {/* Dishes is destructured out of "props" */}
      <RenderMenuItem dish={dish} onClick={dishes.dishes.onClick} />
    </div>
  ));
  if (dishes.dishes.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }
  if (dishes.dishes.errMess) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h4>{dishes.dishes.errMess}</h4>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/home">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Menu</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>Menu</h3>
          <hr />
        </div>
      </div>
      <div className="row">{menu}</div>
    </div>
  );
};

Menu.propTypes = {
  dishes: PropTypes.object.isRequired,
};
export default Menu;
