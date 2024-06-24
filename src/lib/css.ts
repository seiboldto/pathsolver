type Vars = Record<string, unknown>;

// https://stackoverflow.com/a/67243723
const kebabize = (str: string): string =>
  str.replace(
    /[A-Z]+(?![a-z])|[A-Z]/g,
    ($, ofs) => (ofs ? "-" : "") + $.toLowerCase()
  );

export const cssVars = (obj: Vars): Vars => {
  const vars: Vars = {};
  for (const [key, value] of Object.entries(obj)) {
    vars["--" + kebabize(key)] = value;
  }

  return vars;
};
