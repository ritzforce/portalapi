const sObjectConfig = {

    theme: {
      dbName: 'Scratch__c',
    },
    permissions: {
        create: true,
        read: true,
        update: true,
        delete: true
    },
    listView: [
        {name: 'name'},
        {name: 'description__c'},
        {name: 'comments__c'}
    ],
    detailView: [
        {
            name: 'Basic Information',
            cols: 2,
            fields: [
                {
                    name: 'name',
                    label: 'Name',
                    required: true,
                },
                {
                    name: 'comments__c',
                    label: 'comments',
                    required: true,
                },
            ],
        },
        {
            name: 'Details',
            cols: 2,
            fields: [
                {
                    name: 'description__c',
                    label: 'My Active',
                    required: false,
                },
                {
                    name: 'discount__c',
                    label: 'Discount',
                    required: false,
                }
            ],
        }
    ],
}

module.exports = sObjectConfig;