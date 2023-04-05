export const disableGPU = (on) => {
    on('before:browser:launch', (browser = {}, launchOptions) => {
      console.log(launchOptions.args)
  
      if (browser.name == 'chrome') {
        launchOptions.args.push('--disable-gpu')
      }
  
      return launchOptions
    });
};

