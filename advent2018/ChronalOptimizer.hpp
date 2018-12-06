#include <vector>

namespace Advent2018
{
    class ChronalOptimizer
    {
    public:
        ChronalOptimizer() :
			m_idOfLastCoordinate(0)
        {
        }

        void addCoordinate(const char *input)
        {
			unsigned x = 0, y = 0;
            (void)sscanf_s(input, "%u, %u", &x, &y);

			if (m_coordinateGrid.size() < y + 1) resizeGridToHeightNeeded(y + 1);
			if (m_coordinateGrid[0].size() < x + 1) resizeGridToWidthNeeded(x + 1);
			++m_idOfLastCoordinate;

			m_coordinateStore.resize(m_idOfLastCoordinate + 1);
			m_coordinateStore[m_idOfLastCoordinate] = { x, y };
		}

		unsigned getSizeOfLargestArea()
        {
			for (unsigned id = 0; id <= m_idOfLastCoordinate; ++id)
			{
				m_coordinateCounts.push_back(0);
			}

			for (unsigned y = 0; y < m_coordinateGrid.size(); ++y)
			{
				for (unsigned x = 0; x < m_coordinateGrid[y].size(); ++x)
				{
					unsigned minDistance = (unsigned)-1;
					unsigned idWithMinDistance = 0;
					for (unsigned id = 1; id <= m_idOfLastCoordinate; ++id)
					{
						auto thisCoordinate = m_coordinateStore[id];
						auto distanceToThis = abs((int)x - (int)thisCoordinate.x) + abs((int)y - (int)thisCoordinate.y);
						if (distanceToThis < minDistance)
						{
							minDistance = distanceToThis;
							idWithMinDistance = id;
						}
						else if (distanceToThis == minDistance)
						{
							idWithMinDistance = 0;
						}
					}
					m_coordinateGrid[y][x] = idWithMinDistance;
				}
			}

			for (unsigned y = 0; y < m_coordinateGrid.size(); ++y)
			{
				for (unsigned x = 0; x < m_coordinateGrid[y].size(); ++x)
				{
					unsigned id = m_coordinateGrid[y][x];
					if (id != 0 && m_coordinateCounts[id] != (unsigned)-1)
					{
						m_coordinateCounts[id] += 1;
						if (x == 0 || x == m_coordinateGrid[y].size() - 1 || y == 0 || y == m_coordinateGrid.size() - 1)
						{
							m_coordinateCounts[id] = (unsigned)-1;
						}
					}
				}
			}

			unsigned maxArea = 0;
			for (unsigned id = 1; id <= m_idOfLastCoordinate; ++id)
			{
				if (m_coordinateCounts[id] < (unsigned)-1 && m_coordinateCounts[id] > maxArea) maxArea = m_coordinateCounts[id];
			}
			return maxArea;
        }

		unsigned getSizeOfRegionCloseEnoughToAllCoordinates()
		{
			unsigned sizeOfRegion = 0;
			for (unsigned y = 0; y < m_coordinateGrid.size(); ++y)
			{
				for (unsigned x = 0; x < m_coordinateGrid[y].size(); ++x)
				{
					unsigned totalDistance = 0;
					for (unsigned id = 1; id <= m_idOfLastCoordinate; ++id)
					{
						auto thisCoordinate = m_coordinateStore[id];
						auto distanceToThis = abs((int)x - (int)thisCoordinate.x) + abs((int)y - (int)thisCoordinate.y);
						totalDistance += distanceToThis;
					}
					// something in the region of proximity
					if (totalDistance < 10000) ++sizeOfRegion;
				}
			}
			return sizeOfRegion;
		}

    private:
		typedef std::vector<unsigned> CoordinateGridRow;
		typedef std::vector<CoordinateGridRow> CoordinateGrid;
		typedef struct
		{
			unsigned x, y;
		} Coordinate;
		typedef std::vector<Coordinate> CoordinateStore;
		typedef std::vector<unsigned> CoordinateCounts;

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
		CoordinateStore m_coordinateStore;
		CoordinateCounts m_coordinateCounts;
    };
}
