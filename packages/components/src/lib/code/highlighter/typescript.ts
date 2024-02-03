import { highlight } from '../highlight.js';
import { parser as jsParser } from '@lezer/javascript';

const tsParser = jsParser.configure({ dialect: 'ts' });
export const typescript = highlight.bind(null, tsParser);
