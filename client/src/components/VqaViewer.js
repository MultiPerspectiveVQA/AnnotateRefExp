import * as React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import VqaCard from './VqaCard'
import './Style.css'


export default function VqaViewer() {

    const [vqaData, setVqaData] = React.useState({
        is_present: false,
        annotated_data: []
    }); 

    const [filter, setFilter] = React.useState("All");

    React.useEffect(() => {
        fetch("/list-annotated")
            .then((res) => res.json())
            .then((data) => setVqaData(data));
    }, []);

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };
    
    const displayVqaData = []
    const renderVqaData = () => {
        for(const vqaAnnotation of vqaData.annotated_data) {
            var include = false
            if(filter === "All") {
                include = true;
            } else if (filter === "Yes" && vqaAnnotation.ambiguous_question === "Yes") {
                include = true;
            } else if (filter === "No" && vqaAnnotation.ambiguous_question === "No") {
                include = true;
            }

            if(include) {
                displayVqaData.push(<VqaCard 
                    key={vqaAnnotation._id}
                    imageFilename={vqaAnnotation.image_filename} 
                    question={vqaAnnotation.question}
                    answers={vqaAnnotation.answers}
                    objectLookup={vqaAnnotation.object_lookup}
                    refExp={vqaAnnotation.ref_exp}
                    nounChunks={vqaAnnotation.noun_chunks}
                    ambiguousQuestion={vqaAnnotation.ambiguous_question}
                    notes={vqaAnnotation.notes}
                />);
            }
        }
    }

    if(vqaData.annotated_data.length > 0) {
        renderVqaData();
    }  

    console.log(vqaData.annotated_data[1]);
    return (
        <div>
            <Select
                value={filter}
                onChange={handleFilterChange}
                >
                    <MenuItem value={"All"}>All</MenuItem>
                    <MenuItem value={"Yes"}>Yes</MenuItem>
                    <MenuItem value={"No"}>No</MenuItem>
            </Select>
            <div className='vqa-data-container'>
                {displayVqaData}
            </div>
        </div>
        
    );
}