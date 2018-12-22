#include <iostream>
#include <stdio.h>
#include <string.h>

#include "../advent2018/OpcodeAnalyzer.hpp"

using namespace std;
using namespace Advent2018;

int main()
{
	// unit testing
	//{
	//	OpcodeAnalyzer analyzer(0, 0, "");
	//	auto out1 = 0u;
	//	string out2;
	//	analyzer.helper1(0u, 0, out1, out2);
	//	cout << "helper1 test 1: expected 0 and ||, actual ";
	//	cout << out1 << " and |" << out2 << "|" << endl;
	//}
	//{
	//	OpcodeAnalyzer analyzer(0, 0, "");
	//	analyzer.addInstruction(0u, 0, "");
	//	cout << "addInstruction test 1: expected 0, actual " << analyzer._field1 << endl;
	//}

	OpcodeAnalyzer analyzer(0, 0, "");
	do
	{
		char line[80 + 1] = { 0 };
		cin.getline(line, _countof(line));
		if (strlen(line) == 0)
		{
			cin.getline(line, _countof(line));
			if (strlen(line) == 0) break;
		};

		RegisterFile before = { 0, 0, 0, 0 };
		(void)sscanf_s(line, "Before: [%u, %u, %u, %u]",
			&before.reg0, &before.reg1, &before.reg2, &before.reg3);

		cin.getline(line, _countof(line));
		Instruction instruction = { 0, 0, 0, 0 };
		(void)sscanf_s(line, "%u %u %u %u",
			&instruction.opCode,
			&instruction.operand1, &instruction.operand2, &instruction.operand3);

		cin.getline(line, _countof(line));
		RegisterFile after = { 0, 0, 0, 0 };
		(void)sscanf_s(line, "After: [%u, %u, %u, %u]",
			&after.reg0, &after.reg1, &after.reg2, &after.reg3);
		analyzer.addInstruction(before, instruction, after);
	} while (!cin.eof());

	//analyzer.method2();
	//cout << analyzer._field1 << ", " << analyzer._field2 << ", |" << analyzer._field3 << "|" << endl;
	//cout << analyzer._field1 << endl;
	return 0;
}
