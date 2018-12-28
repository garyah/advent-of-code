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
			unsigned numConstellations = 0,
			unsigned traversalDepth = 0,
			const char *field3 = "",
			int dummy = 0) :
			_numCloseDistances(numCloseDistances),
			_numConstellations(numConstellations),
			_traversalDepth(traversalDepth),
			_field3(field3),
			_dummy(dummy)
		{
		}

		void addPoint(int x, int y, int z, int t)
		{
			Point point = {x, y, z, t};
			_points.push_back(point);
		}

		void method2()
		{
		}

		void countConstellations()
		{
			countCloseDistances();
			_numConstellations = 0;
			_traversalDepth = 0;
			ClosePointPairs closePointPairs = _closePointPairs;
			while (closePointPairs.size() != 0)
			{
				traverseNeighbors(closePointPairs, (size_t)-1, closePointPairs.begin()->first);
				++_numConstellations;
			}
		}

		void traverseNeighbors(ClosePointPairs& closePointPairs, size_t parentPoint, size_t rootPoint)
		{
			for (auto i = 0u; i < _traversalDepth; ++i) cout << " ";
			cout << "traverseNeighbors: depth = " << _traversalDepth;
			cout << ": parentPoint = " << (int)parentPoint << ", rootPoint = " << rootPoint << endl;
			auto neighbors = closePointPairs.equal_range(rootPoint);
			while (neighbors.first != closePointPairs.end())
			{
				auto nextNeighbor = neighbors.first->second;
				closePointPairs.erase(neighbors.first);
				if (parentPoint == (size_t)-1 || nextNeighbor != parentPoint)
				{
					++_traversalDepth;
					traverseNeighbors(closePointPairs, rootPoint, nextNeighbor);
					--_traversalDepth;
				}
				neighbors = closePointPairs.equal_range(rootPoint);
			}
		}

		void countCloseDistances()
		{
			_numCloseDistances = 0;
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
					if (distance <= 3)
					{
						_closePointPairs.insert({ i, j });
						_closePointPairs.insert({ j, i });
						cout << "distance of " << distance << " between points " << i << " and " << j << endl;
						++_numCloseDistances;
					}
				}
		}

		int distanceBetweenTwoPoints(int x1, int y1, int z1, int t1, int x2, int y2, int z2, int t2)
		{
			return abs(x2 - x1) + abs(y2 - y1) + abs(z2 - z1) + abs(t2 - t1);
		}

		unsigned _numCloseDistances;
		unsigned _numConstellations;
		unsigned _traversalDepth;
		string _field3;
		int _dummy;

		Points _points;
		SomeSet _someSet;
		ClosePointPairs _closePointPairs;
	};
}
