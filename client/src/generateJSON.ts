import { compareDependencies, Dependency, VCPKGManifest } from './types'

export default function generateJSON(formData: VCPKGManifest) {
  const contentType = "text/plain";
  // sort and manipulate the data to match vcpkg.json format
  const data: VCPKGManifest = JSON.parse(JSON.stringify(formData)); // deep copy, no changes to the form
  const dependencies: string[] = [];
  for (const dependency of (data.dependencies as Dependency[]).sort(compareDependencies)) {
    dependencies.push(dependency.name.toLowerCase());
  }
  const finalData = {
    $schema:            'https://raw.githubusercontent.com/microsoft/vcpkg/master/scripts/vcpkg.schema.json',
    name:               data.name,
    'version-string':   data.version,
    description:        data.description,
    dependencies:       dependencies,
    'builtin-baseline': data.builtinBaseline
  };
  // create & return file
  return new Blob([JSON.stringify(finalData, null, 2)], { type: contentType });
}
