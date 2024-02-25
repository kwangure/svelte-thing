import { highlight } from '../highlight.js';
import { parser } from '@lezer/javascript';

const jsParser = parser.configure({ dialect: 'jsx' });
export const javascript = highlight.bind(null, jsParser);
