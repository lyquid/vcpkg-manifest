export type Dependency = {
  library: string,
  version: string
};

export function compareDependencies(a: Dependency, b: Dependency) {
  if (a.library.toLocaleLowerCase() < b.library.toLocaleLowerCase()) return -1;
  if (a.library.toLocaleLowerCase() > b.library.toLocaleLowerCase()) return 1;
  return 0;
}

export type VCPKGManifest = {
  name:             string,
  version:          string,
  description?:     string,
  dependencies:     Dependency[],
  builtinBaseline?: string
};
