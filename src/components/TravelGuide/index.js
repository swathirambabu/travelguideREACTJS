import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TravelPlacesList from '../TravelPlacesList'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'Failure',
  inProgress: 'IN_PROGRESS',
}

class TravelGuide extends Component {
  state = {
    placesList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTravelPlaces()
  }

  getTravelPlaces = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedList = fetchedData.packages.map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
        description: each.description,
      }))
      console.log(updatedList)
      this.setState({
        placesList: updatedList,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderLoader = () => (
    <div data-testid="loader" className="position">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderPlacesView = () => {
    const {placesList} = this.state
    return (
      <ul className="list-container">
        {placesList.map(each => (
          <TravelPlacesList key={each.id} eachPlace={each} />
        ))}
      </ul>
    )
  }

  renderViewBasedOnApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderPlacesView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="travel-guide-container">
        <h1 className="main-heading">Travel Guide</h1>
        <hr className="separator" />
        {this.renderViewBasedApiStatus()}
      </div>
    )
  }
}
export default TravelGuide
