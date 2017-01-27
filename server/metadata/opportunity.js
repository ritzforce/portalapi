const opportunity = {
  theme: {
    label: 'Opportunity',
    themeColor: '#EFE4F2',
    pluralLabel: 'Opportunities',
    image: '/styles/images/user32.png',
    showNew: true,
    description: 'Current Opportunities worth pursuing',
    dbName: 'Opportunity',

    listViewActions: [
      {action: 'Delete'},
      {action: 'Edit'}
    ],
    detailActions: [
    ]
  },

  permissions: {
    read: true,
    create: true,
    update: true,
    delete: true
  },


  listView: [
    {name: 'Name', label: 'Name', sorted: true, datatype: 'String', formSubType: 'text'},
    {name: 'StageName', label: 'Stage', sorted: true, datatype: 'String', formSubType: 'text'},
  ],
  detailView: [
    {
      name: 'Information',
      cols: 2,
      fields: [
        {
          name: 'Name', label: 'Name', required: true, datatype: 'String', formType: 'input',
          helpText: 'Opportunity Name'
        },
        {
          name: 'CloseDate', label: 'Close Date',  datatype: 'date', formSubType: 'date',
          helpText: 'The date by which Opportunity should be closed'
        },
        {
          name: 'Type', label: 'Type',  datatype: 'String', formType: 'input'
        },
        {
          name: 'LeadSource', label: 'Lead Source',  datatype: 'String', formType: 'input'
        },
        {
          name: 'StageName', label: 'Stage Name',  datatype: 'String', formType: 'input'
        },
    ] ,
    },
    {
      name: 'Additional Information',
      cols: 2,
      fields: [
        {name: 'OrderNumber__c', label: 'Order Number', datatype: 'String', formType: 'input'},
        {name: 'MainCompetitors__c', label: 'Main Competitor(s)', datatype: 'String', formType: 'input'}
      ],
    },
    {
      name: 'Description',
      cols: 1,
      fields: [
        {name: 'Description', label: 'Description', datatype: 'String', formType: 'textarea'}
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

module.exports = opportunity;
