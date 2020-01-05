/* 
Here you can configure analytics using react-storefront-extensions, which is a commercial module 
provided by Moovweb.  An example is provided below:
*/
import GoogleAnalyticsTarget from './GoogleAnalyticsTarget';


export default function targets(analyticsKeys) {
  return () => {
    const ga = new GoogleAnalyticsTarget({
      trackingID: analyticsKeys.gaApiKey
    })
    ga.sendForAllEvents()
    return [
      ga
    ]
  }
}
