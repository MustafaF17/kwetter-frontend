import React from "react";
import { TemplateAPI } from '../settings';
import axios from "axios";

function TemplateRemove(props) {

  const onDelete = async (id) => {
    await axios.delete(TemplateAPI, { data: { id: id } }).catch(error => {
      console.log(error);
    });

    refreshPage();
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <button onClick={() => onDelete(props.id)} className="btn btn-sm btn-outline-secondary badge" type="button"><i className="fa fa-trash" /></button>
  )

}

export default TemplateRemove;

