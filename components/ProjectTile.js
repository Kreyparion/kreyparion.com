import React, { useState } from 'react';
import { Button, OverlayTrigger, Tooltip, Row, Col } from 'react-bootstrap';
import PrintMarkdown from './PrintMarkdown';
import PropTypes from 'prop-types';


export default function ProjectTile({ id, date, title, abstract, content }) {
    return (
        <Row>
            <Col>
                <h2>{title}</h2>
                <p>{date}</p>
                <PrintMarkdown text={abstract} />
            </Col>
        </Row>
    );
};


ProjectTile.propTypes = {
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    abstract: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
};
