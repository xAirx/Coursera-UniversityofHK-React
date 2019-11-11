import React from 'react';
import PropTypes from 'prop-types';

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Row,
  Col,
} from 'reactstrap';

function RenderCard({ item }) {
  return (
    <Card>
      <CardImg src={item.image} alt={item.name} />
      <CardBody>
        <CardTitle>{item.name}</CardTitle>

        {/* if designation is not null we render as cardsubtitle
        card designation exists only for the leader.
        make sure that designation is conditionally rendered for leaders.
        */}

        {item.designation ? (
          <CardSubtitle>{item.designation}</CardSubtitle>
        ) : null}

        <CardText>{item.description}</CardText>
      </CardBody>
    </Card>
  );
}

RenderCard.propTypes = {
  item: PropTypes.object.isRequired,
};

/* const { name } = this.props.dish.name; */
/* const { dish } = this.props.dish;
const { leader } = this.props.comments;
const { promotion } = this.props.comments;
 */

/* function Home(props) {
 */

function Home({ dish, leader, promotion }) {
  return (
    <>
      <Col>
        <RenderCard item={dish} />
      </Col>
      <Col>
        <RenderCard item={promotion} />
      </Col>
      <Col>
        <RenderCard item={leader} />
      </Col>
    </>
  );
}

Home.propTypes = {
  dish: PropTypes.object.isRequired,
  leader: PropTypes.object.isRequired,
  promotion: PropTypes.object.isRequired,
};

export default Home;
