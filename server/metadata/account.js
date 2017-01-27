/*****************************************************************************
 * Account Metadata file, all user forms and listviews are driven from here.
 Be careful while editing the file
 **************************************************************************/
const account = {
    theme: {
        label: 'Account',
        themeColor: '#EFEFDC',
        pluralLabel: 'Accounts',
        image: '/styles/images/account32.png',
        description: 'Manage all our customers',
        listViewActions: [
            {action: 'Delete'},
            {action: 'Edit'}
        ],
        massActions: [],
        detailActions: [],
        dbName: 'Account',
        shareName: 'Account__c',
    },
    permissions: {
        read: true,
        create: true,
        update: true,
        delete: true
    },
    listView: [
        {name: 'Name', label: 'Name', sorted: true, datatype: 'String', formSubType: 'text'},
        {name: 'Phone', label: 'Phone', sorted: true, datatype: 'String', formSubType: 'text'},
        {name: 'Type', label: 'Type', sorted: true, datatype: 'String', formSubType: 'text'},
        {name: 'Rating', label: 'Rating', sorted: true, datatype: 'String', formSubType: 'text'},
        {name: 'NumberOfEmployees', label: 'Employees', sorted: true, datatype: 'Number', formSubType: 'text'},
        {name: 'Industry', label: 'Industry', sorted: true, datatype: 'String', formSubType: 'text'}
    ],
    detailView: [
        {
            name: 'Basic Information',
            cols: 2,
            fields: [
                {
                    name: 'Name',
                    label: 'Name',
                    required: true,
                    datatype: 'String',
                    formType: 'input',
                    helpText: 'Name of the Client'
                },
                {
                    name: 'Rating',
                    label: 'Rating',
                    required: true,
                    datatype: 'String',
                    formType: 'select',
                    picklistValues: [{value: 'Hot', label: 'Hot'},
                        {value: 'Warm', label: 'Warm'},
                        {value: 'Cold', label: 'Cold'}]
                },
                {
                    name: 'AccountNumber',
                    label: 'Account Number',
                    required: false,
                    datatype: 'String',
                    formType: 'input',
                },
                {
                    name: 'Website',
                    label: 'Website',
                    required: false,
                    datatype: 'String',
                    formType: 'input',
                },
                {
                    name: 'Industry',
                    label: 'Industry',
                    required: false,
                    datatype: 'String',
                    formType: 'select',
                    picklistValues: [{value: 'Apparel', label: 'Apparel'},
                        {value: 'Banking', label: 'Banking'},
                        {value: 'Chemicals', label: 'Chemicals'},
                        {value: 'Communications', label: 'Communications'},
                        {value: 'Construction', label:'Construction'},
                        {value: 'Education', label:'Education'},
                        {value: 'Energy', label:'Energy'},
                        {value: 'Electronics', label:'Electronics'}
                    ]
                },
                {
                    name: 'Phone',
                    label: 'Phone',
                    required: false,
                    datatype: 'String',
                    formType: 'input',
                },
                {
                    name: 'Fax',
                    label: 'Fax',
                    required: false,
                    datatype: 'String',
                    formType: 'input',
                },
                {
                    name: 'NumberOfEmployees',
                    label: 'Employees',
                    required: false,
                    datatype: 'number',
                    formType: 'input',
                    formSubType: 'number'
                },
                {
                    name: 'Description',
                    label: 'Description',
                    required: false,
                    datatype: 'String',
                    formType: 'textarea',
                    formSubType: '',
                },
            ],
        },
        {
            name: 'Details',
            cols: 2,
            fields: [
                {
                    name: 'BillingStreet',
                    label: 'Address',
                    required: false,
                    datatype: 'String',
                    formType: 'textarea',
                    formSubType: '',
                    helpText: 'Address of the client, where the machine is installed'
                },
                {
                    name: 'ShippingStreet',
                    label: 'Shipping Address',
                    required: false,
                    datatype: 'String',
                    formType: 'textarea',
                    formSubType: '',
                    helpText: 'Address of the client, for sending letters'
                }
            ],
        }
    ]
};

module.exports = account;
