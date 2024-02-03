import { parser } from '@fig/lezer-bash';
import { highlight } from '../highlight.js';

export const bash = highlight.bind(null, parser);
