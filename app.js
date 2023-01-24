const express = require("express");
const app = express();
const port = 5000;
var mysql = require("mysql");
const reader = require("xlsx");
const cors = require("cors");
const { json } = require("express");
const moment = require("moment");

const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};

app.use(cors(corsOpts));

// ----------today and yessteerday date ----------
var today = moment().format("YYYY-MM-DD");
var d = new Date();
d.setDate(d.getDate() - 1);

const getNumberInTwoDigit = (number) => {
  return (number < 10 ? "0" : "") + number;
};

// ------------csvFile data fetch ------------
const getDataOfMinuteByMinuteTrend = () => {
  const file = reader.readFile("minuteByMinute_trend.csv");
  let data = [];

  const sheets = file.SheetNames;

  for (let i = 0; i < sheets.length; i++) {
    const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
    temp.forEach((res) => {
      data.push(res);
    });
  }

  return data;
};

const getDataOfmatch2Landing = () => {
  const file = reader.readFile("match2landing.csv");
  let data = [];

  const sheets = file.SheetNames;

  for (let i = 0; i < sheets.length; i++) {
    const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
    temp.forEach((res) => {
      data.push(res);
    });
  }
  return data;
}

const getDataOflandingPageTrend = () => {
  const file = reader.readFile("Landing Page _Executive View_updated (1).xlsx");
  let data = [];
  const sheets = file.SheetNames;

  for (let i = 0; i < sheets.length; i++) {
    const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
    temp.forEach((res) => {
      data.push(res);
    });
  }
  return data;
};

// First Page APIs
app.get("/match1-viewers", (req, res) => {
  let data = getDataOfMinuteByMinuteTrend();

  let todayViewers = 0;
  let todayTime = null;
  let date;
  let chartData = [];

  data.forEach((element) => {
    let d = new Date(element.Date);

    let elementDate =
      d.getFullYear() +
      "-" +
      getNumberInTwoDigit(d.getMonth() + 1) +
      "-" +
      getNumberInTwoDigit(d.getDate());

    let elementTime =
      d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

    if (today === elementDate) {
      date = element.Date;
      todayViewers += element.Viewers;
      chartData.push(element.Viewers);

      if (todayTime === null) {
        todayTime = elementTime;
      } else if (todayTime < elementTime) {
        todayTime = elementTime;
      }
    }
  });

  const arr = [
    {
      dateAndTime: date,
      viewers: todayViewers,
      lastUpdateTime: todayTime,
      chartData: chartData,
    },
  ];

  res.end(JSON.stringify(arr));
});

app.get("/match1-watchtime", (req, res) => {
  let data = getDataOfMinuteByMinuteTrend();

  let todayWatchtime = 0;
  let todayTime = null;
  let date;
  let chartData = [];

  data.forEach((element) => {
    let d = new Date(element.Date);

    let elementDate =
      d.getFullYear() +
      "-" +
      getNumberInTwoDigit(d.getMonth() + 1) +
      "-" +
      getNumberInTwoDigit(d.getDate());

    let elementTime =
      d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

    if (today === elementDate) {
      todayWatchtime += element.Watchtime_mins;
      date = element.Date;
      chartData.push(element.Watchtime_mins);
      if (todayTime === null) {
        todayTime = elementTime;
      } else if (todayTime < elementTime) {
        todayTime = elementTime;
      }
    }
  });

  const arr = [
    {
      dateAndTime: date,
      watchtime: todayWatchtime,
      lastUpdateTime: todayTime,
      chartData: chartData,
    },
  ];
  res.end(JSON.stringify(arr));
});

app.get("/match1-ad_impression", (req, res) => {
  let data = getDataOfMinuteByMinuteTrend();

  let todayAdImpression = 0;
  let todayTime = null;
  let date;
  let chartData = [];

  data.forEach((element) => {
    let d = new Date(element.Date);

    let elementDate =
      d.getFullYear() +
      "-" +
      getNumberInTwoDigit(d.getMonth() + 1) +
      "-" +
      getNumberInTwoDigit(d.getDate());

    let elementTime =
      d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

    if (today === elementDate) {
      date = element.Date;
      todayAdImpression += element.Ad_Impression;
      chartData.push(element.Ad_Impression);
      if (todayTime === null) {
        todayTime = elementTime;
      } else if (todayTime < elementTime) {
        todayTime = elementTime;
      }
    }
  });

  const arr = [
    {
      dateAndTime: date,
      adImpression: todayAdImpression,
      lastUpdateTime: todayTime,
      chartData: chartData,
    },
  ];

  res.end(JSON.stringify(arr));
});

app.get("/match2-viewers", (req, res) => {
  let data = getDataOfmatch2Landing();

  let todayViewers = 0;
  let todayTime = null;
  let date;
  let chartData = [];

  data.forEach((element) => {
    let d = new Date(element.Date);

    let elementDate =
      d.getFullYear() +
      "-" +
      getNumberInTwoDigit(d.getMonth() + 1) +
      "-" +
      getNumberInTwoDigit(d.getDate());

    let elementTime =
      d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

    if (today === elementDate) {
      date = element.Date;
      todayViewers += element.Viewers;
      chartData.push(element.Viewers);

      if (todayTime === null) {
        todayTime = elementTime;
      } else if (todayTime < elementTime) {
        todayTime = elementTime;
      }
    }
  });

  const arr = [
    {
      dateAndTime: date,
      viewers: todayViewers,
      lastUpdateTime: todayTime,
      chartData: chartData,
    },
  ];

  res.end(JSON.stringify(arr));
});

app.get("/match2-watchtime", (req, res) => {
  let data = getDataOfmatch2Landing();

  let todayWatchtime = 0;
  let todayTime = null;
  let date;
  let chartData = [];

  data.forEach((element) => {
    let d = new Date(element.Date);

    let elementDate =
      d.getFullYear() +
      "-" +
      getNumberInTwoDigit(d.getMonth() + 1) +
      "-" +
      getNumberInTwoDigit(d.getDate());

    let elementTime =
      d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

    if (today === elementDate) {
      todayWatchtime += element.Watchtime_mins;
      date = element.Date;
      chartData.push(element.Watchtime_mins);
      if (todayTime === null) {
        todayTime = elementTime;
      } else if (todayTime < elementTime) {
        todayTime = elementTime;
      }
    }
  });

  const arr = [
    {
      dateAndTime: date,
      watchtime: todayWatchtime,
      lastUpdateTime: todayTime,
      chartData: chartData,
    },
  ];
  res.end(JSON.stringify(arr));
});

app.get("/match2-ad_impression", (req, res) => {
  let data = getDataOfmatch2Landing();

  let todayAdImpression = 0;
  let todayTime = null;
  let date;
  let chartData = [];

  data.forEach((element) => {
    let d = new Date(element.Date);

    let elementDate =
      d.getFullYear() +
      "-" +
      getNumberInTwoDigit(d.getMonth() + 1) +
      "-" +
      getNumberInTwoDigit(d.getDate());

    let elementTime =
      d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

    if (today === elementDate) {
      date = element.Date;
      todayAdImpression += element.Ad_Impression;
      chartData.push(element.Ad_Impression);
      if (todayTime === null) {
        todayTime = elementTime;
      } else if (todayTime < elementTime) {
        todayTime = elementTime;
      }
    }
  });

  const arr = [
    {
      dateAndTime: date,
      adImpression: todayAdImpression,
      lastUpdateTime: todayTime,
      chartData: chartData,
    },
  ];

  res.end(JSON.stringify(arr));
});

// Second Page APIs
app.get("/digital", (req, res) => {
  let data = getDataOflandingPageTrend();

  // console.log(data);
  let totalOfAllDegitalCumulative_Viewers = 0;
  let totalOfAllDegitalCumulative_Watchtime = 0;

  let lastSevenDayDataOfCumulative_Viewers = [];
  let lastSevenDayDataOfCumulative_Watchtime = [];

  let lastSevenDayAvgOfCumulative_Viewers;
  let lastSevenDayAvgOfCumulative_Watchtime;

  let count = 0;
  data.forEach((element) => {
    if (element.Source === "Digital") {
      console.log(element.Viewers);
      count += 1;
      if (count <= 7) {

      }
      lastSevenDayDataOfCumulative_Viewers.push(element.cumulative_Viewers);
      lastSevenDayDataOfCumulative_Watchtime.push(element.cumulative_Watchtime);
      if (element.Viewers !== undefined && element.Watchtime !== undefined) {
        totalOfAllDegitalCumulative_Viewers += (element.Viewers);
        totalOfAllDegitalCumulative_Watchtime += (element.Watchtime);
      }

    }
  });

  if (lastSevenDayDataOfCumulative_Watchtime.length > 0) {
    let avgCountOfWatchTime = 0;
    let avgCountOfViewers = 0;

    lastSevenDayDataOfCumulative_Viewers.forEach((element) => {
      avgCountOfWatchTime += element;
      lastSevenDayAvgOfCumulative_Viewers = avgCountOfWatchTime;
    });

    lastSevenDayDataOfCumulative_Watchtime.forEach((element) => {
      avgCountOfViewers += element;
      lastSevenDayAvgOfCumulative_Watchtime = avgCountOfViewers;
    });
  }

  const arr = {
    title: "Digital",
    viewers: {
      title: "Cumulative Viewers",
      totalViewers: totalOfAllDegitalCumulative_Viewers,
      areaChartData: lastSevenDayDataOfCumulative_Viewers,
      different: lastSevenDayAvgOfCumulative_Viewers,
      prev: "5.33K",
    },
    watchTime: {
      title: "Cumulative  Watch Time",
      totalWatchTime: totalOfAllDegitalCumulative_Watchtime,
      areaChartData: lastSevenDayDataOfCumulative_Watchtime,
      different: lastSevenDayAvgOfCumulative_Watchtime,
      prev: "5.33K",
    },
  };

  res.end(JSON.stringify(arr));
});

app.get("/linear", (req, res) => {
  let data = getDataOflandingPageTrend();

  let totalOfAllLinearCumulative_Viewers = 0;
  let totalOfAllLinearCumulative_Watchtime = 0;

  let lastSevenDayDataOfCumulative_Viewers = [];
  let lastSevenDayDataOfCumulative_Watchtime = [];

  let lastSevenDayAvgOfCumulative_Viewers;
  let lastSevenDayAvgOfCumulative_Watchtime;

  let count = 0;

  data.forEach((element) => {
    if (element.Source === "Linear") {
      count += 1;
      if (count <= 7) {
        console.log(element);
      }
      lastSevenDayDataOfCumulative_Watchtime.push(element.cumulative_Watchtime);
      lastSevenDayDataOfCumulative_Viewers.push(element.cumulative_Viewers);
      totalOfAllLinearCumulative_Viewers += element.Viewers;
      totalOfAllLinearCumulative_Watchtime += element.Watchtime;
    }
  });

  if (lastSevenDayDataOfCumulative_Watchtime.length > 0) {
    let avgCountOfWatchTime = 0;
    let avgCountOfViewers = 0;

    lastSevenDayDataOfCumulative_Viewers.forEach((element) => {
      avgCountOfWatchTime += element;
      lastSevenDayAvgOfCumulative_Viewers = avgCountOfWatchTime / 7;
    });

    lastSevenDayDataOfCumulative_Watchtime.forEach((element) => {
      avgCountOfViewers += element;
      lastSevenDayAvgOfCumulative_Watchtime = avgCountOfViewers / 7;
    });
  }

  const arr = {
    title: "Linear",
    viewers: {
      title: "Cumulative  Reach",
      totalViewers: totalOfAllLinearCumulative_Viewers,
      areaChartData: lastSevenDayDataOfCumulative_Viewers,
      different: lastSevenDayAvgOfCumulative_Viewers,
      prev: "5.33K",
    },
    watchTime: {
      title: "Cumulative  Watch Time",
      totalWatchTime: totalOfAllLinearCumulative_Watchtime,
      areaChartData: lastSevenDayDataOfCumulative_Watchtime,
      different: lastSevenDayAvgOfCumulative_Watchtime,
      prev: "5.33K",
    },
  };

  res.end(JSON.stringify(arr));
});

app.get("/combined", (req, res) => {
  let data = getDataOflandingPageTrend();

  let countOfDigital = 0;
  let countOfLinear = 0;

  let lastSevenDayDataOfLinearCumulative_Viewers = [];
  let lastSevenDayDataOfLinearCumulative_WatchTime = [];
  let lastSevenDayDataOfDigitalCumulative_Viewers = [];
  let lastSevenDayDataOfDigitalCumulative_WatchTime = [];

  let lastSevenDayDataOfDigitalPluseLinearCumulative_Viewers = [];
  let lastSevenDayDataOfDigitalPluseLinearCumulative_WatchTime = [];

  let totalOfAllCombinedCumulative_Viewers = 0;
  let totalOfAllCombinedCumulative_WatchTime = 0;

  let avgOfCumulative_Viewers;
  let avgOfCumulative_WatchTime;

  data.forEach((element) => {
    if (element.Source === "Linear") {
      countOfLinear += 1;
      if (countOfLinear <= 7) {

      }
      lastSevenDayDataOfLinearCumulative_Viewers.push(
        element.cumulative_Viewers
      );
      lastSevenDayDataOfLinearCumulative_WatchTime.push(
        element.cumulative_Watchtime
      );
    }

    if (element.Source === "Digital") {
      countOfDigital += 1;
      if (countOfDigital <= 7) {

      }
      lastSevenDayDataOfDigitalCumulative_Viewers.push(
        element.cumulative_Viewers
      );
      lastSevenDayDataOfDigitalCumulative_WatchTime.push(
        element.cumulative_Watchtime
      );
    }
  });

  if (
    lastSevenDayDataOfLinearCumulative_Viewers.length > 0 &&
    lastSevenDayDataOfLinearCumulative_WatchTime.length > 0 &&
    lastSevenDayDataOfDigitalCumulative_Viewers.length > 0 &&
    lastSevenDayDataOfDigitalCumulative_WatchTime.length > 0
  ) {
    for (
      let i = 0;
      i < lastSevenDayDataOfLinearCumulative_Viewers.length;
      i++
    ) {
      lastSevenDayDataOfDigitalPluseLinearCumulative_Viewers[i] =
        lastSevenDayDataOfLinearCumulative_Viewers[i] +
        lastSevenDayDataOfDigitalCumulative_Viewers[i];
      lastSevenDayDataOfDigitalPluseLinearCumulative_WatchTime[i] =
        lastSevenDayDataOfLinearCumulative_WatchTime[i] +
        lastSevenDayDataOfDigitalCumulative_WatchTime[i];
    }
  }

  if (
    lastSevenDayDataOfDigitalPluseLinearCumulative_Viewers.length > 0 &&
    lastSevenDayDataOfDigitalPluseLinearCumulative_WatchTime.length > 0
  ) {
    for (
      let i = 0;
      i < lastSevenDayDataOfDigitalPluseLinearCumulative_Viewers.length;
      i++
    ) {
      totalOfAllCombinedCumulative_Viewers +=
        lastSevenDayDataOfDigitalPluseLinearCumulative_Viewers[i];
      totalOfAllCombinedCumulative_WatchTime +=
        lastSevenDayDataOfDigitalPluseLinearCumulative_WatchTime[i];
    }
  }

  if (
    totalOfAllCombinedCumulative_Viewers !== 0 &&
    totalOfAllCombinedCumulative_WatchTime !== 0
  ) {
    avgOfCumulative_Viewers = totalOfAllCombinedCumulative_Viewers / 7;
    avgOfCumulative_WatchTime = totalOfAllCombinedCumulative_WatchTime / 7;
  }

  const arr = {
    title: "Combined",
    viewers: {
      title: "Cumulative  Viewers",
      totalViewers: totalOfAllCombinedCumulative_Viewers,
      areaChartData: lastSevenDayDataOfDigitalPluseLinearCumulative_Viewers,
      different: avgOfCumulative_Viewers,
      prev: "5.33K",
    },
    watchTime: {
      title: "Cumulative  Watch Time",
      totalWatchTime: totalOfAllCombinedCumulative_WatchTime,
      areaChartData:
        lastSevenDayDataOfDigitalPluseLinearCumulative_WatchTime,
      different: avgOfCumulative_WatchTime,
      prev: "5.33K",
    },
  };

  res.end(JSON.stringify(arr));
});

app.get("/ottWatchTimeApi", (req, res) => {
  const arr = [
    {
      title: "Watch Time",
      time: "254.23 Min",
      different: "-36.5%",
      prev: "5.33K",
    },
  ];
  res.end(JSON.stringify(arr));
});

app.get("/executiveupdateapi", (req, res) => {
  const arr = [
    {
      updated_on: "19-12-2022",
      expected_update: "20-12-2022",
    },
  ];
  res.end(JSON.stringify(arr));
});

// Third page APIs
app.get("/sociallisteningapi", (req, res) => {
  const arr = [
    {
      total_numbers: {
        mentions: {
          title: "Total Mentions",
          views: "2.447 K",
          different: "-36.5%",
          prev: "5.33K",
        },
        distinct_users: {
          title: "Total Distinct Users",
          views: "2.567 K",
          different: "-36.5%",
          prev: "5.33K",
        },
        engagement: {
          title: "Total Engagement",
          views: "245.447 K",
          different: "-36.5%",
          prev: "5.33K",
        },
      },
      chart_data: {
        donut_chart: {
          data: { a: 3, b: 25, c: 30 },
        },
        words_cloud: {
          data: [
            {
              text: "told",
              value: 64,
            },
            {
              text: "mistake",
              value: 11,
            },
            {
              text: "thought",
              value: 16,
            },
            {
              text: "bad",
              value: 17,
            },
            {
              text: "correct",
              value: 10,
            },
            {
              text: "day",
              value: 54,
            },
            {
              text: "prescription",
              value: 12,
            },
            {
              text: "time",
              value: 77,
            },
            {
              text: "thing",
              value: 45,
            },
            {
              text: "left",
              value: 19,
            },
            {
              text: "pay",
              value: 13,
            },
            {
              text: "people",
              value: 32,
            },
            {
              text: "month",
              value: 22,
            },
            {
              text: "again",
              value: 35,
            },
            {
              text: "review",
              value: 24,
            },
            {
              text: "call",
              value: 38,
            },
            {
              text: "doctor",
              value: 70,
            },
            {
              text: "asked",
              value: 26,
            },
            {
              text: "finally",
              value: 14,
            },
            {
              text: "insurance",
              value: 29,
            },
            {
              text: "week",
              value: 41,
            },
            {
              text: "called",
              value: 49,
            },
            {
              text: "problem",
              value: 20,
            },
            {
              text: "going",
              value: 59,
            },
            {
              text: "help",
              value: 49,
            },
            {
              text: "felt",
              value: 45,
            },
            {
              text: "discomfort",
              value: 11,
            },
            {
              text: "lower",
              value: 22,
            },
            {
              text: "severe",
              value: 12,
            },
            {
              text: "free",
              value: 38,
            },
            {
              text: "better",
              value: 54,
            },
            {
              text: "muscle",
              value: 14,
            },
            {
              text: "neck",
              value: 41,
            },
            {
              text: "root",
              value: 24,
            },
            {
              text: "adjustment",
              value: 16,
            },
            {
              text: "therapy",
              value: 29,
            },
            {
              text: "injury",
              value: 20,
            },
            {
              text: "excruciating",
              value: 10,
            },
            {
              text: "chronic",
              value: 13,
            },
            {
              text: "chiropractor",
              value: 35,
            },
            {
              text: "treatment",
              value: 59,
            },
            {
              text: "tooth",
              value: 32,
            },
            {
              text: "chiropractic",
              value: 17,
            },
            {
              text: "dr",
              value: 77,
            },
            {
              text: "relief",
              value: 19,
            },
            {
              text: "shoulder",
              value: 26,
            },
            {
              text: "nurse",
              value: 17,
            },
            {
              text: "room",
              value: 22,
            },
            {
              text: "hour",
              value: 35,
            },
            {
              text: "wait",
              value: 38,
            },
            {
              text: "hospital",
              value: 11,
            },
            {
              text: "eye",
              value: 13,
            },
            {
              text: "test",
              value: 10,
            },
            {
              text: "appointment",
              value: 49,
            },
            {
              text: "medical",
              value: 19,
            },
            {
              text: "question",
              value: 20,
            },
            {
              text: "office",
              value: 64,
            },
            {
              text: "care",
              value: 54,
            },
            {
              text: "minute",
              value: 29,
            },
            {
              text: "waiting",
              value: 16,
            },
            {
              text: "patient",
              value: 59,
            },
            {
              text: "health",
              value: 49,
            },
            {
              text: "alternative",
              value: 24,
            },
            {
              text: "holistic",
              value: 19,
            },
            {
              text: "traditional",
              value: 20,
            },
            {
              text: "symptom",
              value: 29,
            },
            {
              text: "internal",
              value: 17,
            },
            {
              text: "prescribed",
              value: 26,
            },
            {
              text: "acupuncturist",
              value: 16,
            },
            {
              text: "pain",
              value: 64,
            },
            {
              text: "integrative",
              value: 10,
            },
            {
              text: "herb",
              value: 13,
            },
            {
              text: "sport",
              value: 22,
            },
            {
              text: "physician",
              value: 41,
            },
            {
              text: "herbal",
              value: 11,
            },
            {
              text: "eastern",
              value: 12,
            },
            {
              text: "chinese",
              value: 32,
            },
            {
              text: "acupuncture",
              value: 45,
            },
            {
              text: "prescribe",
              value: 14,
            },
            {
              text: "medication",
              value: 38,
            },
            {
              text: "western",
              value: 35,
            },
            {
              text: "sure",
              value: 38,
            },
            {
              text: "work",
              value: 64,
            },
            {
              text: "smile",
              value: 17,
            },
            {
              text: "teeth",
              value: 26,
            },
            {
              text: "pair",
              value: 11,
            },
            {
              text: "wanted",
              value: 20,
            },
            {
              text: "frame",
              value: 13,
            },
            {
              text: "lasik",
              value: 10,
            },
            {
              text: "amazing",
              value: 41,
            },
            {
              text: "fit",
              value: 14,
            },
            {
              text: "happy",
              value: 22,
            },
            {
              text: "feel",
              value: 49,
            },
            {
              text: "glasse",
              value: 19,
            },
            {
              text: "vision",
              value: 12,
            },
            {
              text: "pressure",
              value: 16,
            },
            {
              text: "find",
              value: 29,
            },
            {
              text: "experience",
              value: 59,
            },
            {
              text: "year",
              value: 70,
            },
            {
              text: "massage",
              value: 35,
            },
            {
              text: "best",
              value: 54,
            },
            {
              text: "mouth",
              value: 20,
            },
            {
              text: "staff",
              value: 64,
            },
            {
              text: "gum",
              value: 10,
            },
            {
              text: "chair",
              value: 12,
            },
            {
              text: "ray",
              value: 22,
            },
            {
              text: "dentistry",
              value: 11,
            },
            {
              text: "canal",
              value: 13,
            },
            {
              text: "procedure",
              value: 32,
            },
            {
              text: "filling",
              value: 26,
            },
            {
              text: "gentle",
              value: 19,
            },
            {
              text: "cavity",
              value: 17,
            },
            {
              text: "crown",
              value: 14,
            },
            {
              text: "cleaning",
              value: 38,
            },
            {
              text: "hygienist",
              value: 24,
            },
            {
              text: "dental",
              value: 59,
            },
            {
              text: "charge",
              value: 24,
            },
            {
              text: "cost",
              value: 29,
            },
            {
              text: "charged",
              value: 13,
            },
            {
              text: "spent",
              value: 17,
            },
            {
              text: "paying",
              value: 14,
            },
            {
              text: "pocket",
              value: 12,
            },
            {
              text: "dollar",
              value: 11,
            },
            {
              text: "business",
              value: 32,
            },
            {
              text: "refund",
              value: 10,
            },
          ],
        },
        consumer_track: {
          data: [
            { rating: "Awareness", percent: "75" },
            { rating: "Viewability", percent: "50" },
            { rating: "Consideration(Zee)", percent: "43" },
            { rating: "Favorite (Player)", percent: "20" },
          ],
        },
        qualitative_input: {
          data: [
            { rating: "Property Feedback", percent: "50" },
            { rating: "Player Likability", percent: "75" },
            { rating: "Willingness to Continue", percent: "43" },
          ],
        },
      },
    },
  ];
  res.end(JSON.stringify(arr));
});

app.get("/ottGraphApi", (req, res) => {
  // Reading our test file
  const file = reader.readFile("test.csv");
  let data = [];
  const sheets = file.SheetNames;

  for (let i = 0; i < sheets.length; i++) {
    const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
    temp.forEach((res) => {
      data.push(res);
    });
  }

  var scoreHome = [];
  data.forEach((element) => {
    // console.log(element.score);
    scoreHome.push(element.score);
  });
  var l = JSON.stringify(scoreHome);
  // console.log("Array is here:", scoreHome);
  res.end(JSON.stringify(scoreHome));
});

app.get("/csvApi", (req, res) => {
  // Reading our test file
  const file = reader.readFile("landing.csv");

  let data = [];

  const sheets = file.SheetNames;

  for (let i = 0; i < sheets.length; i++) {
    const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
    temp.forEach((res) => {
      data.push(res);
    });
  }

  var scoreHome = 0;
  data.forEach((element) => {
    // console.log(element.score);
    scoreHome = scoreHome + element.Watchtime;
  });
  var l = JSON.stringify(scoreHome);
  // console.log("sum issss:", scoreHome);
  res.end(JSON.stringify(scoreHome));
});


app.get("/organic-data-api", (req, res) => {
  const data = [
    {
      ORGANIC: "49%",
      PAID: "54%",
      RETURNING: "25%",
      NEW: "75%",
      ANONYMOUS:"82%",
      SIGNUP:"18%",
      EXPLORE:"50%",
      SEARCH:"20%",
      SUBSCRIBED: "07%",
      WATCHADS: "30%",
      WATCHPREMIUMCONTENT: "3%",
      WATCHFREECONTENT: "54%"
    },
  ];
  res.end(JSON.stringify(data));
});



app.get("/sumAPIs", (req, res) => {
  var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "dict",
  });

  con.connect(function (err) {
    if (err) throw err;
    //Select all customers and return the result object:
    con.query("SELECT * FROM chart_data", function (err, result, fields) {
      if (err) throw err;
      var scoreHome = 0;
      result.forEach((element) => {
        // console.log(element.score);
        scoreHome = scoreHome + element.score;
      });
      var l = JSON.stringify(scoreHome);
      // console.log("sum is:", scoreHome);
      res.end(JSON.stringify(scoreHome));
    });
  });
});

app.listen(port, () => {
  console.log("This aplication is running on port 5000");
});
