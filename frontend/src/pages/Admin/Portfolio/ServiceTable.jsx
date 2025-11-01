import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const ServiceTableHeader = () => (
  <tr>
    <th>Number</th>
    <th>Title</th>
    <th>Status</th>
    <th>Actions</th>
  </tr>
);

const ServiceTableRows = ({ data, onEdit, onDelete }) => (
  <>
    {data.map((item) => (
      <tr key={item.id}>
        <td>{item.number}</td>
        <td>{item.title}</td>
        <td>{item.is_active ? "Active" : "Inactive"}</td>
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

const ServiceTable = ({ data, onEdit, onDelete, renderHeader }) => {
  if (renderHeader) {
    return <ServiceTableHeader />;
  }
  return <ServiceTableRows data={data} onEdit={onEdit} onDelete={onDelete} />;
};

export default ServiceTable;
