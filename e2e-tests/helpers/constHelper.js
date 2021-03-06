'use strict'

module.exports = {

  CLIENT_GROUP: Object.freeze({
    ACTIVELY_SERACH: 'Actively Searching',
    INACTIVE: 'Inactive',
    NEW_CONTACTS: 'New Contacts',
    NOT_GROUPED: 'Not Grouped',
    PASSIVELY_SEARCH: 'Passively Searching',
  }),

  FILTERS: Object.freeze({
    BATHROOMS: 'Bathrooms',
    BEDROOMS: 'Bedrooms',
    LOCATION: 'Location'
  }),

  VIEWS: Object.freeze({
    TAGS: 'Tags',
    CLIENTS: 'Clients',
    DISCUSSIONS: 'Discussions',
    MANAGE_LISTINGS: 'Manage Listings',
    LIST: 'listView',
    ANALYTICS: 'analytics',
    MAP: 'mapView',
  }),

  FILTERS_SELECTION: Object.freeze({
    MINIMUM: 'Minimum',
    RANGE: 'Range'
  }),

  ANALYTICS_CHART: Object.freeze({
    LISTINGS: 'Listings',
    ACRIS_CLOSINGS: 'ACRIS Closings',
    NYC_TOWNHOUSES: 'NYC Townhouses',
    MANAGEMENT: 'Management'
  }),

  ANALYTICS_TAB: Object.freeze({
    MKT_SHARE: 'MKT SHARE',
    LOCATION: 'LOCATION'
  }),

  ANALYTICS_OPTION: Object.freeze({
    BEDROOMS: 'BEDROOMS',
    PRICE: 'PRICE',
    ELEVATOR: 'ELEVATOR'
  }),

  SORT_BY: Object.freeze({
    MOST_EXPENSIVE: 'Most Expensive',
    LEAST_EXPENSIVE: 'Least Expensive',
    NEWEST: 'Newest',
    BEDROOMS: 'Bedrooms'
  })
}