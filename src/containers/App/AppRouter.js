import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import asyncComponent from '../../helpers/AsyncFunc';

const routes = [
  {
    path: '',
    component: asyncComponent(() => import('../Dashboard/index.js')),
  },
  {
    path: 'mylisting',
    component: asyncComponent(() => import('../ListingDetail/myListing.js')),
  },
  {
    path: 'inbox',
    component: asyncComponent(() => import('../Mail')),
  },
  {
    path: 'booking',
    component: asyncComponent(() => import('../Calendar/Booking')),
  },
  {
    path: 'pricing',
    component: asyncComponent(() => import('../Calendar/Pricing')),
  },
  {
    path: 'map',
    component: asyncComponent(() => import('../Map/GoogleMap/googleMap')),
  },
  {
    path: 'competition',
    component: asyncComponent(() => import('../Competition/index.js')),
  },
  {
    path: 'notifications',
    component: asyncComponent(() => import('../UserNotification/index.js')),
  },
  {
    path: 'settings',
    component: asyncComponent(() => import('../UserSettings/index.js')),
  },
  {
    path: 'listing/:id',
    component: asyncComponent(() => import('../ListingDetail/index.js')),
  },
  {
    path: 'table_ant',
    component: asyncComponent(() => import('../Tables/antTables')),
  },
  // {
  //   path: 'allFormComponent',
  //   component: asyncComponent(() => import('../Forms/allComponents/')),
  // },
  // {
  //   path: 'InputField',
  //   component: asyncComponent(() => import('../Forms/Input')),
  // },
  // {
  //   path: 'editor',
  //   component: asyncComponent(() => import('../Forms/editor/')),
  // },
  // {
  //   path: 'stepperForms',
  //   component: asyncComponent(() => import('../Forms/StepperForms/')),
  // },
  // {
  //   path: 'FormsWithValidation',
  //   component: asyncComponent(() => import('../Forms/FormsWithValidation')),
  // },
  // {
  //   path: 'progress',
  //   component: asyncComponent(() => import('../Forms/Progress')),
  // },
  // {
  //   path: 'ladda_button',
  //   component: asyncComponent(() => import('../Forms/LaddaButton')),
  // },
  // {
  //   path: 'button',
  //   component: asyncComponent(() => import('../Forms/Button')),
  // },
  // {
  //   path: 'tab',
  //   component: asyncComponent(() => import('../Forms/Tab')),
  // },
  // {
  //   path: 'autocomplete',
  //   component: asyncComponent(() => import('../Forms/AutoComplete')),
  // },
  // {
  //   path: 'checkbox',
  //   component: asyncComponent(() => import('../Forms/Checkbox')),
  // },
  // {
  //   path: 'radiobox',
  //   component: asyncComponent(() => import('../Forms/Radiobox/')),
  // },
  // {
  //   path: 'selectbox',
  //   component: asyncComponent(() => import('../Forms/Select/')),
  // },
  // {
  //   path: 'transfer',
  //   component: asyncComponent(() => import('../Forms/Transfer/')),
  // },
  // {
  //   path: 'gridLayout',
  //   component: asyncComponent(() => import('../Box/GridLayout')),
  // },
  // {
  //   path: 'notes',
  //   component: asyncComponent(() => import('../Notes')),
  // },
  // {
  //   path: 'alert',
  //   component: asyncComponent(() => import('../Feedback/Alert')),
  // },
  // {
  //   path: 'modal',
  //   component: asyncComponent(() => import('../Feedback/Modal/')),
  // },
  // {
  //   path: 'message',
  //   component: asyncComponent(() => import('../Feedback/Message')),
  // },
  // {
  //   path: 'notification',
  //   component: asyncComponent(() => import('../Feedback/Notification')),
  // },
  // {
  //   path: 'Popconfirm',
  //   component: asyncComponent(() => import('../Feedback/Popconfirm')),
  // },
  // {
  //   path: 'spin',
  //   component: asyncComponent(() => import('../Feedback/Spin')),
  // },
  // {
  //   path: 'affix',
  //   component: asyncComponent(() => import('../Navigation/affix')),
  // },
  // {
  //   path: 'breadcrumb',
  //   component: asyncComponent(() =>
  //     import('../Uielements/Breadcrumb/breadcrumb')
  //   ),
  // },
  // {
  //   path: 'backToTop',
  //   component: asyncComponent(() => import('../Navigation/backToTop')),
  // },
  // {
  //   path: 'dropdown',
  //   component: asyncComponent(() => import('../Uielements/Dropdown/dropdown')),
  // },
  // {
  //   path: 'op_badge',
  //   component: asyncComponent(() => import('../Uielements/Badge')),
  // },
  // {
  //   path: 'op_card',
  //   component: asyncComponent(() => import('../Uielements/Card')),
  // },
  // {
  //   path: 'op_carousel',
  //   component: asyncComponent(() => import('../Uielements/Carousel')),
  // },
  // {
  //   path: 'op_collapse',
  //   component: asyncComponent(() => import('../Uielements/Collapse')),
  // },
  // {
  //   path: 'op_tooltip',
  //   component: asyncComponent(() => import('../Uielements/Tooltip/')),
  // },
  // {
  //   path: 'rating',
  //   component: asyncComponent(() => import('../Uielements/rating/')),
  // },
  // {
  //   path: 'tree',
  //   component: asyncComponent(() => import('../Uielements/Tree/')),
  // },
  // {
  //   path: 'op_tag',
  //   component: asyncComponent(() => import('../Uielements/Tag')),
  // },
  // {
  //   path: 'op_timeline',
  //   component: asyncComponent(() => import('../Uielements/Timeline')),
  // },
  // {
  //   path: 'op_popover',
  //   component: asyncComponent(() => import('../Uielements/Popover')),
  // },
  // {
  //   path: 'googleChart',
  //   component: asyncComponent(() => import('../Charts/googleChart')),
  // },
  // {
  //   path: 'reecharts',
  //   component: asyncComponent(() => import('../Charts/recharts')),
  // },
  // {
  //   path: 'reactVis',
  //   component: asyncComponent(() => import('../Charts/reactVis')),
  // },
  // {
  //   path: 'menu',
  //   component: asyncComponent(() => import('../Navigation/menu')),
  // },
  // {
  //   path: 'ReactChart2',
  //   component: asyncComponent(() => import('../Charts/reactChart2')),
  // },
  // {
  //   path: 'pagination',
  //   component: asyncComponent(() =>
  //     import('../Uielements/Pagination/pagination')
  //   ),
  // },
  // {
  //   path: 'reactTrend',
  //   component: asyncComponent(() => import('../Charts/reactTrend')),
  // },
  // {
  //   path: 'reactDates',
  //   component: asyncComponent(() =>
  //     import('../AdvancedUI/ReactDates/reactDates')
  //   ),
  // },
  // {
  //   path: 'codeMirror',
  //   component: asyncComponent(() => import('../AdvancedUI/codeMirror')),
  // },
  // {
  //   path: 'uppy',
  //   component: asyncComponent(() => import('../AdvancedUI/uppy')),
  // },
  // {
  //   path: 'dropzone',
  //   component: asyncComponent(() => import('../AdvancedUI/dropzone')),
  // },
  // {
  //   path: 'frappeChart',
  //   component: asyncComponent(() => import('../Charts/frappeChart')),
  // },
];

class AppRouter extends Component {
  render() {
    const { url, style } = this.props;
    return (
      <div style={style}>
        {routes.map(singleRoute => {
          const { path, exact, ...otherProps } = singleRoute;
          return (
            <Route
              exact={exact === false ? false : true}
              key={singleRoute.path}
              path={`${url}/${singleRoute.path}`}
              {...otherProps}
            />
          );
        })}
      </div>
    );
  }
}

export default AppRouter;
