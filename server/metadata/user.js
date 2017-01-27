/*****************************************************************************
* User Metadata file, all user forms and listviews are driven from here.
 Be careful while editing the file
 **************************************************************************/
const user = {
  theme: {
    label: 'User',
    themeColor: '#E2EAE1',
    pluralLabel: 'Users',
    image: '/styles/images/user32.png',
    showNew: true,
    description: 'Manage all users of the application',
    listViewActions: [
      {action: 'Delete'},
      {action: 'Deactivate'},
      {action: 'Activate'}
    ],
    detailActions: [
      {action: 'reset', label: 'Reset Password', buttonType: 'warning', description: 'Reset Password for a user'},
      {action: 'message', label: 'Message', buttonType: 'warning', description: 'Dispatch a Message'},
    ]
  },
  listView: [
    {name: 'name', label: 'Name', sorted: true, datatype: 'String', formSubType: 'text'},
    {name: 'active', label: 'Active', sorted: true, datatype: 'boolean', formSubType: 'checkbox'},
    {name: 'username', label: 'Name', sorted: true, datatype: 'String', formSubType: 'text'},
    {name: 'email', label: 'Email', sorted: false, datatype: 'String', formSubType: 'email'},
    {name: 'mobile', label: 'Mobile', sorted: false, datatype: 'String', formSubType: 'text'},
    {name: 'role', label: 'Role', sorted: false, datatype: 'String', formSubType: 'text'}
  ],
  detailView: [
    {
      name: 'Information',
      cols: 2,
      fields: [
        {
          name: 'name', label: 'Name', required: true, datatype: 'String', formType: 'input', helpText: 'Name of' +
        ' the User'
        },
        {name: 'email', label: 'Email', required: true, datatype: 'email', formType: 'input', formSubType: 'email'},
        {name: 'mobile', label: 'Mobile', required: true, datatype: 'String', formType: 'input'}
      ],
    },
    {
      name: 'Details',
      cols: 2,
      fields: [
        {
          name: 'username',
          label: 'Username',
          required: true,
          datatype: 'String',
          formType: 'input',
          formSubType: 'email',
          helpText: 'Username'
        },
        {
          name: 'role', label: 'Role', datatype: 'String', formType: 'select',
          picklistValues: [{name: 'Admin', label: 'Admin'}, {name: 'User', label: 'User'}]
        },
        {name: 'active', label: 'Active', datatype: 'Boolean', formType: 'checkbox', formSubType: 'checkbox'}
      ],
    }
  ],
  detailViewRelatedLists: [
    {
      sObjectName: 'workOrder',
      listActions: [
        {action: 'Delete'},
        {action: 'Edit'}
      ],
      massActions: [
        {action: 'Action1',label: 'Mass Email', buttonType: 'warning'},
        {action: 'Action2',label: 'Mass Delete', buttonType: 'warning'},
        {action: 'Action3',label: 'Mass Mass', buttonType: 'warning'}
      ],
      fields:[
        {name: 'name', label: 'Name', sorted: true, datatype: 'String', formSubType: 'text'},
        {name: 'active', label: 'Active', sorted: true, datatype: 'boolean', formSubType: 'checkbox'},
        {name: 'status', label: 'Status', sorted: true, datatype: 'String', formSubType: 'select'},
        {name: 'dueDate', label: 'Due Date', sorted: true, datatype: 'date', formSubType: 'date'}
      ]
    },
  ]

};

export default user;
