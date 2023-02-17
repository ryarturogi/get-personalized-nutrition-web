import { AnimatePresence, motion } from 'framer-motion'
import type { NextPage } from 'next'
import Head from 'next/head'
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useState,
} from 'react'
import { Toaster, toast } from 'react-hot-toast'
import DropDown, { LanguageType, VibeType } from '../components/DropDown'
import Footer from '../components/Footer'
import Github from '../components/GitHub'
import Header from '../components/Header'
import LoadingDots from '../components/LoadingDots'
import ResizablePanel from '../components/ResizablePanel'

interface InitialDataType {
  [key: string]: any
  from: Date
  to: Date
  age: number
  gender: string
  country: string
  gastronomy: string
  height: number
  weight: number
  activityLevel: string
  dietaryRestrictions: string[]
  goals: string[]
  healthConditions: string[]
  foodPreferences: string[]
  dailyCalorieIntake: number
  macroRatios: {
    protein: number
    fat: number
    carbohydrates: number
  }
  microNutrientRequirements: {
    vitaminA: number
    vitaminB: number
    vitaminC: number
    iron: number
  }
}

const InitialData: InitialDataType = {
  from: new Date('2023-01-01'),
  to: new Date('2023-12-01'),
  age: 35,
  gender: 'male',
  country: 'dominican republic',
  gastronomy: 'dominican',
  height: 170,
  weight: 70,
  activityLevel: 'moderate',
  dietaryRestrictions: ['vegetarian'],
  goals: ['weight loss'],
  healthConditions: ['diabetes'],
  foodPreferences: ['vegetables', 'grains'],
  dailyCalorieIntake: 2000,
  macroRatios: {
    protein: 0.3,
    fat: 0.3,
    carbohydrates: 0.4,
  },
  microNutrientRequirements: {
    vitaminA: 700,
    vitaminB: 200,
    vitaminC: 90,
    iron: 8,
  },
}

const fields: any = [
  {
    label: 'Age',
    name: 'age',
    type: 'number',
    placeholder: 'Enter your age',
  },
  {
    label: 'Gender',
    name: 'gender',
    type: 'text',
    placeholder: 'Enter your gender',
  },
  {
    label: 'Country',
    name: 'country',
    type: 'text',
    placeholder: 'Enter your country',
  },
  {
    label: 'Gastronomy',
    name: 'gastronomy',
    type: 'text',
    placeholder: 'Enter your gastronomy',
  },
  {
    label: 'Height',
    name: 'height',
    type: 'number',
    placeholder: 'Enter your height',
  },
  {
    label: 'Weight',
    name: 'weight',
    type: 'number',
    placeholder: 'Enter your weight',
  },
  {
    label: 'Activity Level',
    name: 'activityLevel',
    type: 'text',
    placeholder: 'Enter your activity level',
  },
  {
    label: 'Dietary Restrictions',
    name: 'dietaryRestrictions',
    type: 'text',
    placeholder: 'Enter your dietary restrictions',
  },
  {
    label: 'Goals',
    name: 'goals',
    type: 'text',
    placeholder: 'Enter your goals',
  },
  {
    label: 'Health Conditions',
    name: 'healthConditions',
    type: 'text',
    placeholder: 'Enter your health conditions',
  },
  {
    label: 'Food Preferences',
    name: 'foodPreferences',
    type: 'text',
    placeholder: 'Enter your food preferences',
  },
  {
    label: 'Daily Calorie Intake',
    name: 'dailyCalorieIntake',
    type: 'number',
    placeholder: 'Enter your daily calorie intake',
  },
  {
    label: 'From Date',
    name: 'from',
    type: 'date',
    placeholder: 'Enter your from',
  },
  {
    label: 'To Date',
    name: 'to',
    type: 'date',
    placeholder: 'Enter your to',
  },
]

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false)
  const [vibe, setVibe] = useState<VibeType>('I want to lose weight')
  const [language, setLanguage] = useState<LanguageType>('English')
  const [generatedPlan, setGeneratedPlan] = useState<any>('')
  const [dateRange, setDateRange] = useState<any>({
    from: new Date('2023-01-01'),
    to: new Date('2023-12-01'),
  })
  const [plan, setPlan] = useState<InitialDataType>(InitialData)

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setPlan((prev: any) => ({ ...prev, [name]: value }))
  }

  const prompt: any = `
    Prompt:

    "Act as a Nutritionist, write a meal plan for 3 breakfast, 3 lunch, 3 dinner, and 3 snacks, each with specific calorie count and nutrient ratios (e.g. protein, fat, carbohydrates) tailored to meet the user's daily calorie intake and macro ratios. Add 3 exercise recommendations that take into account the user's activity level, goals, and health conditions, including specific types of exercises, duration, and frequency. Taking into account the user's dietary restrictions and food preferences. Add 1 recipes recommendations for each meal, name and description. Add 3 additional recommendations for the user to improve their overall health and wellness. Is not a solution just show the html and css output.
    Date range should be formatted as "December 31, 2023.
    All nutrition plans should be unique always for every user and never repeat the answers given before and not the same as the example data below."

    User Data:

    "Age: ${plan.age}
    Gender: ${plan.gender}
    Country: ${plan.country}
    Gastronomy: ${plan.gastronomy}
    Height: ${plan.height}
    Weight: ${plan.weight}
    Activity Level: ${plan.activityLevel}
    Dietary Restrictions: ${plan.dietaryRestrictions}
    Goals: ${plan.goals}
    Health Conditions: ${plan.healthConditions}
    Food Preferences: ${plan.foodPreferences}
    Daily Calorie Intake: ${plan.dailyCalorieIntake}
    Macro Ratios: ${plan.protein}, ${plan.fat}, ${plan.carbohydrates}
    Micro Nutrient Requirements: ${plan.vitaminA}, ${plan.vitaminC}, ${plan.iron}
    From: ${plan.from}
    To: ${plan.to}
    Additional Recommendations: ${plan.additionalRecommendations}"

    Output format example in markdown:
    
    "<body>
      <h4>Breakfast</h4>
      <ul>
        <li>Whole grain toast with avocado and egg</li>
        <li>Greek yogurt with mixed berries</li>
        <li>Oatmeal with almond milk, honey and nuts</li>
      </ul>
      <h4>Lunch</h4>
      <ul>
        <li>Grilled chicken salad with mixed greens and vinaigrette dressing</li>
        <li>Veggie wrap with hummus, roasted vegetables and mixed greens</li>
        <li>Quinoa bowl with roasted vegetables, black beans and avocado</li>
      </ul>
      <h4>Dinner</h4>
      <ul>
        <li>Grilled salmon with roasted vegetables and quinoa</li>
        <li>Veggie stir-fry with brown rice and mixed vegetables</li>
        <li>Turkey chili with mixed beans, tomatoes and spices</li>
      </ul>
      <h4>Snacks</h4>
      <ul>
        <li>Fresh fruit (apple, banana, berries)</li>
        <li>Carrots and celery with hummus</li>
        <li>Roasted almonds</li>
      </ul>
      <h4>Exercise Recommendations</h4>
      <ul>
        <li>30 minutes of moderate-intensity aerobic activity, such as brisk walking or cycling, 5 days a week</li>
        <li>Resistance training with weights or body weight exercises, 2-3 days a week</li>
        <li>Yoga or stretching for flexibility and balance, 2-3 days a week</li>
      </ul>
      <h4>Recipes Recommendations</h4>
      <ul>
        <li>Avocado and egg toast: Toast whole grain bread, mash avocado on top and place a fried egg on top.</li>
        <li>Berry yogurt parfait: Layer Greek yogurt, mixed berries, and granola in a glass.</li>
        <li>Oatmeal with nuts: Cook oatmeal with almond milk, add honey and top with mixed nuts.</li>
      </ul>
      <h4>Additional Recommendations</h4>
      <ul>
        <li>Drink plenty of water throughout the day</li>
        <li>Limit processed and sugary foods</li>
        <li>Include protein, whole grains and healthy fats in every meal</li>
        <li>Listen to your body and eat when hungry, stop when full.</li>
      </ul>
    </body>"

    Rules and Requirements:
    "This is the goal for the plan: ${vibe}.
    "Don't use the example data above, use the data gather from on the request body to generate a personalized nutrition plan for the user.
    Translate content to ${language} language.
    Format the rangeDate, "From" and "To" dates to "December 31, 2023.
    Prevent any starting words with colon (:) and use the same format as the example data above.
    The output should be always in HTML and CSS format.
  `

  const generatePlan = async (e: any) => {
    e.preventDefault()
    setGeneratedPlan('')
    setLoading(true)

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
      }),
    })
    console.log('Edge function returned.')

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    // This data is a ReadableStream
    const data = response.body
    if (!data) {
      return
    }

    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)

      setGeneratedPlan((prev: string) => {
        const markdown = prev + chunkValue
        return markdown
      })
    }

    setLoading(false)
  }

  const copyToClipboard = () => {
    const markdown = generatedPlan
      .replace(/<h4>/g, '### ')
      .replace(/<\/h4>/g, '')
      .replace(/<ul>/g, '')
      .replace(/<\/ul>/g, '')
      .replace(/<li>/g, '- ')
      .replace(/<\/li>/g, '')
      .replace(/<body>/g, '')
      .replace(/<\/body>/g, '')

    navigator.clipboard.writeText(markdown)
  }

  const downloadPlan = () => {
    // remove all html tags, leaving only the text and line breaks
    const text = generatedPlan.replace(/<[^>]*>?/gm, '')
    const element = document.createElement('a')
    const file = new Blob([text], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = 'plan.txt'
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  }

  return (
    <section className='flex flex-col items-center justify-center max-w-5xl min-h-screen py-2 mx-auto'>
      <Head>
        <title>Personalized Nutrition Plan Generator</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
      <main className='flex flex-col items-center justify-center flex-1 w-full px-4 mt-12 text-center sm:mt-20'>
        <a
          className='flex items-center justify-center px-4 py-2 mb-5 space-x-2 text-sm text-gray-600 transition-colors bg-white border border-gray-300 rounded-full shadow-md max-w-fit hover:bg-gray-100'
          href='https://github.com/RyArturoGI/personalized-nutrition-plan-generator'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Github />
          <p>Star on GitHub</p>
        </a>
        <h1 className='max-w-2xl text-4xl font-bold sm:text-6xl text-slate-900'>
          Generate a Personalized Nutrition Plan
        </h1>
        {/* <p className='mt-5 text-slate-500'>
          18,167 nutrition plans generated so far.
        </p> */}
        {!generatedPlan ? (
          <section className='w-full max-w-xl'>
            <div className='flex items-center mt-10 space-x-3'>
              <span className='flex items-center justify-center w-8 h-8 text-white bg-black rounded-full font-extralight'>
                1
              </span>
              <p className='font-medium text-left'>
                Fill the form to prepare the nutrition plan{' '}
                <span className='text-slate-500'>
                  (now get ready to be amazed)
                </span>
                .
              </p>
            </div>
            <div className='grid grid-cols-1 gap-2 mt-5 md:grid-cols-2'>
              {fields.map(
                (
                  field: {
                    name: string
                    label:
                      | string
                      | number
                      | boolean
                      | ReactElement<any, string | JSXElementConstructor<any>>
                      | ReactFragment
                      | ReactPortal
                      | null
                      | undefined
                    rows: number | undefined
                    type: string
                  },
                  idx: Key | null | undefined
                ) => {
                  if (field.type === 'date') {
                    return (
                      <div
                        key={idx}
                        className='flex flex-col items-start justify-start mb-5 space-y-2'
                      >
                        <label
                          htmlFor={field.name}
                          className='text-sm font-medium text-slate-900'
                        >
                          {field.label}
                        </label>
                        <div className='flex items-center justify-start w-full space-x-2'>
                          <input
                            type='date'
                            name={field.name}
                            id={field.name}
                            className='w-full px-4 py-2 text-sm border border-gray-300 rounded-md text-slate-900 focus:outline-none focus:border-slate-500'
                            value={
                              field.name === 'from'
                                ? dateRange.from
                                : dateRange.to
                            }
                            onChange={(e) =>
                              field.name === 'from'
                                ? setDateRange({
                                    ...dateRange,
                                    from: e.target.value,
                                  })
                                : field.name === 'to'
                                ? setDateRange({
                                    ...dateRange,
                                    to: e.target.value,
                                  })
                                : null
                            }
                          />
                        </div>
                      </div>
                    )
                  }
                  return (
                    <div
                      key={idx}
                      className='flex flex-col items-start justify-start mb-5 space-y-2'
                    >
                      <label
                        htmlFor={field.name}
                        className='text-sm font-medium text-slate-900'
                      >
                        {field.label}
                      </label>
                      <input
                        name={field.name}
                        id={field.name}
                        className='w-full px-4 py-2 text-sm border border-gray-300 rounded-md text-slate-900 focus:outline-none focus:border-slate-500'
                        value={plan[field.name]}
                        onChange={handleInputChange}
                      />
                    </div>
                  )
                }
              )}
            </div>
            <div className='flex items-center mb-5 space-x-3'>
              <span className='flex items-center justify-center w-8 h-8 text-white bg-black rounded-full font-extralight'>
                2
              </span>
              <p className='font-medium text-left'>Select a language.</p>
            </div>
            <div className='block mb-5'>
              <DropDown
                language={language}
                setLanguage={(newLanguage: any) => setLanguage(newLanguage)}
                type='language'
              />
            </div>
            <div className='flex items-center mb-5 space-x-3'>
              <span className='flex items-center justify-center w-8 h-8 text-white bg-black rounded-full font-extralight'>
                3
              </span>
              <p className='font-medium text-left'>Select your vibe.</p>
            </div>
            <div className='block'>
              <DropDown
                vibe={vibe}
                setVibe={(newVibe: any) => setVibe(newVibe)}
                type='vibe'
              />
            </div>

            {!loading && (
              <button
                className='w-full px-4 py-2 mt-8 font-medium text-white bg-black rounded-xl sm:mt-10 hover:bg-black/80'
                onClick={(e) => generatePlan(e)}
              >
                Generate your plan &rarr;
              </button>
            )}
            {loading && (
              <button
                className='w-full px-4 py-2 mt-8 font-medium text-white bg-black rounded-xl sm:mt-10 hover:bg-black/80'
                disabled
              >
                <LoadingDots color='white' style='large' />
              </button>
            )}
          </section>
        ) : (
          <>
            <Toaster
              position='top-center'
              reverseOrder={false}
              toastOptions={{ duration: 2000 }}
            />
            <hr className='h-px bg-gray-700 border-1 dark:bg-gray-700' />
            <ResizablePanel>
              <AnimatePresence mode='wait'>
                <motion.div className='my-10 space-y-10'>
                  <div>
                    <h2 className='mx-auto text-3xl font-bold sm:text-4xl text-slate-900'>
                      Your generated nutrition plan
                    </h2>
                  </div>
                  <div className='flex flex-col items-center justify-center max-w-xl mx-auto space-y-8 text-left'>
                    <div className='p-5 transition bg-white border rounded-lg shadow-sm hover:bg-gray-100 cursor-copy'>
                      <div
                        className='result'
                        onClick={() => {
                          navigator.clipboard.writeText(generatedPlan)
                          toast('Plan copied to clipboard', {
                            icon: '✂️',
                          })
                        }}
                        dangerouslySetInnerHTML={{
                          __html: generatedPlan,
                        }}
                      />
                    </div>
                  </div>
                  {generatedPlan && !loading && (
                    <div className='flex items-center justify-center mt-4 space-x-4'>
                      <button
                        className='px-4 py-2 font-medium text-white bg-black rounded-xl hover:bg-black/80'
                        onClick={() => {
                          copyToClipboard()
                          toast('Plan copied to clipboard', {
                            icon: '✂️',
                          })
                        }}
                      >
                        Copy
                      </button>
                      <button
                        className='px-4 py-2 font-medium text-white bg-black rounded-xl hover:bg-black/80'
                        onClick={() => {
                          downloadPlan()
                          toast('Plan downloaded', {
                            icon: '📥',
                          })
                        }}
                      >
                        Download
                      </button>
                      <button
                        className='flex items-center px-4 py-2 space-x-2 font-medium text-white bg-black rounded-xl hover:bg-black/80'
                        onClick={() => {
                          setGeneratedPlan('')
                          setPlan(InitialData)
                          setDateRange({
                            from: '',
                            to: '',
                          })
                          setLanguage('English')
                          setVibe('I want to lose weight')
                        }}
                      >
                        <span>Reset Plan</span>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                          className='w-5 h-5'
                        >
                          <path
                            fillRule='evenodd'
                            d='M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </ResizablePanel>
          </>
        )}
      </main>
      <Footer />
    </section>
  )
}

export default Home
