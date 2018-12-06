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
			//m_coordinateGrid[y][x] = m_idOfLastCoordinate;

			m_coordinateStore.resize(m_idOfLastCoordinate + 1);
			m_coordinateStore[m_idOfLastCoordinate] = { x, y };
		}

		unsigned getSizeOfLargestArea()
        {
			for (unsigned id = 1; id <= m_idOfLastCoordinate; ++id)
			{
				unsigned x = m_coordinateStore[id].x;
				unsigned y = m_coordinateStore[id].y;
				findProximates(x, y, id);

				m_coordinateCounts.resize(id + 1);
				m_coordinateCounts[id] = 0;
			}

			for (unsigned y = 0; y < m_coordinateGrid.size(); ++y)
			{
				for (unsigned x = 0; x < m_coordinateGrid[y].size(); ++x)
				{
					unsigned id = m_coordinateGrid[y][x];
					if (id != 0 && id != (unsigned)-1)
					{
						if (x != 0 && x != m_coordinateGrid[y].size() - 1 && y != 0 && y != m_coordinateGrid.size() - 1)
						{
							m_coordinateCounts[id] += 1;
						}
					}
				}
			}

			unsigned maxArea = 0;
			for (unsigned id = 1; id <= m_idOfLastCoordinate; ++id)
			{
				if (m_coordinateCounts[id] > maxArea) maxArea = m_coordinateCounts[id];
			}
			return maxArea;
        }

        //int64_t getSomeField() { return m_someField; }

    private:
		typedef std::vector<unsigned> CoordinateGridRow;
		typedef std::vector<CoordinateGridRow> CoordinateGrid;
		typedef struct
		{
			unsigned x, y;
		} Coordinate;
		typedef std::vector<Coordinate> CoordinateStore;
		typedef std::vector<unsigned> CoordinateCounts;
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

		void findProximates(unsigned x, unsigned y, unsigned id)
		{
			if (m_coordinateGrid[y][x] == 0) m_coordinateGrid[y][x] = id;
			else if (m_coordinateGrid[y][x] == id) return;
			else if (m_coordinateGrid[y][x] != (unsigned)-1)
			{
				// another coordinate got here first, arbitrate
				auto thisCoordinate = m_coordinateStore[id];
				auto distanceToThis = abs((int)x - (int)thisCoordinate.x) + abs((int)y - (int)thisCoordinate.y);
				auto otherCoordinate = m_coordinateStore[m_coordinateGrid[y][x]];
				auto distanceToOther = abs((int)x - (int)otherCoordinate.x) + abs((int)y - (int)otherCoordinate.y);
				if (distanceToThis < distanceToOther) m_coordinateGrid[y][x] = id; // new winner
				else if (distanceToThis == distanceToOther) m_coordinateGrid[y][x] = (unsigned)-1; // mark tie
			}
			auto xUpper = m_coordinateGrid[y].size() - 1;
			auto yUpper = m_coordinateGrid.size() - 1;
			if (x > 0 && y > 0 && x < xUpper && y < yUpper)                             findProximates(x - 1, y - 1, id);
			if (y > 0 && y < yUpper)                                                    findProximates(x,     y - 1, id);
			if (x < xUpper && y > 0 && x > 0 && y < yUpper)                             findProximates(x + 1, y - 1, id);
			if (x > 0 && x < xUpper)                                                    findProximates(x - 1, y, id);
			if (x < xUpper && x > 0)                                                    findProximates(x + 1, y, id);
			if (x > 0 && y < yUpper && x < xUpper && y > 0)                             findProximates(x - 1, y + 1, id);
			if (y < yUpper && y > 0)                                                    findProximates(x,     y + 1, id);
			if (x < xUpper && y < yUpper && x > 0 && y > 0)                             findProximates(x + 1, y + 1, id);
		}

		unsigned m_idOfLastCoordinate;
		CoordinateGrid m_coordinateGrid;
		CoordinateStore m_coordinateStore;
		CoordinateCounts m_coordinateCounts;
		//int m_someField;
        //SomeSetType m_someSet;
        //SomeMapType m_someMap;
    };
}
