import React from 'react';
import MdRenderer from '../components/md_renderer';
import { Container } from 'react-bootstrap';

const Projects = () => (
    <div>
        <h1>Projects</h1>
        <p>
            Display the markdown files to present my projects 
            Display all the tags : techs worked on, dates
        </p>
        <br />
        <br />
        <br />
        <Container>
            <MdRenderer/>
        </Container>
    </div>
);

export default Projects;