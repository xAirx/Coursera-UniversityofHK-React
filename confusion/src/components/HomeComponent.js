import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Col,
} from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform } from 'react-animation-components';


function RenderCard({ item, isLoading, errMess }) {
  if (isLoading) {
    return <Loading />;
  }
  if (errMess) {
    return <h4>{errMess}</h4>;
  }
  return (
    <FadeTransform
    in
    transformProps={{
        exitTransform: 'scale(0.5) translateY(-50%)'
    }}>
    <Card>
      <CardImg src={baseUrl + item.image} alt={item.name} />
      <CardBody>
        <CardTitle>{item.name}</CardTitle>
        {item.designation ? (
          <CardSubtitle>{item.designation}</CardSubtitle>
        ) : null}
        <CardText>{item.description}</CardText>
      </CardBody>
    </Card>
    </FadeTransform>
  );
}

RenderCard.propTypes = {
  item: PropTypes.object.isRequired,
};
/*
const { name } = this.props.dish.name;
const { dish } = this.props.dish;
const { leader } = this.props.leaders;
const { promotion } = this.props.comments; */

/* function Home(props) {
 */

function Home(props) {
  return (
    <>
      <Col>
        <RenderCard
          item={props.dish}
          isLoading={props.dishesLoading}
          errMess={props.dishesErrMess}
        />
      </Col>
      <Col>
        <RenderCard
          item={props.promotion}
          isLoading={props.promosLoading}
          errMess={props.promosErrMess}
        />
      </Col>
      <Col>
        <RenderCard item={props.leader} />
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
