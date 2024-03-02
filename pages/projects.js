import React from 'react';
import PrintMarkdown from '../components/PrintMarkdown';
import { Container } from 'react-bootstrap';
import getSortedProjectsData from '../lib/projects';


export default function Projects({ allProjectsData }) {
    return (
      <div>
        <h1>Projects</h1>
        <ul>
          {allProjectsData.map(({ id, date, title, desc }) => (
            <li key={id}>
              {title}
              <br />
              {date}
              <br />
              <PrintMarkdown text={desc} />
            </li>
          ))}
        </ul>
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
  
/*
ProjectTree.propTypes = {
    allProjectpagesData: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
      })
    ),
};*/
