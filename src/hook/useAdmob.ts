import { AdEventType, InterstitialAd } from 'react-native-google-mobile-ads'

const useAdmob = () => {
  const handleShow = async (unitId: string, callback: any) => {
    const interstitial = InterstitialAd.createForAdRequest(unitId, {
      requestNonPersonalizedAdsOnly: true,
      keywords: [
        'trend',
        'commic',
        'game',
        'gaming',
        'commics',
        'manga',
        'anime',
        'mobile game',
        'video game',
        'commic book'
      ]
    })

    if (interstitial.loaded) {
      await interstitial.show()
    } else {
      await interstitial.load()
    }
    return new Promise((resolve) => {
      interstitial.addAdEventsListener((evt) => {
        console.info(evt)
        if (
          evt?.type === AdEventType.ERROR ||
          evt?.type === AdEventType.CLOSED
        ) {
          resolve(callback?.())
        }
        if (evt?.type === AdEventType.LOADED) {
          interstitial.show()
        }
      })
    })
  }

  return {
    handleShow
  }
}

export default useAdmob
