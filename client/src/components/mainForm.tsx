import React from "react";
import { useReducer, useState } from 'react';
import 'bootstrap';

// https://www.digitalocean.com/community/tutorials/how-to-build-forms-in-react

const formReducer = (state: any, event: any) => {
  if (event.reset) {
    return {
      apple: '',
      count: 0,
      appName: '',
      'gift-warp': false
    };
  }
  return {
    ...state,
    [event.name]: event.value
  }
}

function MainForm(): JSX.Element {
  const [formData, setFormData] = useReducer(formReducer, {count: 100});
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
      setFormData({reset: true});
    }, 2000);
  }

  return(
    <form onSubmit={handleSubmit}>
      <fieldset disabled={submitting}>
        {submitting &&
        <div className="alert alert-primary" role="alert">
          Submitting...
          <ul>
            {Object.entries(formData).map(([name, value]: any) => (
              <li key={name}><strong>{name}</strong>: {value.toString()}</li>
            ))}
          </ul>
        </div>}
        <div className="mb-3">
          <label className="form-label">App name:</label>
          <input name="appName" className="form-control" onChange={handleChange} value={formData.appName || ''}/>

          <label className="form-label">Apples</label>
          <select name="apple" className="form-select" onChange={handleChange} value={formData.apple || ''}>
            <option value="">--Please choose an option--</option>
            <option value="fuji">Fuji</option>
            <option value="mori">Mori</option>
            <option value="honey-crisp">Honey Crisp</option>
          </select>

          <label className="form-label">Count</label>
          <input type="number" name="count" className="form-control" onChange={handleChange} value={formData.count || ''} step="1"/>

          <label className="form-check-label">Gift Wrap</label>
          <input type="checkbox" name="gift-wrap" className="form-check" onChange={handleChange} checked={formData['gift-wrap'] || false} disabled={formData.apple !== 'fuji'}/>

          <button type="submit" className="btn btn-primary">Send</button>
        </div>
      </fieldset>
    </form>
  );
}

export default MainForm;
