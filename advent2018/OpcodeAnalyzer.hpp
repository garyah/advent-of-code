#include <iostream>
#include <unordered_map>
#include <unordered_set>
#include <stdio.h>
#include <string>
#include <vector>

using namespace std;

namespace Advent2018
{
	typedef unsigned regType;
	typedef struct
	{
		regType reg0; regType reg1; regType reg2; regType reg3;
	} RegisterFile;
	typedef struct
	{
		regType opCode; regType operand1; regType operand2; regType operand3;
	} Instruction;

	typedef vector<unsigned> SomeVector;
	typedef unordered_set<unsigned> SomeSet;
	typedef unordered_map<unsigned, unsigned> SomeMap;

	struct OpcodeAnalyzer
	{
		OpcodeAnalyzer(unsigned field1 = 0,
			int field2 = 0,
			const char *field3 = "",
			int dummy = 0) :
			_field1(field1),
			_field2(field2),
			_field3(field3),
			_dummy(dummy)
		{
		}

		void addInstruction(RegisterFile before, Instruction instruction, RegisterFile after)
		{
			(void)printf("Before: [%u, %u, %u, %u]\n",
				before.reg0, before.reg1, before.reg2, before.reg3);
			(void)printf("%u %u %u %u\n",
				instruction.opCode,
				instruction.operand1, instruction.operand2, instruction.operand3);
			(void)printf("After: [%u, %u, %u, %u]\n",
				after.reg0, after.reg1, after.reg2, after.reg3);

			//_field1 = arg1;
			//_field2 = arg2;
			//_field3 = arg3;
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

		unsigned _field1;
		int _field2;
		string _field3;
		int _dummy;

		SomeVector _someVector;
		SomeSet _someSet;
		SomeMap _someMap;
	};
}
