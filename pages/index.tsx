import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import { Key, useMemo, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Dropdown from "@/components/Dropdown";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LoadingDots from "@/components/LoadingDots";
import ResizablePanel from "@/components/ResizablePanel";
import Countries from "@/utils/countries";
import { InitialDataType } from "@/types";

/**
 * Initial user data for creating a nutrition plan.
 * @constant
 */
const InitialData: InitialDataType = {
  from: new Date("2024-01-01"),
  to: new Date("2024-12-01"),
  age: null,
  gender: "",
  country: "",
  gastronomy: "",
  height: null,
  weight: null,
  activityLevel: "",
  dietaryRestrictions: [],
  goals: [],
  healthConditions: [],
  foodPreferences: [],
  dailyCalorieIntake: null,
  macroRatios: { protein: null, fat: null, carbohydrates: null },
  microNutrientRequirements: {
    vitaminA: null,
    vitaminB: null,
    vitaminC: null,
    iron: null,
  },
};

/**
 * Represents an option in a dropdown menu.
 */
type OptionType = { value: string; label: string } | string;

/**
 * Base field type for form fields.
 */
interface FieldType {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
}

/**
 * Field type with dropdown options for selection.
 */
interface FieldSelectType extends FieldType {
  type: "dropdown";
  options: OptionType[];
}

/**
 * List of available gastronomy options for the dropdown.
 * @constant
 */
const gastronomyOptions: OptionType[] = [
  "American",
  "Chinese",
  "Dominican",
  "French",
  "Indian",
  "Italian",
  "Japanese",
  "Korean",
  "Lebanese",
  "Mediterranean",
  "Mexican",
  "Thai",
  "Venezuelan",
  "Spanish",
  "Greek",
  "Turkish",
  "Moroccan",
  "Ethiopian",
  "Brazilian",
  "Vietnamese",
];

/**
 * List of available gender options for the dropdown.
 * @constant
 */
const genderOptions: OptionType[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "non-binary", label: "Non-binary" },
  { value: "prefer-not-to-say", label: "Prefer not to say" },
  { value: "other", label: "Other" },
];

/**
 * List of available activity level options for the dropdown.
 * @constant
 */
const activityLevelOptions: OptionType[] = [
  { value: "sedentary", label: "Sedentary (little or no exercise)" },
  { value: "light", label: "Light (light exercise/sports 1-3 days/week)" },
  {
    value: "moderate",
    label: "Moderate (moderate exercise/sports 3-5 days/week)",
  },
  { value: "active", label: "Active (hard exercise/sports 6-7 days a week)" },
  {
    value: "very-active",
    label: "Very Active (very hard exercise/sports & physical job)",
  },
];

/**
 * List of available dietary restrictions options for the dropdown.
 * @constant
 */
const dietaryRestrictionsOptions: OptionType[] = [
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "gluten-free", label: "Gluten-Free" },
  { value: "lactose-free", label: "Lactose-Free" },
  { value: "paleo", label: "Paleo" },
  { value: "keto", label: "Keto" },
  { value: "pescatarian", label: "Pescatarian" },
  { value: "kosher", label: "Kosher" },
  { value: "halal", label: "Halal" },
  { value: "no-restrictions", label: "No Dietary Restrictions" },
];

/**
 * List of available goals options for the dropdown.
 * @constant
 */
const goalsOptions: OptionType[] = [
  { value: "weight-loss", label: "Weight Loss" },
  { value: "muscle-gain", label: "Muscle Gain" },
  { value: "maintenance", label: "Maintenance" },
  { value: "improved-endurance", label: "Improved Endurance" },
  { value: "flexibility", label: "Flexibility" },
  { value: "strength", label: "Strength" },
  { value: "overall-health", label: "Overall Health" },
  { value: "better-skin", label: "Better Skin" },
  { value: "increased-energy", label: "Increased Energy" },
  { value: "other", label: "Other" },
];

/**
 * List of available health conditions options for the dropdown.
 * @constant
 */
const healthConditionsOptions: OptionType[] = [
  { value: "diabetes", label: "Diabetes" },
  { value: "hypertension", label: "Hypertension" },
  { value: "heart-disease", label: "Heart Disease" },
  { value: "arthritis", label: "Arthritis" },
  { value: "asthma", label: "Asthma" },
  { value: "allergies", label: "Allergies" },
  { value: "none", label: "None" },
  { value: "other", label: "Other" },
];

/**
 * List of available food preferences options for the dropdown.
 * @constant
 */
const foodPreferencesOptions: OptionType[] = [
  { value: "vegetables", label: "Vegetables" },
  { value: "grains", label: "Grains" },
  { value: "fruits", label: "Fruits" },
  { value: "meat", label: "Meat" },
  { value: "dairy", label: "Dairy" },
  { value: "seafood", label: "Seafood" },
  { value: "nuts", label: "Nuts" },
  { value: "seeds", label: "Seeds" },
  { value: "legumes", label: "Legumes" },
  { value: "other", label: "Other" },
];

/**
 * List of available vibes options for the dropdown.
 * @constant
 */
const vibes: string[] = [
  "I want to gain weight",
  "I want to lose weight",
  "I want to maintain my weight",
  "I want to build muscle",
  "I want to increase endurance",
  "I want to improve flexibility",
  "I want to enhance overall health",
  "I want to boost energy levels",
];

/**
 * List of available languages options for the dropdown.
 * @constant
 */
const languages: string[] = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Japanese",
  "Korean",
  "Portuguese",
  "Russian",
  "Chinese",
  "Arabic",
  "Hindi",
  "Bengali",
  "Dutch",
  "Turkish",
  "Vietnamese",
  "Urdu",
  "Swedish",
  "Polish",
  "Norwegian",
];

/**
 * Fields to be displayed in the form for user input.
 * @constant
 */
const fields: (FieldType | FieldSelectType)[] = [
  { label: "Age", name: "age", type: "number", placeholder: "Enter your age" },
  {
    label: "Gender",
    name: "gender",
    type: "dropdown",
    options: genderOptions,
  },
  { label: "Country", name: "country", type: "dropdown", options: Countries },
  {
    label: "Gastronomy",
    name: "gastronomy",
    type: "dropdown",
    options: gastronomyOptions, // Updated to dropdown with predefined options
  },
  {
    label: "Height",
    name: "height",
    type: "number",
    placeholder: "Enter your height (in)",
  },
  {
    label: "Weight",
    name: "weight",
    type: "number",
    placeholder: "Enter your weight (lbs)",
  },
  {
    label: "Activity Level",
    name: "activityLevel",
    type: "dropdown",
    options: activityLevelOptions,
  },
  {
    label: "Dietary Restrictions",
    name: "dietaryRestrictions",
    type: "dropdown",
    options: dietaryRestrictionsOptions,
  },
  {
    label: "Goals",
    name: "goals",
    type: "dropdown",
    options: goalsOptions,
  },
  {
    label: "Health Conditions",
    name: "healthConditions",
    type: "dropdown",
    options: healthConditionsOptions,
  },
  {
    label: "Food Preferences",
    name: "foodPreferences",
    type: "dropdown",
    options: foodPreferencesOptions,
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
    placeholder: "Enter your start date",
  },
  {
    label: "To Date",
    name: "to",
    type: "date",
    placeholder: "Enter your end date",
  },
];

/**
 * The main Home component that renders the nutrition plan generator form and displays the generated plan.
 * @component
 */
const Home: NextPage = () => {
  // State to hold the user's plan data
  const [plan, setPlan] = useState<InitialDataType>(InitialData);
  // State to hold the selected vibe
  const [selectedVibe, setSelectedVibe] = useState("I want to lose weight");
  // State to hold the selected language
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  // State to hold the date range; using specific types instead of 'any' for better type safety
  const [dateRange, setDateRange] = useState<{
    from: string;
    to: string;
  }>({
    from: "2023-01-01",
    to: "2023-12-01",
  });
  // State to hold the generated nutrition plan as a string
  const [generatedPlan, setGeneratedPlan] = useState<string>("");
  // State to indicate if the plan is being generated (loading state)
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Handles changes in form inputs and updates the plan state accordingly.
   * @param e - The input change event
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPlan((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Handles changes in dropdown fields and updates the plan state accordingly.
   * @param name - The name of the field being updated
   * @param value - The new value selected by the user
   */
  const handleDropdownChange = (name: string, value: string) => {
    setPlan((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Generates the prompt string used to request the nutrition plan from the API.
   * This memoizes the prompt to avoid unnecessary recalculations.
   */
  const prompt: string = useMemo(
    () => `
      As a highly skilled nutritionist and wellness coach, create a comprehensive and personalized wellness plan. This plan should be based on the user's unique data, goals, and dietary preferences. Please ensure the following:

      ### Meal Plan
      Design a meal plan that includes:
      - **3 breakfasts, 3 lunches, 3 dinners, and 3 snacks**
      - Each meal should have:
        - A detailed description, specific calorie count, and macronutrient breakdown (protein, fat, carbohydrates)
      - Tailor meals to the user's **daily calorie intake** and **macro ratios**
      - Integrate **dietary restrictions** and **food preferences** to ensure the plan is both enjoyable and suitable for the user
      - Meals should be aligned with the user's **gastronomy** and **micronutrient requirements** from the user's country of ${
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
      - **Language**: Translate all content to ${selectedLanguage}.
      - **Date Formatting**: Display the "From" and "To" dates in this format: "December 31, 2024".
      - **Uniqueness**: Generate a completely unique plan for every user, avoiding repetition and ensuring originality each time.
      - **never** use the same plan for different users.
      - **never** use a title, just the headings for each section.

      ### Example Output Format (Do Not Copy)
      Here is an example structure for the output format. **Do not use this data**; generate original content based on the user's profile.

      "<body>
        <div className="w-full mx-auto">
          <h2 className="mx-auto text-2xl font-bold sm:text-4xl text-slate-900">
            Your generated nutrition plan
          </h2>
        </div>
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
      - Age: ${plan.age}
      - Gender: ${plan.gender}
      - Country: ${plan.country}
      - Cuisine Preference: ${plan.gastronomy}
      - Height: ${plan.height} in
      - Weight: ${plan.weight} lbs
      - Activity Level: ${plan.activityLevel}
      - Dietary Restrictions: ${plan.dietaryRestrictions.join?.(", ")}
      - Goals: ${plan.goals.join?.(", ")}
      - Health Conditions: ${plan.healthConditions.join?.(", ")}
      - Food Preferences: ${plan.foodPreferences.join?.(", ")}
      - Daily Calorie Intake: ${plan.dailyCalorieIntake}
      - Macro Ratios: Protein: ${plan.macroRatios.protein}, Fat: ${
      plan.macroRatios.fat
    }, Carbohydrates: ${plan.macroRatios.carbohydrates}
      - Micronutrient Requirements: Vitamin A: ${
        plan.microNutrientRequirements.vitaminA
      } mcg, Vitamin B: ${
      plan.microNutrientRequirements.vitaminB
    } mcg, Vitamin C: ${plan.microNutrientRequirements.vitaminC} mg, Iron: ${
      plan.microNutrientRequirements.iron
    } mg
      - Plan Date Range: From ${new Date(plan.from).toLocaleDateString(
        "en-US",
        { year: "numeric", month: "long", day: "numeric" }
      )} to ${new Date(plan.to).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}

      Thank you for creating an impactful, unique, and user-centered wellness plan.
    `,
    [plan, selectedLanguage]
  );

  /**
   * Generates the personalized nutrition plan by sending a request to the API.
   * Handles streaming response and updates the generatedPlan state incrementally.
   * @param e - The form submission event
   */
  const generatePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneratedPlan("");
    setLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (reader && !done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        if (value) {
          // Decode the chunk and clean up unwanted HTML tags and backticks
          let chunkValue = decoder.decode(value, { stream: true });

          // Remove backticks and any "```html" or "```" markers
          chunkValue = chunkValue.replace(/```html|```/g, "");

          setGeneratedPlan((prev: string) => prev + chunkValue);
        }
      }
    } catch (error) {
      console.error("Error generating plan:", error);
      toast.error("Failed to generate the plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Copies the generated plan in markdown format to the clipboard.
   */
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
    toast.success("Plan copied to clipboard!", { icon: "✂️" });
  };

  /**
   * Downloads the generated plan as a plain text file.
   */
  const downloadPlan = () => {
    // Remove all HTML tags, leaving only the text and line breaks
    const text = generatedPlan.replace(/<[^>]*>?/gm, "");
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "plan.txt";
    document.body.appendChild(element); // Required for this to work in Firefox
    element.click();
    document.body.removeChild(element); // Clean up after download
    toast.success("Plan downloaded!", { icon: "📥" });
  };

  /**
   * Resets the generated plan and all form fields to their initial states.
   */
  const resetPlan = () => {
    setGeneratedPlan("");
    setPlan(InitialData);
    setDateRange({
      from: "2023-01-01",
      to: "2023-12-01",
    });
    setSelectedLanguage("English");
    setSelectedVibe("I want to lose weight");
    toast.success("Plan has been reset.", { icon: "🔄" });
  };

  return (
    <section className="flex flex-col items-center justify-center max-w-5xl min-h-screen py-2 mx-auto">
      {/* Head component to manage metadata */}
      <Head>
        <title>Personalized Nutrition Plan Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header component */}
      <Header />

      {/* Main content area */}
      <main className="flex flex-col items-center justify-center flex-1 w-full px-4 mt-8 text-center">
        {!generatedPlan ? (
          <section className="w-full max-w-xl">
            {/* Step 1: Fill out the form */}
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

            {/* Form fields grid */}
            <div className="grid grid-cols-1 gap-2 mt-5 md:grid-cols-2">
              {fields.map(
                (
                  field: FieldType | FieldSelectType,
                  idx: Key | null | undefined
                ) => {
                  // Render date input fields
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
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            field.name === "from"
                              ? setDateRange({
                                  ...dateRange,
                                  from: e.target.value,
                                })
                              : setDateRange({
                                  ...dateRange,
                                  to: e.target.value,
                                })
                          }
                        />
                      </div>
                    );
                  }

                  // Render dropdown fields
                  if (field.type === "dropdown") {
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
                        <Dropdown
                          options={(field as FieldSelectType).options}
                          selected={field.name ? (plan as any)[field.name] : ""}
                          setSelected={(value: string) =>
                            field.name &&
                            handleDropdownChange(field.name, value)
                          }
                        />
                      </div>
                    );
                  }

                  // Render standard input fields
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
                        type={field.type}
                        name={field.name}
                        id={field.name}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md text-slate-900 focus:outline-none focus:border-slate-500"
                        value={field.name ? (plan as any)[field.name] : ""}
                        onChange={handleInputChange}
                      />
                    </div>
                  );
                }
              )}
            </div>

            {/* Step 2: Select a language */}
            <div className="flex items-center mb-5 space-x-3">
              <span className="flex items-center justify-center w-8 h-8 text-white bg-black rounded-full font-extralight">
                2
              </span>
              <p className="font-medium text-left">Select a language.</p>
            </div>
            <div className="block mb-5">
              <Dropdown
                options={languages}
                selected={selectedLanguage}
                setSelected={setSelectedLanguage}
              />
            </div>

            {/* Step 3: Select your vibe */}
            <div className="flex items-center mb-5 space-x-3">
              <span className="flex items-center justify-center w-8 h-8 text-white bg-black rounded-full font-extralight">
                3
              </span>
              <p className="font-medium text-left">Select your vibe.</p>
            </div>
            <div className="block">
              <Dropdown
                options={vibes}
                selected={selectedVibe}
                setSelected={setSelectedVibe}
              />
            </div>

            {/* Generate Plan Button */}
            {!loading ? (
              <button
                className="w-full px-4 py-2 mt-8 font-medium text-white bg-black rounded-xl sm:mt-10 hover:bg-black/80"
                onClick={generatePlan}
              >
                Generate your plan &rarr;
              </button>
            ) : (
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
            {/* Toaster for notifications */}
            <Toaster
              position="top-center"
              reverseOrder={false}
              toastOptions={{ duration: 2000 }}
            />

            {/* Divider */}
            <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />

            {/* Resizable panel to display the generated plan */}
            <ResizablePanel>
              <AnimatePresence mode="wait">
                <motion.div
                  className="max-w-xl mx-auto my-2 space-y-10 border rounded-lg shadow-sm cursor-copy overflow-y-auto max-h-[calc(100vh-20rem)]"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Generated Plan Content */}
                  <div
                    className="flex flex-col items-center justify-center p-8 space-y-8 text-left"
                    ref={(el) =>
                      el?.scrollIntoView({
                        behavior: "smooth",
                        block: "end",
                        inline: "nearest",
                      })
                    }
                  >
                    <div
                      className="result"
                      onClick={copyToClipboard}
                      dangerouslySetInnerHTML={{
                        __html: generatedPlan,
                      }}
                    />
                  </div>
                </motion.div>
                {/* Action Buttons: Copy, Download, Reset */}
                {generatedPlan && !loading && (
                  <div className="flex items-center justify-center mt-4 space-x-4">
                    <button
                      className="px-4 py-2 font-medium text-white bg-black rounded-xl hover:bg-black/80"
                      onClick={copyToClipboard}
                    >
                      Copy
                    </button>
                    <button
                      className="px-4 py-2 font-medium text-white bg-black rounded-xl hover:bg-black/80"
                      onClick={downloadPlan}
                    >
                      Download
                    </button>
                    <button
                      className="flex items-center px-4 py-2 space-x-2 font-medium text-white bg-black rounded-xl hover:bg-black/80"
                      onClick={resetPlan}
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
              </AnimatePresence>
            </ResizablePanel>
          </>
        )}
      </main>

      {/* Footer component */}
      <Footer />
    </section>
  );
};

export default Home;
