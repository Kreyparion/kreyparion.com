import React, { useState } from 'react';
import { Button, OverlayTrigger, Tooltip, Row, Col } from 'react-bootstrap';
import PrintMarkdown from './PrintMarkdown';
import PropTypes from 'prop-types';
import Link from 'next/link';
import style from './ProjectTile.module.css';


export default function ProjectTile({ id, date, title, abstract, content, tags, stags, image, links, linksDescription}) {
    return (
        <Row>
            <Col className={style.tile}>
                <div className={style.date}>
                {date.slice(3)}
                </div>
                <div className={style.content}>
                    <Link href={`/projects/${id}`} className={style.link}>
                        <h3 className={style.title}>
                            {title}
                        </h3>
                    </Link>
                    
                    <div className={style.tags}>
                        {tags.map((tag, index) => (
                            <OverlayTrigger
                                key={tag}
                                placement="bottom"
                                overlay={<Tooltip id={tag}>{tag}</Tooltip>}
                            >
                                <Button variant="secondary" className={style.tagButton}>
                                    {stags[index]}
                                </Button>
                            </OverlayTrigger>
                        ))}
                    </div>
                    <div>
                        <PrintMarkdown text={abstract} id={id}/>
                    </div>
                    <div>
                        {links.map((link, index) => (
                            <Button key={link} variant="primary" className={style.linkButton} href={link}>
                                {linksDescription[index]}
                            </Button>
                        ))}
                    </div>
                    
                </div>
                <div className={style.imagecontainer}>
                    <img src={`/projects/${id}/${image}`} alt={title} className={style.image}/>
                </div>
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
