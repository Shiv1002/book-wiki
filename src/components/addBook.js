import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import axios from 'axios'

function AddBook() {
    const initValue = { Name: "", Author: "", Pubisher: "", Description: "", Genre: "" }
    const [frm, setForm] = useState(initValue);
    const [Img,setImage] = useState();
    
    
    
    var imgNum = 0;
    const [genre,set] = useState([])

    useEffect(() => {
        axios.get("/api/books")
            .then(res => { imgNum = res.data.bookList.length + 1;set(res.data.genre); console.log(imgNum,genre) }).catch(e => console.log(e))
            
    }, [])
    let x;
  

    const HandlEvent = (e) => {
        setForm({ ...frm, [e.target.name]: e.target.value });
        console.log(frm)
    }


    const handleSubmit = (event) => {
        const form = event.currentTarget;
        console.log(event.target)
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        
        let formData = new FormData();
        for(var i in frm){
            formData.append(i,frm[i]);
        }
        
        if (Img != undefined){
        formData.append('Image',Img,Img.Name)
          }
        let data = Object.fromEntries(formData);
        console.log((data))
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("http://localhost:3080/api/books",data,config).then(res => console.log(res))         
        event.stopPropagation()
        

    };
    const handleImg = e =>{
        setImage(e.target.files[0])
        console.log(e.target.files[0])
    }
   
    return (
        <div>
            <Card className='m-5'>
                <Card.Title className="my-2 mx-2" style={{ fontSize: "xx-large" }}>Enter Details of the Book</Card.Title>
                <Card.Subtitle className="mb-2 mx-3 text-muted ">Be Careful While Entering Details!</Card.Subtitle>
                <Card.Body>
                    <Form autoComplete='off' noValidate encType='multipart/form-data' validated={frm.validated} onSubmit={handleSubmit}  >

                        <Form.Group className="mb-3" controlId="text">
                            <Form.Label>Enter Name of the Book</Form.Label>
                            <Form.Control name="Name" type="text" placeholder="Name"  required onChange={HandlEvent} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="text" >
                            <Form.Label required>Author</Form.Label>
                            <Form.Control name="Author" type="text" placeholder="Authors Name" required onChange={HandlEvent} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="text">
                            <Form.Label>Published By</Form.Label>
                            <Form.Control name="Pubisher" type="text" placeholder="Publisher Name" required onChange={HandlEvent} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="text">
                            <Form.Label>Choose Genre of the book</Form.Label>
                            <Form.Select name="Genre" aria-label="Default select example" style={{ width: "12rem" }} required onChange={HandlEvent}>
                                <option disabled selected >Genre</option>
                                {
                                x = (genre.map((ele)=>{
                                    return(<option value={ele} key={ele}>{ele}</option>)
                            }))
                            
                                }
                                {x}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="text">
                            <Form.Label>Discription</Form.Label>
                            <Form.Control as="textarea" placeholder="" required name="Description" onChange={HandlEvent} />
                        </Form.Group>

                        <Form.Group controlId="formFile" className="mb-3" style={{ width: "16rem" }}>
                            <Form.Label>Choose Image of the Book</Form.Label>
                            <Form.Control  type="file"  name="Image" accept='image/*' onChange={handleImg}/>
                        </Form.Group>
                        <Button type="submit">Submit form</Button>
                    </Form>
                </Card.Body>

            </Card>

        </div>
    )
}

export default AddBook