import React, { useState } from 'react';
import axios from 'axios';
import { axiosWIthAuth, axiosWithAuth } from '../utils/axiosWithAuth';

const initialColor = {
  color: '',
  code: { hex: '' }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, {
        color: colorToEdit.color,
        code: colorToEdit.code
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));

    setEditing(false);
    const newColor = colors.map(color => {
      if (color.id === colorToEdit.id) {
        return { ...color, color: colorToEdit.color, code: colorToEdit.code };
      } else {
        return color;
      }
    });
    updateColors(newColor);
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
    const leftover = [];
    colors.forEach(color => {
      if (color.id !== colorToEdit.id) {
        leftover.push(color);
      }
    });
    updateColors(leftover);
  };

  return (
    <div className='colors-wrap'>
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className='delete'
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{' '}
              {color.color}
            </span>
            <div
              className='color-box'
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className='button-row'>
            <button type='submit'>save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className='spacer' />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
