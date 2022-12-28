import React, { useState, useEffect } from "react";
import { TemplateAPI, TemplateTypeAPI } from "../settings";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";

function TemplateUpdate(props) {
  const [currentSelectedId, setCurrentSelectedId] = useState(0);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");
  const [updatedModifiedBy, setModifiedBy] = useState("");
  const [updatedType, setUpdatedType] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [templateType, setTemplateType] = useState([]);

  useEffect(() => {
    getTemplateTypes();
  }, []);

  const getTemplateTypes = async () => {

    await axios.get(TemplateTypeAPI)
      .then(res => {
        setTemplateType(res.data);
      }).catch(error => {
        console.log(error);
      });
  };

  const onEdit = async (id) => {
    setCurrentSelectedId(id);
    setShowUpdateModal(true);
    console.log(id);
  };

  const updateSubmitHandler = async e => {
    e.preventDefault();
    setShowUpdateModal(false);

    await axios.put(TemplateAPI,
      {
        id: currentSelectedId,
        name: updatedName,
        contents: updatedContent,
        modifiedBy: updatedModifiedBy,
        templateTypeId: updatedType,
      })
      .catch(error => {
        console.log(error);
      });

    refreshPage();

  }

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <>
      {showUpdateModal && updateModal()}
      <button onClick={() => onEdit(props.id)} className="btn btn-sm btn-outline-secondary badge" type="button">Wijzigen</button>
    </>

  )

  // Update Modal
  function updateModal() {
    return (
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Wijzig sjabloon</Modal.Title>
        </Modal.Header>
        <Form onSubmit={updateSubmitHandler}>
          <Modal.Body>
            <Form.Label>Naam</Form.Label>
            <Form.Control onChange={(e) => setUpdatedName(e.target.value)} autoFocus type="text" required />

            <Form.Label>Content</Form.Label>
            <Form.Control onChange={(e) => setUpdatedContent(e.target.value)} autoFocus type="text" as="textarea" required />

            <Form.Label>Sjabloontype</Form.Label>
            <select className="form-select" aria-label="Default select example" onChange={e => setUpdatedType(e.target.value)}>
              <option value="">Select...</option>
              {templateType.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>

            <Form.Label>Aangepast door</Form.Label>
            <Form.Control onChange={(e) => setModifiedBy(e.target.value)} autoFocus type="textbox" required />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
              Sluiten
            </Button>
            <Button variant="primary" type="submit">
              Wijzigingen opslaan
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    )
  };

}

export default TemplateUpdate;

