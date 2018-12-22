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

		void helper1(unsigned arg1, int arg2, unsigned& out1, string& out2)
		{
			out1 = 0;
			out2.empty();
		}

		void helper2()
		{
		}

		unsigned _depth;
		unsigned _targetX;
		unsigned _targetY;
		int _dummy;

		SomeVector _someVector;
		SomeSet _someSet;
		SomeMap _someMap;
	};
}
