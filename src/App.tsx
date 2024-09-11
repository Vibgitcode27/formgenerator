import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [formData, setFormData] = useState<any>(null);
  const [formValues, setFormValues] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/formdata'); 
        const data = await response.json();
        setFormData(data.forms);
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : false;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formValues);
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

  if (!formData) {
    return <div>Loading form data...</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {formData.fields.map((field: any, index: number) => (
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
