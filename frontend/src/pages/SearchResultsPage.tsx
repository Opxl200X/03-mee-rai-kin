import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecipeStore } from '../store/recipeStore';
import RecipeCard from '../components/recipe/RecipeCard';
import { Search } from 'lucide-react';

const SearchResultsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q') || '';

  const { searchRecipes, searchResults } = useRecipeStore();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const filters = [
    'มังสวิรัติ',
    'ฮาลาล',
    'คีโต',
    'โปรตีนสูง',
    'ฟาสต์ฟู้ด',
    'อาหารเจ',
    'อาหารคลีน',
    'สุขภาพ'
  ];

  useEffect(() => {
    // Perform search when component mounts or search query or filters change
    searchRecipes(searchQuery, selectedFilters);
  }, [searchQuery, selectedFilters, searchRecipes]);

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => {
      if (prev.includes(filter)) {
        return prev.filter(f => f !== filter);
      } else {
        return [...prev, filter];
      }
    });
  };

  return (
    <div className="py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">ผลการค้นหา</h1>

        <div className="flex row:flex-row gap-8">
          {/* Filters */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-secondary rounded-xl p-4 sticky top-24">
              <h2 className="text-xl font-bold mb-4">ตัวกรอง</h2>

              <div className="space-y-3">
                {filters.map(filter => (
                  <button
                    key={filter}
                    className={`w-full py-2 px-4 rounded-full text-left transition-colors duration-300 ${
                      selectedFilters.includes(filter)
                        ? 'bg-[#ff69b4] text-white'
                        : 'bg-white border-2 border-[#ff69b4] hover:bg-pink-100'
                    }`}
                    onClick={() => toggleFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Search Results */}
          <div className="flex-1">
            <form className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="ค้นหาเมนูอาหาร..."
                  value={searchQuery}
                  readOnly
                  className="w-full py-3 px-5 pr-12 bg-pink-100 rounded-full text-gray-800 cursor-not-allowed"
                />
                <button
                  type="submit"
                  disabled
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-not-allowed"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map(recipe => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-8 text-center">
                <p className="text-gray-600 mb-4">
                  ไม่พบเมนูอาหารที่ตรงกับการค้นหา "{searchQuery}"
                </p>
                <p className="text-gray-500">
                  ลองค้นหาด้วยคำอื่น หรือเลือกเมนูจากหมวดหมู่ด้านซ้าย
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
