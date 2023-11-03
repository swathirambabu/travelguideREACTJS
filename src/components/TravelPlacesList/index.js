import './index.css'

const TravelPlacesList = props => {
  const {eachPlace} = props
  const {imageUrl, name, description} = eachPlace

  return (
    <li className="place-container">
      <img src={imageUrl} className="image" alt={name} />
      <h1 className="heading">{name}</h1>
      <p className="description">{description}</p>
    </li>
  )
}
export default TravelPlacesList
