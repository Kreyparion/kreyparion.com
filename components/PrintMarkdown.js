import PropTypes from 'prop-types';
import { createElement, Fragment, useEffect, useState } from 'react';
import { unified } from 'unified';
import rehypeRaw from 'rehype-raw';
import rehypeReact from 'rehype-react';
import rehypeSanitize from 'rehype-sanitize';
import remarkParse from 'remark-parse';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import remarkGfm from 'remark-gfm'
import rehypeMathJaxSvg from 'rehype-mathjax';
import wikiLinkPlugin from 'remark-wiki-link-plus';
import remarkImages from 'remark-images';
import rehypeHighlight from 'rehype-highlight';
import CustomLink from './CustomLink';
import * as prod from 'react/jsx-runtime'




export default function PrintMarkdown({ text }) {
  const [Content, setContent] = useState(Fragment);

  useEffect(() => {
    unified()
      // parse markdown and keep the html
      .use(remarkParse)
      .use(remarkGfm) // Parse gfm
      .use(remarkMath)
      

      .use(wikiLinkPlugin, {
        hrefTemplate: link => link,
        pageResolver: name => [name],
      })
      .use(remarkImages)
      
      .use(remarkRehype, { allowDangerousHtml: true }) // Parse rehype
      .use(rehypeRaw)
      // .use(rehypeSanitize) // Sanitize html
      // log the tree to see what's going on
      
      
      
      //.use(rehypeMathJaxSvg) // transform text in math html classes
      .use(rehypeHighlight) // highlight code tag
      .use(() => tree => {
        console.log(tree);
      })
      .use(rehypeReact, {
        createElement,
        components: {
          a: CustomLink,
          img: ({ src, alt }) => <img src={"rendu/" + src} alt={alt} />,
        },
        Fragment,
        
        jsx: prod.jsx,
        jsxs: prod.jsxs,
      })
      .process(text)
      .then(file => {
        setContent(file.result);
      });
  }, [text]);
  return Content;
}

