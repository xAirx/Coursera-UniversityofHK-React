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

function RenderMenuItem({ dish }) {
  return (
    <Card>
      <Link to={`/menu/${dish.id}`}>
        <CardImg width="100%" src={dish.image} alt={dish.name} />
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
  const menu = dishes.map(dish => (
    <div className="col-12 col-md-5 m-1" key={dish.id}>
      {/* Dishes is destructured out of "props" */}
      <RenderMenuItem dish={dish} onClick={dishes.onClick} />
    </div>
  ));

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
