type callback = () => void;
export function  timeMeausre(func:callback) {
    // Get current time before task
    const startTime = new Date().getTime();
  
    // Perform some task
    func()
  
    // Get current time after task
    const endTime = new Date().getTime();
  
    // Calculate elapsed time
    const elapsedTime = endTime - startTime;
    console.log('Task took ' + elapsedTime + ' milliseconds');
  }