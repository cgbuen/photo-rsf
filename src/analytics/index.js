/* 
Here you can configure analytics using react-storefront-extensions, which is a commercial module 
provided by Moovweb.  An example is provided below:
*/
import GoogleAnalyticsTarget from './GoogleAnalyticsTarget';


export default function targets(analyticsKeys) {
  return () => {
    return [
      new GoogleAnalyticsTarget({
        trackingID: analyticsKeys.gaApiKey
      })
    ]
  }
}
