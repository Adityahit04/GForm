import "./formRender.css";
import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  
  Grid,
  Radio,
  RadioGroup,
  Checkbox,
  FormGroup,
  TextField,
  Button,
} from "@material-ui/core";

function FormRenderer({ formData, id, setShowResponse }) {
  const [formResponses, setFormResponses] = useState([]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    const responsesWithMeta = formResponses.map((response, index) => {
      const question = formData.filter((form) => form.id === id)[0].questions[
        index
      ];
      return {
        questionText: question.questionText,
        answerType: question.answerType,
        formId: id,
        response,
      };
    });
    console.log(responsesWithMeta);
  };

  let filteredData = formData.filter((form) => form.id === id);
  filteredData = filteredData[0];

  const handleResponseChange = (questionIndex, e) => {
    const updatedResponses = [...formResponses];
    updatedResponses[questionIndex] = e.target.value;
    setFormResponses(updatedResponses);
  };

  const renderFormFields = () => {
    return (
      <FormControl component="fieldset">
        <FormGroup>
          <h2>{filteredData.title}</h2>
          {filteredData.questions?.map((question, index) => (
            <Grid container key={index} spacing={2}>
              <div className="question-box">
                <Grid item xs={12}>
                  <p className="question-text">
                    {index + 1}.{question.questionText}
                  </p>
                </Grid>
                <Grid item xs={12}>
                  {question.answerType === "input" && (
                    <TextField
                      type="text"
                      fullWidth
                      className="questions"
                      value={formResponses[index] || ""}
                      onChange={(e) => handleResponseChange(index, e)}
                    />
                  )}
                  {question.answerType === "radio" && (
                    <RadioGroup
                      aria-label={`radio-${index}`}
                      name={`radio-${index}`}
                      value={formResponses[index] || ""}
                      onChange={(e) => handleResponseChange(index, e)}
                    >
                      {question.options.map((option, optionIndex) => (
                        <FormControlLabel
                          key={optionIndex}
                          value={option}
                          control={<Radio />}
                          label={option}
                        />
                      ))}
                    </RadioGroup>
                  )}
                  {question.answerType === "checkbox" && (
                    <FormGroup>
                      {question.options.map((option, optionIndex) => (
                        <FormControlLabel
                          key={optionIndex}
                          control={
                            <Checkbox
                              checked={
                                formResponses[index]?.includes(option) || false
                              }
                              onChange={(e) => handleResponseChange(index, e)}
                              name={`checkbox-${index}`}
                              value={option}
                            />
                          }
                          label={option}
                        />
                      ))}
                    </FormGroup>
                  )}
                </Grid>
              </div>
            </Grid>
          ))}
          <div className="button-container">
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => setShowResponse(false)}
            >
              Back
            </Button>
          </div>
        </FormGroup>
      </FormControl>
    );
  };

  return <form onSubmit={handleFormSubmit}>{renderFormFields()}</form>;
}

export default FormRenderer;
