
class RateLimiter {
    constructor(maxNumberOfRequestsAllowed, timeWindowMS){
        this.maxNumberOfRequestsAllowed = maxNumberOfRequestsAllowed;
        this.timeWindowMS = timeWindowMS;
        this.prevCallTime = Date.now();
        this.callCount = 0;
    }
    
    requestAllowed() {
        const currCallTime = Date.now();
        const totalElapsedTime = currCallTime - this.prevCallTime;
        if (this.callCount < 3 ) {
            this.callCount++;
            return true;
        } else if ( this.callCount === 3 && Math.floor(totalElapsedTime / 1000) > 0){
            this.callCount = 1;
            this.prevCallTime = currCallTime;
            return true;
        } else {
            return false;
        }
    }
}

const rateLimiter = new RateLimiter(3, 1000)
function log() {
    rateLimiter.requestAllowed()
    ? console.log('Allowed!')
    : console.log('request not allowed')
}
log() //Allowed!
setTimeout(log, 100) //Allowed!
setTimeout(log, 200) //Allowed!
setTimeout(log, 300) //request not allowed 
setTimeout(log, 1000) //Allowed! 
setTimeout(log, 1300) //Allowed! 
setTimeout(log, 1600) //Allowed! 
setTimeout(log, 1800) //request not allowed 
setTimeout(log, 2000) 
setTimeout(log, 2000)
setTimeout(log, 2000)
setTimeout(log, 3000)

