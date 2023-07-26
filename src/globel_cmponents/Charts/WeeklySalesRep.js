/** @format */

import axios from "axios";
import requests from "../../utils/Requests";
import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
const WeeklySalesRep = () => {
  const [ChartData, setChartData] = useState({
    series: [],
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
      xaxis: {
        categories: [],
      },
    },
  });

  useEffect(() => {
    getDataForChart();
  }, []);

  const getDataForChart = () => {
    axios
      .post(requests.getDashboardSalesReport, {
        agentId: 0,
        attractionId: 0,
        period: 2,
        secretKey: "uZFEucIHAbqvgT7p87qC4Ms4tjqG34su",
      })
      .then((response) => {
        initializeData(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const initializeData = (salesData) => {
    let b2bSales = [],
      becSales = [],
      periodtime = [];
    for (let i = 0; i < salesData.salesCountList.length; i++) {
      b2bSales.push(salesData.salesCountList[i].b2bSalesCount);
      becSales.push(salesData.salesCountList[i].b2cSalesCount);
      periodtime.push(salesData.salesCountList[i].periodName.slice(0, 6));
      console.log(salesData.salesCountList[i].periodName);
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
            text: "Week",
          },
        },
        colors: ["#000080", "#FFFF00"],
      },
    });
  };
  return (
    <>
      <div className='mixed-chart'>
        <ReactApexChart
          options={ChartData.options}
          series={ChartData.series}
          type='bar'
          height={350}
        />
      </div>
    </>
  );
};

export default WeeklySalesRep;
