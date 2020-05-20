const input1 = [
  ["9:00", "10:30"],
  ["12:00", "13:00"],
  ["16:00", "18:00"],
];
const input2 = [
  ["10:00", "10:30"],
  ["12:30", "14:30"],
  ["14:30", "15:00"],
  ["16:00", "17:00"],
];
const dailyBound1 = ["9:00", "20:00"];
const dailyBound2 = ["10:00", "18:30"];
const meetingIncrement = 30;

// Output = [["10:30", "12:00"], ["15:00", "16:00"], ["18:00", "18:30"]];

function meetingSetup(input1, input2, dailyBound1, dailyBound2) {
  const availableTimeOutput = [];
  let sortedAndMergedArray = [];
  let startBound;
  let endBound;
  let index = 0;

  const timeConverter = (time) => {
    [hour, min] = time.split(":");
    return parseInt(hour) * 60 + parseInt(min);
  };

  const timeReConverter = (totalMin) => {
    let hour = Math.floor(totalMin / 60);
    let min = "00";
    if (totalMin % 60 != 0) min = "30";
    return `${hour}:${min}`;
  };

  const convertArrayToMin = (array) => {
    array.forEach((element) => {
      element[0] = timeConverter(element[0]);
      element[1] = timeConverter(element[1]);
    });
  };

  const convertArrayToHour = (array) => {
    array.forEach((element) => {
      element[0] = timeReConverter(element[0]);
      element[1] = timeReConverter(element[1]);
    });
  };

  const sortSchedule = (array1, array2) => {
    const sortedArray = [];
    sortedArray.push(...array1, ...array2);
    sortedArray.sort((a, b) => a[0] - b[0]);
    console.log(sortedArray);
    while (sortedArray.length > 1) {
      if (sortedArray[0][1] < sortedArray[1][0]) {
        sortedAndMergedArray.push(sortedArray.shift());
      } else if (
        sortedArray[1][0] <= sortedArray[0][1] &&
        sortedArray[0][1] <= sortedArray[1][1]
      ) {
        sortedArray.splice(0, 2, [sortedArray[0][0], sortedArray[1][1]]);
      } else if (sortedArray[0][1] > sortedArray[1][1]) {
        sortedArray.splice(1, 1);
      }
    }

    sortedAndMergedArray.push(sortedArray.shift());
  };

  if (timeConverter(dailyBound1[0]) > timeConverter(dailyBound2[0]))
    startBound = timeConverter(dailyBound1[0]);
  else startBound = timeConverter(dailyBound2[0]);

  if (timeConverter(dailyBound1[1]) > timeConverter(dailyBound2[1]))
    endBound = timeConverter(dailyBound2[1]);
  else endBound = timeConverter(dailyBound1[1]);

  convertArrayToMin(input1);
  convertArrayToMin(input2);
  sortSchedule(input1, input2);

  while (index > -1 && index < sortedAndMergedArray.length) {
    if (startBound < sortedAndMergedArray[index][0]) {
      availableTimeOutput.push([startBound, sortedAndMergedArray[index][0]]);
      break;
    } else if (
      sortedAndMergedArray[index][0] <=
      startBound <=
      sortedAndMergedArray[index][1]
    ) {
      availableTimeOutput.push([
        sortedAndMergedArray[index][1],
        sortedAndMergedArray[index + 1][0],
      ]);
      break;
    }
    index++;
  }

  index++;

  while (index > -1 && index < sortedAndMergedArray.length - 1) {
    if (
      sortedAndMergedArray[index][1] < endBound &&
      sortedAndMergedArray[index + 1][0] > endBound
    ) {
      availableTimeOutput.push([sortedAndMergedArray[index][1], endBound]);
    } else if (
      sortedAndMergedArray[index][1] < endBound &&
      sortedAndMergedArray[index + 1][0] < endBound
    ) {
      availableTimeOutput.push([
        sortedAndMergedArray[index][1],
        sortedAndMergedArray[index + 1][0],
      ]);
    }
    index++;
  }

  if (sortedAndMergedArray[index][1] < endBound) {
    availableTimeOutput.push([sortedAndMergedArray[index][1], endBound]);
  }

  convertArrayToHour(availableTimeOutput);

  return availableTimeOutput;
}

console.log(
  meetingSetup(input1, input2, dailyBound1, dailyBound2, meetingIncrement)
);
