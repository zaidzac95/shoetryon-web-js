import * as deepar from 'deepar';

// Log the version. Just in case.
console.log("Deepar version: " + deepar.version);

// Top-level await is not supported.
// So we wrap the whole code in an async function that is called immediatly.
(async function() {

  // Resize the canvas according to screen size.
  const canvas = document.getElementById('deepar-canvas');
  
  // this is to make the canvas look good on high-res screens
  const scale = window.devicePixelRatio || 1;
  
  const width = window.innerWidth > window.innerHeight ? Math.floor(window.innerHeight * 0.66) : window.innerWidth
  canvas.width = Math.floor(width * scale);
  canvas.height = Math.floor(window.innerHeight * scale);

  // constrain the actual size of the canvas
  canvas.style.maxHeight = window.innerHeight + "px";
  canvas.style.maxWidth = width + "px";;
  
  // Initialize DeepAR.
  const deepAR = await deepar.initialize({
    licenseKey: 'your_license_key_goes_here',
    canvas: canvas,
    effect: 'effects/Shoe', // The shoe-try-on effect file.
    additionalOptions: {
      // Use the front camera.
      cameraConfig: {
        facingMode: "environment",
      },
      hint: "footInit", // Add this hint to let DeepAR know we want to optimize for shoe-try-on use-case.
    }
  });

  // Hide the loading screen.
  document.getElementById("loader-wrapper").style.display = "none";

  // Register for a collback that lets you know when feet are detected.
  deepAR.callbacks.onFeetTracked = (leftFoot, rightFoot) => {
    const feetText = document.getElementById("feet-text");
    // Hide the text when the feet are first detected.
    if(leftFoot.detected || rightFoot.detected) {
      feetText.style.display = "none";
      deepAR.callbacks.onFeetTracked = undefined; // Unregister from the callback.
    }
  };

})();
