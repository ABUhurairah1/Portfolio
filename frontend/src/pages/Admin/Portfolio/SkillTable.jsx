import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const SkillTableHeader = () => (
  <tr>
    <th>Icon</th>
    <th>Name</th>
    <th>Status</th>
    <th>Actions</th>
  </tr>
);

const SkillTableRows = ({ data, onEdit, onDelete }) => (
  <>
    {data.map((item) => (
      <tr key={item.id}>
        <td>
          {item.image && (
            <img
              src={item.image}
              alt={item.name}
              style={{ width: 30, height: 30, objectFit: "contain" }}
            />
          )}
        </td>
        <td>{item.name}</td>
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

const SkillTable = ({ data, onEdit, onDelete, renderHeader }) => {
  if (renderHeader) {
    return <SkillTableHeader />;
  }
  return <SkillTableRows data={data} onEdit={onEdit} onDelete={onDelete} />;
};

export default SkillTable;
