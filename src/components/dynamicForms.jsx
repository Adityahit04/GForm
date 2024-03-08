import React, { useEffect, useState } from "react";
import FormRenderer from "./formRender";
import { useParams } from "react-router-dom";

import { v4 as uuid } from "uuid";
import {
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  makeStyles,
} from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import FileCopyIcon from '@mui/icons-material/FileCopy';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: "#f5f5f5",
    borderRadius: theme.spacing(1),
    width: "50vw",
    margin: "auto",
    marginTop: "1rem",
  },
  questionContainer: {
    marginBottom: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    border: "2px solid blue",
    padding: "2rem",
  },
  questionTop: {
    display: "flex",
    gap: ".5rem",
  },
  optionContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  addButton: {
    marginLeft: theme.spacing(2),
    width: "50%",
    marginBottom: "10px",
    marginTop: "10px",
  },
  deleteButton: {
    marginLeft: theme.spacing(2),
  },
}));

function FormBuilder() {
  const [showResponse, setShowResponse] = useState(false);
  const [title, setTitle] = useState("");
  const param = useParams();
  const classes = useStyles();
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [forms, setForms] = useState([
    {
      title: title,
      id: param.id,
      questions: [
        {
          id: uuid(),
          questionText: "",
          answerType: "",
          options: [],
        },
      ],
    },
  ]);

  useEffect(() => {
    localStorage.setItem("forms", forms);
  }, [forms]);

  const handleQuestionTextChange = (formId, questionId, value) => {
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formId
          ? {
              ...form,
              questions: form.questions.map((question) =>
                question.id === questionId
                  ? { ...question, questionText: value }
                  : question
              ),
            }
          : form
      )
    );
  };

  const handleAnswerTypeChange = (formId, questionId, value) => {
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formId
          ? {
              ...form,
              questions: form.questions.map((question) =>
                question.id === questionId
                  ? { ...question, answerType: value, options: [] }
                  : question
              ),
            }
          : form
      )
    );
  };

  const handleOptionChange = (formId, questionId, optionIndex, value) => {
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formId
          ? {
              ...form,
              questions: form.questions.map((question) =>
                question.id === questionId
                  ? {
                      ...question,
                      options: question.options.map((option, index) =>
                        index === optionIndex ? value : option
                      ),
                    }
                  : question
              ),
            }
          : form
      )
    );
  };

  const handleAddOption = (formId, questionId) => {
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formId
          ? {
              ...form,
              questions: form.questions.map((question) =>
                question.id === questionId
                  ? { ...question, options: [...question.options, "option"] }
                  : question
              ),
            }
          : form
      )
    );
  };

  const handleAddQuestion = (formId) => {
    const newQuestion = {
      id: uuid(),
      questionText: "question ",
      answerType: "",
      options: [],
    };
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formId
          ? { ...form, questions: [...form.questions, newQuestion] }
          : form
      )
    );
  };

  const handleDeleteQuestion = (formId, questionId) => {
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formId
          ? {
              ...form,
              questions: form.questions.filter((q) => q.id !== questionId),
            }
          : form
      )
    );
  };

  const handleCopyQuestion = (formId, questionId) => {
    const copiedQuestion = {
      ...forms
        .find((form) => form.id === formId)
        .questions.find((q) => q.id === questionId),
    };
    copiedQuestion.id = uuid();
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formId
          ? { ...form, questions: [...form.questions, copiedQuestion] }
          : form
      )
    );
  };

  const handleSaveForm = () => {
    // Perform your save logic here
    console.log(forms);
    setShowSaveButton(true);
  };

  const handleOpenForm = () => {
    setShowResponse(true);
  };

  return (
    <div>
      <div className="button-container">
        {!showResponse && (
          <Button variant="contained" color="primary" onClick={handleSaveForm}>
            Save Form
          </Button>
        )}
        {!showResponse && showSaveButton && (
          <Button variant="contained" color="primary" onClick={handleOpenForm}>
            open
          </Button>
        )}
      </div>
      {!showResponse &&
        forms.map((form) => (
          <div key={form.id} className={classes.formContainer}>
            {/* <Typography variant="h6">Form {form.id}</Typography> */}
            <input
              className="question-form-top-name"
              type="text"
              placeholder="untited form"
              onChange={(e) => setTitle(e.target.value)}
            />
            {form.questions.map((question) => (
              <div key={question.id} className={classes.questionContainer}>
                <div className={classes.questionTop}>
                  <TextField
                    label="Question Text"
                    value={question.questionText}
                    onChange={(e) =>
                      handleQuestionTextChange(
                        form.id,
                        question.id,
                        e.target.value
                      )
                    }
                    fullWidth
                  />
                  <FormControl fullWidth>
                    <InputLabel id={`answer-type-label-${question.id}`}>
                      Answer Type
                    </InputLabel>
                    <Select
                      labelId={`answer-type-label-${question.id}`}
                      value={question.answerType}
                      onChange={(e) =>
                        handleAnswerTypeChange(
                          form.id,
                          question.id,
                          e.target.value
                        )
                      }
                    >
                      <MenuItem value="">Select</MenuItem>
                      <MenuItem value="input">Input</MenuItem>
                      <MenuItem value="checkbox">Checkbox</MenuItem>
                      <MenuItem value="radio">Radio</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                {question.answerType === "checkbox" && (
                  <>
                    <Typography variant="subtitle2"></Typography>
                    {question.options.map((option, index) => (
                      <div key={index} className={classes.optionContainer}>
                        <TextField
                          label={`Option ${index + 1}`}
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(
                              form.id,
                              question.id,
                              index,
                              e.target.value
                            )
                          }
                        />
                        <Button
                          variant="outlined"
                          color="secondary"
                          size="small"
                          className={classes.deleteButton}
                          onClick={() =>
                            handleDeleteQuestion(form.id, question.id)
                          }
                          startIcon={<DeleteIcon />}
                        ></Button>
                      </div>
                    ))}
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => handleAddOption(form.id, question.id)}
                      className={classes.addButton}
                      startIcon={<AddIcon />}
                    >
                      Add Option
                    </Button>
                  </>
                )}
                {question.answerType === "radio" && (
                  <>
                    {question.options.map((option, index) => (
                      <div key={index} className={classes.optionContainer}>
                        <TextField
                          label={`Option ${index + 1}`}
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(
                              form.id,
                              question.id,
                              index,
                              e.target.value
                            )
                          }
                        />
                        <Button
                          variant="outlined"
                          color="secondary"
                          size="small"
                          className={classes.deleteButton}
                          onClick={() =>
                            handleDeleteQuestion(form.id, question.id)
                          }
                          startIcon={<DeleteIcon />}
                        ></Button>
                      </div>
                    ))}
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => handleAddOption(form.id, question.id)}
                      className={classes.addButton}
                      startIcon={<AddIcon />}
                    >
                      Add Option
                    </Button>
                  </>
                )}
                {question.answerType === "input" && (
                  <input className="short-text" type="text" disabled />
                )}
                <div>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => handleDeleteQuestion(form.id, question.id)}
                    className={classes.deleteButton}
                    startIcon={<DeleteIcon />}
                  ></Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => handleCopyQuestion(form.id, question.id)}
                    className={classes.addButton}
                    startIcon={<FileCopyIcon />}
                  ></Button>
                </div>
              </div>
            ))}
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => handleAddQuestion(form.id)}
              startIcon={<AddIcon />}
            >
              Add New Question
            </Button>
          </div>
        ))}

      {showResponse && showSaveButton && (
        <FormRenderer
          formData={forms}
          id={param.id}
          setShowResponse={setShowResponse}
        />
      )}
    </div>
  );
}

export default FormBuilder;
