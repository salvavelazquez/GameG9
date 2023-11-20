import React from 'react';
// import Information from './Information';
// import listDev from "./Developers.json";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';


function Developer() {
    // return (
    //     <div>
    //         <header>
    //             {listDev.map(des =>
    //                 <Information
    //                     name={des.name}
    //                     repository={des.repository}
    //                     hobby={des.hobby}
    //                 />
    //             )}
    //         </header>
    //     </div>
    // )
    return (

        <div id= "ggg" style={{ display: 'flex', flexWrap: 'wrap'/*, justifyContent: 'space-evenly' */}}>
     

        <Card style={{ width: '18rem', margin: '10px' }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
  
        <Card style={{ width: '18rem', margin: '10px' }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
  
        <Card style={{ width: '18rem', margin: '10px' }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
  
        <Card style={{ width: '18rem', margin: '10px' }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
  
        <Card style={{ width: '18rem', margin: '10px' }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </div>
    )
}
export default Developer;