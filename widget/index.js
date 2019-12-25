let testingBeaconRegion;

/**
 * Set testing beacon to region created from value from uuid input field
 * Give it identifier buildfire (does not work withou this)
 */
function setBeaconRegion() {
  testingBeaconRegion = buildfire.services.bluetooth.iBeacon.createBeaconRegion(
    uuid.value.toUpperCase(),
    "buildfire"
  );
}

// Set initial iBeacon region
setBeaconRegion();

/**
 * Add log message to ui
 * @param {String} msg Message to display
 * @param {Array} classNames Array of classes to append to message wrapper div
 */
function log(msg, classNames = ["alert", "alert-success"]) {
  actionLogsP.style.display = "block";
  ui.create("div", divLog, msg, classNames);
}

function clearLogs() {
  divLog.innerHTML = `<p id="actionLogsP" style="display: none;">Action Logs:</p>`;
}

/**
 * Callback function to use in every action triggered by user
 * @param {Object} err Callback error
 * @param {Object} data Callback data
 */
function callBack(err, data) {
  log("Info Err: " + JSON.stringify({ err }), ["alert", "alert-info"]);
  log("Info Data: " + JSON.stringify({ data }), ["alert", "alert-info"]);
}

callBack(undefined, undefined);
/**
 * Start monitoring beacon region
 * @param {Object} beaconRegion Beacon region object created by setBeaconRegion
 */
function startMonitoring(beaconRegion) {
  log("Started Monitoring Beacon Region For UUID: " + beaconRegion.uuid);

  //Toggle Start / Stop Buttons
  startMonitoringBtn.style.display = "none";
  stopMonitoringBtn.style.display = "inline-block";

  buildfire.services.bluetooth.iBeacon.startMonitoring(beaconRegion, callBack);
}

/**
 * Stop monitoring beacon region
 * @param {Object} beaconRegion Beacon region object created by setBeaconRegion
 */
function stopMonitoring(beaconRegion) {
  log("Stopped Monitoring Beacon Region For UUID: " + beaconRegion.uuid);

  //Toggle Start / Stop Buttons
  startMonitoringBtn.style.display = "inline-block";
  stopMonitoringBtn.style.display = "none";

  buildfire.services.bluetooth.iBeacon.stopMonitoring(beaconRegion, callBack);
}

/**
 * Start aggressively ranging beacon region
 * @param {Object} beaconRegion Beacon region object created by setBeaconRegion
 */
function startRanging(beaconRegion) {
  log(
    "Started Aggressively Scanning Beacon Region For UUID: " + beaconRegion.uuid
  );

  //Toggle Start / Stop Buttons
  startRangingBtn.style.display = "none";
  stopRangingBtn.style.display = "inline-block";

  buildfire.services.bluetooth.iBeacon.startRanging(beaconRegion, callBack);
}

/**
 * Stop aggressively ranging beacon region
 * @param {Object} beaconRegion Beacon region object created by setBeaconRegion
 */
function stopRanging(beaconRegion) {
  log(
    "Stopped Aggressively Scanning Beacon Region For UUID: " + beaconRegion.uuid
  );

  //Toggle Start / Stop Buttons
  startRangingBtn.style.display = "inline-block";
  stopRangingBtn.style.display = "none";

  buildfire.services.bluetooth.iBeacon.stopRanging(beaconRegion, callBack);
}

/**
 * Function that will trigger when entering beacon region that is currently monitored
 * @param {Object} err Error object
 * @param {Object} beaconRegion Beacon region that was entered
 */
function onRegionEntered(err, beaconRegion) {
  log("On Region Entered");
  callBack(err, beaconRegion);
}

/**
 * Function that will trigger when exited beacon region that is currently monitored
 * @param {Object} err Error object
 * @param {Object} beaconRegion Beacon region that was entered
 */
function onRegionExited(err, beaconRegion) {
  log("On Region Exited");
  callBack(err, beaconRegion);
}

/**
 * Function that will trigger when ranging update is received
 * @param {Object} err Error object
 * @param {Object} beaconRegion Beacon region with ranging data
 */
function onRangingUpdate(err, beaconRegion) {
  log("On Ranging Update");
  callBack(err, beaconRegion);
}

buildfire.services.bluetooth.iBeacon.onRegionEntered = onRegionEntered;
buildfire.services.bluetooth.iBeacon.onRegionExited = onRegionExited;
buildfire.services.bluetooth.iBeacon.onRangingUpdate = onRangingUpdate;
