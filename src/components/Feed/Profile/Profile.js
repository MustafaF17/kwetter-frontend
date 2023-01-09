import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import "./Profile.css";

function Profile(props) {
  const [showModal, setShowModal] = useState(false);
  const [profileInfo, setProfileInfo] = useState([]);

  useEffect(() => {
    getProfileInfo();
  }, []);

  const getProfileInfo = async () => {
    await axios
      .get("")
      .then((res) => {
        setProfileInfo(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleShow = async (username) => {
    alert("Clicked follow button");

    if(showModal)
    {
      setShowModal(false);
    }

    else{
    setShowModal(true);
    }
  };

  const onProfileView = async (username) => {
    alert("Clicked follow button");

    if(showModal)
    {
      setShowModal(false);
    }

    else{
    setShowModal(true);
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <>
      {showModal && profileModal()}
      <Button
        onClick={() => onProfileView(props.username)}
        className="btn btn-sm btn-outline-secondary badge"
        type="button"
      >
        {"Follow"}
      </Button>
    </>
  );

  // Update Modal
  function profileModal() {
    return (
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Modal title</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>...</MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow}>
                Close
              </MDBBtn>
              <MDBBtn>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
    );
  }
}

export default Profile;
