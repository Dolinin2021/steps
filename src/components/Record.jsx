import PropTypes from 'prop-types';

export default function Record({ activeItem, deleteItem }) {
  Record.propTypes = {
    activeItem : PropTypes.object,
    deleteItem: PropTypes.func,
  }

  if (activeItem.distance === undefined) return null;

  return (
    <tr id={activeItem.id}>
      <td>{activeItem.traningDate}</td>
      <td>{activeItem.distance}</td>
      <td>
        <span
          onClick={(e) => {
            deleteItem(e.target.closest('tr').id);
          }}
        >
          ✘
        </span>
      </td>
    </tr>
  );
}
