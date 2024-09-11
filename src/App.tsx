import './App.css';
import React, { useState } from 'react';

function App() {
  const jsonData = {
    forms: {
      type: 'form',
      fields: [
        { name: 'field1', type: 'text', label: 'Field 1' },
        { name: 'field1', type: 'text', label: 'Field 1' },
        { name: 'field1', type: 'text', label: 'Field 1' },
        { name: 'field1', type: 'text', label: 'Field 1' },
        { name: 'field1', type: 'text', label: 'Field 1' },
        { name: 'field1', type: 'text', label: 'Field 1' },
        { name: 'field1', type: 'text', label: 'Field 1' },
        { name: 'field2', type: 'textarea', label: 'Field 2' },
        { name: 'field2', type: 'textarea', label: 'Field 2' },
        { name: 'field2', type: 'textarea', label: 'Field 2' },
        { name: 'field3', type: 'select', label: 'Field 3', options: ['Option 1', 'Option 2', 'Option 3'] },
        { name: 'field4', type: 'checkbox', label: 'Field 4' },
        { name: 'field5', type: 'radio', label: 'Field 5', options: ['Yes', 'No'] },
        { name: 'field5', type: 'radio', label: 'Field 5', options: ['Yes', 'No'] },
        { name: 'field5', type: 'radio', label: 'Field 5', options: ['Yes', 'No'] },
      ],
    },
  };

  const [formValues, setFormValues] = useState({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    const checked = (e.target as HTMLInputElement).type === 'checkbox' ? (e.target as HTMLInputElement).checked : false;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const renderInputField = (field: any) => {
    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            name={field.name}
            value={formValues[field.name as keyof typeof formValues] || ''}
            onChange={handleInputChange}
          />
        );
      case 'select':
        return (
          <select
            name={field.name}
            value={formValues[field.name as keyof typeof formValues] || ''}
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            {field.options.map((option: string, index: number) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case 'checkbox':
        return (
          <input
            type="checkbox"
            name={field.name}
            checked={formValues[field.name as keyof typeof formValues] || false}
            onChange={handleInputChange}
          />
        );
      case 'radio':
        return field.options.map((option: string, index: number) => (
          <label key={index}>
            <input
              type="radio"
              name={field.name}
              value={option}
              checked={formValues[field.name as keyof typeof formValues] === option}
              onChange={handleInputChange}
            />
            {option}
          </label>
        ));
      default:
        return (
          <input
            type={field.type}
            name={field.name}
            value={formValues[field.name as keyof typeof formValues] || ''}
            onChange={handleInputChange}
          />
        );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {jsonData.forms.fields.map((field, index) => (
          <div key={index}>
            <label>{field.label}</label>
            {renderInputField(field)}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
