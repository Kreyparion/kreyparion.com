import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const ProjectsDirectory = path.join(process.cwd(), 'public/projects');

export default function getSortedProjectsData() {

    const dirNames = fs.readdirSync(ProjectsDirectory);

    const allProjectsData = dirNames.map(dirName => {
        const id = dirName;
        const fileName = `${id}.md`;

        const fullPath = path.join(ProjectsDirectory, dirName, fileName);
        console.log(fullPath);
        if (!fs.existsSync(fullPath)) {
            return {};
        }
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        const matterResult = matter(fileContents);

        
        let abstract = "";
        let content = matterResult.content;
        // if "## Abstract" is in the content, split the content into abstract and content
        let abstract_word = "## Abstract";
        let abstract_word_possibilities = ["## Abstract", "## abstract", "# Abstract", "# abstract", "### Abstract", "### abstract", "#### Abstract", "#### abstract", "##### Abstract", "##### abstract", "###### Abstract", "###### abstract"];
        for (let i = 0; i < abstract_word_possibilities.length; i++) {
        if (content.includes(abstract_word_possibilities[i])) {
            abstract_word = abstract_word_possibilities[i];
            break;
        }
        }
        if (content.includes(abstract_word)) {
            const splitContent = content.split(abstract_word);
            // find first \n
            let i = 0;
            while (splitContent[1][i] !== "\n") {
            i++;
            }
            i++;

            // find first #
            let j = i;
            while (splitContent[1][j] !== "#") {
            j++;
            }
            content = splitContent[1].substring(j);
            // erase last spaces and new lines
            while (splitContent[1][j] === " " || splitContent[1][j] === "\n" || splitContent[1][j] === "\r" || splitContent[1][j] === "\t") {
            j--;
            }
            abstract = splitContent[1].substring(i, j);
        }

        return {
            id,
            ...matterResult.data,
            abstract,
            content,
        };
    })
    // filter out empty objects
    .filter(obj => Object.keys(obj).length !== 0);

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
