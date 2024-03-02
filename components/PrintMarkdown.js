import PropTypes from 'prop-types';
import { createElement, Fragment, useEffect, useState } from 'react';
import { unified } from 'unified';
import rehypeReact from 'rehype-react';
import remarkParse from 'remark-parse';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeMathJaxSvg from 'rehype-mathjax';
import wikiLinkPlugin from 'remark-wiki-link-plus';
import remarkImages from 'remark-images';
import rehypeHighlight from 'rehype-highlight';
import CustomLink from './CustomLink';

import * as prod from 'react/jsx-runtime'

// @ts-expect-error: the react types are missing.
const production = {Fragment: prod.Fragment, jsx: prod.jsx, jsxs: prod.jsxs}


export default function PrintMarkdown({ text }) {
  const [Content, setContent] = useState(Fragment);

  useEffect(() => {
    unified()
      .use(remarkParse) // Parse remark
      .use(remarkMath)
      .use(wikiLinkPlugin, {
        hrefTemplate: link => link,
        pageResolver: name => [name],
      })
      .use(remarkImages)
      .use(remarkRehype)
      .use(rehypeMathJaxSvg) // transform text in math html classes
      .use(rehypeHighlight) // highlight code tag
      .use(rehypeReact, production, {
        createElement,
        Fragment,
        components: {
          a: CustomLink,
        },
      })
      /*
      .use(remarkRehype)
      .use(remark2react, {
        remarkReactComponents: {
          a: CustomLink,
        },
        createElement,
        Fragment
      })
      */
      .process(text)
      .then(file => {
        setContent(file.result);
      });
  }, [text]);
  return Content;
}

