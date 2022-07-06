import React from "react";
import { useReducer, useState } from 'react';
import 'bootstrap';

interface FormState {
  appName: string,
  version: string,
  dependencies: string[]
};

const initialState: FormState = {
  appName: '',
  version: '',
  dependencies: []
};

const formReducer = (state: FormState, action: any) => {
  // if (event.reset) {
  //   return {
  //     apple: '',
  //     count: 0,
  //     appName: '',
  //     'gift-warp': false
  //   };
  // }
  return {
    ...state,
    [action.name]: action.value
  }
}

function MainForm(): JSX.Element {
  const [formData, setFormData] = useReducer(formReducer, initialState);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>): void => {
    // The value for the gift wrapping checkbox will always be "on", regardless of
    // whether the item is checked or not. Instead of using the event’s value,
    // you’ll need to use the checked property.
    const isCheckbox = event.target.type === 'checkbox';
    setFormData({
      name: event.target.name,
      value: isCheckbox ? (event.target as HTMLInputElement).checked : event.target.value
    });
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      // setFormData({reset: true});
    }, 2000);
  }

  return(
    <form className="row g-3" onSubmit={handleSubmit}>
      <fieldset disabled={submitting}>
        {submitting &&
        <div className="alert alert-primary" role="alert">
          Submitting...
          <ul>
            {Object.entries(formData).map(([name, value]): JSX.Element => (
              <li key={name}><strong>{name}</strong>: {value.toString()}</li>
            ))}
          </ul>
        </div>}

        <div className="col-md-6">
          <label className="form-label">App name:</label>
          <input name="appName" className="form-control" onChange={handleChange} value={formData.appName}/>
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
          <button type="submit" className="btn btn-primary">Send</button>
        </div>
          {/* <label className="form-label">Count</label>
          <input type="number" name="count" className="form-control" onChange={handleChange} value={formData.count || ''} step="1"/>

          <label className="form-check-label">Gift Wrap</label>
          <input type="checkbox" name="gift-wrap" className="form-check" onChange={handleChange} checked={formData['gift-wrap'] || false} disabled={formData.apple !== 'fuji'}/> */}
      </fieldset>
    </form>
  );
}

export default MainForm;
