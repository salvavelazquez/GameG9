import React, { useState } from 'react';
import { 
  Button, 
  Form, 
  ListGroup, 
  Container, 
  Row, 
  Col,
  Badge,
  Card
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/Style.css';

function NotesList() {
  const [notes, setNotes] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [finished, setFinished] = useState([]);
  const [inputText, setInputText] = useState('');
  const [inputTitle, setInputTitle] = useState('');

  const addNote = (e) => {
    e.preventDefault();
    if (inputText && inputTitle) {
      const newNote = {
        id: Date.now(),
        title: inputTitle,
        description: inputText,
        createdAt: new Date().toLocaleString(),
        status: 'todo'
      };

      setNotes([...notes, newNote]);
      setInputText('');
      setInputTitle('');
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
    setInProgress(inProgress.filter(note => note.id !== id));
    setFinished(finished.filter(note => note.id !== id));
  };

  const moveToInProgress = (id) => {
    const noteToMove = notes.find(note => note.id === id) || 
                      finished.find(note => note.id === id);
    
    if (noteToMove) {
      setInProgress([...inProgress, {...noteToMove, status: 'in-progress'}]);
      
      if (notes.some(note => note.id === id)) {
        setNotes(notes.filter(note => note.id !== id));
      } else {
        setFinished(finished.filter(note => note.id !== id));
      }
    }
  };

  const moveToFinished = (id) => {
    const noteToMove = notes.find(note => note.id === id) || 
                      inProgress.find(note => note.id === id);
    
    if (noteToMove) {
      setFinished([...finished, {...noteToMove, status: 'finished'}]);
      
      if (notes.some(note => note.id === id)) {
        setNotes(notes.filter(note => note.id !== id));
      } else {
        setInProgress(inProgress.filter(note => note.id !== id));
      }
    }
  };

  const moveBackToTodo = (id) => {
    const noteToMove = inProgress.find(note => note.id === id) || 
                      finished.find(note => note.id === id);
    
    if (noteToMove) {
      setNotes([...notes, {...noteToMove, status: 'todo'}]);
      
      if (inProgress.some(note => note.id === id)) {
        setInProgress(inProgress.filter(note => note.id !== id));
      } else {
        setFinished(finished.filter(note => note.id !== id));
      }
    }
  };

  return (
    <Container fluid className="notes-app">
      <Row className="justify-content-center">
        <Col lg={8} xl={6}>
          <Card className="app-card">
            <Card.Header className="app-header">
              <h1 className="app-title">Task Manager 📝</h1>
              <p className="app-subtitle">Organize your work efficiently</p>
            </Card.Header>
            
            <Card.Body>
              <Form onSubmit={addNote} className="note-form">
                <Row className="mb-3">
                  <Col md={5}>
                    <Form.Control
                      type="text"
                      placeholder="Note title"
                      value={inputTitle}
                      onChange={(e) => setInputTitle(e.target.value)}
                      className="form-input"
                      required
                    />
                  </Col>
                  <Col md={5}>
                    <Form.Control
                      type="text"
                      placeholder="Note description"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      className="form-input"
                      required
                    />
                  </Col>
                  <Col md={2}>
                    <Button 
                      variant="primary" 
                      type="submit" 
                      className="w-100 add-btn"
                    >
                      Add
                    </Button>
                  </Col>
                </Row>
              </Form>

              <Row className="mt-4">
                {/* To Do Column */}
                <Col md={4}>
                  <div className="status-column">
                    <h2 className="status-title init">
                      <Badge bg="warning" className="me-2">To Do</Badge>
                      <span className="count-badge">{notes.length}</span>
                    </h2>
                    <ListGroup className="notes-list">
                      {notes.map((note) => (
                        <ListGroup.Item key={note.id} className="note-item todo-note">
                          <div className="note-header">
                            <h5 className="note-title">{note.title}</h5>
                            <small className="note-date">{note.createdAt}</small>
                          </div>
                          <p className="note-desc">{note.description}</p>
                          <div className="note-actions">
                            <Button 
                              size="sm" 
                              variant="outline-primary"
                              onClick={() => moveToInProgress(note.id)}
                              className="action-btn"
                            >
                              <i className="bi bi-arrow-right"></i> Progress
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline-danger"
                              onClick={() => deleteNote(note.id)}
                              className="action-btn"
                            >
                              <i className="bi bi-trash"></i>
                            </Button>
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </div>
                </Col>

                {/* In Progress Column */}
                <Col md={4}>
                  <div className="status-column">
                    <h2 className="status-title process">
                      <Badge bg="info" className="me-2">In Progress</Badge>
                      <span className="count-badge">{inProgress.length}</span>
                    </h2>
                    <ListGroup className="notes-list">
                      {inProgress.map((note) => (
                        <ListGroup.Item key={note.id} className="note-item progress-note">
                          <div className="note-header">
                            <h5 className="note-title">{note.title}</h5>
                            <small className="note-date">{note.createdAt}</small>
                          </div>
                          <p className="note-desc">{note.description}</p>
                          <div className="note-actions">
                            <Button 
                              size="sm" 
                              variant="outline-success"
                              onClick={() => moveToFinished(note.id)}
                              className="action-btn"
                            >
                              <i className="bi bi-check-circle"></i> Complete
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline-warning"
                              onClick={() => moveBackToTodo(note.id)}
                              className="action-btn"
                            >
                              <i className="bi bi-arrow-left"></i> Back
                            </Button>
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </div>
                </Col>

                {/* Finished Column */}
                <Col md={4}>
                  <div className="status-column">
                    <h2 className="status-title finish">
                      <Badge bg="success" className="me-2">Done</Badge>
                      <span className="count-badge">{finished.length}</span>
                    </h2>
                    <ListGroup className="notes-list">
                      {finished.map((note) => (
                        <ListGroup.Item key={note.id} className="note-item done-note">
                          <div className="note-header">
                            <h5 className="note-title">{note.title}</h5>
                            <small className="note-date">{note.createdAt}</small>
                          </div>
                          <p className="note-desc">{note.description}</p>
                          <div className="note-actions">
                            <Button 
                              size="sm" 
                              variant="outline-info"
                              onClick={() => moveToInProgress(note.id)}
                              className="action-btn"
                            >
                              <i className="bi bi-arrow-left"></i> Reopen
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline-danger"
                              onClick={() => deleteNote(note.id)}
                              className="action-btn"
                            >
                              <i className="bi bi-trash"></i>
                            </Button>
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default NotesList;