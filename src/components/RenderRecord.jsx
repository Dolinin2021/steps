import Record from "./Record";
import PropTypes from 'prop-types';

export default function RenderRecord({ activeItems, deleteItem }) {
  RenderRecord.propTypes = {
    activeItems : PropTypes.array,
    deleteItem: PropTypes.func,
  }

  if (activeItems.length === 0) return null;
  return (
    <>
      {activeItems.map((e) => (
        <Record activeItem={e} key={e.id} deleteItem={deleteItem} />
      ))}
    </>
  );
}
