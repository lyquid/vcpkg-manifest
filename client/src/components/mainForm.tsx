import React from "react";
import { useReducer, useState } from 'react';
import 'bootstrap';

interface VCPKGManifest {
  name: string,
  version: string,
  dependencies: string[]
};

const initialState: VCPKGManifest = {
  name: '',
  version: '',
  dependencies: []
};

const formReducer = (state: VCPKGManifest, action: any) => {
  // if (event.reset) {
  //   return {
  //     apple: '',
  //     count: 0,
  //     name: '',
  //     'gift-warp': false
  //   };
  // }
  return {
    ...state,
    [action.name]: action.value
  }
}

function MainForm(): JSX.Element {
  const contentType = "text/plain";
  const fileName = "vcpkg.json";
  const [formData, setFormData] = useReducer(formReducer, initialState);
  const [generating, setGenerating] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>): void => {
    // The value for a checkbox will always be "on", regardless of
    // whether the item is checked or not. Instead of using the event’s value,
    // you’ll need to use the checked property.
    const isCheckbox = event.target.type === 'checkbox';
    setFormData({
      name: event.target.name,
      value: isCheckbox ? (event.target as HTMLInputElement).checked : event.target.value
    });
  }

  const generateJSON = (): void => {
    // disable fields
    setGenerating(true);
    // create file
    const content = JSON.stringify(formData, null, 2);
    const a = document.createElement("a");
		const file = new Blob([content], { type: contentType });
    // download
		a.href = URL.createObjectURL(file);
		a.download = fileName;
		a.click();
    // re-enable fields after x time
    setTimeout(() => { setGenerating(false); }, 1000);
  }

  return(
    <form className="row g-3">
      <fieldset disabled={generating}>
        {generating && <div className="alert alert-primary" role="alert">Generating...</div>}

        <div className="col-md-6">
          <label className="form-label">App name:</label>
          <input name="name" className="form-control" onChange={handleChange} value={formData.name}/>
        </div>

        <div className="col-md-6">
          <label className="form-label">Version:</label>
          <input name="version" className="form-control" onChange={handleChange} value={formData.version}/>
        </div>

        <div className="col-12">
          <label className="form-label">Dependencies:</label>
          <select name="dependencies" className="form-select" onChange={handleChange} value={formData.dependencies}>
            <option value="">--Please choose an option--</option>
            <option value="fuji">Fuji</option>
            <option value="mori">Mori</option>
            <option value="honey-crisp">Honey Crisp</option>
          </select>
        </div>

        <div className="col-12">
          <button className="btn btn-primary" onClick={generateJSON}>Generate vcpkg.json</button>
          {/* <button className="btn btn-danger" onClick={generateJSON}>Clear fields</button> */}
        </div>

      </fieldset>
    </form>
  );
}

export default MainForm;
