exports.updateProfile = (data) => {
  if(data !== undefined){
      // quantas semanas tem um ano
      const weeksPerYear = 52
      // quantas semanas por mes
      const weeksPerMonth = (weeksPerYear - data.vacation_per_year) / 12
      // total de horas trabalhadas por semana
      const weekTotalHours = data.hours_per_day * data.days_per_week
      // horas trabalhadas no mes
      const hoursPerMonth = weeksPerMonth * weekTotalHours
      // valor da minha hora
      const hourValue =  data.monthly_budget / hoursPerMonth
      return hourValue
  }
}