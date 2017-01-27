const product = {
  theme: {
    label: 'Product',
    themeColor: '#E0DBF0',
    pluralLabel: 'Products',
    image: '/styles/images/product32.png',
    showNew: true,
    description: 'All Products available in the system',
    dbName: 'Product2',

    listViewActions: [
      {action: 'Delete'},
      {action: 'Edit'}
    ],
  },
  permissions: {
    read: true,
    create: true,
    update: true,
    delete: true
  },

  listView: [
    {name: 'Name', label: 'Name', sorted: true, datatype: 'String', formSubType: 'text'},
    {name: 'IsActive', label: 'Active', datatype: 'Boolean', formSubType: 'Checkbox'},
    {name: 'ProductCode', label: 'Product Code', sorted: true, datatype: 'String', formSubType: 'text'},
    {name: 'Family', label: 'Product Family', sorted: true, datatype: 'String', formSubType: 'text'}
  ],
  detailView: [
    {
      name: 'Information',
      cols: 2,
      fields: [
        {
          name: 'Name', label: 'Name', required: true, datatype: 'String', formType: 'input',
          helpText: 'Name of the Product'
        },
        {
          name: 'Family', label: 'Product Family', required: false, datatype: 'String', formType: 'input',
          helpText: 'If the product is assigned to a particular product family'
        },
        {name: 'IsActive', label: 'Active', datatype: 'Boolean',formSubType: 'Checkbox'},
        {name: 'ProductCode', label: 'Product Code', datatype: 'String', formType:'input' },
        {name: 'Description', label: 'Product Description', datatype: 'String', formType:'textarea'}
      ],
    },
  ]
};

module.exports = product;
