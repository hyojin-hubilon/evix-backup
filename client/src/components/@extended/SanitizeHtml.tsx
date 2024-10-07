import DOMPurify from 'dompurify';

const defaultOptions = {
	ALLOWED_TAGS: [ 'b', 'i', 'em', 'strong', 'a' ], 
	ALLOWED_ATTR: ['href']
};
  
const sanitize = (dirty, options) => ({
	__html: DOMPurify.sanitize(
		dirty, 
		{ ...defaultOptions, ...options }
	)
});
  
const SanitizeHTML = ({ html, options }) => (
	<div dangerouslySetInnerHTML={sanitize(html, options)} />
);

export default SanitizeHTML;