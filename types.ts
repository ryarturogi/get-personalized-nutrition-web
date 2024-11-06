export interface InitialDataType {
  [key: string]: any;
  from: Date;
  to: Date;
  age: number | null;
  gender: string;
  country: string;
  gastronomy: string;
  height: number | null;
  weight: number | null;
  activityLevel: string;
  dietaryRestrictions: string[];
  goals: string[];
  healthConditions: string[];
  foodPreferences: string[];
  dailyCalorieIntake: number | null;
  macroRatios: {
    protein: number | null;
    fat: number | null;
    carbohydrates: number | null;
  };
  microNutrientRequirements: {
    vitaminA: number | null;
    vitaminB: number | null;
    vitaminC: number | null;
    iron: number | null;
  };
}
