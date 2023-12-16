import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import RenderRecord from './RenderRecord';

const records = [];

export default function Registration() {
  Registration.propTypes = {
    activeItem : PropTypes.object,
    deleteItem: PropTypes.func,
    id : PropTypes.string,
    traningDate: PropTypes.func,
    distance: PropTypes.number,
  }

  const [activeItem, setActiveItem] = useState({
    id: uuidv4(),
    traningDate: '',
    distance: '',
    mls: '',
  });
  const [activeItems, setActiveItems] = useState(records);

  const getInputValue = ({ target }) => {
    setActiveItem((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const formSubmit = (e) => {
    if (checkDateValidity(activeItem.traningDate)) {
      activeItem.mls = checkDateValidity(activeItem.traningDate);
    } else {
      e.preventDefault();
      alert('Неверно введена дата. Формат ДД.ММ.ГГ');
      return null;
    }
    checkDate(activeItem)
      ? addDistance(activeItem)
      : setActiveItems((prev) =>
          [...prev, activeItem].sort(sortByField('mls'))
        );
    setActiveItem({ id: uuidv4(), traningDate: '', distance: '', mls: '' });
    e.preventDefault();
  };

  const checkDateValidity = (str) => {
    const arr = str.split('.');
    const test =
      /^[0-3]\d\.[0-1]\d\.\d{4}$/.test(str) &&
      arr[0] > 0 &&
      arr[0] <= 31 &&
      arr[1] > 0 &&
      arr[1] <= 12;
    if (!test) return null;
    const date = new Date();
    const years = +arr[2] > 40 ? 19 : 20;
    date.setFullYear(years + arr[2], arr[1] - 1, arr[0]);
    return date.getTime();
  };

  const checkDate = (activeItem) => {
    return activeItems.some((e) => e.traningDate === activeItem.traningDate);
  };

  const sortByField = (field) => {
    return (a, b) => (a[field] < b[field] ? 1 : -1);
  };

  const addDistance = (activeItem) => {
    const index = activeItems.findIndex(
      (e) => e.traningDate === activeItem.traningDate
    );
    const oldDist = +activeItems[index].distance;
    const newDist = +activeItem.distance + oldDist;
    setActiveItems((prev) => {
      prev[index].distance = newDist;
      return prev;
    });
  };

  const deleteItem = (id) => {
    const index = activeItems.findIndex((e) => e.id == id);
    setActiveItems((prev) => {
      const newArray = [...prev];
      newArray.splice(index, 1);
      return newArray;
    });
  };

  return (
    <>
      <form onSubmit={formSubmit}>
        <div className='container'>
          <label htmlFor="traningDate">Дата (ДД.ММ.ГГ)</label>
          <input
            value={activeItem.traningDate}
            id="traningDate"
            name="traningDate"
            onChange={getInputValue}
            type="text"
            required
          />
        </div>
        <div className="container">
          <label htmlFor="distance">Пройдено км</label>
          <input
            value={activeItem.distance}
            id="distance"
            name="distance"
            onChange={getInputValue}
            type="text"
            required
          />
        </div>
        <div className="container">
          <button>ОК</button>
        </div>
      </form>
      <table>
        <thead>
          <tr>
            <th>Дата (ДД.ММ.ГГ)</th>
            <th>Пройдено км</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <RenderRecord
            activeItems={activeItems}
            deleteItem={deleteItem}
          />
        </tbody>
      </table>
    </>
  );
}
