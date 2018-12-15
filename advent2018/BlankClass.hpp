#include <iostream>
#include <unordered_map>
#include <unordered_set>
#include <stdio.h>
#include <string>
#include <vector>

namespace Advent2018
{
	typedef std::vector<unsigned> SomeVector;
	typedef std::unordered_set<unsigned> SomeSet;
	typedef std::unordered_map<unsigned, unsigned> SomeMap;

	struct BlankClass
	{
		BlankClass(unsigned field1 = 0,
			int field2 = 0,
			const char *field3 = "",
			int dummy = 0) :
			_field1(field1),
			_field2(field2),
			_field3(field3),
			_dummy(dummy)
		{
		}

		void method1(unsigned arg1 = 0u, int arg2 = 0, const char *arg3 = "")
		{
			_field1 = arg1;
			_field2 = arg2;
			_field3 = arg3;
		}

		void method2()
		{
		}

		void helper1(unsigned arg1, int arg2, unsigned& out1, std::string& out2)
		{
			out1 = 0;
			out2.empty();
		}

		void helper2()
		{
		}

		unsigned _field1;
		int _field2;
		std::string _field3;
		int _dummy;

		SomeVector _someVector;
		SomeSet _someSet;
		SomeMap _someMap;
	};
}
