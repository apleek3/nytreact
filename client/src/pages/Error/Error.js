import React from "react";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import { H1 } from '../../components/Headings';

const Error = () =>
  <Container fluid>
    <Row>
      <Col size="sm-10" offset='sm-1'>
        <Jumbotron>
          <H1 className="text-center">404!  Something went wrong...</H1>
          <H1 className="text-center">
            <span role="img" aria-label="Shrug">
            ¯\_(ツ)_/¯
              <br/>
            </span>
          </H1>
        </Jumbotron>
      </Col>
    </Row>
  </Container>;

export default Error;
