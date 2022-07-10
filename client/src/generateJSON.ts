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
    name:         data.name,
    version:      data.version,
    dependencies: dependencies
  };
  // create & return file
  const finalDataStringified = JSON.stringify(finalData, null, 2);
  return new Blob([finalDataStringified], { type: contentType });
}
