import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const ResumeTableHeader = () => (
  <tr>
    <th>Type</th>
    <th>Role</th>
    <th>Organization</th>
    <th>Period</th>
    <th>Actions</th>
  </tr>
);

const ResumeTableRows = ({ data, onEdit, onDelete }) => (
  <>
    {data.map((item) => (
      <tr key={item.id}>
        <td>{item.type}</td>
        <td>{item.role}</td>
        <td>{item.organization}</td>
        <td>{item.period}</td>
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

const ResumeTable = ({ data, onEdit, onDelete, renderHeader }) => {
  if (renderHeader) {
    return <ResumeTableHeader />;
  }
  return <ResumeTableRows data={data} onEdit={onEdit} onDelete={onDelete} />;
};

export default ResumeTable;
