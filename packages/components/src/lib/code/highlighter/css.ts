import { parser } from '@lezer/css';
import { highlight } from '../highlight.js';

export const css = highlight.bind(null, parser);
