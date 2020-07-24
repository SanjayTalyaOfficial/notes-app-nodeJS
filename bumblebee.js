
return new Promise(resolve => {

    app.log("----> People is working <-----")
    let arcolor = { "Person": "good", "Group": "warning" };
    app.log(args);
    if (args && args.accessToken) {
        let query2 = args.query;
        let token = args.accessToken;
        if (query2.length == 0) {
            app.sendTextMessage("Search query is required for finding people!").then(() => {
                resolve();
            })
        } else {
            //app.log(query2,token);
            //app.executeApi('people', {accessToken: "", query: ""}).then(app.log).catch(app.log)
            app.executeApi('people', { accessToken: token, query: query2 })
                .then((response) => {
                    let respBody = response.body;
                    if (typeof respBody == "string") {
                        respBody = JSON.parse(respBody);
                        app.log(respBody);
                        if (respBody.value) {
                            let hit = respBody.value;
                            let searchData = [];
                            for (let i = 0; i < hit.length; i++) {
                                let phonen = "", jobTitle = "", department = "", userPrincipalName = "";
                                if (hit[i].jobTitle != null) { jobTitle = hit[i].jobTitle; }
                                if (hit[i].department != null) { department = `(${hit[i].department})`; }
                                if (hit[i].userPrincipalName != null) {
                                    userPrincipalName = "📧 " + hit[i].userPrincipalName
                                }
                                if (hit[i].phones.length > 0) {
                                    phonen = "📞 " + hit[i].phones[0].number;
                                }
                                searchData.push(
                                    {
                                        "type": "Container",
                                        "items": [
                                            {
                                                "type": "ColumnSet",
                                                "columns": [
                                                    {
                                                        "type": "Column",
                                                        "width": "auto",
                                                        "items": [
                                                            {
                                                                "type": "TextBlock",
                                                                "text": hit[i].displayName,
                                                                "weight": "Bolder",
                                                                "wrap": true,
                                                                "color": "Accent",
                                                                "spacing": "None"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "Column",
                                                        "width": "stretch",
                                                        "items": [
                                                            {
                                                                "type": "TextBlock",
                                                                "text": hit[i].personType.class,
                                                                "horizontalAlignment": "Right",
                                                                "color": arcolor[hit[i].personType.class],
                                                                "size": "Small"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "ColumnSet",
                                                "columns": [
                                                    {
                                                        "type": "Column",
                                                        "width": "auto",
                                                        "items": [
                                                            {
                                                                "type": "TextBlock",
                                                                "text": hit[i].userPrincipalName,
                                                                "size": "Small"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "Column",
                                                        "width": "stretch",
                                                        "items": [
                                                            {
                                                                "type": "TextBlock",
                                                                "text": phonen,
                                                                "size": "Small",
                                                                "horizontalAlignment": "Right"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "TextBlock",
                                                "text": `${jobTitle}${department}`,
                                                "size": "Small"
                                            }
                                        ],
                                        "separator": true,
                                        "spacing": "large"
                                    }
                                );
                            }//
                            let count = 0;
                            count = hit.length
                            app.log("second stage started");
                            if (hit.length == 0) { count = "No"; }
                            let searchCardMS = {
                                "contentType": "application/vnd.microsoft.card.adaptive",
                                "content":
                                {
                                    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                                    "version": "1.2",
                                    "fallbackText": "Adaptive card version not supported",
                                    "type": "AdaptiveCard",
                                    "body": [
                                        {
                                            "type": "Container",
                                            "items": [
                                                {
                                                    "type": "TextBlock",
                                                    "text": count + " Result Found! - " + query2,
                                                    "size": "Medium",
                                                    "wrap": true,
                                                    "color": "Attention"
                                                }
                                            ].concat(searchData)
                                        }
                                    ]

                                }
                            }
                            app.log("--------2---------");
                            app.sendAdaptiveCard(searchCardMS).then(() => {
                                resolve();
                            })
                        }
                        else {
                            resolve();
                        }
                    }//
                }).catch((error) => {
                    let errBody = error.response.body;
                    if (typeof errBody == "string") {
                        errBody = JSON.parse(errBody);
                        if (errBody.error && errBody.error.code) {
                            if (errBody.error.code == "InvalidAuthenticationToken") {
                                app.executeFunction("loginFunc").then(() => {
                                    resolve();
                                })
                            } else {
                                resolve();
                            }
                        } else {
                            resolve();
                        }
                    } else {
                        resolve();
                    }
                })

        }


    } else {
        resolve();
    }
});