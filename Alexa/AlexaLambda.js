'use strict';


// --------------- Helpers that build all of the responses -----------------------
var myBucket = 'commands-to-windows-app';
//the function below is from Amazon
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

//the function below is from Amazon
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
    let speechOutput = '';
    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};

    speechOutput = 'this should open tab';
    //write a 1 for open tab
    
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
    
}

function closeAllOpenTabs(intent, session, callback) {
    let speechOutput = '';
    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};

    speechOutput = 'this should close all open tabs';
    //write a 1 for open tab
    
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
    
}

function closeTab(intent, session, callback) {
    let speechOutput = '';
    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};

    speechOutput = 'this should close one tab';
    //write a 1 for open tab
    
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
    
}

function closeWordDoc(intent, session, callback) {
    let speechOutput = '';
    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};

    speechOutput = 'this should close one word doc';
    //write a 1 for open tab
    
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
    
}

function jumpToAddressBar(intent, session, callback) {
    let speechOutput = '';
    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};

    speechOutput = 'this should jump to the address bar';
    //write a 1 for open tab
    
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
    
}

function openInternet(intent, session, callback) {
    let speechOutput = '';
    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};

    speechOutput = 'this should open an internet browser';
    //write a 1 for open tab
    
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
    
}

function openNewWindow(intent, session, callback) {
    let speechOutput = '';
    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};

    speechOutput = 'this should open a new window';
    //write a 1 for open tab
    
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
    
}

function redoWordAction(intent, session, callback) {
    let speechOutput = '';
    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};

    speechOutput = 'this should redo a word action';
    //write a 1 for open tab
    
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
    
}
function saveWordDoc(intent, session, callback) {
    let speechOutput = '';
    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};

    speechOutput = 'this should save a word document';
    //write a 1 for open tab
    
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
    
}

function scrollDown(intent, session, callback) {
    let speechOutput = '';
    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};

    speechOutput = 'this should scroll down one page';
    //write a 1 for open tab
    
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
    
}

function scrollUp(intent, session, callback) {
    let speechOutput = '';
    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};

    speechOutput = 'this should scroll up one page';
    //write a 1 for open tab
    
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
    
}

function searchOtherApps(intent, session, callback) {
    let speechOutput = '';
    let shouldEndSession = false;
    const repromptText = null;
    const sessionAttributes = {};

    speechOutput = 'this should search other apps open and reprompt';
    //write a 1 for open tab
    
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
    
}
function stopSearchApps(intent, session, callback) {
    let speechOutput = '';
    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};

    speechOutput = 'this should stop app search and select app';
    //write a 1 for open tab
    
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
    
}

function tab(intent, session, callback) {
    let speechOutput = '';
    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};

    speechOutput = 'this should emulate a tab press';
    //write a 1 for open tab
    
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
    
}

function undoWord(intent, session, callback) {
    let speechOutput = '';
    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};

    speechOutput = 'this should undo a word action';
    //write a 1 for open tab
    
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
    let speechOutput = '';
    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};

    speechOutput = 'This should open a reference card';
    
    
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}


function reopenClosedTab(intent, session, callback) {
    let speechOutput = '';
    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};

    speechOutput = 'This should reopen a closed tab';
    
    
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function printPage(intent, session, callback) {
    let speechOutput = '';
    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};

    speechOutput = 'This should open a print page window';
    
    
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function zoomIn(intent, session, callback) {
    let speechOutput = '';
    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};

    speechOutput = 'This should zoom in';
    
    
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function zoomOut(intent, session, callback) {
    let speechOutput = '';
    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};

    speechOutput = 'This should zoom out';
    
    
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function refresh(intent, session, callback) {
    let speechOutput = '';
    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};

    speechOutput = 'This should refresh the page';
    
    
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function fullscreen(intent, session, callback) {
    let speechOutput = '';
    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};

    speechOutput = 'This should show a full screen';
    
    
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}

function showBookmarks(intent, session, callback) {
    let speechOutput = '';
    let shouldEndSession = true;
    const repromptText = null;
    const sessionAttributes = {};

    speechOutput = 'This should show the bookmarks';
    
    
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
    if (intentName === 'CloseAllOpenTabsIntent') {
        closeAllOpenTabs(intent, session, callback);
    } else if (intentName === 'CloseTabIntent') {
        closeTab(intent, session, callback);
    } else if (intentName === 'CloseWordDocIntent') {
        closeWordDoc(intent, session, callback);
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
 //the function below is from Amazon
function onSessionEnded(sessionEndedRequest, session) {
    console.log(`onSessionEnded requestId=${sessionEndedRequest.requestId}, sessionId=${session.sessionId}`);
    // Add cleanup logic here
}


// --------------- Main handler -----------------------

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
//the function below is from Amazon
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