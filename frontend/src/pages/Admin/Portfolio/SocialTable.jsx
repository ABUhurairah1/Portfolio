import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const SocialTableHeader = () => (
  <tr>
    <th>Platform</th>
    <th>URL</th>
    <th>Status</th>
    <th>Actions</th>
  </tr>
);

const SocialTableRows = ({ data, onEdit, onDelete }) => (
  <>
    {data.map((item) => (
      <tr key={item.id}>
        <td>{item.platform}</td>
        <td>
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            {item.url}
          </a>
        </td>
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

const SocialTable = ({ data, onEdit, onDelete, renderHeader }) => {
  if (renderHeader) {
    return <SocialTableHeader />;
  }
  return <SocialTableRows data={data} onEdit={onEdit} onDelete={onDelete} />;
};

export default SocialTable;
