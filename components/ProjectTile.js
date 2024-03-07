import React, { useState } from 'react';
import { Button, OverlayTrigger, Tooltip, Row, Col } from 'react-bootstrap';
import PrintMarkdown from './PrintMarkdown';
import PropTypes from 'prop-types';
import Link from 'next/link';
import style from './ProjectTile.module.css';

export default function ProjectTile({ id, date, title, abstract, content }) {
    return (
        <Row>
            <Col>
                <Link href={`/projects/${id}`} className={style.link}>
                    <h3>{title}</h3>
                </Link>
                <p>{date}</p>
                tags
                <PrintMarkdown text={abstract} id={id}/>
                button with repo links
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
