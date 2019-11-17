import React from 'react';
import PropTypes from 'prop-types';
import { Fade, Stagger } from 'react-animation-components';

import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';

function RenderLeaders({ leaders }) {
  if (leaders != null)
    return (
      <Stagger in>
        <Card>
          <Fade in>
            <CardBody>
              <div className="row">
                <div className="col-2">
                  <CardImg
                    width="100%"
                    src={baseUrl + leaders.image}
                    alt={leaders.name}
                  />
                </div>
                <div className="col-10">
                  <CardTitle>{leaders.name}</CardTitle>
                  <CardText>{leaders.description}</CardText>
                </div>
              </div>
            </CardBody>
          </Fade>
        </Card>
      </Stagger>
    );
  return <div></div>;
}

RenderLeaders.propTypes = {
  leaders: PropTypes.object.isRequired,
};

function About({ leaders }) {
  const leaderlist = leaders.map(leader => (
    <div className="col-12" key={leader.id}>
      <RenderLeaders leaders={leader} />
    </div>
  ));

  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/home">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>About Us</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <hr />
        </div>
      </div>
      <div className="row row-content">
        <h2>Our History</h2>
        <p>
          Started in 2010, Ristorante con Fusion quickly established itself as a
          culinary icon par excellence in Hong Kong. With its unique brand of
          world fusion cuisine that can be found nowhere else, it enjoys
          patronage from the A-list clientele in Hong Kong. Featuring four of
          the best three-star Michelin chefs in the world, you never know what
          will arrive on your plate the next time you visit us.
        </p>
        <p>
          The restaurant traces its humble beginnings to <em>The Frying Pan</em>
          , a successful chain started by our CEO, Mr. Peter Pan, that featured
          for the first time the world's best cuisines in a pan.
        </p>

        <div className="col-8 qoute">
          <Card>
            <CardBody className="bg-faded">
              <blockquote className="blockquote">
                <p className="mb-0">
                  You better cut the pizza in four pieces because I'm not hungry
                  enough to eat six.
                </p>
                <footer className="blockquote-footer">
                  Yogi Berra,
                  <cite title="Source Title">
                    The Wit and Wisdom of Yogi Berra, P. Pepe, Diversion Books,
                    2014
                  </cite>
                </footer>
              </blockquote>
            </CardBody>
          </Card>
        </div>
      </div>
      <div className="row row-content">
        <div className="col-12"></div>
        <div className="col-12">{leaderlist}</div>
      </div>
    </div>
  );
}

About.propTypes = {
  leaders: PropTypes.object.isRequired,
};

export default About;
