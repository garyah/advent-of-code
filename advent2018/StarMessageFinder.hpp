#include <iostream>
#include <unordered_map>
#include <unordered_set>
#include <stdint.h>
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

		StarMessageFinder() :
            m_someField(0)
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

		bool isPointAt(int xPos, int yPos)
		{
			for (auto it = m_points.begin(); it != m_points.end(); ++it)
			{
				if (it->xPos == xPos && it->yPos == yPos) return true;
			}
			return false;
		}

        int64_t method2()
        {
            return m_someField;
        }

        int64_t getSomeField() { return m_someField; }

    private:
        typedef std::vector<Point> Points;
        typedef std::unordered_set<int64_t> SomeSetType;
        typedef std::unordered_map<int64_t, unsigned> SomeMapType;

        int64_t m_someField;
		Points m_points;
        SomeSetType m_someSet;
        SomeMapType m_someMap;
    };
}
