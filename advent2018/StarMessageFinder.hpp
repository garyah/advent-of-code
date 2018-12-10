#include <iostream>
#include <string>
#include <vector>

namespace Advent2018
{
    class StarMessageFinder
    {
    public:
		typedef struct
		{
			int xPos, yPos, xVel, yVel;
		} Point;

		StarMessageFinder()
        {
        }

        void addPoint(int xPos, int yPos, int xVel, int yVel)
        {
			Point point = { xPos, yPos, xVel, yVel };
			m_points.push_back(point);
        }

		void movePoints()
		{
			for (auto it = m_points.begin(); it != m_points.end(); ++it)
			{
				movePoint(*it);
			}
		}

		void movePoint(Point& point)
		{
			point.xPos += point.xVel;
			point.yPos += point.yVel;
		}

		std::string drawPoints()
		{
			std::string drawing;

			auto xMaxPlus = 0, yMaxPlus = 0;
			auto xMaxMinus = 0, yMaxMinus = 0;
			for (auto it = m_points.begin(); it != m_points.end(); ++it)
			{
				auto xPos = it->xPos;
				if (xPos >= 0 && abs(xPos) > xMaxPlus) xMaxPlus = abs(xPos);
				if (xPos < 0 && abs(xPos) > xMaxMinus) xMaxMinus = abs(xPos);
				auto yPos = it->yPos;
				if (yPos >= 0 && abs(yPos) > yMaxPlus) yMaxPlus = abs(yPos);
				if (yPos < 0 && abs(yPos) > yMaxMinus) yMaxMinus = abs(yPos);
			}

			auto width = xMaxPlus + xMaxMinus + 1;
			auto height = yMaxPlus + yMaxMinus + 1;
			for (auto yPos = -yMaxMinus; yPos <= yMaxPlus; ++yPos)
			{
				for (auto xPos = -xMaxMinus; xPos <= xMaxPlus; ++xPos)
				{
					if (isPointAt(xPos, yPos)) drawing += "#";
					else drawing += ".";
				}
				drawing += "\n";
			}

			return drawing;
		}

		void statPoints()
		{
			auto maxDistance = 0u, minDistance = (unsigned)-1;
			int maxDistanceXPos1, maxDistanceXPos2, maxDistanceYPos1, maxDistanceYPos2;
			int minDistanceXPos1, minDistanceXPos2, minDistanceYPos1, minDistanceYPos2;
			auto maxMeanDistance = 0u, minMeanDistance = (unsigned)-1;
			for (auto it1 = m_points.begin(); it1 != m_points.end(); ++it1)
			{
				auto meanDistance = 0u, i = 0u;
				bool foundMine = false;
				for (auto it2 = m_points.begin(); it2 != m_points.end(); ++it2, ++i)
				{
					if (it1 == it2)
					{
						foundMine = true;
						continue;
					}
					auto distance = (unsigned)(abs(it2->xPos - it1->xPos) + abs(it2->yPos - it1->yPos));
					if (i == 0 || foundMine && i == 1) meanDistance = distance;
					else if (foundMine) meanDistance = (meanDistance * (i - 1) + distance) / i;
					else meanDistance = (meanDistance * i + distance) / (i + 1);
					if (distance > maxDistance)
					{
						maxDistance = distance;
						maxDistanceXPos1 = it1->xPos;
						maxDistanceXPos2 = it2->xPos;
						maxDistanceYPos1 = it1->yPos;
						maxDistanceYPos2 = it2->yPos;
					}
					if (distance < minDistance)
					{
						minDistance = distance;
						minDistanceXPos1 = it1->xPos;
						minDistanceXPos2 = it2->xPos;
						minDistanceYPos1 = it1->yPos;
						minDistanceYPos2 = it2->yPos;
					}
				}
				if (meanDistance > maxMeanDistance) maxMeanDistance = meanDistance;
				if (meanDistance < minMeanDistance) minMeanDistance = meanDistance;
			}
			std::cout << "minimum distance of " << minDistance << " between (" << minDistanceXPos1 << "," << minDistanceYPos1 << ")";
			std::cout << " and (" << minDistanceXPos2 << "," << minDistanceYPos2 << ")" << std::endl;
			std::cout << "maximum distance of " << maxDistance << " between (" << maxDistanceXPos1 << "," << maxDistanceYPos1 << ")";
			std::cout << " and (" << maxDistanceXPos2 << "," << maxDistanceYPos2 << ")" << std::endl;
			std::cout << "minimum mean distance of " << minMeanDistance << std::endl;
			std::cout << "maximum mean distance of " << maxMeanDistance << std::endl;
		}

		bool isPointAt(int xPos, int yPos)
		{
			for (auto it = m_points.begin(); it != m_points.end(); ++it)
			{
				if (it->xPos == xPos && it->yPos == yPos) return true;
			}
			return false;
		}

    private:
        typedef std::vector<Point> Points;

		Points m_points;
    };
}
