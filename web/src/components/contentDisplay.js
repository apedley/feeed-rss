import React from 'react';
import SanitizeHTML from 'sanitize-html';
import RawHtml from 'react-raw-html';

export default function ContentDisplay(props) {
  

  // const reactElement = this.htmlToReactParser.parse(content);
  const sanitized = SanitizeHTML(props.content);
  // const reactSanitizedElement = this.htmlToReactParser.parse(sanitized);
  let noTagsContent = SanitizeHTML(props.content, {
    allowedTags: [],
    allowedAttributes: []
  })

  if (!props.noTags) {
    return <RawHtml.div>{sanitized}</RawHtml.div>;
  }

  
  if (props.maxCharacters > 0) {
    noTagsContent = noTagsContent.trim().substr(1, props.maxCharacters) + ' ...';
  }
  return <RawHtml.div>{noTagsContent}</RawHtml.div>;

}