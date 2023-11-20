import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/Style.css';
function TaskList() {
  const [notes, setNotes] = useState([]);
  const [inputText, setInputText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('active');

  const addNote = () => {
    if (inputText) {
      const newNote = {
        id: notes.length+1, //Assign a unique ID to the note
        Description: inputText,
        State: selectedStatus,
      }

      setNotes([...notes, newNote]);
      setInputText('');
      setSelectedStatus('active');
    }
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
  };

  const listStyle = {
    textAlign: 'left',
    backgroundColor: '#f5f5f5',
  };

  return (
    <div className='text-center colorBackground'>
      <h1 className='whiteText'>Notes List</h1>
      <Form>
      <div className="d-flex justify-content-between" >
        {/*Input AddNote*/}
        <Form.Group className="mr-2 flex-grow-1" >
          <Form.Control 
            type="text"
            placeholder='Enter your note'
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </Form.Group>
        {/*Dropdown list*/}
        <Form.Group className="mr-2" style={{ width: '200px' }}>
          <Form.Control
            as="select" // Use a "select" component for the dropdown list
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="active">Active</option>
            <option value="desactive">Desactive</option>
          </Form.Control>
        </Form.Group> 
      </div>

      <Button variant="success" onClick={addNote}>Add Note</Button>

      </Form>
      <ListGroup style={listStyle}>
        {notes.map((note) => (
          <ListGroup.Item key={note.id}>
            <span style={{ marginRight: '30px' }}>{note.Description}</span>
            <span style={{ marginRight: '30px' }}>{note.State}</span>
            <Button 
              variant="danger"
              className="float-right"
              onClick={() => deleteNote(note.id)}
            >Delete</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default TaskList;
