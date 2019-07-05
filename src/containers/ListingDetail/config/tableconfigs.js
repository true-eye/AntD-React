// import React from 'react';
import clone from 'clone';
import _ from 'lodash';
import {
  DateCell,
  ImageCell,
  LinkCell,
  TextCell
} from '../../../components/tables/helperCells';

const renderCell = (object, type, key) => {
  const value = _.get(object, key)
  // const value = object[key];
  switch (type) {
    case 'ImageCell':
      return ImageCell(value);
    case 'DateCell':
      return DateCell(value);
    case 'LinkCell':
      return LinkCell(value, "property/" + object["id"]);
    default:
      return TextCell(value);
  }
};

const columns = [
  {
    title: 'Property',
    key: 'id',
    render: object => renderCell(object, 'LinkCell', 'current_listing_info_snapshot.listing_title')
  },
  {
    title: 'Market',
    key: 'm.name',
    dataIndex: 'market.name'
  },
  {
    title: 'Distance',
    key: 'distance_miles',
    dataIndex: 'distance_miles'
  },
  {
    title: 'Bedrooms',
    key: 'lis.bedrooms',
    dataIndex: 'current_listing_info_snapshot.bedrooms'
  },
  {
    title: 'Bathrooms',
    key: 'lis.bathrooms',
    dataIndex: 'current_listing_info_snapshot.bathrooms'
  },
  {
    title: 'Sleeps',
    key: 'lis.sleeps',
    dataIndex: 'current_listing_info_snapshot.sleeps'
  }
];
const smallColumns = [columns[0], columns[2]];
const sortColumns = [
  { ...columns[0], sorter: true },
  { ...columns[1], sorter: true },
  { ...columns[2], sorter: true },
  { ...columns[3], sorter: true },
  { ...columns[4], sorter: true },
  { ...columns[5], sorter: true }
];

const tableinfos = [
  {
    title: 'Competition Table',
    value: 'competitionView',
    columns: clone(sortColumns)
  }
];
export { columns, tableinfos };
