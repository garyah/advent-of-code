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

		void helper2()
		{
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
