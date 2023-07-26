const Chartone = () => {


    const data = {
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      };
      const config = {
        type: 'doughnut',
        data: data,
      };
      // </block:config>
      
      module.exports = {
        actions: [],
        config: config,
      };

    return ( <>
  <div className="card">
  <div className="card-header ui-sortable-handle" style={{cursor: 'move'}}>
    <h3 className="card-title">
      <i className="fas fa-chart-pie mr-1" />
      Sales
    </h3>
    <div className="card-tools">
      <ul className="nav nav-pills ml-auto">
        <li className="nav-item">
          <a className="nav-link active" href="#revenue-chart" data-toggle="tab">Area</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#sales-chart" data-toggle="tab">Donut</a>
        </li>
      </ul>
    </div>
  </div>{/* /.card-header */}
  <div className="card-body">
    <div className="tab-content p-0">
      {/* Morris chart - Sales */}
      <div className="chart tab-pane active" id="revenue-chart" style={{position: 'relative', height: 300}}><div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div className /></div><div className="chartjs-size-monitor-shrink"><div className /></div></div>
        <canvas id="revenue-chart-canvas" height={300} style={{height: 300, display: 'block', width: 577}} width={577} className="chartjs-render-monitor" />
      </div>
      <div className="chart tab-pane" id="sales-chart" style={{position: 'relative', height: 300}}><div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div className /></div><div className="chartjs-size-monitor-shrink"><div className /></div></div>
        <canvas id="sales-chart-canvas" height={300} style={{height: 300, display: 'block', width: 577}} className="chartjs-render-monitor" width={577} />
      </div>
    </div>
  </div>{/* /.card-body */}
</div>



<div className="card card-danger">
  <div className="card-header">
    <h3 className="card-title">Donut Chart</h3>
    <div className="card-tools">
      <button type="button" className="btn btn-tool" data-card-widget="collapse">
        <i className="fas fa-minus" />
      </button>
      <button type="button" className="btn btn-tool" data-card-widget="remove">
        <i className="fas fa-times" />
      </button>
    </div>
  </div>
  <div className="card-body"><div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div className /></div><div className="chartjs-size-monitor-shrink"><div className /></div></div>
    <canvas id="donutChart" style={{minHeight: 250, height: 250, maxHeight: 250, maxWidth: '100%', display: 'block', width: 487}} width={487} height={250} className="chartjs-render-monitor" />
  </div>
  {/* /.card-body */}
</div>


    </> );
}
 
export default Chartone;