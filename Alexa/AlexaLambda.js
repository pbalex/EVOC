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
    const speechOutput = 'Welcome to EVOKE, please see the reference card for possible commands.';
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    const repromptText = 'Open the reference card to see possible commands.';
    const shouldEndSession = false;

    callback(sessionAttributes,
        buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function getHelpResponse(callback) {
    // If we wanted to initialize the session to have some attributes we could add those here.
    const sessionAttributes = {};
    const cardTitle = 'Welcome';
    const speechOutput = 'Please see the reference card for possible commands. Start your command with ask EVOKE';
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

    let shouldEndSession = false;
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
            'COMMAND' : {S: 'CLOSE WINDOW'},
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


    let shouldEndSession = false;
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
    let shouldEndSession = false;
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
    let shouldEndSession = false;
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
            'COMMAND' : {S: 'ADDRESS BAR'},
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
    let shouldEndSession = false;
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
            'COMMAND' : {S: 'NEW WINDOW'},
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
    let shouldEndSession = false;
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
            'COMMAND' : {S: 'REDO'},
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
    let shouldEndSession = false;
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
            'COMMAND' : {S: 'SAVE'},
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
    let shouldEndSession = false;
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
    let shouldEndSession = false;
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
    let shouldEndSession = false;
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
    let shouldEndSession = false;
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
            'COMMAND' : {S: 'UNDO'},
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
    let shouldEndSession = false;
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
    ' Say open reference card to look at possible commands.';
    
    
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
    let shouldEndSession = false;
    const repromptText = null;
    const sessionAttributes = {};
    let openReferenceSpeechOutput = "To close the reference card, simply close the tab.";
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, openReferenceSpeechOutput, repromptText, shouldEndSession));
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
    let shouldEndSession = false;
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
            'COMMAND' : {S: 'PRINT'},
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
    let shouldEndSession = false;
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
    let shouldEndSession = false;
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
    let shouldEndSession = false;
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
    let shouldEndSession = false;
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
    let shouldEndSession = false;
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
    let shouldEndSession = false;
    const repromptText = null;
    const sessionAttributes = {};

    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function controlFind(intent, session, callback, find_query) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'CONTROL FIND'},
            'NUM' : {N: '1'},
            'CUSTOM' : {S: find_query }
        }
    };
   var errOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       errOutput = JSON.stringify(err, null, 2);
       
    } 
  });
    let shouldEndSession = false;
    const repromptText = null;
    const sessionAttributes = {};
    let speechOutput = "Ok, keep saying next until you've reached your desired location. Then, say select to follow the link";

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
    let shouldEndSession = false;
    const repromptText = null;
    const sessionAttributes = {};

    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function escape_(intent, session, callback) {
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
    let shouldEndSession = false;
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
    let shouldEndSession = false;
    const repromptText = null;
    const sessionAttributes = {};

    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function nextParagraph(intent, session, callback) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'NEXT PARAGRAPH'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should go to next paragraph';
    }
  });
    let shouldEndSession = false;
    const repromptText = null;
    const sessionAttributes = {};

    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function newDoc(intent, session, callback) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'NEW DOC'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should open a new doc';
    }
  });
    let shouldEndSession = false;
    const repromptText = null;
    const sessionAttributes = {};

    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function openDoc(intent, session, callback) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'OPEN DOC'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should open a new doc';
    }
  });
    let shouldEndSession = false;
    const repromptText = null;
    const sessionAttributes = {};

    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}


function indent(intent, session, callback) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'INDENT'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should indent';
    }
  });
    let shouldEndSession = false;
    const repromptText = null;
    const sessionAttributes = {};

    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}


function center(intent, session, callback) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'CENTER'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should center';
    }
  });
    let shouldEndSession = false;
    const repromptText = null;
    const sessionAttributes = {};

    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function pageBreak(intent, session, callback) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'PAGE BREAK'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should page break';
    }
  });
    let shouldEndSession = false;
    const repromptText = null;
    const sessionAttributes = {};

    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function decreaseFont(intent, session, callback) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'DECREASE FONT SIZE'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should decrease font';
    }
  });
    let shouldEndSession = false;
    const repromptText = null;
    const sessionAttributes = {};

    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function increaseFont(intent, session, callback) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'INCREASE FONT SIZE'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should increase font';
    }
  });
    let shouldEndSession = false;
    const repromptText = null;
    const sessionAttributes = {};

    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function beginningDoc(intent, session, callback) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'BEGINNING DOC'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should go to beginning of doc';
    }
  });
    let shouldEndSession = false;
    const repromptText = null;
    const sessionAttributes = {};

    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function endDoc(intent, session, callback) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'END_DOC'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should go to end of doc';
    }
  });
    let shouldEndSession = false;
    const repromptText = null;
    const sessionAttributes = {};

    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function beginningLine(intent, session, callback) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'BEGINNING LINE'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should go to beginning of line';
    }
  });
    let shouldEndSession = false;
    const repromptText = null;
    const sessionAttributes = {};

    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function endLine(intent, session, callback) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'END LINE'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should go to the end of line';
    }
  });
    let shouldEndSession = false;
    const repromptText = null;
    const sessionAttributes = {};

    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function bold(intent, session, callback) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'BOLD'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should bold';
    }
  });
    let shouldEndSession = false;
    const repromptText = null;
    const sessionAttributes = {};

    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function italic(intent, session, callback) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'ITALIC'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should italicize';
    }
  });
    let shouldEndSession = false;
    const repromptText = null;
    const sessionAttributes = {};

    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function underline(intent, session, callback) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'UNDERLINE'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should underline';
    }
  });
    let shouldEndSession = false;
    const repromptText = null;
    const sessionAttributes = {};

    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function saveAs(intent, session, callback, saveName) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'SAVE AS'},
            'NUM' : {N: '1'},
            'CUSTOM' : {S: saveName}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should save as';
    }
  });
    let shouldEndSession = false;
    const repromptText = null;
    const sessionAttributes = {};

    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function search(intent, session, callback, searchQuery) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'SEARCH'},
            'NUM' : {N: '1'},
            'CUSTOM': {S: searchQuery}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should search';
    }
  });
    let shouldEndSession = false;
    const repromptText = null;
    const sessionAttributes = {};

    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function addBookmarks(intent, session, callback) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'ADD BOOKMARK'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should add a bookmark';
    }
  });
    let shouldEndSession = false;
    const repromptText = null;
    const sessionAttributes = {};
    let bookmarkOutput = 'Say type to give a desired name to the bookmark and say enter when finished';

    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, bookmarkOutput, repromptText, shouldEndSession));
}

function backTab(intent, session, callback) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'SHIFT TAB'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should shift tab';
    }
  });
    let shouldEndSession = false;
    const repromptText = null;
    const sessionAttributes = {};

    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function webpageBack(intent, session, callback) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'WEBPAGE BACK'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should go a webpage back';
    }
  });
    let shouldEndSession = false;
    const repromptText = null;
    const sessionAttributes = {};

    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function webpageForward(intent, session, callback) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'WEBPAGE FORWARD'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should go a webpage forward';
    }
  });
    let shouldEndSession = false;
    const repromptText = null;
    const sessionAttributes = {};

    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function switchTabs(intent, session, callback) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'CONTROL TAB'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should control tab';
    }
  });
    let shouldEndSession = false;
    const repromptText = null;
    const sessionAttributes = {};

    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function scrollLeft(intent, session, callback) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'SCROLL LEFT'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should scroll left';
    }
  });
    let shouldEndSession = false;
    const repromptText = null;
    const sessionAttributes = {};

    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function scrollRight(intent, session, callback) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'SCROLL RIGHT'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should scroll right';
    }
  });
    let shouldEndSession = false;
    const repromptText = null;
    const sessionAttributes = {};

    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function switchApp(intent, session, callback, app_name) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'SWITCH TO'},
            'NUM' : {N: '1'},
            'CUSTOM': {S: app_name}
            
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should switch app';
    }
  });
    let shouldEndSession = false;
    const repromptText = null;
    const sessionAttributes = {};

    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function gotoLink(intent, session, callback, link) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'GOTO'},
            'NUM' : {N: '1'},
            'CUSTOM': {S: link}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should goto';
    }
  });
    let shouldEndSession = false;
    const repromptText = null;
    const sessionAttributes = {};

    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function openBookmarks(intent, session, callback) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'OPEN BOOKMARKS'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should open bookmarks';
    }
  });
    let shouldEndSession = false;
    const repromptText = null;
    const sessionAttributes = {};

    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function switchTabsBack(intent, session, callback) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'CONTROL SHIFT TAB'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should go control shift tab';
    }
  });
    let shouldEndSession = false;
    const repromptText = null;
    const sessionAttributes = {};

    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function type(intent, session, callback, type_query) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'TYPE'},
            'NUM' : {N: '1'},
            'CUSTOM': {S: type_query}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should type';
    }
  });
    let shouldEndSession = false;
    const repromptText = null;
    const sessionAttributes = {};

    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function downArrow(intent, session, callback) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'DOWN'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should down arrow';
    }
  });
    let shouldEndSession = false;
    const repromptText = null;
    const sessionAttributes = {};

    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function upArrow(intent, session, callback) {
    var timestamp = Date.now().toString();
    var params = {
        TableName: 'TEST',
        Item: {
            'TIMESTAMP' : {N: timestamp},
            'COMMAND' : {S: 'UP'},
            'NUM' : {N: '1'}
        }
    };
   let speechOutput = '';
    ddb.putItem(params, function(err, data) {
     if (err) {
       speechOutput = JSON.stringify(err, null, 2);
       
    } else {
        speechOutput = 'this should up arrow';
    }
  });
    let shouldEndSession = false;
    const repromptText = null;
    const sessionAttributes = {};

    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function wakeUp(intent, session, callback) {
    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};
    let speechOutput = "";

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
    } else if (intentName === 'CloseTabIntent') {
        closeTab(intent, session, callback);
    } else if (intentName === 'CloseWordDocIntent') {
        closeWordDoc(intent, session, callback);
    } else if (intentName === 'EnterIntent') {
        enter(intent, session, callback);
    } else if (intentName === 'EscapeIntent') {
        escape_(intent, session, callback);
    } else if (intentName === 'FindIntent') {
        var find_query = intentRequest.intent.slots.findQuery.value;
        controlFind(intent, session, callback, find_query);
    } else if (intentName === 'FullscreenIntent') {
        fullscreen(intent, session, callback);
    } else if (intentName === 'JumpToAddressBarIntent') {
        jumpToAddressBar(intent, session, callback);
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
    } else if (intentName === 'SelectIntent') {
        select(intent, session, callback);
    } else if(intentName === 'ShowBookmarksIntent') {
        showBookmarks(intent, session, callback);
    } else if (intentName === 'TabIntent') {
        tab(intent, session, callback);
    } else if (intentName === 'UndoWordActionIntent') {
        undoWord(intent, session, callback);
    } else if (intentName === 'ZoomInIntent') {
        zoomIn(intent, session, callback);
    } else if (intentName === 'ZoomOutIntent') {
        zoomOut(intent, session, callback);
    } else if (intentName === 'AMAZON.HelpIntent') {
        getHelpResponse(callback);
    } else if (intentName === 'AMAZON.StopIntent' || intentName === 'AMAZON.CancelIntent') {
        handleSessionEndRequest(callback);
    } else if (intentName === 'NextParagraphIntent') {
        nextParagraph(intent, session, callback);
    } else if (intentName === 'NewDocIntent') {
        newDoc(intent, session, callback);
    } else if (intentName === 'OpenDocIntent') {
        openDoc(intent, session, callback);
    } else if (intentName === 'IndentIntent') {
        indent(intent, session, callback);
    } else if (intentName === 'CenterIntent') {
        center(intent, session, callback);
    } else if (intentName === 'PageBreakIntent') {
        pageBreak(intent, session, callback);
    } else if (intentName === 'DecreaseFontIntent') {
        decreaseFont(intent, session, callback);
    } else if (intentName === 'IncreaseFontIntent') {
        increaseFont(intent, session, callback);
    } else if (intentName === 'BeginningofDocIntent') {
        beginningDoc(intent, session, callback);
    } else if (intentName === 'EndOfDocIntent') {
        endDoc(intent, session, callback);
    } else if (intentName === 'BeginningOfLineIntent') {
        beginningLine(intent, session, callback);
    } else if (intentName === 'EndOfLineIntent') {
        endLine(intent, session, callback);
    } else if (intentName === 'BoldIntent') {
        bold(intent, session, callback);
    } else if (intentName === 'ItalicIntent') {
        italic(intent, session, callback);
    } else if (intentName === 'UnderlineIntent') {
        underline(intent, session, callback);
    } else if (intentName === 'SaveAsIntent') {
        var saveName = intentRequest.intent.slots.saveName.value;
        saveAs(intent, session, callback, saveName);
    } else if (intentName === 'SearchIntent') {
        var searchQuery = intentRequest.intent.slots.searchQuery.value;
        search(intent, session, callback, searchQuery);
    } else if (intentName === 'AddBookmarksIntent') {
        addBookmarks(intent, session, callback);
    } else if (intentName === 'BackTabIntent') {
        backTab(intent, session, callback);
    } else if (intentName === 'WebpageBackIntent') {
        webpageBack(intent, session, callback);
    } else if (intentName === 'WebpageForwardIntent') {
        webpageForward(intent, session, callback);
    } else if (intentName === 'SwitchTabsIntent') {
        switchTabs(intent, session, callback);
    } else if (intentName === 'ScrollLeftIntent') {
        scrollLeft(intent, session, callback);
    } else if (intentName === 'ScrollRightIntent') {
        scrollRight(intent, session, callback);
    } else if (intentName === 'SwitchToAppIntent') {
        var app_name = intentRequest.intent.slots.ApplicationName.value;
        switchApp(intent, session, callback, app_name);
    } else if (intentName === 'GotoIntent') {
        var link = intentRequest.intent.slots.Link.value;
        gotoLink(intent, session, callback, link);
    } else if (intentName === 'OpenBookmarksIntent') {
        openBookmarks(intent, session, callback);
    } else if (intentName === 'SwitchTabsBackIntent') {
        switchTabsBack(intent, session, callback);
    } else if (intentName === 'TypeIntent') {
        var type_query = intentRequest.intent.slots.typeQuery.value;
        type(intent, session, callback, type_query);
    } else if (intentName === 'DownArrowIntent') {
        downArrow(intent, session, callback);
    } else if (intentName === 'UpArrowIntent') {
        upArrow(intent, session, callback);
    } else if (intentName === 'WakeUpIntent') {
        wakeUp(intent, session, callback);
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