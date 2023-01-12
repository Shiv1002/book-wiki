import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import axios from 'axios'
import urls from './BaseUrls'
import Col from 'react-bootstrap/Col'
import Alert from '@mui/material/Alert';
import Button from 'react-bootstrap/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function AddBook() {
    const initValue = { Name: "", Author: "", Pubisher: "", Description: "", Genre: "" }
    const [frm, setForm] = useState(initValue);
    const [Img, setImage] = useState();
    const [genre, setGenre] = useState([])
    const [validated, setValidation] = useState(false)
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        axios.get(urls.books)
            .then(res => { setGenre(res.data.genre); console.log("Number of books found", res.data.bookList.length + 1) }).catch(e => console.log(e))
    }, [])

    useEffect(() => { console.log("Updated values", frm) }, [frm])



    const HandlEvent = (e) => {
        setForm({ ...frm, [e.target.name]: e.target.value });
    }


    const handleSubmit = async (event) => {

        const form = event.currentTarget;
        // console.log(event.target)
        // handlesubmit is connected to FORM with target
        // form target checkvalidity return boolean value true if all fields are correct
        
        event.preventDefault();
        event.stopPropagation();
        setValidation(true)
        if (form.checkValidity() === true) {

            let formData = new FormData();
            for (var i in frm) {
                console.log(i, frm[i]);
                formData.append(i, frm[i]);
            }

            //handle genre expxeption
            if (frm['Genre'] === "") {
                event.preventDefault();
                event.stopPropagation();
                alert("Select Genre")
                return
            }

            if (Img !== undefined) {
                formData.append('Image', Img, Img.Name)
            }
            let data = Object.fromEntries(formData);
            console.log((data))
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            console.log("Data being sent", data);
            await axios.post(urls.books, data, config)
            .then(res => { 
                console.log(res); 
                setOpen(true);
                setForm(initValue) 
                setImage()
                setValidation(false)
                
            })
            .catch(err => console.log(err))


        }
       
    };

    const handleImg = e => {
        setImage(e.target.files[0])
        console.log(e.target.files[0])
    }
    const handleClose = (event) => {
        setOpen(false)
    }

    return (
        <div className='m-2 p-4'>
            <Card className='col-md-6 col-sm-8 col-xs-8 mx-auto'>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        This is a success message!
                    </Alert>
                </Snackbar>
                <Card.Title className="my-2 mx-2" style={{ fontSize: "xx-large" }}>Enter Details of the Book</Card.Title>
                <Card.Subtitle className="mb-2 mx-3 text-muted ">Be Careful While Entering Details!</Card.Subtitle>
                <Card.Body>
                    <Form autoComplete='off' noValidate encType='multipart/form-data' validated={validated} onSubmit={handleSubmit}  >

                        <Form.Group as={Col} className="mb-3" controlId="validationCustom01">
                            <Form.Label>Enter Name of the Book</Form.Label>
                            <Form.Control name="Name" type="text" placeholder="Name" value={frm.Name} required onChange={HandlEvent} />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="text" >
                            <Form.Label required>Author</Form.Label>
                            <Form.Control required name="Author" type="text" placeholder="Authors Name" value={frm.Author} onChange={HandlEvent} />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="text">
                            <Form.Label>Published By</Form.Label>
                            <Form.Control name="Pubisher" type="text" required placeholder="Publisher Name" value={frm.Pubisher} onChange={HandlEvent} />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="text">
                            <Form.Label>Choose Genre of the book</Form.Label>
                            <Form.Select name="Genre" aria-label="Default select example" style={{ width: "12rem" }} onChange={HandlEvent} defaultValue={frm.Genre}>
                                <option value="Genre" disabled >Genre</option>
                                {
                                    (genre.map((ele) => {
                                        return (<option value={ele} required key={ele}>{ele}</option>)
                                    }))
                                }

                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="text">
                            <Form.Label>Discription</Form.Label>
                            <Form.Control as="textarea" placeholder="" required name="Description" value={frm.Description} onChange={HandlEvent} />
                        </Form.Group>

                        <Form.Group controlId="formFile" className="mb-3" style={{ width: "16rem" }}>
                            <Form.Label>Choose Image of the Book</Form.Label>
                            <Form.Control type="file" name="Image" accept='image/*' required onChange={handleImg} />
                        </Form.Group>
                        <Button type="submit">Submit form</Button>
                    </Form>
                </Card.Body>

            </Card>


        </div>
    )
}

export default AddBook