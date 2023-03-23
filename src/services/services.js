import PocketBase from "pocketbase";
// import fetch from 'cross-fetch';
import 'cross-fetch/polyfill';

const pb = new PocketBase("http://129.150.56.59:8090");

const fetchList1 = async () => {
    //get regular and adhoc lists from pocketbase
    const regularList = await pb.collection("regular").getFullList({
      sort: "-created",
    });
    const adhocList = await pb.collection("adhoc").getFullList({
      sort: "+when",
    });

    //sort regularList based on time

    //change "when" field into date, hour and minute
    adhocList.forEach((record) => {
      const [date, time] = record.when.split(" ");
      const [hour, minute] = time.split(":");
      record.date = date;
      record.hour = Number(hour);
      record.minute = Number(minute);
      record.reminderDate = new Date(record.when);
    });
    console.log("adhocList");
    console.log(adhocList);

    var list = [];
    const today = new Date();

    adhocList.forEach((record) => {
      if (record.reminderDate.getDate() == today.getDate() &&
        record.reminderDate.getMonth() == today.getMonth()) {
          list.push(record);
      }
    });

    console.log(list);
    regularList.forEach((record) => {
      if (record.day == today.getDay() - 1 || record.day == -1) {
          list.push(record);
      }
    });

    list.sort((a, b) => {
      if (a.hour === b.hour) {
        return a.minute - b.minute;
      } else {
        return a.hour - b.hour;
      }
    });

    list.forEach((reminder) => {
      console.log("today hour" + today.getHours() + "reminder hour" + reminder.hour);
      if (
        today.getHours() > reminder.hour ||
        (today.getHours() == reminder.hour &&
          today.getMinutes() > reminder.hour)
      ) {
        reminder.state = "passed";
      } else {
        reminder.state = "upcoming";
      }
    });
    setList(list);
    setLoading(false);
    console.log("====================================");
    console.log(list);
    console.log("====================================");
  };
  fetchList1();


export {
	fetchList
};