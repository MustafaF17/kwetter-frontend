import React, { useEffect, useState } from "react";
import { TemplateAPI, TemplateTypeAPI } from '../settings';
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { format } from "date-fns";
import { parseISO } from "date-fns/esm";
import TemplateAdd from "./TemplateAdd";
import TemplateRemove from "./TemplateRemove"
import TemplateUpdate from "./TemplateUpdate";
import "../index.css";

function Template() {
  const [template, setTemplate] = useState([]);
  const [templateOrganisation, setTemplateOrganisation] = useState([]);
  const [templateProject, setTemplateProject] = useState([]);
  const [templateTeam, setTemplateTeam] = useState([]);
  const [templateType, setTemplateType] = useState([]);
  const [currentSelectedId, setCurrentSelectedId] = useState(0);
  const [searchName, setSearchName] = useState("");
  const [filterInput, setFilterInput] = useState("");
  const [showViewModal, setShowViewModal] = useState(false);

  const [feed,setFeed] = useState([]);
  const [followingFeed,setFollowingFeed] = useState([]);

  useEffect(() => {
    getTemplates();
    getTemplateTypes();
    getTemplateOrganisation();
    getTemplateTeam();
    getTemplateProject();
  }, []);

  const getTemplates = async () => {

    await axios.get(TemplateAPI)
      .then(res => {
        setTemplate(res.data);
        console.log(res.data);
      }).catch(error => {
        console.log(error);
      });
  };

  const getTemplateTypes = async () => {

    await axios.get(TemplateTypeAPI)
      .then(res => {
        setTemplateType(res.data);
      }).catch(error => {
        console.log(error);
      });
  };

  const getTemplateOrganisation = async () => {

    await axios.get("https://localhost:7110/api/TemplateOrganisation")
      .then(res => {
        setTemplateOrganisation(res.data);
      }).catch(error => {
        console.log(error);
      });

  };

  const getTemplateProject = async () => {

    await axios.get("https://localhost:7110/api/TemplateProject")
      .then(res => {
        setTemplateProject(res.data);
      }).catch(error => {
        console.log(error);
      });
  };

  const getTemplateTeam = async () => {

    await axios.get("https://localhost:7110/api/TemplateTeam")
      .then(res => {
        setTemplateTeam(res.data);
      }).catch(error => {
        console.log(error);
      });

  };

  const onView = async (id) => {
    setCurrentSelectedId(id);
    setShowViewModal(true);
  };

  // Set filter regarding what user selects from dropdown
  const categoryFilterHandler = (e) => {

    if (e.target.value === "") {
      getTemplates();
    }

    setFilterInput(e.target.value);
  };


  // Populate dropdown regarding what user has selected
  const renderFilter = (selected) => {

    if (selected === "Organisation") {
      return (
        <>
          {templateOrganisation.filter((v, i, a) => a.findIndex(v2 => ['organisationId', 'organisationName'].every(k => v2[k] === v[k])) === i).map(item => <option key={item.organisationId} value={item.organisationId}>{item.organisationName}</option>)}
        </>
      )
    }

    else if (selected === "Project") {
      return (
        <>
          {templateProject.filter((v, i, a) => a.findIndex(v2 => ['projectId', 'projectName'].every(k => v2[k] === v[k])) === i).map(item => <option key={item.projectId} value={item.projectId}>{item.projectName}</option>)}
        </>
      )
    }

    else if (selected === "Team") {
      return (
        <>
          {templateTeam.filter((v, i, a) => a.findIndex(v2 => ['teamId', 'teamName'].every(k => v2[k] === v[k])) === i).map(item => <option key={item.teamId} value={item.teamId}>{item.teamName}</option>)}
        </>
      )
    }

    else if (selected === "Type") {
      return (
        <>
          {templateType.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
        </>
      )
    }

  };

  // If selected ID of org/team/project is changed, get new data
  const getTemplatesBySorted = async (id) => {

    let API = "";

    if (id === "") {
      getTemplates();
      return;
    }

    if (filterInput === "Organisation") {
      API = `${TemplateAPI}/GetByOrganisation/${id}`;
    }

    else if (filterInput === "Team") {
      API = `${TemplateAPI}/GetByTeam/${id}`;
    }

    else if (filterInput === "Project") {
      API = `${TemplateAPI}/GetByProject/${id}`;
    }

    else if (filterInput === "Type") {
      API = `${TemplateAPI}/GetByType/${id}`;
    }

    console.log("Get templates by sorted: " + filterInput + id)
    await axios.get(API)
      .then(res => {
        setTemplate(res.data);
      }).catch(error => {
        console.log(error);
      });

  };

  return (

    <div className="container mt-3">

      {showViewModal && viewModal()}
      <div className="row flex-lg-nowrap">
        <div className="col-12 col-lg-auto mb-3" style={{ width: '200px' }}>
          <div className="card p-3">
            <div className="e-navlist e-navlist--active-bg">
              <ul className="nav">
                <li className="nav-item"><a className="nav-link px-2 active" href><i className="fa fa-fw fa-bar-chart mr-1" /><span>Overzicht</span></a></li>
                <li className="nav-item"><a className="nav-link px-2" href><i className="fa fa-fw fa-cog mr-1" /><span>Instellingen</span></a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="e-tabs mb-3 px-3">
            <ul className="nav nav-tabs">
              <li className="nav-item"><a className="nav-link active" href>Sjablonen</a></li>
            </ul>
          </div>
          <div className="row flex-lg-nowrap">
            <div className="col mb-3">
              <div className="e-panel card">
                <div className="card-body">
                  <div className="card-title">
                    <h6 className="mr-2"><span></span><small className="px-1">Overzicht</small></h6>
                  </div>
                  <div className="e-table">
                    <div className="table-responsive table-lg mt-3">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th className="max-width">Naam</th>
                            <th className="sortable">Datum</th>
                            <th>Aangemaakt door</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {template.filter((val => {

                            if (val.name.toLowerCase().includes(searchName.toLowerCase())) {
                              return val;
                            }

                            return null;

                          })).map(template =>

                            <tr key={template.id}>
                              <td className="text-nowrap align-middle">{template.id}</td>
                              <td className="text-nowrap align-middle"><span>{template.name}</span></td>
                              <td className="text-nowrap align-middle"><span>{format(parseISO(template.createDateTime), 'kk:mm:ss dd/MM/yyyy')}</span></td>
                              <td className="text-nowrap align-middle"><span>{template.createdBy}</span></td>
                              <td className="text-center align-middle">
                                <div className="btn-group align-top">
                                  <button onClick={() => onView(template.id)} className="btn btn-sm btn-outline-secondary badge" type="button" data-bs-toggle="modal" data-bs-target="#userformmodal">Bekijken</button>
                                  <TemplateUpdate id={template.id} />
                                  <TemplateRemove id={template.id} />
                                </div>
                              </td>
                            </tr>

                          )}

                        </tbody>
                      </table>
                    </div>
                    <div className="d-flex justify-content-center">
                      <nav aria-label="Page navigation example">
                        <ul className="pagination mt-3 mb-0">
                          <li className="disabled page-item"><a href className="page-link dpage">‹</a></li>
                          <li className="active dactive page-item"><a href className="page-link dpage">1</a></li>
                          <li className="page-item"><a href className="page-link dpage">2</a></li>
                          <li className="page-item"><a href className="page-link dpage">3</a></li>
                          <li className="page-item"><a href className="page-link dpage">4</a></li>
                          <li className="page-item"><a href className="page-link dpage">5</a></li>
                          <li className="page-item"><a href className="page-link dpage">›</a></li>
                          <li className="page-item"><a href className="page-link dpage">»</a></li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-3 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="text-center px-xl-3">
                    <TemplateAdd />
                  </div>
                  <hr className="my-3" />
                  <div className="w-100">
                    <div className=" mb-3 w-100">
                      <label className="form-label">Zoek op naam:</label>
                      <div><input className="form-control" type="text" placeholder="Naam" onChange={e => { setSearchName(e.target.value) }} />
                      </div>
                    </div>
                    <hr className="my-3" />
                    <div className="input-group mb-3">
                      <select className="form-select" aria-label="Default select example" onChange={categoryFilterHandler}>
                        <option value="">Zoeken op:</option>
                        <option value="Organisation">Organisatie</option>
                        <option value="Project">Project</option>
                        <option value="Team">Team</option>
                        <option value="Type">Type</option>
                      </select>
                    </div>
                    <div className="input-group mb-3">
                      <label className="form-label">Filter: {filterInput}</label>
                      <div className="input-group mb-3">
                        <select className="form-select" aria-label="Default select example" onChange={e => getTemplatesBySorted(e.target.value)}>
                          <option value={""}>All {filterInput}</option>
                          {renderFilter(filterInput)}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );

  // View Modal
  function viewModal() {
    return (
      <Modal show={viewModal} onHide={() => setShowViewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Sjabloon bekijken</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label className="form-label">Name</label>
          <p>{template.find(x => x.id === currentSelectedId).name}</p>

          <label className="form-label">Contents</label>
          <p>{template.find(x => x.id === currentSelectedId).contents}</p>

          <label className="form-label">Type</label>
          <p>{template.find(x => x.id === currentSelectedId).templateTypeId}</p>

          <label className="form-label">Aangemaakt door</label>
          <p>{template.find(x => x.id === currentSelectedId).createdBy}</p>

          <label className="form-label">Organisatie</label>
          <p>{templateOrganisation.find(x => x.templateId === currentSelectedId).organisationName}</p>

          <label className="form-label">Project</label>
          <p>{templateProject.find(x => x.templateId === currentSelectedId).projectName}</p>

          <label className="form-label">Team</label>
          <p>{templateTeam.find(x => x.templateId === currentSelectedId).teamName}</p>

          <label className="form-label">Aangepast door</label>
          <p>{template.find(x => x.id === currentSelectedId).modifiedBy}</p>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>
            Sluiten
          </Button>
        </Modal.Footer>
      </Modal>
    )
  };

}

export default Template;
