/** @format */

import axios from "axios";
import requests from "../../utils/Requests";
import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { reduxForm, Form, Field, reset, initialize } from "redux-form";
import RenderField from "../../pages/formcomponent/formfields/RenderField";
import { Button, Col, Row } from "reactstrap";
const DailySalesRep = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;

  useEffect(() => {

    props.initialize({
      period: 1,
      attractionId:0,
      agentId:0
    });

    const tempData = {
      agentId: 0,
      attractionId: 0,
      period: 1,
      secretKey: "uZFEucIHAbqvgT7p87qC4Ms4tjqG34su",
    }
    getDataForChart(tempData);
    getagency();
    getallAttraction();
  }, []);
  const reportType = [
    {
      value: 1,
      label: "Daily",
    },
    {
      value: 2,
      label: "Weekly",
    },
    {
      value: 3,
      label: "Monthly",
    },
  ];

  const [ChartData, setChartData] = useState({
    series: [],
    options: {},
  });

  const onSubmit = (values) => {

    if(values.pill == "getReport"){
     
      getDataForChart(values)
    }else{
      props.initialize({
        period: 1,
        attractionId:0,
        agentId:0
      });
      const tempData = {
        agentId: 0,
        attractionId: 0,
        period: 1,
        secretKey: "uZFEucIHAbqvgT7p87qC4Ms4tjqG34su",
      }
      getDataForChart(tempData)
    }
   


  };
  const getDataForChart = (value) => {
  

    // let value = 1;
    axios
      .post(requests.getDashboardSalesReport, {
        agentId: value.agentId,
        attractionId: value.attractionId,
        period: value.period,
        secretKey: "uZFEucIHAbqvgT7p87qC4Ms4tjqG34su",
      })
      .then((response) => {
        initializeData(response.data, 1);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const initializeData = (salesData, periodval) => {
    let b2bSales = [],
      becSales = [],
      periodtime = [];
    for (let i = 0; i < salesData.salesCountList.length; i++) {
      b2bSales.push(salesData.salesCountList[i].b2bSalesCount);
      becSales.push(salesData.salesCountList[i].b2cSalesCount);
      periodtime.push(salesData.salesCountList[i].periodName.slice(0, 6));
    }
    setChartData({
      ...ChartData,
      series: [
        {
          name: "B2B Sales",
          data: b2bSales,
        },
        {
          name: "B2C Sales",
          data: becSales,
        },
      ],

      options: {
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "50%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        // xaxis: {
        //   categories: periodtime,
        // },

        yaxis: {
          labels: {
            formatter: function (value) {
              return value + "";
            },
          },
        },
        xaxis: {
          categories: periodtime,
          title: {
            text: getperiod(periodval),
          },
        },
        colors: getChartColor(periodval),
      },
    });
  };

  const getperiod = (val) => {
   
    if (val == 1) {
      return "Daily";
    } else if (val == 2) {
      return "Weekly";
    } else {
      return "Monthly";
    }
  };
  const getChartColor = (val) => {
    let chartColor = [];

    if (val == 1) {
      chartColor = ["#B3000C", "#0D5901"];
    } else if (val == 2) {
      chartColor = ["#000080", "#FFFF00"];
    } else {
      chartColor = ["#800080", "#008080"];
    }

    return chartColor;
  };

  const [agencyList, setagencyList] = useState([]);
  const getagency = () => {
    axios
      .post(requests.getagencylist, {
        attractionsId: 1,
        secretKey: requests.apiKey,
      })
      .then((res) => {
        let values = [...agencyList];
        values.push({
          label: "All",
          value: 0,
        });
        for (let i = 0; i < res.data.length; i++) {
          values.push({
            label: res.data[i].agencyName,
            value: res.data[i].agencyId,
          });
        }
     
        setagencyList(values);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [attractionList, setattractionList] = useState([]);
  const getallAttraction = () => {
    axios
      .post(requests.getAttractionListForUpdate, {
        attractionId: 1,
      })
      .then((res) => {
       
        let values = [...attractionList];
        values.push({
          label: "All",
          value: 0,
        });
        for (let i = 0; i < res.data.length; i++) {
          values.push({
            label: res.data[i].attName,
            value: res.data[i].attractionsId,
          });
        }
        setattractionList(values);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div class='card card-info'>
        <div class='card-header'>
          <h3 class='card-title'>Sales Report</h3>
        </div>
        <div class='card-body'>
          <Form>
            {/* <Field
              name='period' // 1 prepaid, 2 Credit
              type='select'
              customfeild={reportType}
              // label='Get Report For'
              // onChange={(e) => getDataForChart(e.target.value)}
              // onChange={(e) => getPayDetails(e.target.value)}
              component={RenderField.renderOptionField}
            /> */}
            <Row>
              <Col sm={2}>
                <Field
                  name='period'
                  label='Select Period'
                  component={RenderField.RenderSelectField}
                  options={reportType}
                />
              </Col>
              <Col sm={3}>
                <Field
                  name='attractionId'
                  label='Select Attraction '
                  component={RenderField.RenderSelectField}
                  options={attractionList}
                />
              </Col>
              <Col sm={3}>

              <Field
                  name='agentId'
                  label='Select Agent '
                  component={RenderField.RenderSelectField}
                  options={agencyList}
                />
              </Col>
              <Col sm={2}>
                <br/>
                <Button
                  color='primary'
                  className='btn btn-yellow'
                  onClick={handleSubmit((values) =>
                    onSubmit({
                      ...values,
                      pill: "getReport",
                    })
                  )}>
                 Get Report
                </Button>
              </Col>
              <Col sm={2}>
                <br/>
                <Button
                  color='danger'
                  className='btn btn-yellow'
                  onClick={handleSubmit((values) =>
                    onSubmit({
                      ...values,
                      pill: "reset",
                    })
                  )}>
                Reset
                </Button>
              </Col>
            </Row>
          </Form>

          <div className='mixed-chart'>
            <ReactApexChart
              options={ChartData.options}
              series={ChartData.series}
              type='bar'
              height={350}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default reduxForm({
  form: "DailySalesRep",
})(DailySalesRep);
