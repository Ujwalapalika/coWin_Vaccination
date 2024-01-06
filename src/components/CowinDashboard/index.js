// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationCoverage from '../VaccinationCoverage'
import './index.css'

const apiStatus = {
  InProgress: 'in_progress',
  initial: 'Initial',
  Success: 'success',
  Failure: 'failure',
}
class CowinDashboard extends Component {
  state = {
    apiStatusDetails: apiStatus.initial,
    vaccinationData: {},
  }

  componentDidMount() {
    this.getVaccinationData()
  }

  getVaccinationData = async () => {
    this.setState({apiStatusDetails: apiStatus.InProgress})
    const response = await fetch('https://apis.ccbp.in/covid-vaccination-data')
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = {
        last7DaysVaccination: data.last_7_days_vaccination.map(vaccine => ({
          vaccineDate: vaccine.vaccine_date,
          dose1: vaccine.dose_1,
          dose2: vaccine.dose_2,
        })),
        vaccinationByAge: data.vaccination_by_age,
        vaccinationByGender: data.vaccination_by_gender,
      }
      this.setState({
        vaccinationData: formattedData,
        apiStatusDetails: apiStatus.Success,
      })
      console.log(formattedData)
    } else {
      this.setState({apiStatusDetails: apiStatus.Failure})
    }
  }

  renderVaccinationPage = () => {
    const {vaccinationData} = this.state
    console.log(vaccinationData)
    return (
      <div>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
          />
          <h1>co-Win</h1>
        </div>
        <h1>CoWIN Vaccination in India</h1>
        <VaccinationCoverage
          last7DaysVaccination={vaccinationData.last7DaysVaccination}
        />
        <VaccinationByGender
          vaccinationByGenderDetails={vaccinationData.vaccinationByGender}
        />
        <VaccinationByAge
          vaccinationByAgeDetails={vaccinationData.vaccinationByAge}
        />
      </div>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="blue" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
          alt="website logo"
        />
        <h1>Co-WIN</h1>
      </div>
      <div>
        <h1>CoWIN Vaccination in India</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          alt="failure view"
        />
        <h1>Something went wrong</h1>
      </div>
    </div>
  )

  renderVaccination = () => {
    const {apiStatusDetails} = this.state
    switch (apiStatusDetails) {
      case apiStatus.Success:
        return this.renderVaccinationPage()
      case apiStatus.Failure:
        return this.renderFailureView()
      case apiStatus.InProgress:
        return this.renderLoader()
      default:
        return ''
    }
  }

  render() {
    return <div> {this.renderVaccination()} </div>
  }
}
export default CowinDashboard
