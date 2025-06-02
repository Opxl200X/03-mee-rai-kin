import { create } from 'zustand';

export interface Ingredient {
  id: string;
  name: string;
  nutrition: string;
  caloriesPerUnit: number;
  unit: string;
}

export interface Recipe {
  id: string;
  title: string;
  imageUrl: string;
  cookTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  calories: number;
  ingredients: Ingredient[];
  steps: string[];
  videoUrl?: string;
}

interface RecipeState {
  recipes: Recipe[];
  favoriteRecipes: string[];
  searchResults: Recipe[];
  popularRecipes: Recipe[];
  
  searchRecipes: (query: string, filters?: string[]) => void;
  toggleFavorite: (recipeId: string) => void;
  getRandomRecipe: () => Recipe | null;
  getRecipeById: (id: string) => Recipe | null;
}

// Mock data for demonstration
const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'ผัดคะน้าหมูกรอบ',
    imageUrl: 'https://www.ajinomoto.co.th/storage/photos/shares/Recipe/Menu/3-13Stirfriedkale/61a8f1623ee0a.jpg',
    cookTime: 15,
    difficulty: 'easy',
    calories: 650,
    ingredients: [
      { id: 'i1', name: 'หมูกรอบ', nutrition: 'ไขมัน, โปรตีน', caloriesPerUnit: 495, unit: 'กรัม' },
      { id: 'i2', name: 'น้ำมัน', nutrition: 'ไขมัน', caloriesPerUnit: 120, unit: 'ช้อนโต๊ะ' },
      { id: 'i3', name: 'เครื่องปรุง', nutrition: 'เกลือแร่, วิตามิน', caloriesPerUnit: 35, unit: 'หน่วยใช้' },
      { id: 'i4', name: 'คะน้า', nutrition: 'วิตามิน, เกลือแร่', caloriesPerUnit: 0, unit: 'กรัม' }
    ],
    steps: [
      'ผัดคะน้าใส่หมูกรอบลงไปพร้อมเครื่องปรุง',
      'เสิร์ฟร้อน ๆ'
    ],
    videoUrl: 'https://cdn.videezy.com/system/resources/previews/000/039/352/original/Stir_Fry.mp4'
  },
  {
    id: '2',
    title: 'แกงเขียวหวานหมู',
    imageUrl: 'https://www.ajinomoto.co.th/storage/photos/shares/Our%20Product/Ros%20Dee/Menu/8-13%E0%B9%81%E0%B8%81%E0%B8%87%E0%B9%80%E0%B8%82%E0%B8%B5%E0%B8%A2%E0%B8%A7%E0%B8%AB%E0%B8%A7%E0%B8%B2%E0%B8%99%E0%B8%AB%E0%B8%A1%E0%B8%B9/DSC_8064.jpg',
    cookTime: 30,
    difficulty: 'medium',
    calories: 450,
    ingredients: [
      { id: 'i1', name: 'หมู', nutrition: 'โปรตีน, ไขมัน', caloriesPerUnit: 250, unit: 'กรัม' },
      { id: 'i2', name: 'พริกแกงเขียวหวาน', nutrition: 'วิตามิน', caloriesPerUnit: 40, unit: 'ช้อนโต๊ะ' },
      { id: 'i3', name: 'กะทิ', nutrition: 'ไขมัน', caloriesPerUnit: 200, unit: 'ถ้วย' },
      { id: 'i4', name: 'มะเขือพวง', nutrition: 'วิตามิน, เกลือแร่', caloriesPerUnit: 5, unit: 'กรัม' }
    ],
    steps: [
      'ผัดพริกแกงกับกะทิหัว',
      'ใส่หมูลงไปผัดจนสุก',
      'เติมกะทิที่เหลือและเคี่ยวจนหมูนุ่ม',
      'ใส่มะเขือพวงและใบโหระพา'
    ]
  },
  {
    id: '3',
    title: 'ต้มยำกุ้ง',
    imageUrl: 'https://www.ajinomoto.co.th/storage/photos/shares/Recipe/Menu/2-13tomyumkung/61a8f1d5d25a8.jpg',
    cookTime: 25,
    difficulty: 'hard',
    calories: 280,
    ingredients: [
      { id: 'i1', name: 'กุ้ง', nutrition: 'โปรตีน', caloriesPerUnit: 85, unit: 'กรัม' },
      { id: 'i2', name: 'น้ำพริกเผา', nutrition: 'วิตามิน', caloriesPerUnit: 50, unit: 'ช้อนโต๊ะ' },
      { id: 'i3', name: 'เห็ด', nutrition: 'โปรตีน, เกลือแร่', caloriesPerUnit: 20, unit: 'กรัม' },
      { id: 'i4', name: 'ใบมะกรูด', nutrition: 'วิตามิน', caloriesPerUnit: 0, unit: 'ใบ' }
    ],
    steps: [
      'ต้มน้ำให้เดือดแล้วใส่ตะไคร้ ใบมะกรูด ข่า',
      'ใส่เห็ดและกุ้งลงไป',
      'ปรุงรสด้วยน้ำพริกเผา น้ำปลา น้ำมะนาว',
      'โรยหน้าด้วยผักชี'
    ]
  },
  {
    id: '4',
    title: 'ข้าวผัดปู',
    imageUrl: 'https://www.ajinomoto.co.th/storage/photos/shares/Recipe/Menu/1-13Crabfriedrice/61a8f1b0ad9ad.jpg',
    cookTime: 15,
    difficulty: 'easy',
    calories: 400,
    ingredients: [
      { id: 'i1', name: 'ข้าวสวย', nutrition: 'คาร์โบไฮเดรต', caloriesPerUnit: 130, unit: 'ถ้วย' },
      { id: 'i2', name: 'เนื้อปู', nutrition: 'โปรตีน', caloriesPerUnit: 100, unit: 'กรัม' },
      { id: 'i3', name: 'ไข่', nutrition: 'โปรตีน, ไขมัน', caloriesPerUnit: 70, unit: 'ฟอง' },
      { id: 'i4', name: 'ต้นหอม', nutrition: 'วิตามิน', caloriesPerUnit: 5, unit: 'ต้น' }
    ],
    steps: [
      'ผัดไข่ให้สุก',
      'ใส่ข้าวสวยลงไปผัด',
      'ใส่เนื้อปูและปรุงรส',
      'ใส่ต้นหอมและผัดให้เข้ากัน'
    ]
  },
  {
    id: '5',
    title: 'ผัดไทย',
    imageUrl: 'https://www.ajinomoto.co.th/storage/photos/shares/Recipe/Menu/9-13Padthai/61a8f15aab2c8.jpg',
    cookTime: 20,
    difficulty: 'medium',
    calories: 500,
    ingredients: [
      { id: 'i1', name: 'เส้นผัดไทย', nutrition: 'คาร์โบไฮเดรต', caloriesPerUnit: 200, unit: 'ถ้วย' },
      { id: 'i2', name: 'กุ้งแห้ง', nutrition: 'โปรตีน', caloriesPerUnit: 70, unit: 'ช้อนโต๊ะ' },
      { id: 'i3', name: 'ไข่', nutrition: 'โปรตีน, ไขมัน', caloriesPerUnit: 70, unit: 'ฟอง' },
      { id: 'i4', name: 'ถั่วงอก', nutrition: 'วิตามิน, เกลือแร่', caloriesPerUnit: 10, unit: 'ถ้วย' }
    ],
    steps: [
      'แช่เส้นผัดไทยในน้ำอุ่น',
      'ผัดกระเทียมและกุ้งแห้ง',
      'ใส่เส้นและน้ำซอส ผัดให้เข้ากัน',
      'ตอกไข่ลงไป และใส่ถั่วงอก'
    ]
  }
];

export const useRecipeStore = create<RecipeState>((set, get) => ({
  recipes: mockRecipes,
  favoriteRecipes: [],
  searchResults: [],
  popularRecipes: mockRecipes.slice(0, 5),
  
  searchRecipes: (query, filters) => {
    const { recipes } = get();
    
    if (!query && (!filters || filters.length === 0)) {
      set({ searchResults: recipes });
      return;
    }
    
    const results = recipes.filter(recipe => {
      const matchesQuery = !query || 
        recipe.title.toLowerCase().includes(query.toLowerCase()) ||
        recipe.ingredients.some(i => i.name.toLowerCase().includes(query.toLowerCase()));
      
      const matchesFilters = !filters || filters.length === 0;
      
      return matchesQuery && matchesFilters;
    });
    
    set({ searchResults: results });
  },
  
  toggleFavorite: (recipeId) => {
    set(state => {
      const isFavorited = state.favoriteRecipes.includes(recipeId);
      let newFavorites: string[];
      
      if (isFavorited) {
        newFavorites = state.favoriteRecipes.filter(id => id !== recipeId);
      } else {
        newFavorites = [...state.favoriteRecipes, recipeId];
      }
      
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      return { favoriteRecipes: newFavorites };
    });
  },
  
  getRandomRecipe: () => {
    const { recipes } = get();
    if (recipes.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * recipes.length);
    return recipes[randomIndex];
  },
  
  getRecipeById: (id) => {
    const { recipes } = get();
    return recipes.find(recipe => recipe.id === id) || null;
  }
}));