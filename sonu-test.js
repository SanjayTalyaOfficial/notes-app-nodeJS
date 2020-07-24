return new Promise(resolve => {
    // Your logic goes here
    app.memory.get('leavetype').then(() => {
        let curdate = new Date();
        let checkDate = new Date();
        app.log(app.prediction);
        if (app.prediction.entities && app.prediction.entities.date && app.prediction.entities.date.length > 0) {
            let startDate;
            app.log("s1");
            if (app.prediction.entities.date[0].value.value.from && app.prediction.entities.date[0].value.value.to) {
                startDate = new Date(app.prediction.entities.date[0].value.value.from);
                app.log("s2", startDate.toDateString());
                if (startDate > checkDate) {
                    let endDate = new Date(app.prediction.entities.date[0].value.value.to);
                    app.log("s3", endDate);
                    if (endDate > startDate) {
                        app.memory.set('startDate', startDate);
                        app.memory.set('endDate', endDate);
                        app.setMultipleSteps({
                            'startdate': startDate,
                            'enddate': endDate
                        }).then(() => {
                            resolve();
                        })

                    } else {
                        app.sendTextMessage("End Date must be after start date!").then(() => {
                            resolve({ success: false });
                        })
                    }
                } else {
                    app.sendTextMessage("Please choose dates after today!").then(() => {
                        resolve({ success: false });
                    })
                }
            } else {

                startDate = new Date(app.prediction.entities.date[0].value.value);
                app.log("s4", startDate.toDateString());
                if (startDate > checkDate) {

                    app.log("s5", checkDate.toDateString());
                    app.memory.set('startDate', startDate);
                    app.setMultipleSteps({
                        'startdate': startDate
                    }).then(() => {
                        resolve();
                    })
                } else {
                    app.sendTextMessage("Please choose dates after today!").then(() => {
                        resolve({ success: false });
                    })
                }
            }
        }
    })

});