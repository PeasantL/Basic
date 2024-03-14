import React, { useEffect, useState } from 'react';
import { Container, Image} from 'react-bootstrap';
import { TextForm } from './components/form';


export default function App () {

  const [textValues, setTextValues] = useState({
    name: "",
    description: "",
    personality: "",
    first_mes: "",
    mes_example: "",
    scenario: "",
    creator_notes: "",
    system_prompt: "",
    post_history_instructions: "",
    creator: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target; // Destructure name and value from event.target
    setTextValues({
      ...textValues,
      [name]: value // Use computed property name to update the right part of the state
    });
  };

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(jsonObject => {
        setData(jsonObject)
        setTextValues(prevValues => ({
          ...prevValues,
          ...Object.keys(prevValues).reduce((acc, key) => {
            if (jsonObject.data.hasOwnProperty(key)) {
              acc[key] = jsonObject.data[key];
            }
            return acc;
        }, {})
      }));
    })
    .catch(error => console.error('There was a problem with the fetch operation', error));
  }, []);


  return (
    <div class= "mt-3 mb-3">
      <Container> 
        <div class= "mb-5">
          <Image src="main_awkward-questions-fm_spec_v2.png" fluid alt="Image" className="img-fluid mx-auto d-block" rounded/>
        </div>
          <TextForm textValues={textValues} handleChange={handleChange} />
      </Container>
      <Container>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Container>
    </div>
  );
};

