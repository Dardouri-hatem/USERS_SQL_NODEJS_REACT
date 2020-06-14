import React, { useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import Alert from '@material-ui/lab/Alert';
import { Button, Modal, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { updateUser, registerUser } from "../../JS/actions/usersAction";

function ModalEdit({ data, updateUser, registerUser,error }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [state, setstate] = useState({
    name: data ? data.name : "",
    family_name: data ? data.family_name : "",
    password: "",
  });

  // Get Input
  const handleChange = (e) => {
    setstate({ ...state, [e.target.name]: e.target.value });
  };
  // Update User || ADD User
  const handleUpdate = (id) => {
    data
      ? updateUser({ id, name: state.name, family_name: state.family_name })
      : registerUser(state);  
  };

  return (
    <>
      <Button
        variant={data ? "primary" : "outline-primary"}
        onClick={handleShow}
      >
        {data ? (
          <EditIcon />
        ) : (
          <>
            <AddIcon /> Add new User
          </>
        )}
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{data ? "Edit" : "Add User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          {data?null:
          error.id !=="REGISTER_FAIL"? null : <Alert severity="error"> {error.msg}</Alert>
          }
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Name </Form.Label>
              <Form.Control
                type="text"
                value={state.name}
                placeholder="Enter Name"
                name="name"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Family Name</Form.Label>
              <Form.Control
                type="text"
                value={state.family_name}
                placeholder="family Name"
                name="family_name"
                onChange={handleChange}
              />
            </Form.Group>
            {data ? null : (
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={state.password}
                  placeholder="password"
                  name="password"
                  onChange={handleChange}
                />
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleUpdate(data ? data.id : null)}
          >
            {data ? "Save Changes" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
const mapStateToProps= state =>{
  return{error : state.error}
}
export default connect(mapStateToProps, { updateUser, registerUser })(ModalEdit);
