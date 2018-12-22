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
	typedef vector<int64_t> ErosionLevelRow;
	typedef vector<vector<int64_t>> ErosionLevelGrid;
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
			_risk(0),
			_dummy(dummy)
		{
			for (size_t rowIdx = 0; rowIdx <= _targetY; ++rowIdx)
			{
				ErosionLevelRow row;
				for (size_t colIdx = 0; colIdx <= _targetX; ++colIdx) row.push_back(0);
				_erosionLevelGrid.push_back(row);
			}
		}

		void method1(unsigned arg1 = 0u, int arg2 = 0, const char *arg3 = "")
		{
		}

		void calculateErosionLevels()
		{
			//size_t rowIdx, colIdx;
			_erosionLevelGrid[0][0] = updateRisk(erosionLevelForZeroCoordinate(0, 0));
			for (size_t colIdx = 1; colIdx <= _targetX; ++colIdx)
			{
				_erosionLevelGrid[0][colIdx] = updateRisk(erosionLevelForY0(colIdx));
			}
			for (size_t rowIdx = 1; rowIdx <= _targetY; ++rowIdx)
			{
				_erosionLevelGrid[rowIdx][0] = updateRisk(erosionLevelForX0(rowIdx));
			}
			for (size_t rowIdx = 1; rowIdx <= _targetY; ++rowIdx)
			{
				for (size_t colIdx = 1; colIdx <= _targetX; ++colIdx)
				{
					if (rowIdx == _targetY && colIdx == _targetX) break;
					_erosionLevelGrid[rowIdx][colIdx]
						= updateRisk(erosionLevelFromAdjacent(_erosionLevelGrid[rowIdx][colIdx - 1],
															  _erosionLevelGrid[rowIdx - 1][colIdx]));
				}
			}
			_erosionLevelGrid[_targetY][_targetX] = updateRisk(erosionLevelForZeroCoordinate(0, 0));
		}

		int64_t updateRisk(int64_t erosionLevel)
		{
			_risk += erosionLevel % 3;
			return erosionLevel;
		}

		int64_t erosionLevelFromAdjacent(int64_t leftErosionLevel, int64_t upErosionLevel)
		{
			return (leftErosionLevel * upErosionLevel + (int64_t)_depth) % (int64_t)erosionModuloValue;
		}

		int64_t erosionLevelForY0(unsigned x)
		{
			return erosionLevelForZeroCoordinate(x, 16807);
		}

		int64_t erosionLevelForX0(unsigned y)
		{
			return erosionLevelForZeroCoordinate(y, 48271);
		}

		int64_t erosionLevelForZeroCoordinate(unsigned nonZeroCoordinate, unsigned multiplier)
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

		unsigned _risk;

		ErosionLevelGrid _erosionLevelGrid;
		//SomeSet _someSet;
		//SomeMap _someMap;
	};
}
