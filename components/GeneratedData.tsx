const GeneratedData = ({ dateRange, plan }: any) => {
  const { breakfast, lunch, dinner, snacks } = plan.mealPlan
  const { recommendations, groceryList, recipes } = plan.exercisePlan

  return (
    <div className='p-5'>
      <h2 className='mb-5 text-2xl font-bold'>Health Plan</h2>
      <div className='mb-5'>
        <p className='text-lg font-bold'>Date Range:</p>
        <p>From: {dateRange.from}</p>
        <p>To: {dateRange.to}</p>
      </div>
      <div className='mb-5'>
        <p className='text-lg font-bold'>Meal Plan:</p>
        <div>
          <p className='font-bold'>Breakfast:</p>
          <ul>
            {breakfast.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className='font-bold'>Lunch:</p>
          <ul>
            {lunch.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className='font-bold'>Dinner:</p>
          <ul>
            {dinner.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className='font-bold'>Snacks:</p>
          <ul>
            {snacks.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className='mb-5'>
        <p className='text-lg font-bold'>Exercise Plan:</p>
        <div>
          <p className='font-bold'>Recommendations:</p>
          <ul>
            {recommendations.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className='font-bold'>Grocery List:</p>
          <ul>
            {groceryList.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className='font-bold'>Recipes:</p>
          <ul>
            {recipes.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default GeneratedData
