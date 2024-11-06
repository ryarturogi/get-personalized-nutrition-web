import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useState,
} from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown, { LanguageType, VibeType } from "../components/DropDown";
import Footer from "../components/Footer";
import Github from "../components/GitHub";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";
import ResizablePanel from "../components/ResizablePanel";

interface InitialDataType {
  [key: string]: any;
  from: Date;
  to: Date;
  age: number;
  gender: string;
  country: string;
  gastronomy: string;
  height: number;
  weight: number;
  activityLevel: string;
  dietaryRestrictions: string[];
  goals: string[];
  healthConditions: string[];
  foodPreferences: string[];
  dailyCalorieIntake: number;
  macroRatios: {
    protein: number;
    fat: number;
    carbohydrates: number;
  };
  microNutrientRequirements: {
    vitaminA: number;
    vitaminB: number;
    vitaminC: number;
    iron: number;
  };
}

const InitialData: InitialDataType = {
  from: new Date("2023-01-01"),
  to: new Date("2023-12-01"),
  age: 35,
  gender: "male",
  country: "dominican republic",
  gastronomy: "dominican",
  height: 170,
  weight: 70,
  activityLevel: "moderate",
  dietaryRestrictions: ["vegetarian"],
  goals: ["weight loss"],
  healthConditions: ["diabetes"],
  foodPreferences: ["vegetables", "grains"],
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
};

const fields: any = [
  {
    label: "Age",
    name: "age",
    type: "number",
    placeholder: "Enter your age",
  },
  {
    label: "Gender",
    name: "gender",
    type: "text",
    placeholder: "Enter your gender",
  },
  {
    label: "Country",
    name: "country",
    type: "text",
    placeholder: "Enter your country",
  },
  {
    label: "Gastronomy",
    name: "gastronomy",
    type: "text",
    placeholder: "Enter your gastronomy",
  },
  {
    label: "Height",
    name: "height",
    type: "number",
    placeholder: "Enter your height",
  },
  {
    label: "Weight",
    name: "weight",
    type: "number",
    placeholder: "Enter your weight",
  },
  {
    label: "Activity Level",
    name: "activityLevel",
    type: "text",
    placeholder: "Enter your activity level",
  },
  {
    label: "Dietary Restrictions",
    name: "dietaryRestrictions",
    type: "text",
    placeholder: "Enter your dietary restrictions",
  },
  {
    label: "Goals",
    name: "goals",
    type: "text",
    placeholder: "Enter your goals",
  },
  {
    label: "Health Conditions",
    name: "healthConditions",
    type: "text",
    placeholder: "Enter your health conditions",
  },
  {
    label: "Food Preferences",
    name: "foodPreferences",
    type: "text",
    placeholder: "Enter your food preferences",
  },
  {
    label: "Daily Calorie Intake",
    name: "dailyCalorieIntake",
    type: "number",
    placeholder: "Enter your daily calorie intake",
  },
  {
    label: "From Date",
    name: "from",
    type: "date",
    placeholder: "Enter your from",
  },
  {
    label: "To Date",
    name: "to",
    type: "date",
    placeholder: "Enter your to",
  },
];

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [vibe, setVibe] = useState<VibeType>("I want to lose weight");
  const [language, setLanguage] = useState<LanguageType>("English");
  const [generatedPlan, setGeneratedPlan] = useState<any>("");
  const [dateRange, setDateRange] = useState<any>({
    from: new Date("2023-01-01"),
    to: new Date("2023-12-01"),
  });
  const [plan, setPlan] = useState<InitialDataType>(InitialData);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setPlan((prev: any) => ({ ...prev, [name]: value }));
  };

  const prompt: any = `
  As a highly skilled nutritionist and wellness coach, create a comprehensive and personalized wellness plan. This plan should be based on the user's unique data, goals, and dietary preferences. Please ensure the following:

  ### Meal Plan
  Design a meal plan that includes:
  - **3 breakfasts, 3 lunches, 3 dinners, and 3 snacks**
  - Each meal should have:
    - A detailed description, specific calorie count, and macronutrient breakdown (protein, fat, carbohydrates)
  - Tailor meals to the user's **daily calorie intake** and **macro ratios**
  - Integrate **dietary restrictions** and **food preferences** to ensure the plan is both enjoyable and suitable for the user
  - Meals should be aligned with the user's **gastronomy** and **micronutrient requirements** from the users country of ${
    plan.country
  }

  ### Exercise Recommendations
  Provide **3 exercise recommendations** that align with the user's:
  - **Activity level**, **goals**, and **health conditions**
  - Each recommendation should specify the **type of exercise**, **duration**, and **frequency**
  
  ### Recipe Suggestions
  Include **1 recipe suggestion per meal** with:
  - **Name and description** for easy preparation
  - Ensure recipes are simple, health-conscious, and aligned with the user's dietary needs

  ### Additional Wellness Recommendations
  Add **3 personalized wellness tips** to help the user enhance their overall health. These can include lifestyle adjustments, hydration reminders, mindfulness practices, or any other relevant advice.

  ### Formatting and Language Requirements
  - **Output Format**: The plan should be presented in **HTML and CSS** format, following the structure below:
    - Use headings (e.g., '<h4>Breakfast</h4>') and lists ('<ul>', '<li>') for clarity.
    - Ensure the output is well-structured and visually organized for a clean display.
  - **Language**: Translate all content to ${language}.
  - **Date Formatting**: Display the "From" and "To" dates in this format: "December 31, 2024".
  - **Uniqueness**: Generate a completely unique plan for every user, avoiding repetition and ensuring originality each time.
  - **never** use the same plan for different users.
  - **never** use a title, just the headings for each section.

  ### Example Output Format (Do Not Copy)
  Here is an example structure for the output format. **Do not use this data**; generate original content based on the user's profile.

  "<body>
    <h4>Breakfast</h4>
    <ul>
      <li>Scrambled tofu with spinach and tomatoes (300 calories, P: 20g, F: 15g, C: 25g)</li>
      <li>Chia pudding with almond milk and fresh fruits (250 calories, P: 8g, F: 15g, C: 30g)</li>
      <li>Vegetable smoothie with kale, banana, and flaxseeds (400 calories, P: 10g, F: 14g, C: 60g)</li>
    </ul>
    <h4>Lunch</h4>
    <ul>
      <li>Quinoa and black bean salad with diced peppers (450 calories, P: 15g, F: 10g, C: 70g)</li>
    </ul>
    <h4>Exercise Recommendations</h4>
    <ul>
      <li>30 minutes of brisk walking, 5 days a week</li>
    </ul>
    <h4>Additional Recommendations</h4>
    <ul>
      <li>Stay hydrated throughout the day</li>
    </ul>
  </body>"

  ### User Data
  Please use the following personalized information to tailor the wellness plan:
  - Age: ${plan?.age}
  - Gender: ${plan?.gender}
  - Country: ${plan?.country}
  - Cuisine Preference: ${plan?.gastronomy}
  - Height: ${plan?.height} cm
  - Weight: ${plan?.weight} kg
  - Activity Level: ${plan?.activityLevel}
  - Dietary Restrictions: ${plan?.dietaryRestrictions?.join?.(", ")}
  - Goals: ${plan?.goals.join(", ")}
  - Health Conditions: ${plan?.healthConditions?.join?.(", ")}
  - Food Preferences: ${plan?.foodPreferences?.join?.(", ")}
  - Daily Calorie Intake: ${plan?.dailyCalorieIntake}
  - Macro Ratios: Protein: ${plan?.macroRatios.protein}, Fat: ${
    plan?.macroRatios.fat
  }, Carbohydrates: ${plan?.macroRatios.carbohydrates}
  - Micronutrient Requirements: Vitamin A: ${
    plan?.microNutrientRequirements.vitaminA
  } mcg, Vitamin B: ${
    plan?.microNutrientRequirements.vitaminB
  } mcg, Vitamin C: ${plan?.microNutrientRequirements.vitaminC} mg, Iron: ${
    plan?.microNutrientRequirements.iron
  } mg
  - Plan Date Range: From ${plan?.from} to ${plan?.to}

  Thank you for creating an impactful, unique, and user-centered wellness plan.
`;

  const generatePlan = async (e: any) => {
    e.preventDefault();
    setGeneratedPlan("");
    setLoading(true);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      setLoading(false);
      throw new Error(response.statusText);
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (reader && !done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;

      // Decode the chunk and clean up unwanted HTML tags and backticks
      let chunkValue = decoder.decode(value);

      // Remove backticks and any "```html" or "```" markers
      chunkValue = chunkValue.replace(/```html|```/g, "");

      setGeneratedPlan((prev: string) => prev + chunkValue);
    }

    setLoading(false);
  };
  const copyToClipboard = () => {
    const markdown = generatedPlan
      .replace(/<h4>/g, "### ")
      .replace(/<\/h4>/g, "")
      .replace(/<ul>/g, "")
      .replace(/<\/ul>/g, "")
      .replace(/<li>/g, "- ")
      .replace(/<\/li>/g, "")
      .replace(/<body>/g, "")
      .replace(/<\/body>/g, "");

    navigator.clipboard.writeText(markdown);
  };

  const downloadPlan = () => {
    // remove all html tags, leaving only the text and line breaks
    const text = generatedPlan.replace(/<[^>]*>?/gm, "");
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "plan.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
    <section className="flex flex-col items-center justify-center max-w-5xl min-h-screen py-2 mx-auto">
      <Head>
        <title>Personalized Nutrition Plan Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex flex-col items-center justify-center flex-1 w-full px-4 mt-8 text-center">
        {!generatedPlan ? (
          <section className="w-full max-w-xl">
            <div className="flex items-center mt-2 space-x-3">
              <span className="flex items-center justify-center w-8 h-8 text-white bg-black rounded-full font-extralight">
                1
              </span>
              <p className="font-medium text-left">
                Fill the form to prepare the nutrition plan{" "}
                <span className="text-slate-500">
                  (now get ready to be amazed)
                </span>
                .
              </p>
            </div>
            <div className="grid grid-cols-1 gap-2 mt-5 md:grid-cols-2">
              {fields.map(
                (
                  field: {
                    name: string;
                    label:
                      | string
                      | number
                      | boolean
                      | ReactElement<any, string | JSXElementConstructor<any>>
                      | ReactFragment
                      | ReactPortal
                      | null
                      | undefined;
                    rows: number | undefined;
                    type: string;
                  },
                  idx: Key | null | undefined
                ) => {
                  if (field.type === "date") {
                    return (
                      <div
                        key={idx}
                        className="flex flex-col items-start justify-start mb-5 space-y-2"
                      >
                        <label
                          htmlFor={field.name}
                          className="text-sm font-medium text-slate-900"
                        >
                          {field.label}
                        </label>
                        <div className="flex items-center justify-start w-full space-x-2">
                          <input
                            type="date"
                            name={field.name}
                            id={field.name}
                            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md text-slate-900 focus:outline-none focus:border-slate-500"
                            value={
                              field.name === "from"
                                ? dateRange.from
                                : dateRange.to
                            }
                            onChange={(e) =>
                              field.name === "from"
                                ? setDateRange({
                                    ...dateRange,
                                    from: e.target.value,
                                  })
                                : field.name === "to"
                                ? setDateRange({
                                    ...dateRange,
                                    to: e.target.value,
                                  })
                                : null
                            }
                          />
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div
                      key={idx}
                      className="flex flex-col items-start justify-start mb-5 space-y-2"
                    >
                      <label
                        htmlFor={field.name}
                        className="text-sm font-medium text-slate-900"
                      >
                        {field.label}
                      </label>
                      <input
                        name={field.name}
                        id={field.name}
                        className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md text-slate-900 focus:outline-none focus:border-slate-500"
                        value={plan[field.name]}
                        onChange={handleInputChange}
                      />
                    </div>
                  );
                }
              )}
            </div>
            <div className="flex items-center mb-5 space-x-3">
              <span className="flex items-center justify-center w-8 h-8 text-white bg-black rounded-full font-extralight">
                2
              </span>
              <p className="font-medium text-left">Select a language.</p>
            </div>
            <div className="block mb-5">
              <DropDown
                language={language}
                setLanguage={(newLanguage: any) => setLanguage(newLanguage)}
                type="language"
              />
            </div>
            <div className="flex items-center mb-5 space-x-3">
              <span className="flex items-center justify-center w-8 h-8 text-white bg-black rounded-full font-extralight">
                3
              </span>
              <p className="font-medium text-left">Select your vibe.</p>
            </div>
            <div className="block">
              <DropDown
                vibe={vibe}
                setVibe={(newVibe: any) => setVibe(newVibe)}
                type="vibe"
              />
            </div>

            {!loading && (
              <button
                className="w-full px-4 py-2 mt-8 font-medium text-white bg-black rounded-xl sm:mt-10 hover:bg-black/80"
                onClick={(e) => generatePlan(e)}
              >
                Generate your plan &rarr;
              </button>
            )}
            {loading && (
              <button
                className="w-full px-4 py-2 mt-8 font-medium text-white bg-black rounded-xl sm:mt-10 hover:bg-black/80"
                disabled
              >
                <LoadingDots color="white" style="large" />
              </button>
            )}
          </section>
        ) : (
          <>
            <Toaster
              position="top-center"
              reverseOrder={false}
              toastOptions={{ duration: 2000 }}
            />
            <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
            <ResizablePanel>
              <AnimatePresence mode="wait">
                <motion.div className="my-2 space-y-10">
                  <div>
                    <h2 className="mx-auto text-2xl font-bold sm:text-4xl text-slate-900">
                      Your generated nutrition plan
                    </h2>
                  </div>
                  <div className="flex flex-col items-center justify-center max-w-xl mx-auto space-y-8 text-left">
                    <div className="p-5 transition bg-white border rounded-lg shadow-sm hover:bg-gray-100 cursor-copy">
                      <div
                        className="result"
                        onClick={() => {
                          navigator.clipboard.writeText(generatedPlan);
                          toast("Plan copied to clipboard", {
                            icon: "✂️",
                          });
                        }}
                        dangerouslySetInnerHTML={{
                          __html: generatedPlan,
                        }}
                      />
                    </div>
                  </div>
                  {generatedPlan && !loading && (
                    <div className="flex items-center justify-center mt-4 space-x-4">
                      <button
                        className="px-4 py-2 font-medium text-white bg-black rounded-xl hover:bg-black/80"
                        onClick={() => {
                          copyToClipboard();
                          toast("Plan copied to clipboard", {
                            icon: "✂️",
                          });
                        }}
                      >
                        Copy
                      </button>
                      <button
                        className="px-4 py-2 font-medium text-white bg-black rounded-xl hover:bg-black/80"
                        onClick={() => {
                          downloadPlan();
                          toast("Plan downloaded", {
                            icon: "📥",
                          });
                        }}
                      >
                        Download
                      </button>
                      <button
                        className="flex items-center px-4 py-2 space-x-2 font-medium text-white bg-black rounded-xl hover:bg-black/80"
                        onClick={() => {
                          setGeneratedPlan("");
                          setPlan(InitialData);
                          setDateRange({
                            from: "",
                            to: "",
                          });
                          setLanguage("English");
                          setVibe("I want to lose weight");
                        }}
                      >
                        <span>Reset Plan</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
                            clipRule="evenodd"
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
  );
};

export default Home;
