import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const ProjectsDirectory = path.join(process.cwd(), 'projects');

export default function getSortedProjectsData() {
  const fileNames = fs.readdirSync(ProjectsDirectory);
  const allProjectsData = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '');

    const fullPath = path.join(ProjectsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
      desc: matterResult.content,
    };
  });

  return allProjectsData.sort((a, b) => {
    // split on -
    const aDate = a.date.split('-');
    const bDate = b.date.split('-');
    // compare years
    if (aDate[2] < bDate[2]) {
      return 1;
    } else if (aDate[2] > bDate[2]) {
      return -1;
    }
    // compare months
    if (aDate[1] < bDate[1]) {
      return 1;
    } else if (aDate[1] > bDate[1]) {
      return -1;
    }
    // compare days
    // check size of day
    if (aDate[0].length === 1) {
      aDate[0] = `0${aDate[0]}`;
    }
    if (bDate[0].length === 1) {
      bDate[0] = `0${bDate[0]}`;
    }
    if (aDate[0] < bDate[0]) {
      return 1;
    } else{
      return -1;
    }
  });
}
