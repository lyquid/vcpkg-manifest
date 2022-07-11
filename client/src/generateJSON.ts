import { compareDependencies, VCPKGManifest } from './types'

export default function generateJSON(formData: VCPKGManifest) {
  const contentType = "text/plain";
  // sort and manipulate the data to match vcpkg.json format
  const data: VCPKGManifest = JSON.parse(JSON.stringify(formData)); // deep copy, no changes to the form
  const dependencies: string[] = [];
  for (let dependency of data.dependencies.sort(compareDependencies)) {
    dependencies.push(dependency.library);
  }
  const finalData = {
    $schema:      'https://raw.githubusercontent.com/microsoft/vcpkg/master/scripts/vcpkg.schema.json',
    name:         data.name,
    version:      data.version,
    description:  data.description,
    dependencies: dependencies
  };
  // create & return file
  return new Blob([JSON.stringify(finalData, null, 2)], { type: contentType });
}
