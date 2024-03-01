import {Fragment, createElement, useEffect, useState} from 'react'
import * as prod from 'react/jsx-runtime'

import rehypeHighlight from 'rehype-highlight'
import rehypeMathJaxSvg from 'rehype-mathjax'
import rehypeReact from 'rehype-react'

import remarkMath from 'remark-math'
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype'
import remarkGfm from 'remark-gfm'
import frontmatter from 'remark-frontmatter'
import parseFrontmatter from 'remark-parse-yaml'

import {unified} from 'unified'


// @ts-expect-error: the react types are missing.
const production = {Fragment: prod.Fragment, jsx: prod.jsx, jsxs: prod.jsxs}


/**
 * @param {string} text
 * @returns {JSX.Element}
 */
export function useProcessor(text) {
  const [Content, setContent] = useState(createElement(Fragment))
  const [Attributes, setAttributes] = useState({})

  useEffect(
    function () {
      ;(async function () {
        const file = await unified()
          .use(remarkParse)
          .use(frontmatter)
          .use(parseFrontmatter)
          .use(function () { return function (tree) { 
            if (tree.children && tree.children[0] && tree.children[0].type === 'yaml') {
              setAttributes(YAML2JSON(tree.children[0].value))
            }
          } })
          .use(remarkMath)
          .use(remarkGfm)
          .use(remarkRehype)
          .use(rehypeMathJaxSvg) // transform text in math html classes
          .use(rehypeHighlight) // highlight code tag
          .use(rehypeReact, production)
          .process(text)

        setContent(file.result)
      })()
    },
    [text]
  )

  return [Content, Attributes]
}


function YAML2JSON(yaml) {
  return JSON.parse(
    JSON.stringify(
      yaml
        .split('\n')
        .map((line) => line.split(':'))
        .reduce((acc, [key, value]) => ({...acc, [key]: value}), {})
    )
  )
}


/*
export default function PrintMarkdown({text}) {
  console.log(text)
  return useProcessor(text)
}*/