import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const TestimonialTableHeader = () => (
  <tr>
    <th>Quote</th>
    <th>Name</th>
    <th>Title</th>
    <th>Status</th>
    <th>Actions</th>
  </tr>
);

const TestimonialTableRows = ({ data, onEdit, onDelete }) => (
  <>
    {data.map((item) => (
      <tr key={item.id}>
        <td>
          <p className="text-body-2 mb_0">{item.quote}</p>
        </td>
        <td>{item.name}</td>
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

const TestimonialTable = ({ data, onEdit, onDelete, renderHeader }) => {
  if (renderHeader) {
    return <TestimonialTableHeader />;
  }
  return <TestimonialTableRows data={data} onEdit={onEdit} onDelete={onDelete} />;
};

export default TestimonialTable;
