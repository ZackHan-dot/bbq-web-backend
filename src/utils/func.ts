import { parse, ParseOptions } from 'query-string';
export function parseSearch(
  str: string,
  options?: {
    parseBooleans: true;
  } & ParseOptions,
) {
  return str.startsWith('?') ? parse(str.slice(1)) : parse(str, options);
}
