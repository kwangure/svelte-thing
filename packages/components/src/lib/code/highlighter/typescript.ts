import { highlight } from '../highlight.js';
import { parser } from '@lezer/javascript';

const tsParser = parser.configure({ dialect: 'ts jsx' });
export const typescript = highlight.bind(null, tsParser);
