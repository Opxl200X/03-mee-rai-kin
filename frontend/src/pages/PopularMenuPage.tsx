import { useRecipeStore } from '../store/recipeStore';
import { useNavigate } from 'react-router-dom';

const PopularMenuPage = () => {
  const { popularRecipes } = useRecipeStore();
  const navigate = useNavigate();

  const handleMenuClick = (id: string) => {
    navigate(`/menu/${id}`);
  };

  // ความสูงแท่นกราฟเพิ่มใหญ่ขึ้น
  const heights = [450, 420, 390, 360, 330];
  const barColors = [
    { base: '#ff5c5c', hover: '#ff4040' }, // 1st
    { base: '#ffd93b', hover: '#ffeb3b' }, // 2nd
    { base: '#3bff3b', hover: '#3bff75' }, // 3rd
    { base: '#5caeff', hover: '#5cb8ff' }, // 4th
    { base: '#ff5cff', hover: '#ff6bff' }, // 5th
  ];

  // ความกว้างแท่นใหญ่ขึ้น
  const barWidth = 160;

  return (
    <section className="py-8 px-4 md:py-16">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="bg-pink-200 py-6 rounded-xl text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">เมนูยอดนิยมประจำเดือน</h1>
        </div>

        {/* Top 5 Chart */}
        <div className="flex flex-wrap justify-center gap-10 md:gap-20 mt-8 md:mt-24 items-end">
          {popularRecipes.slice(0, 5).map((recipe, index) => (
            <div key={recipe.id} className="flex flex-col items-center" style={{ width: `${barWidth}px` }}>
              <div
                className="relative cursor-pointer transition-all duration-400 ease-out"
                style={{
                  height: `${heights[index]}px`,
                  width: `${barWidth}px`,
                  backgroundColor: barColors[index].base,
                  borderRadius: '10px 10px 0 0',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  marginTop: '40px',
                  boxSizing: 'border-box',
                  position: 'relative',
                  flexShrink: 0,
                }}
                onClick={() => handleMenuClick(recipe.id)}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = barColors[index].hover;
                  e.currentTarget.style.transform = 'scale(1.05) rotate(5deg)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.25)';
                  const imgBox = e.currentTarget.querySelector('.rotating-image');
                  if (imgBox) imgBox.style.transform = 'rotate(360deg)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = barColors[index].base;
                  e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                  e.currentTarget.style.boxShadow = 'none';
                  const imgBox = e.currentTarget.querySelector('.rotating-image');
                  if (imgBox) imgBox.style.transform = 'rotate(0deg)';
                }}
              >
                <div
                  className="absolute top-[-70px] w-28 h-28 md:w-32 md:h-32 bg-white rounded-full overflow-hidden flex items-center justify-center border-4 border-gray-200 rotating-image"
                  style={{
                    transition: 'transform 0.6s ease',
                  }}
                >
                  <img
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-2xl md:text-3xl font-bold mb-2">{index + 1}</span>
              </div>

              {/* ชื่อเมนู แยกออกมาไม่กระทบแท่น */}
              <div
                className="mt-4 text-center w-full"
                style={{
                  minHeight: '4rem', // เพิ่มความสูงขั้นต่ำช่องชื่อเมนู
                  wordWrap: 'break-word',
                  whiteSpace: 'normal',
                }}
              >
                <h3 className="font-semibold text-lg md:text-xl">{recipe.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularMenuPage;
