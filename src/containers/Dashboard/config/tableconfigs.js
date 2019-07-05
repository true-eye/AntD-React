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

  switch (type) {
    case 'ImageCell':
      return ImageCell(value);
    case 'DateCell':
      return DateCell(value);
    case 'LinkCell':
      return LinkCell(value, "/dashboard/listing/" + object["id"]);
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
    key: 'market',
    dataIndex: 'market'
  },
  {
    title: 'Distance',
    key: 'distance_miles',
    dataIndex: 'distance_miles'
  },
  {
    title: 'Bedrooms',
    key: 'bedrooms',
    dataIndex: 'bedrooms'
  },
  {
    title: 'Bathrooms',
    key: 'bathrooms',
    dataIndex: 'bathrooms'
  },
  {
    title: 'Sleeps',
    key: 'sleeps',
    dataIndex: 'sleeps'
  }
];
const smallColumns = [columns[0], columns[2]];

const tableinfos = [
  {
    title: 'Competition Table',
    value: 'simple',
    columns: clone(smallColumns)
  }
];
export { columns, tableinfos };
