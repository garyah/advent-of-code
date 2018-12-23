#include <iostream>
#include <stdio.h>

#include "../advent2018/AssemblyParser.hpp"

using namespace std;
using namespace Advent2018;

int main()
{
	AssemblyParser parser;
	char line[80 + 1] = { 0 };
	cin.getline(line, _countof(line));
	auto ipRegNum = 0u;
	size_t initialProgramCounter = 0;
	regType initialRegisterValues[6] = { 0 };
	(void)sscanf_s(line, "#ip %u, %zu, %llu, %llu, %llu, %llu, %llu, %llu",
				   &ipRegNum, &initialProgramCounter,
				   &initialRegisterValues[0], &initialRegisterValues[1], &initialRegisterValues[2],
				   &initialRegisterValues[3], &initialRegisterValues[4], &initialRegisterValues[5]);
	parser.setIpRegNum(ipRegNum);
	do
	{
		cin.getline(line, _countof(line));
		parser.parseInstruction(line);
	} while (!cin.eof());

	parser.executeProgram(1, initialProgramCounter, initialRegisterValues);
	cout << parser.getRegisterZero() << endl;
	return 0;
}
