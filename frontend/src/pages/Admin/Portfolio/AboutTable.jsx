import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const AboutTableHeader = () => (
  <tr>
    <th>Name</th>
    <th>Title</th>
    <th>Email</th>
    <th>Location</th>
    <th>Actions</th>
  </tr>
);

const AboutTableRows = ({ data, onEdit, onDelete }) => (
  <>
    {data.map((item) => (
      <tr key={item.id}>
        <td>{item.name}</td>
        <td>{item.title}</td>
        <td>{item.email}</td>
        <td>{item.location}</td>
        <td>
          <div className="admin-actions">
            <button
              className="admin-btn admin-btn-secondary admin-btn-small"
              onClick={() => onEdit(item)}
            >
              <FaEdit /> Edit
            </button>
            <button
              className="admin-btn admin-btn-danger admin-btn-small"
              onClick={() => onDelete(item.id)}
            >
              <FaTrash /> Delete
            </button>
          </div>
        </td>
      </tr>
    ))}
  </>
);

const AboutTable = ({ data, onEdit, onDelete, renderHeader }) => {
  if (renderHeader) {
    return <AboutTableHeader />;
  }
  return <AboutTableRows data={data} onEdit={onEdit} onDelete={onDelete} />;
};

export default AboutTable;
