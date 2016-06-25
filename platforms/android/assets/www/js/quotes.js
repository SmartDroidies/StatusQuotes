
var C_CACHE_CATEGORY = "cache-s-category";

var testDevice = '9ff99ad5ec042ed6';
var interDisplayed = false;

// select the right Ad Id according to platform 
var admobid = {};
if( /(android)/i.test(navigator.userAgent) ) { // for android & amazon-fireos 
    admobid = {
        banner: 'ca-app-pub-8439744074965483/4297235251', 
        interstitial: 'ca-app-pub-8439744074965483/7250701657'
    };
} 

//Device Ready Event
document.addEventListener("deviceready", onDeviceReadyAction, false);
function onDeviceReadyAction() {

	//window.analytics.startTrackerWithId(analyticsId);

	// Manage Ad
	initializeAd();

	//Initialize for Google Cloud Messaging
  	//initializeGCM();
}


//Admob Ad Display 
function initializeAd() {
  createBanner();
  prepareInter();
}

function createBanner() {
  var testFlag = isTestDevice();

  if(AdMob) AdMob.createBanner( {
    adId: admobid.banner, 
    position: AdMob.AD_POSITION.BOTTOM_CENTER, 
    autoShow: true, 
    isTesting: testFlag  
  } );
}

function prepareInter() {
  var testFlag = isTestDevice();
  // preppare and load ad resource in background, e.g. at begining of game level 
  if(AdMob) AdMob.prepareInterstitial( {adId:admobid.interstitial, autoShow:false, isTesting: testFlag} );
}

function isTestDevice() {
    var flgTestDevice = false;
    var deviceUUID = device.uuid;
    //console.log("Device Id : " + device.uuid);
    if(deviceUUID == testDevice) {
      //console.log("Test Device : " + device.uuid);
      flgTestDevice = true;
    }
    //flgTestDevice = false;
    return flgTestDevice;
}

//Load AdMob Interstitial Ad
function showInterstitial() {
  if(interDisplayed > 3) {
    if(AdMob) {
      AdMob.showInterstitial();
      interDisplayed = 0;
    } 
  } else {
    interDisplayed = interDisplayed + 1;
    //console.log("Interstitial Displayed : " + interDisplayed);
  }    
}


function onInterstitialReceive (message) {
    //alert(message.type + " ,you can show it now");
    //admob.showInterstitial();//show it when received
    //setTimeout(showInterstitial, 10 * 1000);
}

function onReceiveFail (message) {
  var msg=admob.Error[message.data];
    if(msg==undefined){
       msg=message.data;
    }
    //console.log("load fail: " + message.type + "  " + msg);
} 

