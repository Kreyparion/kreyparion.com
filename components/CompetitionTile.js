import React, { useState } from 'react';
import { Button, OverlayTrigger, Tooltip, Row, Col } from 'react-bootstrap';
import PrintMarkdown from './PrintMarkdown';
import PropTypes from 'prop-types';
import Link from 'next/link';
import style from './CompetitionTile.module.css';


export default function CompetitionTile({ id, date, title, abstract, content, tags, stags, image, links, linksDescription, rank}) {
    const [rankNumber, totalNumber] = rank.split('/');
    let color = 'black';
    if (rankNumber == 1) {
        color = 'gold';
    } else if (rankNumber/totalNumber < 0.2) {
        color = 'silver';
    } else if (rankNumber/totalNumber < 0.5) {
        color = 'bronze';
    }
    return (
        <Row>
            <Col className={style.tile}>
                <div className={style.leftContainer}>
                    <div className={style.date}>
                        {date.slice(3)}
                    </div>
                    <div className={style.rank} style={{color: color}}>
                        {rank}
                    </div>
                </div>
                
                <div className={style.content}>
                    {content!="" ? 
                    <Link href={`/competitions/${id}`} className={style.link}>
                        <h3 className={style.title}>
                            {title}
                        </h3>
                    </Link>
                    :
                    <h3 className={style.title}>
                        {title}
                    </h3>}
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
                    <img src={`/competitions/${id}/${image}`} alt={title} className={style.image}/>
                </div>
            </Col>
        </Row>
    );
};


CompetitionTile.propTypes = {
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    abstract: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
};
