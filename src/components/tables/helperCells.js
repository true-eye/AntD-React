import React from 'react';
import ImageCellView from './imageCell';
import DeleteCell from './deleteCell';
import EditableCell from './editableCell';
import FilterDropdown from './filterDropdown';
import { Link } from 'react-router-dom';

const DateCell = data => <p>{data.toLocaleString()}</p>;
const ImageCell = src => <ImageCellView src={src} />;
// const LinkCell = (link, href) => <a href={href ? href : '#'}>{link}</a>;
const LinkCell = (link, href) => <Link to={href ? href : '#'}>{link}</Link>;
const TextCell = text => <p>{text}</p>;

export {
  DateCell,
  ImageCell,
  LinkCell,
  TextCell,
  EditableCell,
  DeleteCell,
  FilterDropdown
};
