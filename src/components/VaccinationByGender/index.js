import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

const VaccinationByGender = props => {
  const {vaccinationByGenderDetails} = props
  console.log(vaccinationByGenderDetails)
  return (
    <div>
      <h1>Vaccination by gender</h1>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            cx="70%"
            cy="40%"
            data={vaccinationByGenderDetails}
            startAngle={0}
            endAngle={180}
            innerRadius="40%"
            outerRadius="70%"
            dataKey="count"
          >
            <Cell name="male" fill="#5a8dee" />
            <Cell name="female" fill="#f54394" />
            <Cell name="others" fill="#2cc6c6" />
          </Pie>
          <Legend
            iconType="circle"
            layout="horizantal"
            verticalAlign="middle"
            align="right"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
export default VaccinationByGender
