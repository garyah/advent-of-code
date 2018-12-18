#include <iostream>
#include <unordered_map>
#include <unordered_set>
#include <stdio.h>
#include <string>
#include <vector>

using namespace std;

namespace Advent2018
{
	typedef vector<string> LumberArea;
	typedef unordered_set<unsigned> SomeSet;
	typedef unordered_map<unsigned, unsigned> SomeMap;

	struct LumberCalculator
	{
		LumberCalculator(unsigned numOpen = 0,
						 unsigned numWithTrees = 0,
						 unsigned numYards = 0,
						 int field2 = 0,
						 const char *field3 = "",
						 int dummy = 0) :
			_numOpen(numOpen),
			_numWithTrees(numWithTrees),
			_numYards(numYards),
			_field2(field2),
			_field3(field3),
			_dummy(dummy)
		{
		}

		void addRow(const char *row)
		{
			_lumberArea.push_back(row);
			updateCountsForNewRow();

		}

		void updateArea()
		{
			LumberArea newLumberArea;
			auto height = _lumberArea.size();
			for (size_t rowCurrentIndex = 0; rowCurrentIndex < height; ++rowCurrentIndex)
			{
				auto currentRow = _lumberArea[rowCurrentIndex];
				auto width = currentRow.length();
				string newRow;
				for (size_t colCurrentIndex = 0; colCurrentIndex < width; ++colCurrentIndex)
				{
					if (currentRow[colCurrentIndex] == '.') newRow += updateOpen(rowCurrentIndex, colCurrentIndex, width, height);
					if (currentRow[colCurrentIndex] == '|') newRow += updateWithTrees(rowCurrentIndex, colCurrentIndex, width, height);
					if (currentRow[colCurrentIndex] == '#') newRow += updateYard(rowCurrentIndex, colCurrentIndex, width, height);
				}
				newLumberArea.push_back(newRow);
			}
			_lumberArea = newLumberArea;
		}

		void getResourceValue(unsigned &resourceValue)
		{
			resourceValue = _numWithTrees * _numYards;
		}

		void updateCountsForNewRow()
		{
			auto newRow = _lumberArea.back();
			for (size_t i = 0; i < newRow.size(); ++i)
			{
				if (newRow[i] == '.') ++_numOpen;
				if (newRow[i] == '|') ++_numWithTrees;
				if (newRow[i] == '#') ++_numYards;
			}
		}

		char updateOpen(size_t rowCurrentIndex, size_t colCurrentIndex, size_t width, size_t height)
		{
			return updateToThreeOrMoreAdjacent('.', '|', rowCurrentIndex, colCurrentIndex, width, height);
		}

		char updateWithTrees(size_t rowCurrentIndex, size_t colCurrentIndex, size_t width, size_t height)
		{
			return updateToThreeOrMoreAdjacent('|', '#', rowCurrentIndex, colCurrentIndex, width, height);
		}

		char updateToThreeOrMoreAdjacent(char currentState, char adjacentState, size_t rowCurrentIndex, size_t colCurrentIndex, size_t width, size_t height)
		{
			auto numAdjacent = getNumberAdjacent(adjacentState, rowCurrentIndex, colCurrentIndex, width, height);
			if (numAdjacent >= 3) return adjacentState;
			return currentState;
		}

		char updateYard(size_t rowCurrentIndex, size_t colCurrentIndex, size_t width, size_t height)
		{
			auto numAdjacentYards = getNumberAdjacent('#', rowCurrentIndex, colCurrentIndex, width, height);
			auto numAdjacentWithTrees = getNumberAdjacent('|', rowCurrentIndex, colCurrentIndex, width, height);
			if (numAdjacentYards >= 1 && numAdjacentWithTrees >= 1) return '#';
			return '.';
		}

		unsigned getNumberAdjacent(char adjacentState, size_t rowCurrentIndex, size_t colCurrentIndex, size_t width, size_t height)
		{
			auto rowPreviousIndex = rowCurrentIndex - 1, rowNextIndex = rowCurrentIndex + 1;
			auto colPreviousIndex = colCurrentIndex - 1, colNextIndex = colCurrentIndex + 1;
			auto numAdjacent = 0u;
			if (rowCurrentIndex > 0   && colCurrentIndex > 0  &&  _lumberArea[rowPreviousIndex][colPreviousIndex] == adjacentState) ++numAdjacent;
			if (rowCurrentIndex > 0   &&                          _lumberArea[rowPreviousIndex][colCurrentIndex] == adjacentState) ++numAdjacent;
			if (rowCurrentIndex > 0   && colNextIndex < width &&  _lumberArea[rowPreviousIndex][colNextIndex] == adjacentState) ++numAdjacent;
			if (                         colCurrentIndex > 0  &&  _lumberArea[rowCurrentIndex][colPreviousIndex] == adjacentState) ++numAdjacent;
			if (                         colNextIndex < width &&  _lumberArea[rowCurrentIndex][colNextIndex] == adjacentState) ++numAdjacent;
			if (rowNextIndex < height && colCurrentIndex > 0  &&  _lumberArea[rowNextIndex][colPreviousIndex] == adjacentState) ++numAdjacent;
			if (rowNextIndex < height &&                          _lumberArea[rowNextIndex][colCurrentIndex] == adjacentState) ++numAdjacent;
			if (rowNextIndex < height && colNextIndex < width &&  _lumberArea[rowNextIndex][colNextIndex] == adjacentState) ++numAdjacent;

			return numAdjacent;
		}

		unsigned _numOpen;
		unsigned _numWithTrees;
		unsigned _numYards;
		int _field2;
		string _field3;
		int _dummy;

		LumberArea _lumberArea;
		SomeSet _someSet;
		SomeMap _someMap;
	};
}
