#include <unordered_map>
#include <unordered_set>
#include <stdint.h>
#include <vector>

namespace Advent2018
{
    class ChronalOptimizer
    {
    public:
        ChronalOptimizer() :
			m_idOfLastCoordinate(0)
            //m_someField(0)*/
        {
        }

        void addCoordinate(const char *input)
        {
			unsigned x = 0, y = 0;
            (void)sscanf_s(input, "%u, %u", &x, &y);
			if (m_coordinateGrid.size() < y + 1) resizeGridToHeightNeeded(y + 1);
			if (m_coordinateGrid[0].size() < x + 1) resizeGridToWidthNeeded(x + 1);
			++m_idOfLastCoordinate;
			m_coordinateGrid[y][x] = m_idOfLastCoordinate;
		}

		unsigned method2()
        {
			return 0;
            //return m_someField;
        }

        //int64_t getSomeField() { return m_someField; }

    private:
		typedef std::vector<unsigned> CoordinateGridRow;
		typedef std::vector<CoordinateGridRow> CoordinateGrid;
        //typedef std::unordered_set<int64_t> SomeSetType;
        //typedef std::unordered_map<int64_t, unsigned> SomeMapType;

		void resizeGridToHeightNeeded(unsigned gridHeightNeeded)
		{
			size_t currentHeight = m_coordinateGrid.size();
			size_t currentWidth = currentHeight > 0 ? m_coordinateGrid[0].size() : 0;
			for (size_t r = 1; r <= gridHeightNeeded - currentHeight; ++r)
			{
				CoordinateGridRow row;
				for (size_t c = 1; c <= currentWidth; ++c)
				{
					row.push_back(0);
				}
				m_coordinateGrid.push_back(row);
			}
		}

		void resizeGridToWidthNeeded(unsigned gridWidthNeeded)
		{
			for (size_t r = 0; r < m_coordinateGrid.size(); ++r)
			{
				size_t currentWidth = m_coordinateGrid[r].size();
				for (size_t c = 1; c <= gridWidthNeeded - currentWidth; ++c)
				{
					m_coordinateGrid[r].push_back(0);
				}
			}
		}

		unsigned m_idOfLastCoordinate;
		CoordinateGrid m_coordinateGrid;
		//int m_someField;
        //SomeSetType m_someSet;
        //SomeMapType m_someMap;
    };
}
