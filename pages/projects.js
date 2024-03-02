import React from 'react';
import { Container } from 'react-bootstrap';
import getSortedProjectsData from '../lib/projects';
import PropTypes from 'prop-types';

import ProjectTile from '../components/ProjectTile';


export default function Projects({ allProjectsData }) {
    return (
      <div>
        <h1>Projects</h1>
        <Container>{allProjectsData.map(ProjectTile)}</Container>
      </div>
    );
}

/*
export async function getStaticPaths() {
    const allProjectpagesData = await getProjectpageData();
    const paths = createPaths(allProjectpagesData.pages);
    return {
      paths,
      fallback: false, // See the "fallback" section below
    };
  }*/
  
export async function getStaticProps() {
    const allProjectsData = getSortedProjectsData();

    return {
        props: {
        allProjectsData,
        },
    };
}
  

Projects.propTypes = {
    allProjectpagesData: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        abstract: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
      })
    ),
};
