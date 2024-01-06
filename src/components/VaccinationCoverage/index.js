// Write your code here
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const VaccinationCoverage = props => {
  const {last7DaysVaccination} = props
  console.log(last7DaysVaccination)
  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <>
      <div>
        <h1>Vaccination Coverage</h1>
      </div>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          width={900}
          height={500}
          data={last7DaysVaccination}
          margin={{
            top: 5,
          }}
        >
          <XAxis
            dataKey="vaccineDate"
            tick={{
              stroke: 'gray',
              strokeWidth: 1,
            }}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{
              stroke: 'gray',
              strokeWidth: 0,
            }}
          />
          <Legend
            wrapperStyle={{
              padding: 30,
            }}
          />
          <Bar dataKey="dose1" name="dose1" fill="#5a8dee" barSize="20%" />
          <Bar dataKey="dose2" name="dose2" fill="#f54394" barSize="20%" />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}
export default VaccinationCoverage
