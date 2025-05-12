export type Rule = {
  required: () => Rule;
  min: (min: number | string) => Rule;
  max: (max: number | string) => Rule;
  length: (exactLength: number) => Rule;
  greaterThan: (gt: number) => Rule;
  integer: () => Rule;
  precision: (limit: number) => Rule;
  custom: <T>(fn: (value: T) => true | string) => Rule;
  warning: (message?: string) => Rule;
  error: (message?: string) => Rule;
  optional: () => Rule;
  regex: (pattern: RegExp, options?: {name?: string, invert?: boolean}) => Rule;
  uri: (options?: {scheme?: string[]}) => Rule;
  unique: () => Rule;
  valueOfField: (field: string) => unknown;
}; 