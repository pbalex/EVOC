'use strict';


/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills Kit.
 * The Intent Schema, Custom Slots, and Sample Utterances for this skill, as well as
 * testing instructions are located at http://amzn.to/1LzFrj6
 *
 * For additional samples, visit the Alexa Skills Kit Getting Started guide at
 * http://amzn.to/1LGWsLG
 */
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
var ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'});
//ADD ENTER AND ESCAPE COMMANDS
// --------------- Helpers that build all of the responses -----------------------

function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: 'PlainText',
            text: output,
        },
        card: {
            type: 'Simple',
            title: `SessionSpeechlet - ${title}`,
            content: `SessionSpeechlet - ${output}`,
        },
        reprompt: {
            outputSpeech: {
                type: 'PlainText',
                text: repromptText,
            },
        },
        shouldEndSession,
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: '1.0',
        sessionAttributes,
        response: speechletResponse,
    };
}


// --------------- Functions that control the skill's behavior -----------------------

function getWelcomeResponse(callback) {
    // If we wanted to initialize the session to have some attributes we could add those here.
    const sessionAttributes = {};
    const cardTitle = 'Welcome';
    const speechOutput = 'Welcome to EVOKE, please see the reference card for possible commands. ' +
        'Start your command with, ASK EVOKE.';
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    const repromptText = 'Open the reference card to see possible commands.';
    const shouldEndSession = false;

    callback(sessionAttributes,
        buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function handleSessionEndRequest(callback) {
    const cardTitle = 'Session Ended';
    const speechOutput = 'Thank you for using EVOKE.';
    // Setting this to true ends the session and exits the skill.
    const shouldEndSession = true;

    callback({}, buildSpeechletResponse(cardTitle, speechOutput, null, shouldEndSession));
}




function openTab(intent, session, callback) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'OPEN TAB'},
            'NUM' : {N: '1'}
        }
    };

    var errOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       errOutput = JSON.stringify(err, null, 2);
    } 
  });

    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};
    let speechOutput = '';
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
    
}

function closeAllOpenTabs(intent, session, callback) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'CLOSE ALL TABS'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should close all open tabs';
    }
  });


    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
    
}

function closeTab(intent, session, callback) {
   var timestamp = Date.now().toString();
   var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'CLOSE TAB'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should close current tab';
    }
  });
    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};
    
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
    
}

function closeWordDoc(intent, session, callback) {
   var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'CLOSE WORD DOC'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should close one word doc';
    }
  });
    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};

    
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
    
}

function jumpToAddressBar(intent, session, callback) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'JUMP TO ADDRESS BAR'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should jump to address bar';
    }
  });
    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
    
}

function openInternet(intent, session, callback) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'OPEN BROWSER'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should open an internet browser';
    }
  });
    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
    
}

function openNewWindow(intent, session, callback) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'OPEN NEW WINDOW'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should open a new window';
    }
  });
    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
    
}

function redoWordAction(intent, session, callback) {
    var timestamp = Date.now().toString();
        var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'REDO WORD ACTION'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should redo a word action';
    }
  });
    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};
    
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
    
}
function saveWordDoc(intent, session, callback) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'SAVE WORD DOC'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should save a word document';
    }
  });
    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
    
}

function scrollDown(intent, session, callback) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'SCROLL DOWN'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should scroll down one page';
    }
  });
    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
    
}

function scrollUp(intent, session, callback) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'SCROLL UP'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should scroll up one page';
    }
  });
    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
    
}

function searchOtherApps(intent, session, callback) {
    var timestamp = Date.now().toString();
        var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'SEARCH OTHER APPS'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should search other apps open and reprompt';
    }
  });
    let shouldEndSession = false;
    const repromptText = null;
    const sessionAttributes = {};
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
    
}
function stopSearchApps(intent, session, callback) {
    var timestamp = Date.now().toString();
        var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'STOP SEARCH APPS'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should stop app search and select app';
    }
  });
    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
    
}

function tab(intent, session, callback) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'TAB'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should emulate a tab press';
    }
  });
    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};
    
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
    
}

function undoWord(intent, session, callback) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'UNDO WORD ACTION'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should undo a word action';
    }
  });
    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};
    
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
    
}

function noIntent(intent, session, callback) {
    let speechOutput = '';
    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};

    speechOutput = 'I am sorry, I do not recognize that command.' +
    ' Please look at the reference card for possible commands and try again.';
    
    
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
    
}

function openReferenceCard(intent, session, callback) {
   var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'OPEN REFERENCE'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should open a reference card';
    }
  });
    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}


function reopenClosedTab(intent, session, callback) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'REOPEN CLOSED TAB'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should reopen a closed tab';
    }
  });
    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};
    
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function printPage(intent, session, callback) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'PRINT PAGE'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should open a print page window';
    }
  });
    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};
    
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function zoomIn(intent, session, callback) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'ZOOM IN'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should zoom in';
    }
  });
    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function zoomOut(intent, session, callback) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'ZOOM OUT'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should zoom out';
    }
  });
    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function refresh(intent, session, callback) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'REFRESH'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should refresh the page';
    }
  });
    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function fullscreen(intent, session, callback) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'FULLSCREEN'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should show a full screen';
    }
  });
    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function showBookmarks(intent, session, callback) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'SHOW BOOKMARKS'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should show the bookmarks';
    }
  });
    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};

    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function controlFind(intent, session, callback) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'CONTROL FIND'},
            'NUM' : {N: '1'}
        }
    };
   var errOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       errOutput = JSON.stringify(err, null, 2);
       
    } 
  });
    let shouldEndSession = true;
    // TODO CHECK THIS
    const repromptText = null;
    const sessionAttributes = {};
    let speechOutput = "Ok, keep saying next until you've reached your desired location";

    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function enter(intent, session, callback) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'ENTER'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should emulate and enter press';
    }
  });
    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};

    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function escape(intent, session, callback) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'ESCAPE'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should escape';
    }
  });
    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};

    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function select(intent, session, callback) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'SELECT'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should select';
    }
  });
    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};

    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}


function closeReferenceCard(intent, session, callback) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'CLOSE REFERENCE'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should close reference card';
    }
  });
    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};

    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}




// --------------- Events -----------------------

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log(`onSessionStarted requestId=${sessionStartedRequest.requestId}, sessionId=${session.sessionId}`);
}

/**
 * Called when the user launches the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log(`onLaunch requestId=${launchRequest.requestId}, sessionId=${session.sessionId}`);

    // Dispatch to your skill's launch.
    getWelcomeResponse(callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log(`onIntent requestId=${intentRequest.requestId}, sessionId=${session.sessionId}`);

    const intent = intentRequest.intent;
    const intentName = intentRequest.intent.name;

    // Dispatch to your skill's intent handlers
    if (intentName === 'CloseAllOpenTabsIntent' || intentName === 'CloseWindowIntent') {
        closeAllOpenTabs(intent, session, callback);
    } else if (intentName === 'CloseReferenceCardIntent') {
        closeReferenceCard(intent, session, callback);
    } else if (intentName === 'CloseTabIntent') {
        closeTab(intent, session, callback);
    } else if (intentName === 'CloseWordDocIntent') {
        closeWordDoc(intent, session, callback);
    } else if (intentName === 'EnterIntent') {
        enter(intent, session, callback);
    } else if (intentName === 'EscapeIntent') {
        escape(intent, session, callback);
    } else if (intentName === 'FindIntent') {
        controlFind(intent, session, callback);
    } else if (intentName === 'FullscreenIntent') {
        fullscreen(intent, session, callback);
    } else if (intentName === 'JumpToAddressBarIntent') {
        jumpToAddressBar(intent, session, callback);
    } else if (intentName === 'OpenInternetIntent') {
        openInternet(intent, session, callback);
    } else if (intentName === 'OpenNewWindowIntent') {
        openNewWindow(intent, session, callback);
    } else if (intentName === 'OpenReferenceCardIntent') {
        openReferenceCard(intent, session, callback);
    } else if (intentName === 'OpenTabIntent') {
        openTab(intent, session, callback);
    } else if (intentName === 'PrintPageIntent') {
        printPage(intent, session, callback);
    } else if (intentName === 'RedoWordActionIntent') {
        redoWordAction(intent, session, callback);
    } else if (intentName === 'RefreshIntent') {
        refresh(intent, session, callback);
    } else if (intentName === 'ReopenClosedTabIntent') {
        reopenClosedTab(intent, session, callback);
    } else if (intentName === 'SaveWordDocIntent') {
        saveWordDoc(intent, session, callback);
    } else if (intentName === 'ScrollDownIntent') {
        scrollDown(intent, session, callback);
    } else if (intentName === 'ScrollUpIntent') {
        scrollUp(intent, session, callback);
    } else if (intentName === 'SearchOtherAppsIntent') {
        searchOtherApps(intent, session, callback);
    } else if (intentName === 'SelectIntent') {
        select(intent, session, callback);
    } else if(intentName === 'ShowBookmarksIntent') {
        showBookmarks(intent, session, callback);
    } else if (intentName === 'StopSearchAppsIntent') {
        stopSearchApps(intent, session, callback);
    } else if (intentName === 'TabIntent') {
        tab(intent, session, callback);
    } else if (intentName === 'UndoWordActionIntent') {
        undoWord(intent, session, callback);
    } else if (intentName === 'ZoomInIntent') {
        zoomIn(intent, session, callback);
    } else if (intentName === 'ZoomOutIntent') {
        zoomOut(intent, session, callback);
    } else if (intentName === 'AMAZON.HelpIntent') {
        getWelcomeResponse(callback);
    } else if (intentName === 'AMAZON.StopIntent' || intentName === 'AMAZON.CancelIntent') {
        handleSessionEndRequest(callback);
    } else {
        //sorry that's not a command i recognize
        noIntent(intent, session, callback);
    }
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log(`onSessionEnded requestId=${sessionEndedRequest.requestId}, sessionId=${session.sessionId}`);
    // Add cleanup logic here
}


// --------------- Main handler -----------------------

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = (event, context, callback) => {
    try {

        console.log(`event.session.application.applicationId=${event.session.application.applicationId}`);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */
        /*
        if (event.session.application.applicationId !== 'amzn1.echo-sdk-ams.app.[unique-value-here]') {
             callback('Invalid Application ID');
        }
        */

        if (event.session.new) {
            onSessionStarted({ requestId: event.request.requestId }, event.session);
        }

        if (event.request.type === 'LaunchRequest') {
            onLaunch(event.request,
                event.session,
                (sessionAttributes, speechletResponse) => {
                    callback(null, buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === 'IntentRequest') {
            onIntent(event.request,
                event.session,
                (sessionAttributes, speechletResponse) => {
                    callback(null, buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === 'SessionEndedRequest') {
            onSessionEnded(event.request, event.session);
            callback();
        }
    } catch (err) {
        callback(err);
    }
};