export type Dependency = {
  name:         string,
  version:      string,
  description?: string,
  website?:     string
};

export function compareDependencies(a: Dependency, b: Dependency) {
  if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) return -1;
  if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) return 1;
  return 0;
}

export type VCPKGManifest = {
  name:             string,
  version:          string,
  description?:     string,
  dependencies?:    Dependency[],
  builtinBaseline?: string
};
