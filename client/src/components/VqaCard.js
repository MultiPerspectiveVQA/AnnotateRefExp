import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function VqaCard(props) {


    var imgURL = "/get-image/" +  (props.imageFilename? props.imageFilename: "logo.jpg");
    console.log(props)

    return (
    <Card sx={{ maxWidth: 500 }}>
        <CardMedia
        sx={{ height: 500 }}
        image={imgURL}
        />
        <CardContent>
        <Typography gutterBottom variant="h6" component="div">
            Question
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: 20}}>
            {props.question}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
            Answers
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: 20}}>
            {props.answers.join(", ")}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
            Which object are we looking at?
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: 20}}>
            {props.objectLookup}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
            Referring expression
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: 20}}>
            {props.refExp}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
            Noun chunks
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: 20}}>
            {props.nounChunks.join(", ")}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
            Ambiguous question
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: 20}}>
            {props.ambiguousQuestion}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
            Additional notes
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: 20}}>
            {props.notes}
        </Typography>
        </CardContent>
    </Card>
    );
}