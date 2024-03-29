import * as React from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import axios from "axios";
import './Style.css'

// const sampleData = {
//     img: "COCO_train2014_000000401144.jpg",
//     question: "Where is the cat looking a keyboard?",
//     answers: [
//         "on table",
//         "left side",
//         "on desk"
//     ]
// }

export default function Annotator() {

    const [annotationData, setAnnotationData] = React.useState({
        is_present: false,
        annotation_data: {
            _id: "",
            answer_type: "",
            answers: [],
            binary_label: "",
            grounding_labels: [],
            height: 0,
            image_id: "",
            question: "",
            question_id: "",
            width: 0,
            image_filename: "",
            image_encoded: "",
            file_name: ""
        }
    }); 
    const [formData, setformData] = React.useState({
        object_lookup: "",
        ref_exp: "",
        noun_chunks: "",
        ambiguous_question: "No",
        notes: ""
    });

    function handleAnnotationData(data) {
        if(data.is_present === false) {
            setAnnotationData({
                is_present: false,
                annotation_data: {
                    _id: "",
                    answer_type: "",
                    answers: [],
                    binary_label: "",
                    grounding_labels: [],
                    height: 0,
                    image_id: "",
                    question: "",
                    question_id: "",
                    width: 0,
                    image_filename: "",
                    image_encoded: "",
                    file_name: ""
                }
            })
        } else {
            setAnnotationData(data);
        }
    } 


    function handleNext() {
        fetch("/next")
            .then((res) => res.json())
            .then((data) => handleAnnotationData(data));
        setformData({
            object_lookup: "",
            ref_exp: "",
            noun_chunks: "",
            ambiguous_question: "No",
            notes: ""
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        const reqBody = {
            ...annotationData.annotation_data,
            ...formData
        }
        reqBody.noun_chunks = reqBody.noun_chunks.split("\n");
        axios.post("/submit", reqBody)
            .then((res) => handleAnnotationData(res.data));
        setformData({
            object_lookup: "",
            ref_exp: "",
            noun_chunks: "",
            ambiguous_question: "No",
            notes: ""
        })
    }
    
    function handleFormChange(event) {
        const {name, value} = event.target;
        setformData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }

    React.useEffect(() => {
        handleNext();
    }, []);
 
    var imageFilename = annotationData.annotation_data.image_filename
    var imgURL = "/get-image/" +  (imageFilename? imageFilename: "logo.jpg");
    console.log(annotationData)
    return (
      <div hidden={annotationData.is_present !== true}>
        <Stack 
            direction="row" 
            spacing={2} 
            justifyContent="center" 
            alignItems="center"
        >
          <Container> 
            <img 
                src={imgURL} 
                alt="VQA data" 
                style={{
                    maxWidth: '500px',
                    maxHeight: '500px'
                }}
            />
          </Container>
          <Container>
            <Stack spacing={2} >
                <TextField 
                    label="Question" 
                    variant="outlined" 
                    value={annotationData.annotation_data.question} 
                    InputProps={{ readOnly: true }}
                />
                <TextField 
                    label="Answers" 
                    variant="outlined" 
                    value={annotationData.annotation_data.answers.join(", ")} 
                    InputProps={{ readOnly: true }}
                />
            </Stack>
          </Container>
        </Stack>
        <div
            className='annotation-form-container'
            >
            <FormControl>
                <TextField 
                    required 
                    variant="outlined" 
                    label="Which object are we looking for?" 
                    name="object_lookup" 
                    value={formData.object_lookup}
                    onChange={handleFormChange}
                    style = {{width: 500}}
                    margin='dense'

                />
                <TextField 
                    required 
                    variant="outlined" 
                    label="Referring expression?" 
                    name="ref_exp"
                    value={formData.ref_exp}
                    onChange={handleFormChange}
                    margin='dense'
                />
                <TextField 
                    label="Noun chunks" 
                    multiline rows={4} 
                    name="noun_chunks"
                    value={formData.noun_chunks}
                    onChange={handleFormChange}
                    margin='dense'
                />
                <FormLabel id="ambiguous-question">Is the question ambiguous?</FormLabel>
                <RadioGroup
                    aria-labelledby="ambiguous-question"
                    name="ambiguous_question"
                    value={formData.ambiguous_question}
                    onChange={handleFormChange}
                >
                    <FormControlLabel 
                        value="Yes" 
                        control={<Radio />} 
                        label="Yes" 
                    />
                    <FormControlLabel 
                        value="No" 
                        control={<Radio />} 
                        label="No" 
                    />
                </RadioGroup>
                <TextField 
                    variant="outlined" 
                    label="Notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleFormChange}
                    margin='dense'
                />
                <Stack
                    direction="row" 
                    spacing={2} 
                >
                    <Button 
                        variant="outlined"
                        onClick={handleNext}>Next
                    </Button>
                    <Button 
                        variant="contained"
                        onClick={handleSubmit}>Submit
                    </Button>
                </Stack>
            </FormControl>
        </div>

      </div>
    );
  }