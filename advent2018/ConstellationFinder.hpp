#include <iostream>
#include <unordered_map>
#include <unordered_set>
#include <stdio.h>
#include <string>
#include <vector>

using namespace std;

namespace Advent2018
{
	typedef struct
	{
		int x, y, z, t;
	} Point;
	//typedef struct
	//{
	//	int x1, y1, z1, t1;
	//	int x2, y2, z2, t2;
	//} ClosePointPair;
	typedef vector<Point> Points;
	typedef unordered_set<unsigned> SomeSet;
	typedef unordered_multimap<size_t, size_t> ClosePointPairs;

	struct ConstellationFinder
	{
		ConstellationFinder(unsigned numCloseDistances = 0,
			int field2 = 0,
			const char *field3 = "",
			int dummy = 0) :
			_numCloseDistances(numCloseDistances),
			_field2(field2),
			_field3(field3),
			_dummy(dummy)
		{
		}

		void addPoint(int x, int y, int z, int t)
		{
			Point point = {x, y, z, t};
			_points.push_back(point);
			//_numCloseDistances = arg1;
			//_field2 = arg2;
			//_field3 = arg3;
		}

		void method2()
		{
		}

		void statsForDistanceBetweenAnyTwoPoints()
		{
			for (size_t i = 0; i < _points.size(); ++i)
				for (size_t j = 0; j < _points.size(); ++j)
				{
					if (i == j) break;
					//ClosePointPair otherClosePointPair
					//	= { _points[j].x, _points[j].y, _points[j].z, _points[j].t,
					//		_points[i].x, _points[i].y, _points[i].z, _points[i].t };
					//auto pointsFound = false;
					//auto pointFoundRange = _closePointPairs.equal_range(j);
					//for (auto it = pointFoundRange.first; it != pointFoundRange.second; ++it)
					//{
					//	if (it->second == i) pointsFound = true;
					//}
					//if (pointsFound) continue;

					auto distance
						= distanceBetweenTwoPoints(_points[i].x, _points[i].y, _points[i].z, _points[i].t,
							_points[j].x, _points[j].y, _points[j].z, _points[j].t);
					if (distance < 3)
					{
						_closePointPairs.insert({ i, j });
						++_numCloseDistances;
					}
				}
		}

		int distanceBetweenTwoPoints(int x1, int y1, int z1, int t1, int x2, int y2, int z2, int t2)
		{
			return abs(x2 - x1) + abs(y2 - y1) + abs(z2 - z1) + abs(t2 - t1);
			//out1 = 0;
			//out2.empty();
		}

		void helper2()
		{
		}

		unsigned _numCloseDistances;
		int _field2;
		string _field3;
		int _dummy;

		Points _points;
		SomeSet _someSet;
		ClosePointPairs _closePointPairs;
	};
}
