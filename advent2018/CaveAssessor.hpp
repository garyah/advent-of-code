#include <iostream>
#include <unordered_map>
#include <unordered_set>
#include <stdio.h>
#include <stdint.h>
#include <string>
#include <vector>

using namespace std;

namespace Advent2018
{
	typedef vector<unsigned> SomeVector;
	typedef unordered_set<unsigned> SomeSet;
	typedef unordered_map<unsigned, unsigned> SomeMap;

	struct CaveAssessor
	{
		CaveAssessor(
			unsigned depth,
			unsigned targetX,
			unsigned targetY,
			int dummy = 0) :
			_depth(depth),
			_targetX(targetX),
			_targetY(targetY),
			_dummy(dummy)
		{
		}

		void method1(unsigned arg1 = 0u, int arg2 = 0, const char *arg3 = "")
		{
		}

		void method2()
		{
		}

		int64_t calculateErosionLevelFromAdjacent(int64_t leftErosionLevel, int64_t upErosionLevel)
		{
			return (leftErosionLevel * upErosionLevel + (int64_t)_depth) % (int64_t)erosionModuloValue;
		}

		int64_t calculateErosionLevelForY0(unsigned x)
		{
			return calculateErosionLevelForZeroCoordinate(x, 16807);
		}

		int64_t calculateErosionLevelForX0(unsigned y)
		{
			return calculateErosionLevelForZeroCoordinate(y, 48271);
		}

		int64_t calculateErosionLevelForZeroCoordinate(unsigned nonZeroCoordinate, unsigned multiplier)
		{
			return (int64_t)((nonZeroCoordinate * multiplier + _depth) % erosionModuloValue);
		}

		const unsigned y0MultiplierValue = 16807;
		const unsigned x0MultiplierValue = 48271;
		const unsigned erosionModuloValue = 20183;

		unsigned _depth;
		unsigned _targetX;
		unsigned _targetY;
		int _dummy;

		SomeVector _someVector;
		SomeSet _someSet;
		SomeMap _someMap;
	};
}
