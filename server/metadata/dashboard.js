const dashboard = {
  workOrderByTime: {
    columns: [{'type': 'string', 'label': 'Month'},
      {'type': 'number', 'label': 'Work Order'},
      {'type': 'number', 'role': 'annotation'}],
    options: {
      is3D: true,
      legend: 'bottom',
      theme: 'maximized',
      hAxis: {
        title: 'Month'
      },
      vAxis: {
        title: 'Work Orders Completed'
      }
    }
  },
  workOrderByUser: {
    columns: [{'type': 'string', 'label': 'User'}, {'type': 'number', 'label': 'Work Order'},
      {'type': 'number', 'role': 'annotation'}],
    options: {
      is3D: true,
      legend: 'right',
      theme: 'maximized'
    }
  },
  top10Client: {
    columns: [{'type': 'string', 'label': 'Client'}, {'type': 'number', 'label': 'Work Order'},
      {'type': 'number', 'role': 'annotation'}],
    options: {
      is3D: true,
      legend: 'right',
      theme: 'maximized',
      hAxis: {
        title: 'Work Oder'
      },
      vAxis: {
        title: 'Accounts'
      }
    }
  }
  
}

export default dashboard;
