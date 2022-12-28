import React, { useState, useEffect } from "react";
import { TemplateAPI, TemplateTypeAPI, DriessenAPI } from "../settings";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import Select from "react-select";
import qs from "qs";

function TemplateAdd() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchOrganisation, setSearchOrganisation] = useState([]);
  const [searchTeam, setSearchTeam] = useState([]);
  const [searchProject, setSearchProject] = useState([]);
  const [templateType, setTemplateType] = useState([]);
  const [newName, setNewName] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCreatedBy, setNewCreatedBy] = useState("");
  const [newSelectedType, setNewSelectedType] = useState("");
  const [selectedOrganisation, setSelectedOrganisation] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");

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


  const createSubmitHandler = async e => {
    e.preventDefault();
    setShowCreateModal(false);

    await axios.post(TemplateAPI,
      {
        name: newName,
        contents: newContent,
        createdBy: newCreatedBy,
        templateTypeId: newSelectedType,
        organisationsId: selectedOrganisation[0],
        organisationsName: selectedOrganisation[1],
        projectId: selectedProject[0],
        projectName: selectedProject[1],
        teamId: selectedTeam[0],
        teamName: selectedTeam[1]
      })
      .catch(error => {
        console.log(error);
      });

    refreshPage();

  };

  const handleInputOrganisationChange = (inputValue) => {
    // Get the character entered by user here in inputValue
    if (inputValue.length > 0) {
      getSearchableOrganisation(inputValue);
    }
  };

  const handleInputTeamChange = (inputValue) => {
    // Get the character entered by user here in inputValue
    if (inputValue.length > 0) {
      getSearchableTeam(inputValue);
    }
  };

  const handleInputProjectChange = (inputValue) => {
    // Get the character entered by user here in inputValue
    if (inputValue.length > 2) {
      getSearchableProject(inputValue);
    }
  };

  const getToken = async () => {

    let data = qs.stringify({
      'grant_type': 'client_credentials',
      'client_id': 'MailTemplates',
      'client_secret': '2Aq5lWT5tBaxRDSU#GY7@B6GFTTNAk'
    });
    let config = {
      method: 'post',
      url: DriessenAPI + '/token',
      headers: {

      },
      data: data
    };

    await axios(config)
      .then(res => {
        localStorage.setItem('token', res.data.access_token);
      }).catch(error => {
        console.log(error);
      });

  }

  const getSearchableProject = async (project) => {
    await getToken();

    let config = {
      method: 'get',
      url: `${DriessenAPI}/api/ajax/LoadAutoCompleteProject?term=${project}`,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    };

    let newArray = [];

    await axios(config)
      .then(res => {
        res.data.forEach(element => {
          newArray.push(
            { value: [element.Key, element.Value], label: element.Value })
        });
      }).catch(error => {
        console.log(error);
      });

    setSearchProject(newArray);

  };

  const getSearchableTeam = async (team) => {
    await getToken();

    let config = {
      method: 'get',
      url: `${DriessenAPI}/api/ajax/LoadAutoCompleteTeams?term=${team}`,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    };

    let newArray = [];

    await axios(config)
      .then(res => {
        res.data.forEach(element => {
          newArray.push(
            { value: [element.Key, element.Value], label: element.Value })
        });
      }).catch(error => {
        console.log(error);
      });

    setSearchTeam(newArray);
  };

  const getSearchableOrganisation = async (org) => {
    await getToken();

    let config = {
      method: 'get',
      url: `${DriessenAPI}/api/ajax/LoadAutoCompleteOrganisations?term=${org}`,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    };

    let newArray = [];

    await axios(config)
      .then(res => {
        res.data.forEach(element => {
          newArray.push(
            { value: [element.Key, element.Value], label: element.Value })
        });
      }).catch(error => {
        console.log(error);
      });

    setSearchOrganisation(newArray);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <>
      {showCreateModal && createModal()}
      <button className="btn btn-driessen" type="button" onClick={() => setShowCreateModal(true)}>Nieuw sjabloon</button>
    </>
  )

  // Create Modal
  function createModal() {
    return (

      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Nieuw sjabloon aanmaken</Modal.Title>
        </Modal.Header>

        <Form onSubmit={createSubmitHandler}>
          <Modal.Body>
            <Form.Label>Naam</Form.Label>
            <Form.Control onChange={(e) => setNewName(e.target.value)} autoFocus type="text" required />

            <Form.Label>Content</Form.Label>
            <Form.Control onChange={(e) => setNewContent(e.target.value)} autoFocus type="text" as="textarea" required />

            <Form.Label>Aangemaakt door</Form.Label>
            <Form.Control onChange={(e) => setNewCreatedBy(e.target.value)} autoFocus type="textbox" required />

            <Form.Label>Selecteer organisatie</Form.Label>
            <Select
              onInputChange={handleInputOrganisationChange}
              options={searchOrganisation}
              onChange={e => setSelectedOrganisation(e.value)}
              required
            />

            <Form.Label>Selecteer Project</Form.Label>
            <Select
              onInputChange={handleInputProjectChange}
              options={searchProject}
              onChange={e => setSelectedProject(e.value)}
              required
            />

            <Form.Label>Selecteer Team</Form.Label>
            <Select
              onInputChange={handleInputTeamChange}
              options={searchTeam}
              onChange={e => setSelectedTeam(e.value)}
              required
            />

            <Form.Label>Selecteer Sjabloon type</Form.Label>
            <select className="form-select" aria-label="Default select example" onChange={e => setNewSelectedType(e.target.value)}>
              <option value="">Select...</option>
              {templateType.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>


          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
              Sluiten
            </Button>
            <Button variant="primary" type="submit">
              Opslaan
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    )
  };

}

export default TemplateAdd;

