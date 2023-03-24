pb.collection("regular").subscribe("*", function (e) {
    if ((e.action == "create" || e.action == "update") && e.record.completeField == 2) {
        const reminder = e.record;
        const today = new Date();
        const tempList = list;
        if (reminder.day == today.getDay() - 1 || reminder.day == -1) {
          if (
            today.getHours() > reminder.hour ||
            (today.getHours() == reminder.hour &&
              today.getMinutes() > reminder.hour)
          ) {
            reminder.state = "passed";
          } else {
            reminder.state = "upcoming";
          }
          tempList.push(reminder);
          tempList.sort((a, b) => {
            if (a.hour === b.hour) {
              return a.minute - b.minute;
            } else {
              return a.hour - b.hour;
            }
          });
          console.log("subscribe reminder")
          console.log(list);
          setList(tempList);
      }
    }
  });

  pb.collection("adhoc").subscribe("*", function (e) {
    console.log(e);
  });



  list.forEach((reminder) => {
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

  const today = new Date();
  for (var i = 0; i < list.length; i++) {
    if (
        today.getHours() > list[i].hour ||
        (today.getHours() == list[i].hour &&
          today.getMinutes() > list[i].hour)
      ) {
        list[i].state = "passed";
      } else {
        list[i].state = "upcoming";
      }
    if ( (i == 0 || list[i-1].state == "passed") && (list[i].state == "upcoming") ) {
        list[i].state = "current";
    }
  }